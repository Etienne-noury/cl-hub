## Objectif

Construire un annuaire spécialisé Football qui combine 3 sources de données et permet aux utilisateurs de suggérer des mises à jour, en plus de l'annuaire générique existant.

## Architecture

### 1. Base de données — nouvelle table `clubs_foot`

```sql
clubs_foot
├── id (uuid, pk)
├── data_es_id (text, unique)        -- ID data.sports.gouv.fr (jointure)
├── nom (text)
├── ville (text)
├── code_postal (text)
├── niveau_ligue (text)              -- ex: "Régional 1", "Départemental"
├── prix_adulte (numeric)
├── prix_enfant (numeric)
├── site_web (text)
├── telephone (text)
├── horaires (jsonb)                 -- ex: { "lundi": "18h-20h", ... }
├── google_rating (numeric)
├── google_nb_avis (int)
├── updated_at (timestamptz)
└── created_at (timestamptz)
```

Plus une table `clubs_foot_suggestions` pour les soumissions utilisateurs (modération avant écriture dans `clubs_foot`) :

```sql
clubs_foot_suggestions
├── id, data_es_id, nom, ville
├── prix_adulte, prix_enfant, niveau_ligue
├── horaires_text, telephone, site_web
├── status ('pending' | 'approved' | 'rejected')
├── created_at
```

RLS :
- `clubs_foot` : lecture publique, écriture service_role uniquement.
- `clubs_foot_suggestions` : INSERT public (anonyme autorisé pour MVP), SELECT/UPDATE service_role.

### 2. Edge function `get-google-places`

Reçoit `{ clubNom, ville }`, appelle Google Places API (New) via le connecteur Google Maps déjà disponible :
1. `places:searchText` avec `"<clubNom> <ville> football"`
2. `places/{placeId}` pour récupérer `rating`, `userRatingCount`, `nationalPhoneNumber`, `websiteUri`, `regularOpeningHours`.

Renvoie `{ rating, user_ratings_total, formatted_phone_number, website, opening_hours }` (fallback gracieux : retourne `null` si Google ne trouve rien).

> Note : Le connecteur **Google Maps** doit être ajouté côté workspace. Si non connecté, je le proposerai après validation du plan.

### 3. Couche client

**`src/lib/api/foot.ts`** (nouveau) :
- `fetchFootClubsByVille(ville: string)` → appelle data.sports.gouv.fr directement (pas de clé).
- `enrichWithSupabase(clubs)` → fetch en batch depuis `clubs_foot` via `in('data_es_id', ids)`.
- `fetchGooglePlaces(nom, ville)` → invoke edge function.
- `submitSuggestion(payload)` → insert dans `clubs_foot_suggestions`.

**Combinaison** :
```
data.sports.gouv.fr (source 1)
  └─ left join clubs_foot on data_es_id (source 2 — prix, horaires, niveau)
  └─ on-demand fetch get-google-places (source 3 — rating, contact)
```

### 4. Pages & UI

**Nouvelle route `/football`** (séparée de l'annuaire générique pour ne pas casser l'existant) :

- **`/football`** — Hero avec barre de recherche (ville / code postal) + résultats sous forme de cartes (`FootClubCard`).
- **`/football/club/:dataEsId`** — Page détail avec toutes les sections :
  - Header (nom + badge niveau/ligue)
  - Mini-carte Google Maps embed (iframe simple, pas besoin du JS API)
  - Bloc Google (⭐ rating + nb avis)
  - Bloc tarifs licence (adulte/enfant)
  - Bloc horaires
  - Bloc contact (site, tel)
  - Bouton **« Suggérer une mise à jour »** → ouvre `SuggestUpdateDialog`

**Composants** :
- `src/pages/Football.tsx` — recherche + liste
- `src/pages/FootballClubDetail.tsx` — détail
- `src/components/foot/FootClubCard.tsx`
- `src/components/foot/SuggestUpdateDialog.tsx` (Dialog + react-hook-form + zod)
- `src/components/foot/GoogleMiniMap.tsx` (iframe embed avec `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY`)

**Header** : ajout d'un lien « Football » dans la nav.

### 5. Gestion d'erreurs

Chaque source est appelée indépendamment via `Promise.allSettled` :
- Source 1 KO → message « Service data.sports.gouv.fr indisponible »
- Source 2 KO → on garde les résultats source 1 sans enrichissement
- Source 3 KO → bloc Google masqué, le reste affiché

## Détails techniques

- Edge function `get-google-places` : `verify_jwt = false`, utilise le gateway Google Maps (`places/v1/places:searchText`).
- Suggestions stockées séparément pour éviter qu'un visiteur écrase la data officielle.
- `data_es_id` = `inst_numero` de data.sports.gouv.fr (identifiant stable).
- Le scraper FFF existant (`scrape-federation`) reste en place — non touché.
- Pas de modification de l'annuaire générique `/recherche`.

## Étapes d'implémentation

1. Migration : créer `clubs_foot` + `clubs_foot_suggestions` + RLS.
2. (Si nécessaire) Connecter le connecteur Google Maps.
3. Edge function `get-google-places`.
4. `src/lib/api/foot.ts` (3 sources + fallback).
5. Composants UI (`FootClubCard`, `SuggestUpdateDialog`, `GoogleMiniMap`).
6. Pages `Football.tsx` + `FootballClubDetail.tsx` + routes.
7. Lien « Football » dans le header.

## Hors scope

- Pas de back-office d'admin pour modérer les suggestions (à faire plus tard).
- Pas d'auth obligatoire pour suggérer (MVP — anonyme).
- Pas de scraping massif FFF dans cette itération (déjà couvert par `scrape-federation`).
