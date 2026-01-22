export interface Discipline {
  id: string;
  name: string;
  category: 'collectif' | 'individuel' | 'aquatique' | 'combat' | 'raquette' | 'nature' | 'fitness' | 'autre';
  icon: string;
  description: string;
  popularity: number; // 1-10
  clubCount: number;
}

export const categories = {
  collectif: { name: 'Sports collectifs', color: 'bg-primary' },
  individuel: { name: 'Sports individuels', color: 'bg-accent' },
  aquatique: { name: 'Sports aquatiques', color: 'bg-blue-400' },
  combat: { name: 'Arts martiaux & Combat', color: 'bg-orange-500' },
  raquette: { name: 'Sports de raquette', color: 'bg-green-500' },
  nature: { name: 'Sports nature', color: 'bg-emerald-600' },
  fitness: { name: 'Fitness & Bien-être', color: 'bg-pink-500' },
  autre: { name: 'Autres sports', color: 'bg-gray-500' },
};

export const disciplines: Discipline[] = [
  // Sports collectifs
  { id: 'football', name: 'Football', category: 'collectif', icon: '⚽', description: 'Le sport le plus populaire en France avec plus de 2 millions de licenciés.', popularity: 10, clubCount: 14500 },
  { id: 'basketball', name: 'Basketball', category: 'collectif', icon: '🏀', description: 'Sport dynamique pratiqué en salle avec 5 joueurs par équipe.', popularity: 8, clubCount: 4200 },
  { id: 'handball', name: 'Handball', category: 'collectif', icon: '🤾', description: 'Sport collectif où la France excelle au niveau international.', popularity: 8, clubCount: 2400 },
  { id: 'rugby', name: 'Rugby', category: 'collectif', icon: '🏉', description: 'Sport de contact emblématique du sud-ouest français.', popularity: 7, clubCount: 1900 },
  { id: 'volleyball', name: 'Volleyball', category: 'collectif', icon: '🏐', description: 'Sport d\'équipe pratiqué en salle ou sur plage.', popularity: 6, clubCount: 1600 },
  { id: 'hockey-gazon', name: 'Hockey sur gazon', category: 'collectif', icon: '🏑', description: 'Sport olympique pratiqué sur terrain synthétique.', popularity: 4, clubCount: 280 },
  { id: 'water-polo', name: 'Water-polo', category: 'collectif', icon: '🤽', description: 'Sport aquatique combinant natation et handball.', popularity: 4, clubCount: 320 },
  { id: 'baseball', name: 'Baseball', category: 'collectif', icon: '⚾', description: 'Sport de batte populaire en Amérique du Nord.', popularity: 3, clubCount: 180 },
  { id: 'softball', name: 'Softball', category: 'collectif', icon: '🥎', description: 'Variante du baseball avec une balle plus grosse.', popularity: 2, clubCount: 120 },
  { id: 'futsal', name: 'Futsal', category: 'collectif', icon: '⚽', description: 'Football en salle avec 5 joueurs par équipe.', popularity: 5, clubCount: 890 },
  
  // Sports individuels
  { id: 'athletisme', name: 'Athlétisme', category: 'individuel', icon: '🏃', description: 'Sport de base regroupant courses, sauts et lancers.', popularity: 7, clubCount: 2100 },
  { id: 'natation', name: 'Natation', category: 'aquatique', icon: '🏊', description: 'Sport aquatique complet accessible à tous les âges.', popularity: 9, clubCount: 1300 },
  { id: 'cyclisme', name: 'Cyclisme', category: 'individuel', icon: '🚴', description: 'Sport emblématique avec le Tour de France.', popularity: 7, clubCount: 2800 },
  { id: 'gymnastique', name: 'Gymnastique', category: 'individuel', icon: '🤸', description: 'Sport artistique combinant force, souplesse et grâce.', popularity: 6, clubCount: 1400 },
  { id: 'escalade', name: 'Escalade', category: 'nature', icon: '🧗', description: 'Sport de grimpe en salle ou en extérieur.', popularity: 6, clubCount: 850 },
  { id: 'ski', name: 'Ski alpin', category: 'nature', icon: '⛷️', description: 'Sport de glisse pratiqué en montagne.', popularity: 6, clubCount: 1100 },
  { id: 'patinage', name: 'Patinage artistique', category: 'individuel', icon: '⛸️', description: 'Sport élégant alliant technique et artistique.', popularity: 4, clubCount: 180 },
  { id: 'triathlon', name: 'Triathlon', category: 'individuel', icon: '🏊', description: 'Enchaînement natation, vélo et course à pied.', popularity: 5, clubCount: 780 },
  { id: 'golf', name: 'Golf', category: 'individuel', icon: '⛳', description: 'Sport de précision pratiqué sur parcours.', popularity: 5, clubCount: 720 },
  { id: 'equitation', name: 'Équitation', category: 'nature', icon: '🏇', description: '3ème fédération française en nombre de licenciés.', popularity: 8, clubCount: 8500 },
  
  // Arts martiaux & Combat
  { id: 'judo', name: 'Judo', category: 'combat', icon: '🥋', description: 'Art martial japonais très pratiqué en France.', popularity: 8, clubCount: 5600 },
  { id: 'karate', name: 'Karaté', category: 'combat', icon: '🥋', description: 'Art martial japonais basé sur les frappes.', popularity: 6, clubCount: 4200 },
  { id: 'taekwondo', name: 'Taekwondo', category: 'combat', icon: '🥋', description: 'Art martial coréen axé sur les coups de pied.', popularity: 5, clubCount: 850 },
  { id: 'boxe', name: 'Boxe anglaise', category: 'combat', icon: '🥊', description: 'Noble art du combat avec les poings.', popularity: 6, clubCount: 1200 },
  { id: 'boxe-francaise', name: 'Boxe française', category: 'combat', icon: '🥊', description: 'Savate, sport de combat français traditionnel.', popularity: 4, clubCount: 780 },
  { id: 'mma', name: 'MMA', category: 'combat', icon: '🥊', description: 'Arts martiaux mixtes en plein essor.', popularity: 5, clubCount: 450 },
  { id: 'aikido', name: 'Aïkido', category: 'combat', icon: '🥋', description: 'Art martial japonais non compétitif.', popularity: 4, clubCount: 1100 },
  { id: 'lutte', name: 'Lutte', category: 'combat', icon: '🤼', description: 'Sport de combat olympique ancestral.', popularity: 3, clubCount: 340 },
  { id: 'escrime', name: 'Escrime', category: 'combat', icon: '🤺', description: 'Sport d\'épée où la France excelle.', popularity: 5, clubCount: 780 },
  { id: 'jiu-jitsu', name: 'Jiu-jitsu brésilien', category: 'combat', icon: '🥋', description: 'Art martial au sol très technique.', popularity: 5, clubCount: 620 },
  
  // Sports de raquette
  { id: 'tennis', name: 'Tennis', category: 'raquette', icon: '🎾', description: '2ème sport le plus pratiqué en France.', popularity: 9, clubCount: 7800 },
  { id: 'badminton', name: 'Badminton', category: 'raquette', icon: '🏸', description: 'Sport de raquette rapide et technique.', popularity: 6, clubCount: 1900 },
  { id: 'tennis-table', name: 'Tennis de table', category: 'raquette', icon: '🏓', description: 'Ping-pong, sport accessible et populaire.', popularity: 6, clubCount: 4200 },
  { id: 'squash', name: 'Squash', category: 'raquette', icon: '🎾', description: 'Sport de raquette intense en salle.', popularity: 4, clubCount: 380 },
  { id: 'padel', name: 'Padel', category: 'raquette', icon: '🎾', description: 'Sport en plein essor mêlant tennis et squash.', popularity: 7, clubCount: 1200 },
  
  // Sports aquatiques
  { id: 'plongee', name: 'Plongée sous-marine', category: 'aquatique', icon: '🤿', description: 'Exploration des fonds marins.', popularity: 5, clubCount: 2200 },
  { id: 'surf', name: 'Surf', category: 'aquatique', icon: '🏄', description: 'Sport de glisse sur les vagues.', popularity: 6, clubCount: 480 },
  { id: 'voile', name: 'Voile', category: 'aquatique', icon: '⛵', description: 'Navigation à voile sportive ou loisir.', popularity: 6, clubCount: 980 },
  { id: 'kayak', name: 'Kayak', category: 'aquatique', icon: '🛶', description: 'Sport nautique en eau calme ou vive.', popularity: 5, clubCount: 720 },
  { id: 'aviron', name: 'Aviron', category: 'aquatique', icon: '🚣', description: 'Sport d\'endurance sur l\'eau.', popularity: 4, clubCount: 420 },
  { id: 'natation-synchronisee', name: 'Natation synchronisée', category: 'aquatique', icon: '🏊', description: 'Danse aquatique artistique.', popularity: 3, clubCount: 180 },
  
  // Sports nature
  { id: 'randonnee', name: 'Randonnée', category: 'nature', icon: '🥾', description: 'Marche sportive en pleine nature.', popularity: 7, clubCount: 3400 },
  { id: 'vtt', name: 'VTT', category: 'nature', icon: '🚵', description: 'Vélo tout terrain en nature.', popularity: 6, clubCount: 1800 },
  { id: 'alpinisme', name: 'Alpinisme', category: 'nature', icon: '🏔️', description: 'Ascension de sommets montagneux.', popularity: 4, clubCount: 380 },
  { id: 'ski-fond', name: 'Ski de fond', category: 'nature', icon: '🎿', description: 'Ski nordique d\'endurance.', popularity: 4, clubCount: 520 },
  { id: 'trail', name: 'Trail running', category: 'nature', icon: '🏃', description: 'Course à pied en pleine nature.', popularity: 6, clubCount: 890 },
  { id: 'tir-arc', name: 'Tir à l\'arc', category: 'nature', icon: '🏹', description: 'Sport de précision ancestral.', popularity: 5, clubCount: 1650 },
  
  // Fitness & Bien-être
  { id: 'yoga', name: 'Yoga', category: 'fitness', icon: '🧘', description: 'Pratique corps-esprit d\'origine indienne.', popularity: 7, clubCount: 4200 },
  { id: 'pilates', name: 'Pilates', category: 'fitness', icon: '🧘', description: 'Méthode de renforcement musculaire.', popularity: 6, clubCount: 2800 },
  { id: 'danse', name: 'Danse', category: 'fitness', icon: '💃', description: 'Expression artistique par le mouvement.', popularity: 7, clubCount: 6200 },
  { id: 'crossfit', name: 'CrossFit', category: 'fitness', icon: '🏋️', description: 'Entraînement fonctionnel haute intensité.', popularity: 6, clubCount: 780 },
  { id: 'musculation', name: 'Musculation', category: 'fitness', icon: '💪', description: 'Renforcement musculaire en salle.', popularity: 8, clubCount: 3500 },
  
  // Autres sports
  { id: 'petanque', name: 'Pétanque', category: 'autre', icon: '🎱', description: 'Sport traditionnel provençal.', popularity: 6, clubCount: 5800 },
  { id: 'billard', name: 'Billard', category: 'autre', icon: '🎱', description: 'Sport de précision sur table.', popularity: 4, clubCount: 890 },
  { id: 'bowling', name: 'Bowling', category: 'autre', icon: '🎳', description: 'Sport de quilles américain.', popularity: 4, clubCount: 420 },
  { id: 'flechettes', name: 'Fléchettes', category: 'autre', icon: '🎯', description: 'Sport de précision convivial.', popularity: 3, clubCount: 280 },
  { id: 'echecs', name: 'Échecs', category: 'autre', icon: '♟️', description: 'Sport cérébral millénaire.', popularity: 5, clubCount: 890 },
  { id: 'roller', name: 'Roller', category: 'autre', icon: '🛼', description: 'Sport de glisse urbain.', popularity: 4, clubCount: 580 },
  { id: 'skateboard', name: 'Skateboard', category: 'autre', icon: '🛹', description: 'Sport urbain olympique.', popularity: 5, clubCount: 420 },
];

export const getPopularDisciplines = (limit = 8) => 
  [...disciplines].sort((a, b) => b.popularity - a.popularity).slice(0, limit);

export const getDisciplinesByCategory = (category: string) => 
  disciplines.filter(d => d.category === category);

export const getDisciplineById = (id: string) => 
  disciplines.find(d => d.id === id);
