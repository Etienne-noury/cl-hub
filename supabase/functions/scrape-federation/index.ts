// Scrape les annuaires fédéraux via Firecrawl et upsert dans clubs_enriched.
// Pour la v1: support de la FFF (Football). Architecture extensible aux autres fédés.

import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const FIRECRAWL_BASE = 'https://api.firecrawl.dev/v2';

interface FederationConfig {
  code: string;
  name: string;
  discipline: string;
  /** URL annuaire de départ pour map (sitemap-like). */
  mapUrl: string;
  /** Filtre pour ne garder que les URLs de fiches club. */
  urlFilter: (url: string) => boolean;
  /** Schéma JSON d'extraction (Firecrawl json format). */
  extractionPrompt: string;
}

const CONFIGS: Record<string, FederationConfig> = {
  FFF: {
    code: 'FFF',
    name: 'Fédération Française de Football',
    discipline: 'football',
    mapUrl: 'https://www.fff.fr/recherche-club.html',
    urlFilter: (u) => /\/club\//.test(u) || /fiche-club/.test(u),
    extractionPrompt:
      "Extrais les informations du club de football sur cette page: nom du club, adresse complète, code postal, ville, téléphone, email, site web officiel. Retourne null pour les champs absents.",
  },
};

const EXTRACTION_SCHEMA = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    address: { type: 'string' },
    postal_code: { type: 'string' },
    city: { type: 'string' },
    phone: { type: 'string' },
    email: { type: 'string' },
    website: { type: 'string' },
  },
};

async function firecrawlMap(apiKey: string, url: string, search?: string, limit = 50) {
  const res = await fetch(`${FIRECRAWL_BASE}/map`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, search, limit, includeSubdomains: false }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Firecrawl map failed [${res.status}]: ${JSON.stringify(data)}`);
  return data;
}

async function firecrawlScrape(apiKey: string, url: string, prompt: string) {
  const res = await fetch(`${FIRECRAWL_BASE}/scrape`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      formats: [{ type: 'json', schema: EXTRACTION_SCHEMA, prompt }],
      onlyMainContent: true,
      waitFor: 1500,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Firecrawl scrape failed [${res.status}]: ${JSON.stringify(data)}`);
  return data;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    if (!FIRECRAWL_API_KEY) throw new Error('FIRECRAWL_API_KEY is not configured');

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!SUPABASE_URL || !SERVICE_ROLE) throw new Error('Supabase env not configured');

    // Admin-only: require the caller to authenticate with the service role key.
    const authHeader = req.headers.get('Authorization') ?? '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    if (!token || token !== SERVICE_ROLE) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    // Lire les params (POST json {federation, search, limit} ou query string)
    let federationCode = 'FFF';
    let search: string | undefined;
    let limit = 20;
    if (req.method === 'POST') {
      const body = await req.json().catch(() => ({}));
      federationCode = body.federation || federationCode;
      search = body.search;
      limit = Math.min(Number(body.limit) || limit, 50);
    } else {
      const u = new URL(req.url);
      federationCode = u.searchParams.get('federation') || federationCode;
      search = u.searchParams.get('search') || undefined;
      limit = Math.min(Number(u.searchParams.get('limit')) || limit, 50);
    }

    if (req.method === 'POST') {
      const body = await req.json().catch(() => ({}));
      federationCode = body.federation || federationCode;
      search = body.search;
      limit = body.limit || limit;
    } else {
      const u = new URL(req.url);
      federationCode = u.searchParams.get('federation') || federationCode;
      search = u.searchParams.get('search') || undefined;
      limit = Number(u.searchParams.get('limit')) || limit;
    }

    const config = CONFIGS[federationCode];
    if (!config) throw new Error(`Federation non supportée: ${federationCode}`);

    console.log(`[scrape-federation] Start ${federationCode}, search="${search}", limit=${limit}`);

    // 1. Map: découvrir les URLs des fiches club
    const mapRes = await firecrawlMap(FIRECRAWL_API_KEY, config.mapUrl, search, limit * 3);
    const allLinks: string[] = mapRes.links || mapRes.data?.links || [];
    const clubUrls = allLinks.filter(config.urlFilter).slice(0, limit);

    console.log(`[scrape-federation] Found ${clubUrls.length} club URLs (out of ${allLinks.length} total)`);

    // 2. Scrape chaque fiche en parallèle limité
    const results = [];
    for (const url of clubUrls) {
      try {
        const scrape = await firecrawlScrape(FIRECRAWL_API_KEY, url, config.extractionPrompt);
        const json = scrape.data?.json || scrape.json;
        if (!json || !json.name) continue;

        const { error } = await supabase
          .from('clubs_enriched')
          .upsert(
            {
              federation_code: config.code,
              name: json.name,
              discipline: config.discipline,
              address: json.address,
              postal_code: json.postal_code,
              city: json.city,
              phone: json.phone,
              email: json.email,
              website: json.website,
              source_url: url,
              raw: json,
              scraped_at: new Date().toISOString(),
            },
            { onConflict: 'federation_code,source_url' },
          );
        if (error) {
          console.error(`[scrape-federation] upsert error for ${url}:`, error.message);
        } else {
          results.push({ url, name: json.name });
        }
      } catch (err) {
        console.error(`[scrape-federation] scrape error for ${url}:`, (err as Error).message);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        federation: federationCode,
        scanned: clubUrls.length,
        inserted: results.length,
        sample: results.slice(0, 5),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('[scrape-federation] fatal:', err);
    return new Response(
      JSON.stringify({ success: false, error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
