// Mapping discipline → fédération + générateurs d'URL d'annuaire officiel.
// Permet de proposer aux utilisateurs un lien direct vers l'annuaire
// fédéral pour trouver l'exhaustivité des clubs d'une discipline.

export interface FederationSource {
  code: string;
  name: string;
  icon: string;
  /** Construit l'URL de recherche d'annuaire, optionnellement filtrée par ville/CP. */
  buildSearchUrl: (query?: { city?: string; postalCode?: string }) => string;
}

export const federationSources: Record<string, FederationSource> = {
  FFF: {
    code: 'FFF',
    name: 'Fédération Française de Football',
    icon: '⚽',
    buildSearchUrl: ({ city, postalCode } = {}) =>
      `https://www.fff.fr/recherche-club.html?q=${encodeURIComponent(postalCode || city || '')}`,
  },
  FFT: {
    code: 'FFT',
    name: 'Fédération Française de Tennis',
    icon: '🎾',
    buildSearchUrl: ({ city, postalCode } = {}) =>
      `https://tenup.fft.fr/recherche/clubs?q=${encodeURIComponent(postalCode || city || '')}`,
  },
  FFR: {
    code: 'FFR',
    name: 'Fédération Française de Rugby',
    icon: '🏉',
    buildSearchUrl: ({ city, postalCode } = {}) =>
      `https://www.ffr.fr/ffr/le-rugby/trouver-un-club?search=${encodeURIComponent(postalCode || city || '')}`,
  },
  FFVL: {
    code: 'FFVL',
    name: 'Fédération Française de Vol Libre',
    icon: '🪂',
    buildSearchUrl: () => 'https://federation.ffvl.fr/pages/structures',
  },
  FFN: {
    code: 'FFN',
    name: 'Fédération Française de Natation',
    icon: '🏊',
    buildSearchUrl: ({ city, postalCode } = {}) =>
      `https://www.ffnatation.fr/clubs?q=${encodeURIComponent(postalCode || city || '')}`,
  },
  FFBaD: {
    code: 'FFBaD',
    name: 'Fédération Française de Badminton',
    icon: '🏸',
    buildSearchUrl: ({ city, postalCode } = {}) =>
      `https://www.ffbad.org/pratiquer/trouver-un-club?q=${encodeURIComponent(postalCode || city || '')}`,
  },
};

/**
 * Associe une discipline (par id ou nom) à la fédération qui en tient l'annuaire officiel.
 * Plusieurs disciplines/sous-disciplines peuvent pointer vers la même fédération.
 */
const DISCIPLINE_TO_FEDERATION: Record<string, string> = {
  // Football
  football: 'FFF', 'football-11': 'FFF', 'football-7': 'FFF', 'football-5': 'FFF',
  futsal: 'FFF', 'beach-soccer': 'FFF', 'football-feminin': 'FFF',
  // Tennis
  tennis: 'FFT', 'tennis-simple': 'FFT', 'tennis-double': 'FFT',
  padel: 'FFT', 'beach-tennis': 'FFT',
  // Rugby
  rugby: 'FFR', 'rugby-15': 'FFR', 'rugby-7': 'FFR', 'rugby-13': 'FFR',
  'touch-rugby': 'FFR', 'beach-rugby': 'FFR', 'rugby-feminin': 'FFR',
  // Vol libre
  parapente: 'FFVL', 'deltaplane': 'FFVL', 'cerf-volant': 'FFVL', 'kite': 'FFVL',
  'vol-libre': 'FFVL',
  // Natation
  natation: 'FFN', 'natation-sportive': 'FFN', 'natation-synchronisee': 'FFN',
  'water-polo': 'FFN', 'plongeon': 'FFN', 'eau-libre': 'FFN',
  // Badminton
  badminton: 'FFBaD',
};

export function getFederationForDiscipline(disciplineId?: string): FederationSource | null {
  if (!disciplineId) return null;
  const code = DISCIPLINE_TO_FEDERATION[disciplineId];
  return code ? federationSources[code] : null;
}
