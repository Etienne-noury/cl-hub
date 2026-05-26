// Clubs enrichis depuis les annuaires fédéraux (Firecrawl + DB Lovable Cloud).
// Complète l'API gouvernementale equipements-sportifs en apportant les
// contacts (tél, email, site) et l'affiliation fédérale officielle.

import { supabase } from '@/integrations/supabase/client';
import type { Club } from '@/data/clubs';
import { disciplines } from '@/data/disciplines';

export interface EnrichedClubRow {
  id: string;
  federation_code: string;
  name: string;
  discipline: string | null;
  address: string | null;
  postal_code: string | null;
  city: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  source_url: string;
}

function rowToClub(r: EnrichedClubRow): Club {
  const d = disciplines.find((x) => x.id === r.discipline);
  return {
    id: `fed:${r.id}`,
    name: r.name,
    discipline: r.discipline ?? 'multisport',
    disciplineName: d?.name ?? r.discipline ?? 'Multisport',
    address: r.address ?? '',
    city: r.city ?? '',
    postalCode: r.postal_code ?? '',
    region: r.region ?? '',
    phone: r.phone ?? '',
    email: r.email ?? '',
    level: 'loisir',
    licensePrice: { adult: 0, child: 0 },
    coordinates: { lat: r.latitude ?? 0, lng: r.longitude ?? 0 },
    rating: 0,
    reviewCount: 0,
    description: `Club affilié ${r.federation_code}.${r.website ? ` Site officiel : ${r.website}` : ''}`,
    amenities: [],
  };
}

export interface FetchEnrichedParams {
  q?: string;
  discipline?: string;
  limit?: number;
}

export async function fetchEnrichedClubs(params: FetchEnrichedParams = {}): Promise<Club[]> {
  const { q, discipline, limit = 30 } = params;
  let query = supabase.from('clubs_enriched').select('*').limit(limit);

  if (discipline && discipline !== 'all') {
    query = query.eq('discipline', discipline);
  }
  if (q && q.trim()) {
    const safe = q.trim();
    query = query.or(`name.ilike.%${safe}%,city.ilike.%${safe}%,postal_code.ilike.%${safe}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error('[fetchEnrichedClubs]', error.message);
    return [];
  }
  return (data as EnrichedClubRow[]).map(rowToClub);
}
