# Stratégie d'accès aux annuaires des 10 disciplines majeures

Objectif : pour chacune des 10 disciplines les plus pratiquées, identifier **la source la plus fiable** permettant de récupérer les informations détaillées d'un club (nom, adresse, GPS, contact, créneaux, tarifs, affiliation).

## 1. Cartographie des sources par fédération

| # | Discipline | Fédération | Source recommandée | Type d'accès | Données dispo |
|---|---|---|---|---|---|
| 1 | Football | FFF | `api-dofa.fff.fr` (API interne annuaire) | Scraping / reverse | Clubs, équipes, terrains |
| 2 | Tennis | FFT | `tenup.fft.fr/clubs` | Scraping HTML (pas d'API publique) | Clubs, courts, contacts |
| 3 | Équitation | FFE | `ffe.com/Rechercher-un-club` | Scraping + export CSV partiel | Centres équestres, disciplines |
| 4 | Basket | FFBB | `www.ffbb.com/clubs` | Scraping HTML | Clubs, salles, championnats |
| 5 | Handball | FFHB | `www.ffhandball.fr/fr/ffhandball/clubs` | Scraping | Clubs, gymnases |
| 6 | Judo | FFJDA | `www.ffjudo.com/trouver-un-club` | Scraping | Dojos, ceintures encadrants |
| 7 | Golf | FFGolf | `www.ffgolf.org/Jouer/Trouver-un-parcours` | Scraping (+ open data parcours) | Parcours, practice, green-fees |
| 8 | Natation | FFN | `ffnatation.fr/clubs` (extranet) | Scraping limité | Clubs, piscines |
| 9 | Rugby | FFR | `www.ffr.fr/.../trouver-un-club` | Scraping | Clubs, stades |
| 10 | Gymnastique | FFGym | `www.ffgym.fr/Pratiquer/Trouver-un-club` | Scraping | Clubs, agrès |

**Constat clé** : aucune de ces fédérations n'expose d'API publique ouverte sans clé. Seule **FFVL** (vol libre, hors top 10) propose un vrai open data. Pour le top 10, il faut combiner 3 approches.

## 2. Trois approches complémentaires

### Approche A — Socle open data (déjà en place)
Conserver `data.sports.gouv.fr` :
- **clubs_dep** : annuaire affiliation toutes fédés (limité : nom, commune, fédé, pas de contacts)
- **equipements-sportifs (RES)** : 270 000 équipements avec GPS, activités praticables

→ Couvre l'**existence** des clubs mais pas les détails (tarifs, créneaux, email).

### Approche B — Scraping ciblé via Firecrawl (recommandée)
Pour les 10 fédérations ci-dessus, utiliser **Firecrawl** (connecteur déjà disponible côté Lovable Cloud) :
1. `firecrawl.map(annuaire_url)` pour découvrir toutes les fiches club
2. `firecrawl.scrape(url, { formats: [{ type: 'json', schema }] })` pour extraire en JSON structuré (nom, adresse, tél, email, site, disciplines)
3. Stockage en base Lovable Cloud (`clubs_enriched`) avec `federation_code`, `source_url`, `scraped_at`

Avantages : pas besoin de clés fédérales, données fraîches, JSON normalisé.
Limites : coûte des crédits Firecrawl, à rafraîchir périodiquement, certains sites bloquent (FFT/Ten'Up est dynamique → `waitFor`).

### Approche C — Deep-links (fallback actuel)
Garder le système `federations-map.ts` existant pour les disciplines non scrapées ou en cas d'échec : renvoyer l'utilisateur vers l'annuaire officiel pré-filtré.

## 3. Architecture cible

```text
                  ┌─────────────────────────┐
   Recherche ───► │  clubs_enriched (DB)    │ ◄── Scraping Firecrawl
                  │  - source: gouv | fede  │      (edge function cron)
                  │  - federation_code      │
                  │  - lat/lng, contacts    │ ◄── data.sports.gouv (sync)
                  └─────────────────────────┘
                            │
                            ▼
                  Fusion par (nom + commune)
                            │
                            ▼
                  Carte / liste / fiche club
                            │
                            ▼
              Fallback : deep-link annuaire fédéral
```

## 4. Plan d'exécution proposé

1. **Activer la table `clubs_enriched`** dans Lovable Cloud (schéma unifié + index sur `federation_code`, `commune`, `discipline`).
2. **Créer une edge function `scrape-federation`** paramétrée par code fédé : map + scrape + upsert. Une fonction, 10 configs.
3. **Définir les 10 configs de scraping** (URL d'annuaire + schéma JSON d'extraction) dans `supabase/functions/scrape-federation/configs.ts`.
4. **Cron hebdomadaire** par fédération (éviter de tout scraper d'un coup, économise les crédits).
5. **Adapter `fetchClubs`** pour requêter `clubs_enriched` en priorité, retomber sur l'API gouv si vide.
6. **Enrichir la fiche club** (`/club/:id`) avec les nouveaux champs (email, tél, site, créneaux).
7. **Garder le bandeau deep-link** comme garantie d'exhaustivité.

## 5. Questions à trancher avant de coder

- **Budget Firecrawl** : ~10 000 pages × 10 fédés ≈ 100k crédits. OK pour démarrer sur les 3 plus grosses (Football, Tennis, Judo) ?
- **Périmètre v1** : on commence par combien de fédérations ? (recommandation : 3, puis itérer)
- **Légal/RGPD** : les annuaires fédéraux sont publics, mais le scraping massif demande un `robots.txt` check et un délai de courtoisie — à intégrer dans la fonction.
- **Fraîcheur** : hebdo suffit, ou besoin de temps réel ?

---

Dis-moi sur quelles fédérations tu veux qu'on commence (recommandation : Football, Tennis, Judo) et je lance la mise en place : table DB + edge function + premier scraper.
