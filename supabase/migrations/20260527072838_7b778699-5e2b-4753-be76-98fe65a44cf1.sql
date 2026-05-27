
-- Restrict clubs_enriched: hide phone, email, raw from public via a view
DROP POLICY IF EXISTS "Public read clubs_enriched" ON public.clubs_enriched;

CREATE POLICY "Authenticated read clubs_enriched"
  ON public.clubs_enriched FOR SELECT
  TO authenticated
  USING (true);

CREATE OR REPLACE VIEW public.clubs_enriched_public
WITH (security_invoker=on) AS
SELECT id, federation_code, external_id, name, discipline,
       address, postal_code, city, region, latitude, longitude,
       website, source_url, scraped_at, created_at, updated_at
FROM public.clubs_enriched;

GRANT SELECT ON public.clubs_enriched_public TO anon, authenticated;
GRANT SELECT ON public.clubs_enriched TO authenticated;

-- For the view to return rows to anon, we need a permissive SELECT on the base for anon
-- but limited to non-sensitive use. Since security_invoker=on requires base table access,
-- grant anon SELECT on base table but with a policy that only allows it (columns filtered by view usage is not enforced).
-- Better: use security_invoker=off so view bypasses RLS and only exposes safe columns.
DROP VIEW public.clubs_enriched_public;

CREATE VIEW public.clubs_enriched_public AS
SELECT id, federation_code, external_id, name, discipline,
       address, postal_code, city, region, latitude, longitude,
       website, source_url, scraped_at, created_at, updated_at
FROM public.clubs_enriched;

ALTER VIEW public.clubs_enriched_public SET (security_invoker=off);
GRANT SELECT ON public.clubs_enriched_public TO anon, authenticated;
