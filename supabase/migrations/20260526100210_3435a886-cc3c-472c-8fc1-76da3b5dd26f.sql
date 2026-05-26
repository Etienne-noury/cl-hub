
CREATE TABLE public.clubs_enriched (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  federation_code text NOT NULL,
  external_id text,
  name text NOT NULL,
  discipline text,
  address text,
  postal_code text,
  city text,
  region text,
  latitude double precision,
  longitude double precision,
  phone text,
  email text,
  website text,
  source_url text NOT NULL,
  raw jsonb,
  scraped_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (federation_code, source_url)
);

CREATE INDEX idx_clubs_enriched_fed ON public.clubs_enriched (federation_code);
CREATE INDEX idx_clubs_enriched_city ON public.clubs_enriched (city);
CREATE INDEX idx_clubs_enriched_discipline ON public.clubs_enriched (discipline);
CREATE INDEX idx_clubs_enriched_postal ON public.clubs_enriched (postal_code);

ALTER TABLE public.clubs_enriched ENABLE ROW LEVEL SECURITY;

-- Public annuaire: lecture ouverte
CREATE POLICY "Public read clubs_enriched"
  ON public.clubs_enriched FOR SELECT
  USING (true);

-- Pas de policy d'écriture: seul le service role (edge function) peut insérer/maj
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trg_clubs_enriched_updated
BEFORE UPDATE ON public.clubs_enriched
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
