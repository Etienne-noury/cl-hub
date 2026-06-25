## Objectif
Permettre l'import de ~100 CSV de clubs sportifs (1 par département) dans `clubs_enriched` avec le minimum de crédits, via la page /admin existante.

## Problème actuel
Le projet possède une page /admin et une edge function `import-rna`, mais celle-ci tente de télécharger un ZIP de 400 Mo, incompatible avec les limites. L'utilisateur dispose déjà de fichiers CSV pré-filtrés par département.

## Plan

### 1. Ajouter un upload CSV côté client sur /admin
- Composant `CSVUploader` dans la page `/admin` : input file acceptant `.csv`
- Lecture du fichier avec `FileReader` + parsing avec `PapaParse` (CSV parser)
- Mapping des colonnes du CSV vers le schéma de `clubs_enriched` (champs requis : `federation_code`, `name`, `source_url`)
- Déduplication côté client par `external_id` ou combinaison `name + postal_code`

### 2. Insérer par batchs via Supabase client
- Upsert par lots de 500 lignes via `supabase.from('clubs_enriched').upsert()` avec `onConflict: 'external_id'`
- Affichage d'une barre de progression (fichier lu → lignes parsées → batchs envoyés)
- Gestion des erreurs par batch (ex: lignes invalides loggées, sans bloquer l'envoi des suivants)

### 3. Préparer le mapping CSV → Table
Le schéma `clubs_enriched` contient :
- `id` (auto)
- `federation_code` text not null
- `external_id` text
- `name` text not null
- `discipline` text
- `address`, `postal_code`, `city`, `region` text
- `latitude`, `longitude` double precision
- `phone`, `email`, `website`, `source_url` text
- `raw` jsonb
- `scraped_at`, `created_at`, `updated_at`

Le mapping attendra les colonnes standard (libre à l'utilisateur de renommer son CSV avant upload) :
| CSV (attendu) | Table |
|---|---|
| nom / name | name |
| federation / federation_code | federation_code |
| id / siren / external_id | external_id |
| adresse / address | address |
| code_postal / cp | postal_code |
| ville / city | city |
| region | region |
| discipline / activite | discipline |
| telephone / phone | phone |
| email | email |
| site_web / url | website |
| latitude / lat | latitude |
| longitude / lng | longitude |

### 4. Gérer les départements restants
- L'uploader sera réutilisable : l'utilisateur ouvre /admin, sélectionne un CSV (ex: dept_75.csv), l'importe, puis passe au suivant.
- Pour aller plus vite : ajouter un mode "multi-fichiers" (input `multiple`) qui traite les fichiers les uns après les autres en séquence.

### 5. Sécurité
- RLS `clubs_enriched` : l'upsert doit passer par `service_role` si l'utilisateur est admin, ou via une edge function si la page est publique.
- Solution simple : la page /admin n'est pas protégée par rôle aujourd'hui → soit on ajoute une vérification côté app, soit on expose une fonction RPC `admin_upsert_clubs` appelable uniquement par un utilisateur avec rôle `admin`.

## Livrables
- Nouveau composant `src/components/admin/CSVUploader.tsx`
- Modification de `src/pages/Admin.tsx`
- (Optionnel) Edge function `admin-bulk-upsert` si l'insertion directe côté client est bloquée par RLS

## Coût
- Aucun crédit IA consommé pendant l'import (le code tourne dans le navigateur de l'utilisateur)
- Seuls les appels Supabase Data API (upsert) sont comptés comme usage standard de la base

## Question technique
Quel outil utiliser ?
- `PapaParse` est léger et robuste pour parser des CSV de plusieurs milliers de lignes
- Les insertions se font via le client Supabase JS (déjà configuré dans le projet)
