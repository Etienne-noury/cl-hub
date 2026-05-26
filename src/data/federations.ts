export interface Federation {
  code: string;
  name: string;
  sport: string;
  access: string;
  url: string;
  type: 'api' | 'opendata' | 'annuaire';
  icon: string;
}

export const federations: Federation[] = [
  {
    code: 'FFF',
    name: 'Fédération Française de Football',
    sport: 'Football',
    access: 'API publique',
    url: 'https://api.fff.fr',
    type: 'api',
    icon: '⚽',
  },
  {
    code: 'FFT',
    name: 'Fédération Française de Tennis',
    sport: 'Tennis',
    access: 'Annuaire en ligne',
    url: 'https://tenup.fft.fr',
    type: 'annuaire',
    icon: '🎾',
  },
  {
    code: 'FFR',
    name: 'Fédération Française de Rugby',
    sport: 'Rugby',
    access: 'Annuaire clubs',
    url: 'https://www.ffr.fr/ffr/le-rugby/trouver-un-club',
    type: 'annuaire',
    icon: '🏉',
  },
  {
    code: 'FFVL',
    name: 'Fédération Française de Vol Libre',
    sport: 'Vol libre',
    access: 'Open data complet',
    url: 'https://data.ffvl.fr',
    type: 'opendata',
    icon: '🪂',
  },
  {
    code: 'FFN',
    name: 'Fédération Française de Natation',
    sport: 'Natation',
    access: 'Annuaire',
    url: 'https://www.ffnatation.fr',
    type: 'annuaire',
    icon: '🏊',
  },
  {
    code: 'FFBaD',
    name: 'Fédération Française de Badminton',
    sport: 'Badminton',
    access: 'API',
    url: 'https://www.ffbad.org',
    type: 'api',
    icon: '🏸',
  },
];
