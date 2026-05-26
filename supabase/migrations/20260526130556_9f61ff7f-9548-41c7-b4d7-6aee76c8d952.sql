
CREATE TABLE public.clubs_foot (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data_es_id text UNIQUE NOT NULL,
  nom text NOT NULL,
  ville text,
  code_postal text,
  niveau_ligue text,
  prix_adulte numeric,
  prix_enfant numeric,
  site_web text,
  telephone text,
  horaires jsonb,
  google_rating numeric,
  google_nb_avis integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.clubs_foot ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read clubs_foot" ON public.clubs_foot FOR SELECT USING (true);

CREATE TRIGGER trg_clubs_foot_updated
BEFORE UPDATE ON public.clubs_foot
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_clubs_foot_ville ON public.clubs_foot (ville);
CREATE INDEX idx_clubs_foot_cp ON public.clubs_foot (code_postal);

CREATE TABLE public.clubs_foot_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data_es_id text NOT NULL,
  nom text,
  ville text,
  prix_adulte numeric,
  prix_enfant numeric,
  niveau_ligue text,
  horaires_text text,
  telephone text,
  site_web text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.clubs_foot_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit suggestions"
ON public.clubs_foot_suggestions FOR INSERT
WITH CHECK (status = 'pending');

CREATE INDEX idx_clubs_foot_suggestions_data_es_id ON public.clubs_foot_suggestions (data_es_id);
