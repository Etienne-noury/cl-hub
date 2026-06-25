-- Add unique constraint for upsert deduplication
CREATE UNIQUE INDEX IF NOT EXISTS clubs_enriched_fed_ext_uniq
  ON public.clubs_enriched (federation_code, external_id)
  WHERE external_id IS NOT NULL;