
ALTER VIEW public.clubs_enriched_public SET (security_invoker=on);

-- Allow anon to SELECT from the base table (the view filters out sensitive columns).
-- Direct queries to clubs_enriched from anon will still expose phone/email, so we
-- also revoke direct table SELECT from anon and only grant SELECT on the safe columns.
REVOKE SELECT ON public.clubs_enriched FROM anon;
GRANT SELECT (id, federation_code, external_id, name, discipline,
              address, postal_code, city, region, latitude, longitude,
              website, source_url, scraped_at, created_at, updated_at)
  ON public.clubs_enriched TO anon;

CREATE POLICY "Anon read non-sensitive clubs_enriched"
  ON public.clubs_enriched FOR SELECT
  TO anon
  USING (true);
