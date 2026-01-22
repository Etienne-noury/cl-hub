export interface Club {
  id: string;
  name: string;
  discipline: string;
  disciplineName: string;
  address: string;
  city: string;
  postalCode: string;
  region: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  level: 'loisir' | 'competition-regionale' | 'competition-nationale' | 'elite';
  licensePrice: {
    adult: number;
    child: number;
    senior?: number;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  reviewCount: number;
  description: string;
  schedule?: string[];
  amenities?: string[];
}

export const levels = {
  'loisir': { name: 'Loisir', color: 'bg-green-500', stars: 1 },
  'competition-regionale': { name: 'Compétition Régionale', color: 'bg-blue-500', stars: 2 },
  'competition-nationale': { name: 'Compétition Nationale', color: 'bg-orange-500', stars: 3 },
  'elite': { name: 'Élite', color: 'bg-accent', stars: 4 },
};

export const regions = [
  'Île-de-France',
  'Auvergne-Rhône-Alpes',
  'Nouvelle-Aquitaine',
  'Occitanie',
  'Provence-Alpes-Côte d\'Azur',
  'Hauts-de-France',
  'Grand Est',
  'Bretagne',
  'Pays de la Loire',
  'Normandie',
  'Bourgogne-Franche-Comté',
  'Centre-Val de Loire',
  'Corse',
];

export const clubs: Club[] = [
  // Football clubs
  {
    id: 'psg-football',
    name: 'Paris Saint-Germain FC Amateur',
    discipline: 'football',
    disciplineName: 'Football',
    address: '24 Rue du Commandant Guilbaud',
    city: 'Paris',
    postalCode: '75016',
    region: 'Île-de-France',
    phone: '01 47 43 71 71',
    email: 'contact@psg-amateur.fr',
    website: 'https://www.psg.fr',
    level: 'elite',
    licensePrice: { adult: 450, child: 280, senior: 320 },
    coordinates: { lat: 48.8416, lng: 2.2530 },
    rating: 4.8,
    reviewCount: 234,
    description: 'Section amateur du célèbre club parisien, offrant une formation de haut niveau pour tous les âges.',
    schedule: ['Lundi 18h-20h', 'Mercredi 14h-17h', 'Samedi 9h-12h'],
    amenities: ['Vestiaires', 'Terrain synthétique', 'Parking'],
  },
  {
    id: 'olympique-marseille-loisir',
    name: 'OM Loisir Marseille',
    discipline: 'football',
    disciplineName: 'Football',
    address: '33 Traverse de la Martine',
    city: 'Marseille',
    postalCode: '13012',
    region: 'Provence-Alpes-Côte d\'Azur',
    phone: '04 91 76 56 09',
    email: 'contact@om-loisir.fr',
    level: 'loisir',
    licensePrice: { adult: 180, child: 120 },
    coordinates: { lat: 43.3063, lng: 5.4758 },
    rating: 4.2,
    reviewCount: 89,
    description: 'Club convivial pour pratiquer le football en loisir dans une ambiance OM.',
    schedule: ['Mardi 19h-21h', 'Jeudi 19h-21h'],
    amenities: ['Vestiaires', 'Buvette'],
  },
  {
    id: 'fc-lyon-jeunes',
    name: 'FC Lyon Jeunes',
    discipline: 'football',
    disciplineName: 'Football',
    address: '10 Avenue Jean Mermoz',
    city: 'Lyon',
    postalCode: '69008',
    region: 'Auvergne-Rhône-Alpes',
    phone: '04 78 74 56 78',
    email: 'jeunes@fclyon.fr',
    level: 'competition-regionale',
    licensePrice: { adult: 280, child: 180 },
    coordinates: { lat: 45.7367, lng: 4.8710 },
    rating: 4.5,
    reviewCount: 156,
    description: 'Formation de qualité pour les jeunes footballeurs lyonnais.',
    schedule: ['Mercredi 14h-17h', 'Samedi 10h-12h'],
    amenities: ['Vestiaires', 'Terrain gazon', 'Salle de musculation'],
  },

  // Tennis clubs
  {
    id: 'tc-paris-16',
    name: 'Tennis Club Paris 16ème',
    discipline: 'tennis',
    disciplineName: 'Tennis',
    address: '2 Avenue Gordon Bennett',
    city: 'Paris',
    postalCode: '75016',
    region: 'Île-de-France',
    phone: '01 46 51 68 68',
    email: 'contact@tcparis16.fr',
    website: 'https://www.tcparis16.fr',
    level: 'competition-nationale',
    licensePrice: { adult: 650, child: 380, senior: 480 },
    coordinates: { lat: 48.8527, lng: 2.2597 },
    rating: 4.7,
    reviewCount: 312,
    description: 'Club historique parisien avec des courts en terre battue de qualité exceptionnelle.',
    schedule: ['Tous les jours 8h-22h'],
    amenities: ['12 courts terre battue', 'Club house', 'Pro shop', 'Restaurant'],
  },
  {
    id: 'tc-nice-mediterranee',
    name: 'TC Nice Méditerranée',
    discipline: 'tennis',
    disciplineName: 'Tennis',
    address: '5 Parc Impérial',
    city: 'Nice',
    postalCode: '06000',
    region: 'Provence-Alpes-Côte d\'Azur',
    phone: '04 93 21 42 42',
    email: 'tennis@nice-med.fr',
    level: 'competition-regionale',
    licensePrice: { adult: 420, child: 250 },
    coordinates: { lat: 43.7076, lng: 7.2548 },
    rating: 4.4,
    reviewCount: 178,
    description: 'Jouez au tennis avec vue sur la Méditerranée.',
    schedule: ['Lundi-Vendredi 7h-21h', 'Weekend 8h-20h'],
    amenities: ['8 courts', 'Piscine', 'Terrasse'],
  },

  // Natation clubs
  {
    id: 'cn-marseille',
    name: 'Cercle des Nageurs de Marseille',
    discipline: 'natation',
    disciplineName: 'Natation',
    address: 'Plage du Prado',
    city: 'Marseille',
    postalCode: '13008',
    region: 'Provence-Alpes-Côte d\'Azur',
    phone: '04 91 76 10 10',
    email: 'info@cnmarseille.fr',
    website: 'https://www.cnmarseille.com',
    level: 'elite',
    licensePrice: { adult: 520, child: 320, senior: 380 },
    coordinates: { lat: 43.2632, lng: 5.3795 },
    rating: 4.9,
    reviewCount: 445,
    description: 'Club mythique ayant formé de nombreux champions olympiques.',
    schedule: ['Lundi-Vendredi 6h-21h', 'Weekend 7h-19h'],
    amenities: ['Bassin olympique', 'Fosse à plongée', 'Salle fitness', 'Spa'],
  },
  {
    id: 'aqua-rennes',
    name: 'Aqua Club Rennes',
    discipline: 'natation',
    disciplineName: 'Natation',
    address: '12 Rue de la Piscine',
    city: 'Rennes',
    postalCode: '35000',
    region: 'Bretagne',
    phone: '02 99 67 89 45',
    email: 'contact@aqua-rennes.fr',
    level: 'loisir',
    licensePrice: { adult: 180, child: 120 },
    coordinates: { lat: 48.1147, lng: -1.6794 },
    rating: 4.1,
    reviewCount: 67,
    description: 'Club familial pour apprendre à nager ou se perfectionner.',
    schedule: ['Mardi 18h-20h', 'Jeudi 18h-20h', 'Samedi 10h-12h'],
    amenities: ['Bassin 25m', 'Petit bassin'],
  },

  // Judo clubs
  {
    id: 'judo-club-paris',
    name: 'Judo Club de Paris',
    discipline: 'judo',
    disciplineName: 'Judo',
    address: '7 Rue des Martyrs',
    city: 'Paris',
    postalCode: '75009',
    region: 'Île-de-France',
    phone: '01 45 26 34 56',
    email: 'dojo@judoclubparis.fr',
    level: 'competition-nationale',
    licensePrice: { adult: 380, child: 220 },
    coordinates: { lat: 48.8782, lng: 2.3398 },
    rating: 4.6,
    reviewCount: 198,
    description: 'Dojo traditionnel formant des judokas de tous niveaux depuis 1952.',
    schedule: ['Lundi/Mercredi/Vendredi 18h-21h', 'Samedi 10h-12h'],
    amenities: ['Tatami 200m²', 'Vestiaires', 'Sauna'],
  },

  // Basketball clubs
  {
    id: 'basket-nanterre',
    name: 'Nanterre 92 Basketball',
    discipline: 'basketball',
    disciplineName: 'Basketball',
    address: '88 Avenue Joliot Curie',
    city: 'Nanterre',
    postalCode: '92000',
    region: 'Île-de-France',
    phone: '01 47 21 65 43',
    email: 'contact@nanterre92.com',
    website: 'https://www.nanterre92.com',
    level: 'elite',
    licensePrice: { adult: 350, child: 200 },
    coordinates: { lat: 48.8924, lng: 2.2065 },
    rating: 4.7,
    reviewCount: 267,
    description: 'Club professionnel avec une section amateur très active.',
    schedule: ['Mardi/Jeudi 18h-21h', 'Samedi 14h-17h'],
    amenities: ['Gymnase moderne', 'Salle musculation', 'Vidéo analyse'],
  },

  // Padel clubs
  {
    id: 'padel-bordeaux',
    name: 'Bordeaux Padel Club',
    discipline: 'padel',
    disciplineName: 'Padel',
    address: '45 Quai de Bacalan',
    city: 'Bordeaux',
    postalCode: '33300',
    region: 'Nouvelle-Aquitaine',
    phone: '05 56 78 90 12',
    email: 'reservation@bordeaux-padel.fr',
    level: 'loisir',
    licensePrice: { adult: 280, child: 150 },
    coordinates: { lat: 44.8637, lng: -0.5503 },
    rating: 4.5,
    reviewCount: 134,
    description: 'Le padel à Bordeaux dans une ambiance conviviale.',
    schedule: ['Tous les jours 9h-23h'],
    amenities: ['6 courts indoor', 'Bar lounge', 'Pro shop'],
  },

  // Équitation clubs
  {
    id: 'centre-equestre-fontainebleau',
    name: 'Centre Équestre de Fontainebleau',
    discipline: 'equitation',
    disciplineName: 'Équitation',
    address: 'Route de la Croix du Grand Veneur',
    city: 'Fontainebleau',
    postalCode: '77300',
    region: 'Île-de-France',
    phone: '01 64 22 35 67',
    email: 'contact@ce-fontainebleau.fr',
    level: 'competition-nationale',
    licensePrice: { adult: 1200, child: 850 },
    coordinates: { lat: 48.4071, lng: 2.7013 },
    rating: 4.8,
    reviewCount: 289,
    description: 'Centre équestre d\'exception au cœur de la forêt de Fontainebleau.',
    schedule: ['Mardi-Dimanche 8h-18h'],
    amenities: ['50 boxes', '2 manèges', 'Carrière', 'Club house'],
  },

  // Yoga clubs
  {
    id: 'yoga-studio-lyon',
    name: 'Yoga Studio Lyon',
    discipline: 'yoga',
    disciplineName: 'Yoga',
    address: '18 Rue de la République',
    city: 'Lyon',
    postalCode: '69002',
    region: 'Auvergne-Rhône-Alpes',
    phone: '04 72 56 78 90',
    email: 'namaste@yogastudiolyon.fr',
    level: 'loisir',
    licensePrice: { adult: 450, child: 0, senior: 350 },
    coordinates: { lat: 45.7640, lng: 4.8357 },
    rating: 4.9,
    reviewCount: 412,
    description: 'Studio lumineux proposant yoga, méditation et bien-être.',
    schedule: ['Lundi-Vendredi 7h-21h', 'Weekend 9h-18h'],
    amenities: ['2 salles', 'Vestiaires', 'Tisanerie', 'Boutique'],
  },

  // Escalade
  {
    id: 'vertical-art-nantes',
    name: 'Vertical\'Art Nantes',
    discipline: 'escalade',
    disciplineName: 'Escalade',
    address: '15 Boulevard de la Prairie au Duc',
    city: 'Nantes',
    postalCode: '44200',
    region: 'Pays de la Loire',
    phone: '02 40 89 67 54',
    email: 'nantes@vertical-art.fr',
    level: 'loisir',
    licensePrice: { adult: 320, child: 220 },
    coordinates: { lat: 47.2066, lng: -1.5650 },
    rating: 4.6,
    reviewCount: 223,
    description: 'Salle d\'escalade moderne avec bloc et voies.',
    schedule: ['Lundi-Vendredi 10h-23h', 'Weekend 9h-20h'],
    amenities: ['800m² de grimpe', 'Yoga', 'Bar', 'Sauna'],
  },

  // Running / Trail
  {
    id: 'trail-chamonix',
    name: 'Chamonix Trail Running Club',
    discipline: 'trail',
    disciplineName: 'Trail running',
    address: '190 Place de l\'Église',
    city: 'Chamonix-Mont-Blanc',
    postalCode: '74400',
    region: 'Auvergne-Rhône-Alpes',
    phone: '04 50 53 45 67',
    email: 'contact@chamonix-trail.fr',
    level: 'competition-nationale',
    licensePrice: { adult: 150, child: 80 },
    coordinates: { lat: 45.9237, lng: 6.8694 },
    rating: 4.8,
    reviewCount: 156,
    description: 'Club de trail au pied du Mont-Blanc.',
    schedule: ['Mercredi 18h', 'Samedi 8h'],
    amenities: ['Parcours balisés', 'Coaching', 'Stages'],
  },
];

export const getClubsByDiscipline = (discipline: string) => 
  clubs.filter(c => c.discipline === discipline);

export const getClubsByRegion = (region: string) => 
  clubs.filter(c => c.region === region);

export const getClubById = (id: string) => 
  clubs.find(c => c.id === id);

export const searchClubs = (query: string) => {
  const q = query.toLowerCase();
  return clubs.filter(c => 
    c.name.toLowerCase().includes(q) ||
    c.city.toLowerCase().includes(q) ||
    c.discipline.toLowerCase().includes(q) ||
    c.disciplineName.toLowerCase().includes(q)
  );
};
