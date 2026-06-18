export interface Discipline {
  id: string;
  name: string;
  category: 'collectif' | 'individuel' | 'aquatique' | 'combat' | 'raquette' | 'nature' | 'fitness' | 'autre' | 'mecanique' | 'glisse' | 'precision';
  icon: string;
  description: string;
  popularity: number; // 1-10
  clubCount: number;
  parentId?: string; // For sub-disciplines/variants
}

export const categories = {
  collectif: { name: 'Sports collectifs', color: 'bg-primary' },
  individuel: { name: 'Sports individuels', color: 'bg-accent' },
  aquatique: { name: 'Sports aquatiques', color: 'bg-blue-400' },
  combat: { name: 'Arts martiaux & Combat', color: 'bg-orange-500' },
  raquette: { name: 'Sports de raquette', color: 'bg-green-500' },
  nature: { name: 'Sports nature', color: 'bg-emerald-600' },
  fitness: { name: 'Fitness & Bien-être', color: 'bg-pink-500' },
  glisse: { name: 'Sports de glisse', color: 'bg-cyan-500' },
  mecanique: { name: 'Sports mécaniques', color: 'bg-red-500' },
  precision: { name: 'Sports de précision', color: 'bg-purple-500' },
  autre: { name: 'Autres sports', color: 'bg-gray-500' },
};

export const disciplines: Discipline[] = [
  // ============================================
  // SPORTS COLLECTIFS
  // ============================================
  
  // Football et variantes
  { id: 'football', name: 'Football', category: 'collectif', icon: '⚽', description: 'Le sport le plus populaire en France avec plus de 2 millions de licenciés.', popularity: 10, clubCount: 14500 },
  { id: 'football-11', name: 'Football à 11', category: 'collectif', icon: '⚽', description: 'Format classique du football avec 11 joueurs par équipe.', popularity: 10, clubCount: 12000, parentId: 'football' },
  { id: 'football-7', name: 'Football à 7', category: 'collectif', icon: '⚽', description: 'Format réduit idéal pour les jeunes et le loisir.', popularity: 7, clubCount: 4500, parentId: 'football' },
  { id: 'football-5', name: 'Football à 5', category: 'collectif', icon: '⚽', description: 'Petit format dynamique, populaire en entreprise.', popularity: 6, clubCount: 2200, parentId: 'football' },
  { id: 'futsal', name: 'Futsal', category: 'collectif', icon: '⚽', description: 'Football en salle avec 5 joueurs par équipe, très technique.', popularity: 6, clubCount: 1890, parentId: 'football' },
  { id: 'beach-soccer', name: 'Beach Soccer', category: 'collectif', icon: '⚽', description: 'Football sur sable, spectaculaire et acrobatique.', popularity: 4, clubCount: 180, parentId: 'football' },
  { id: 'football-feminin', name: 'Football féminin', category: 'collectif', icon: '⚽', description: 'Section féminine en plein essor.', popularity: 7, clubCount: 3200, parentId: 'football' },

  // Rugby et variantes
  { id: 'rugby', name: 'Rugby', category: 'collectif', icon: '🏉', description: 'Sport de contact emblématique du sud-ouest français.', popularity: 8, clubCount: 1900 },
  { id: 'rugby-15', name: 'Rugby à XV', category: 'collectif', icon: '🏉', description: 'Format traditionnel avec 15 joueurs, le plus pratiqué.', popularity: 8, clubCount: 1700, parentId: 'rugby' },
  { id: 'rugby-7', name: 'Rugby à 7', category: 'collectif', icon: '🏉', description: 'Format olympique rapide et spectaculaire.', popularity: 6, clubCount: 850, parentId: 'rugby' },
  { id: 'rugby-13', name: 'Rugby à XIII', category: 'collectif', icon: '🏉', description: 'Rugby league, populaire dans le sud.', popularity: 4, clubCount: 320, parentId: 'rugby' },
  { id: 'touch-rugby', name: 'Touch Rugby', category: 'collectif', icon: '🏉', description: 'Rugby sans contact, mixte et accessible.', popularity: 4, clubCount: 280, parentId: 'rugby' },
  { id: 'beach-rugby', name: 'Beach Rugby', category: 'collectif', icon: '🏉', description: 'Rugby sur sable, convivial et estival.', popularity: 3, clubCount: 120, parentId: 'rugby' },
  { id: 'rugby-feminin', name: 'Rugby féminin', category: 'collectif', icon: '🏉', description: 'Section féminine en forte croissance.', popularity: 5, clubCount: 650, parentId: 'rugby' },

  // Basketball et variantes
  { id: 'basketball', name: 'Basketball', category: 'collectif', icon: '🏀', description: 'Sport dynamique pratiqué en salle avec 5 joueurs par équipe.', popularity: 8, clubCount: 4200 },
  { id: 'basketball-5x5', name: 'Basketball 5x5', category: 'collectif', icon: '🏀', description: 'Format classique en salle.', popularity: 8, clubCount: 3800, parentId: 'basketball' },
  { id: 'basketball-3x3', name: 'Basketball 3x3', category: 'collectif', icon: '🏀', description: 'Format olympique urbain et dynamique.', popularity: 6, clubCount: 1200, parentId: 'basketball' },
  { id: 'streetball', name: 'Streetball', category: 'collectif', icon: '🏀', description: 'Basketball de rue freestyle.', popularity: 5, clubCount: 450, parentId: 'basketball' },

  // Handball et variantes
  { id: 'handball', name: 'Handball', category: 'collectif', icon: '🤾', description: 'Sport collectif où la France excelle au niveau international.', popularity: 8, clubCount: 2400 },
  { id: 'handball-7', name: 'Handball à 7', category: 'collectif', icon: '🤾', description: 'Format classique en salle.', popularity: 8, clubCount: 2200, parentId: 'handball' },
  { id: 'beach-handball', name: 'Beach Handball', category: 'collectif', icon: '🤾', description: 'Handball sur sable, spectaculaire.', popularity: 3, clubCount: 180, parentId: 'handball' },
  { id: 'handball-loisir', name: 'Handball Loisir', category: 'collectif', icon: '🤾', description: 'Pratique détente sans compétition.', popularity: 5, clubCount: 890, parentId: 'handball' },

  // Volleyball et variantes
  { id: 'volleyball', name: 'Volleyball', category: 'collectif', icon: '🏐', description: 'Sport d\'équipe pratiqué en salle ou sur plage.', popularity: 6, clubCount: 1600 },
  { id: 'volleyball-6x6', name: 'Volleyball 6x6', category: 'collectif', icon: '🏐', description: 'Format classique en salle.', popularity: 6, clubCount: 1400, parentId: 'volleyball' },
  { id: 'beach-volley', name: 'Beach Volley', category: 'collectif', icon: '🏐', description: 'Volleyball sur sable à 2 contre 2.', popularity: 6, clubCount: 680, parentId: 'volleyball' },
  { id: 'volley-assis', name: 'Volley assis', category: 'collectif', icon: '🏐', description: 'Volleyball paralympique adapté.', popularity: 3, clubCount: 120, parentId: 'volleyball' },

  // Autres sports collectifs
  { id: 'hockey-gazon', name: 'Hockey sur gazon', category: 'collectif', icon: '🏑', description: 'Sport olympique pratiqué sur terrain synthétique.', popularity: 4, clubCount: 280 },
  { id: 'hockey-salle', name: 'Hockey en salle', category: 'collectif', icon: '🏑', description: 'Version indoor du hockey.', popularity: 3, clubCount: 180, parentId: 'hockey-gazon' },
  { id: 'hockey-glace', name: 'Hockey sur glace', category: 'collectif', icon: '🏒', description: 'Sport de glace rapide et spectaculaire.', popularity: 5, clubCount: 380 },
  { id: 'water-polo', name: 'Water-polo', category: 'aquatique', icon: '🤽', description: 'Sport aquatique combinant natation et handball.', popularity: 4, clubCount: 320 },
  { id: 'baseball', name: 'Baseball', category: 'collectif', icon: '⚾', description: 'Sport de batte populaire en Amérique du Nord.', popularity: 3, clubCount: 180 },
  { id: 'softball', name: 'Softball', category: 'collectif', icon: '🥎', description: 'Variante du baseball avec une balle plus grosse.', popularity: 2, clubCount: 120 },
  { id: 'lacrosse', name: 'Lacrosse', category: 'collectif', icon: '🥍', description: 'Sport de crosse d\'origine amérindienne.', popularity: 2, clubCount: 85 },
  { id: 'ultimate', name: 'Ultimate Frisbee', category: 'collectif', icon: '🥏', description: 'Sport de disque auto-arbitré.', popularity: 4, clubCount: 320 },
  { id: 'cricket', name: 'Cricket', category: 'collectif', icon: '🏏', description: 'Sport de batte britannique.', popularity: 2, clubCount: 65 },
  { id: 'roller-hockey-collectif', name: 'Roller Hockey', category: 'collectif', icon: '🏒', description: 'Hockey sur patins à roulettes.', popularity: 3, clubCount: 220 },
  { id: 'rink-hockey', name: 'Rink Hockey', category: 'collectif', icon: '🏒', description: 'Hockey sur patins traditionnel.', popularity: 2, clubCount: 140 },

  // ============================================
  // SPORTS INDIVIDUELS
  // ============================================
  
  // Athlétisme et variantes
  { id: 'athletisme', name: 'Athlétisme', category: 'individuel', icon: '🏃', description: 'Sport de base regroupant courses, sauts et lancers.', popularity: 7, clubCount: 2100 },
  { id: 'sprint', name: 'Sprint', category: 'individuel', icon: '🏃', description: 'Courses de vitesse (100m, 200m, 400m).', popularity: 6, clubCount: 1800, parentId: 'athletisme' },
  { id: 'demi-fond', name: 'Demi-fond', category: 'individuel', icon: '🏃', description: 'Courses de moyenne distance (800m, 1500m).', popularity: 5, clubCount: 1600, parentId: 'athletisme' },
  { id: 'fond', name: 'Fond', category: 'individuel', icon: '🏃', description: 'Courses de longue distance (5000m, 10000m, marathon).', popularity: 6, clubCount: 1800, parentId: 'athletisme' },
  { id: 'haies', name: 'Courses de haies', category: 'individuel', icon: '🏃', description: 'Sprint avec franchissement d\'obstacles.', popularity: 4, clubCount: 1200, parentId: 'athletisme' },
  { id: 'saut-hauteur', name: 'Saut en hauteur', category: 'individuel', icon: '🏃', description: 'Discipline de saut vertical.', popularity: 4, clubCount: 1100, parentId: 'athletisme' },
  { id: 'saut-longueur', name: 'Saut en longueur', category: 'individuel', icon: '🏃', description: 'Discipline de saut horizontal.', popularity: 4, clubCount: 1100, parentId: 'athletisme' },
  { id: 'triple-saut', name: 'Triple saut', category: 'individuel', icon: '🏃', description: 'Enchaînement cloche-pied, foulée bondissante, saut.', popularity: 3, clubCount: 800, parentId: 'athletisme' },
  { id: 'perche', name: 'Saut à la perche', category: 'individuel', icon: '🏃', description: 'Saut vertical avec perche.', popularity: 4, clubCount: 650, parentId: 'athletisme' },
  { id: 'lancer-poids', name: 'Lancer du poids', category: 'individuel', icon: '🏃', description: 'Lancer d\'engin lourd.', popularity: 3, clubCount: 900, parentId: 'athletisme' },
  { id: 'lancer-disque', name: 'Lancer du disque', category: 'individuel', icon: '🏃', description: 'Lancer rotatif du disque.', popularity: 3, clubCount: 850, parentId: 'athletisme' },
  { id: 'lancer-javelot', name: 'Lancer du javelot', category: 'individuel', icon: '🏃', description: 'Lancer du javelot en élan.', popularity: 3, clubCount: 750, parentId: 'athletisme' },
  { id: 'lancer-marteau', name: 'Lancer du marteau', category: 'individuel', icon: '🏃', description: 'Lancer rotatif du marteau.', popularity: 2, clubCount: 450, parentId: 'athletisme' },
  { id: 'decathlon', name: 'Décathlon', category: 'individuel', icon: '🏃', description: 'Épreuve combinée de 10 disciplines.', popularity: 3, clubCount: 600, parentId: 'athletisme' },
  { id: 'heptathlon', name: 'Heptathlon', category: 'individuel', icon: '🏃', description: 'Épreuve combinée féminine de 7 disciplines.', popularity: 3, clubCount: 550, parentId: 'athletisme' },
  { id: 'marche-athletique', name: 'Marche athlétique', category: 'individuel', icon: '🚶', description: 'Course en marchant à haute intensité.', popularity: 2, clubCount: 380, parentId: 'athletisme' },

  // Cyclisme et variantes
  { id: 'cyclisme', name: 'Cyclisme', category: 'individuel', icon: '🚴', description: 'Sport emblématique avec le Tour de France.', popularity: 7, clubCount: 2800 },
  { id: 'cyclisme-route', name: 'Cyclisme sur route', category: 'individuel', icon: '🚴', description: 'Courses sur route, contre-la-montre.', popularity: 7, clubCount: 2200, parentId: 'cyclisme' },
  { id: 'cyclisme-piste', name: 'Cyclisme sur piste', category: 'individuel', icon: '🚴', description: 'Courses sur vélodrome.', popularity: 4, clubCount: 380, parentId: 'cyclisme' },
  { id: 'vtt', name: 'VTT', category: 'nature', icon: '🚵', description: 'Vélo tout terrain en nature.', popularity: 6, clubCount: 1800, parentId: 'cyclisme' },
  { id: 'vtt-cross-country', name: 'VTT Cross-Country', category: 'nature', icon: '🚵', description: 'VTT d\'endurance sur parcours vallonné.', popularity: 5, clubCount: 1200, parentId: 'vtt' },
  { id: 'vtt-descente', name: 'VTT Descente', category: 'nature', icon: '🚵', description: 'VTT de descente technique.', popularity: 4, clubCount: 450, parentId: 'vtt' },
  { id: 'vtt-enduro', name: 'VTT Enduro', category: 'nature', icon: '🚵', description: 'Mix montée et descente chronométrée.', popularity: 5, clubCount: 680, parentId: 'vtt' },
  { id: 'bmx', name: 'BMX', category: 'individuel', icon: '🚴', description: 'Vélo acrobatique ou course.', popularity: 5, clubCount: 520, parentId: 'cyclisme' },
  { id: 'bmx-race', name: 'BMX Race', category: 'individuel', icon: '🚴', description: 'Courses de BMX sur piste bosselée.', popularity: 4, clubCount: 380, parentId: 'bmx' },
  { id: 'bmx-freestyle', name: 'BMX Freestyle', category: 'individuel', icon: '🚴', description: 'BMX acrobatique (park, street, flat).', popularity: 4, clubCount: 320, parentId: 'bmx' },
  { id: 'gravel', name: 'Gravel', category: 'nature', icon: '🚴', description: 'Vélo mixte route et chemins.', popularity: 5, clubCount: 680, parentId: 'cyclisme' },
  { id: 'cyclocross', name: 'Cyclocross', category: 'individuel', icon: '🚴', description: 'Course de vélo tout-terrain hivernale.', popularity: 4, clubCount: 420, parentId: 'cyclisme' },

  // Gymnastique et variantes
  { id: 'gymnastique', name: 'Gymnastique', category: 'individuel', icon: '🤸', description: 'Sport artistique combinant force, souplesse et grâce.', popularity: 7, clubCount: 1400 },
  { id: 'gym-artistique', name: 'Gymnastique artistique', category: 'individuel', icon: '🤸', description: 'Gym aux agrès (sol, poutre, barres...).', popularity: 7, clubCount: 1200, parentId: 'gymnastique' },
  { id: 'gym-rythmique', name: 'Gymnastique rythmique', category: 'individuel', icon: '🤸', description: 'Gym avec engins (ruban, cerceau, ballon).', popularity: 5, clubCount: 680, parentId: 'gymnastique' },
  { id: 'trampoline', name: 'Trampoline', category: 'individuel', icon: '🤸', description: 'Acrobaties sur trampoline.', popularity: 5, clubCount: 520, parentId: 'gymnastique' },
  { id: 'gym-acrobatique', name: 'Gymnastique acrobatique', category: 'individuel', icon: '🤸', description: 'Figures acrobatiques en groupe.', popularity: 4, clubCount: 380, parentId: 'gymnastique' },
  { id: 'aerobic', name: 'Aérobic', category: 'fitness', icon: '🤸', description: 'Gymnastique en musique.', popularity: 4, clubCount: 450, parentId: 'gymnastique' },
  { id: 'tumbling', name: 'Tumbling', category: 'individuel', icon: '🤸', description: 'Acrobaties sur piste.', popularity: 3, clubCount: 280, parentId: 'gymnastique' },

  // Autres sports individuels
  { id: 'patinage', name: 'Patinage artistique', category: 'glisse', icon: '⛸️', description: 'Sport élégant alliant technique et artistique.', popularity: 5, clubCount: 280 },
  { id: 'patinage-vitesse', name: 'Patinage de vitesse', category: 'glisse', icon: '⛸️', description: 'Courses sur glace.', popularity: 3, clubCount: 120, parentId: 'patinage' },
  { id: 'danse-glace', name: 'Danse sur glace', category: 'glisse', icon: '⛸️', description: 'Danse artistique en couple sur glace.', popularity: 4, clubCount: 180, parentId: 'patinage' },
  { id: 'triathlon', name: 'Triathlon', category: 'individuel', icon: '🏊', description: 'Enchaînement natation, vélo et course à pied.', popularity: 6, clubCount: 780 },
  { id: 'duathlon', name: 'Duathlon', category: 'individuel', icon: '🏃', description: 'Enchaînement course-vélo-course.', popularity: 4, clubCount: 420, parentId: 'triathlon' },
  { id: 'aquathlon', name: 'Aquathlon', category: 'aquatique', icon: '🏊', description: 'Enchaînement natation-course.', popularity: 3, clubCount: 280, parentId: 'triathlon' },
  { id: 'golf', name: 'Golf', category: 'precision', icon: '⛳', description: 'Sport de précision pratiqué sur parcours.', popularity: 5, clubCount: 720 },
  { id: 'minigolf', name: 'Minigolf', category: 'precision', icon: '⛳', description: 'Version miniature du golf.', popularity: 3, clubCount: 280, parentId: 'golf' },

  // ============================================
  // SPORTS DE RAQUETTE
  // ============================================
  
  // Tennis et variantes
  { id: 'tennis', name: 'Tennis', category: 'raquette', icon: '🎾', description: '2ème sport le plus pratiqué en France.', popularity: 9, clubCount: 7800 },
  { id: 'tennis-simple', name: 'Tennis simple', category: 'raquette', icon: '🎾', description: 'Match en 1 contre 1.', popularity: 9, clubCount: 7500, parentId: 'tennis' },
  { id: 'tennis-double', name: 'Tennis double', category: 'raquette', icon: '🎾', description: 'Match en 2 contre 2.', popularity: 7, clubCount: 6000, parentId: 'tennis' },
  { id: 'beach-tennis', name: 'Beach Tennis', category: 'raquette', icon: '🎾', description: 'Tennis sur sable.', popularity: 4, clubCount: 380, parentId: 'tennis' },
  { id: 'padel', name: 'Padel', category: 'raquette', icon: '🎾', description: 'Sport en plein essor mêlant tennis et squash.', popularity: 7, clubCount: 1500 },
  { id: 'badminton', name: 'Badminton', category: 'raquette', icon: '🏸', description: 'Sport de raquette rapide et technique.', popularity: 6, clubCount: 1900 },
  { id: 'tennis-table', name: 'Tennis de table', category: 'raquette', icon: '🏓', description: 'Ping-pong, sport accessible et populaire.', popularity: 6, clubCount: 4200 },
  { id: 'squash', name: 'Squash', category: 'raquette', icon: '🎾', description: 'Sport de raquette intense en salle.', popularity: 4, clubCount: 480 },
  { id: 'racquetball', name: 'Racquetball', category: 'raquette', icon: '🎾', description: 'Sport de raquette américain en salle.', popularity: 2, clubCount: 85 },

  // ============================================
  // SPORTS AQUATIQUES
  // ============================================
  
  // Natation et variantes
  { id: 'natation', name: 'Natation', category: 'aquatique', icon: '🏊', description: 'Sport aquatique complet accessible à tous les âges.', popularity: 9, clubCount: 1300 },
  { id: 'natation-course', name: 'Natation sportive', category: 'aquatique', icon: '🏊', description: 'Natation de compétition (crawl, dos, brasse, papillon).', popularity: 8, clubCount: 1100, parentId: 'natation' },
  { id: 'natation-synchronisee', name: 'Natation artistique', category: 'aquatique', icon: '🏊', description: 'Danse aquatique artistique.', popularity: 4, clubCount: 280, parentId: 'natation' },
  { id: 'plongeon', name: 'Plongeon', category: 'aquatique', icon: '🏊', description: 'Acrobaties depuis plongeoir.', popularity: 4, clubCount: 220, parentId: 'natation' },
  { id: 'nage-eau-libre', name: 'Nage en eau libre', category: 'aquatique', icon: '🏊', description: 'Natation en milieu naturel.', popularity: 5, clubCount: 380, parentId: 'natation' },
  { id: 'aquagym', name: 'Aquagym', category: 'aquatique', icon: '🏊', description: 'Gymnastique aquatique douce.', popularity: 6, clubCount: 850, parentId: 'natation' },
  { id: 'aquabike', name: 'Aquabike', category: 'aquatique', icon: '🏊', description: 'Vélo dans l\'eau.', popularity: 5, clubCount: 520, parentId: 'natation' },

  // Plongée et variantes
  { id: 'plongee', name: 'Plongée sous-marine', category: 'aquatique', icon: '🤿', description: 'Exploration des fonds marins.', popularity: 5, clubCount: 2200 },
  { id: 'plongee-bouteille', name: 'Plongée bouteille', category: 'aquatique', icon: '🤿', description: 'Plongée avec équipement autonome.', popularity: 5, clubCount: 1800, parentId: 'plongee' },
  { id: 'apnee', name: 'Apnée', category: 'aquatique', icon: '🤿', description: 'Plongée en retenant sa respiration.', popularity: 4, clubCount: 620, parentId: 'plongee' },
  { id: 'snorkeling', name: 'Snorkeling', category: 'aquatique', icon: '🤿', description: 'Randonnée palmée en surface.', popularity: 4, clubCount: 380, parentId: 'plongee' },

  // Sports nautiques
  { id: 'surf', name: 'Surf', category: 'glisse', icon: '🏄', description: 'Sport de glisse sur les vagues.', popularity: 6, clubCount: 580 },
  { id: 'bodyboard', name: 'Bodyboard', category: 'glisse', icon: '🏄', description: 'Glisse sur les vagues allongé.', popularity: 4, clubCount: 280, parentId: 'surf' },
  { id: 'longboard-surf', name: 'Longboard surf', category: 'glisse', icon: '🏄', description: 'Surf sur grande planche.', popularity: 4, clubCount: 320, parentId: 'surf' },
  { id: 'stand-up-paddle', name: 'Stand Up Paddle', category: 'glisse', icon: '🏄', description: 'Paddle debout sur planche.', popularity: 6, clubCount: 720 },
  { id: 'kitesurf', name: 'Kitesurf', category: 'glisse', icon: '🪁', description: 'Glisse tractée par cerf-volant.', popularity: 5, clubCount: 420 },
  { id: 'windsurf', name: 'Windsurf', category: 'glisse', icon: '🏄', description: 'Planche à voile.', popularity: 4, clubCount: 380 },
  { id: 'wakeboard', name: 'Wakeboard', category: 'glisse', icon: '🏄', description: 'Glisse tractée par bateau.', popularity: 4, clubCount: 280 },
  { id: 'ski-nautique', name: 'Ski nautique', category: 'glisse', icon: '🎿', description: 'Glisse sur l\'eau tractée.', popularity: 4, clubCount: 320 },
  { id: 'voile', name: 'Voile', category: 'aquatique', icon: '⛵', description: 'Navigation à voile sportive ou loisir.', popularity: 6, clubCount: 980 },
  { id: 'voile-legere', name: 'Voile légère', category: 'aquatique', icon: '⛵', description: 'Dériveurs et catamarans légers.', popularity: 5, clubCount: 680, parentId: 'voile' },
  { id: 'voile-habitable', name: 'Voile habitable', category: 'aquatique', icon: '⛵', description: 'Croisière et régate.', popularity: 4, clubCount: 420, parentId: 'voile' },
  { id: 'kayak', name: 'Kayak', category: 'aquatique', icon: '🛶', description: 'Sport nautique en eau calme ou vive.', popularity: 5, clubCount: 720 },
  { id: 'kayak-mer', name: 'Kayak de mer', category: 'aquatique', icon: '🛶', description: 'Kayak en milieu marin.', popularity: 4, clubCount: 380, parentId: 'kayak' },
  { id: 'kayak-eau-vive', name: 'Kayak eau vive', category: 'aquatique', icon: '🛶', description: 'Kayak en rivière tumultueuse.', popularity: 4, clubCount: 420, parentId: 'kayak' },
  { id: 'canoe', name: 'Canoë', category: 'aquatique', icon: '🛶', description: 'Pagaie simple, position à genoux.', popularity: 4, clubCount: 480 },
  { id: 'aviron', name: 'Aviron', category: 'aquatique', icon: '🚣', description: 'Sport d\'endurance sur l\'eau.', popularity: 4, clubCount: 420 },
  { id: 'rafting', name: 'Rafting', category: 'aquatique', icon: '🛶', description: 'Descente de rivière en groupe.', popularity: 4, clubCount: 280 },

  // ============================================
  // ARTS MARTIAUX & COMBAT
  // ============================================
  
  // Judo et variantes
  { id: 'judo', name: 'Judo', category: 'combat', icon: '🥋', description: 'Art martial japonais très pratiqué en France.', popularity: 8, clubCount: 5600 },
  { id: 'jujitsu', name: 'Jujitsu', category: 'combat', icon: '🥋', description: 'Art martial complet, ancêtre du judo.', popularity: 5, clubCount: 1200, parentId: 'judo' },
  { id: 'jiu-jitsu-bresilien', name: 'Jiu-jitsu brésilien', category: 'combat', icon: '🥋', description: 'Art martial au sol très technique.', popularity: 6, clubCount: 820 },
  { id: 'bjj-gi', name: 'BJJ Gi', category: 'combat', icon: '🥋', description: 'Jiu-jitsu brésilien avec kimono.', popularity: 5, clubCount: 620, parentId: 'jiu-jitsu-bresilien' },
  { id: 'bjj-nogi', name: 'BJJ No-Gi', category: 'combat', icon: '🥋', description: 'Jiu-jitsu brésilien sans kimono.', popularity: 5, clubCount: 480, parentId: 'jiu-jitsu-bresilien' },

  // Karaté et variantes
  { id: 'karate', name: 'Karaté', category: 'combat', icon: '🥋', description: 'Art martial japonais basé sur les frappes.', popularity: 6, clubCount: 4200 },
  { id: 'karate-shotokan', name: 'Karaté Shotokan', category: 'combat', icon: '🥋', description: 'Style le plus répandu de karaté.', popularity: 6, clubCount: 2400, parentId: 'karate' },
  { id: 'karate-kyokushin', name: 'Karaté Kyokushinkai', category: 'combat', icon: '🥋', description: 'Karaté full-contact.', popularity: 4, clubCount: 380, parentId: 'karate' },
  { id: 'karate-wado-ryu', name: 'Karaté Wado-Ryu', category: 'combat', icon: '🥋', description: 'Style fluide et esquives.', popularity: 4, clubCount: 520, parentId: 'karate' },
  { id: 'karate-goju-ryu', name: 'Karaté Goju-Ryu', category: 'combat', icon: '🥋', description: 'Style combinant dur et souple.', popularity: 3, clubCount: 380, parentId: 'karate' },

  // Boxe et variantes
  { id: 'boxe', name: 'Boxe anglaise', category: 'combat', icon: '🥊', description: 'Noble art du combat avec les poings.', popularity: 6, clubCount: 1500 },
  { id: 'boxe-francaise', name: 'Boxe française', category: 'combat', icon: '🥊', description: 'Savate, sport de combat français traditionnel.', popularity: 5, clubCount: 980 },
  { id: 'boxe-thai', name: 'Boxe thaïlandaise', category: 'combat', icon: '🥊', description: 'Muay Thai, art des 8 membres.', popularity: 6, clubCount: 1100 },
  { id: 'kickboxing', name: 'Kickboxing', category: 'combat', icon: '🥊', description: 'Boxe pieds-poings américaine.', popularity: 5, clubCount: 780 },
  { id: 'full-contact', name: 'Full Contact', category: 'combat', icon: '🥊', description: 'Boxe pieds-poings au-dessus de la ceinture.', popularity: 4, clubCount: 420, parentId: 'kickboxing' },
  { id: 'k1', name: 'K-1', category: 'combat', icon: '🥊', description: 'Kickboxing japonais avec coups de genou.', popularity: 4, clubCount: 380, parentId: 'kickboxing' },

  // MMA et grappling
  { id: 'mma', name: 'MMA', category: 'combat', icon: '🥊', description: 'Arts martiaux mixtes en plein essor.', popularity: 6, clubCount: 650 },
  { id: 'grappling', name: 'Grappling', category: 'combat', icon: '🤼', description: 'Lutte soumission sans frappe.', popularity: 4, clubCount: 380, parentId: 'mma' },
  { id: 'lutte', name: 'Lutte', category: 'combat', icon: '🤼', description: 'Sport de combat olympique ancestral.', popularity: 3, clubCount: 340 },
  { id: 'lutte-libre', name: 'Lutte libre', category: 'combat', icon: '🤼', description: 'Lutte avec saisies aux jambes.', popularity: 3, clubCount: 220, parentId: 'lutte' },
  { id: 'lutte-greco', name: 'Lutte gréco-romaine', category: 'combat', icon: '🤼', description: 'Lutte sans saisie sous la ceinture.', popularity: 2, clubCount: 180, parentId: 'lutte' },

  // Autres arts martiaux
  { id: 'taekwondo', name: 'Taekwondo', category: 'combat', icon: '🥋', description: 'Art martial coréen axé sur les coups de pied.', popularity: 5, clubCount: 1050 },
  { id: 'taekwondo-wtf', name: 'Taekwondo WT', category: 'combat', icon: '🥋', description: 'Style olympique.', popularity: 5, clubCount: 850, parentId: 'taekwondo' },
  { id: 'taekwondo-itf', name: 'Taekwondo ITF', category: 'combat', icon: '🥋', description: 'Style traditionnel nord-coréen.', popularity: 3, clubCount: 280, parentId: 'taekwondo' },
  { id: 'aikido', name: 'Aïkido', category: 'combat', icon: '🥋', description: 'Art martial japonais non compétitif.', popularity: 4, clubCount: 1100 },
  { id: 'kendo', name: 'Kendo', category: 'combat', icon: '⚔️', description: 'Escrime japonaise au sabre.', popularity: 4, clubCount: 480 },
  { id: 'iaido', name: 'Iaïdo', category: 'combat', icon: '⚔️', description: 'Art du dégainement du sabre.', popularity: 3, clubCount: 320, parentId: 'kendo' },
  { id: 'naginata', name: 'Naginata', category: 'combat', icon: '⚔️', description: 'Art martial à la hallebarde japonaise.', popularity: 2, clubCount: 85 },
  { id: 'kung-fu', name: 'Kung-Fu', category: 'combat', icon: '🥋', description: 'Arts martiaux chinois traditionnels.', popularity: 5, clubCount: 820 },
  { id: 'wing-chun', name: 'Wing Chun', category: 'combat', icon: '🥋', description: 'Style chinois proche du combat.', popularity: 4, clubCount: 420, parentId: 'kung-fu' },
  { id: 'tai-chi', name: 'Tai Chi Chuan', category: 'combat', icon: '🧘', description: 'Art martial interne chinois, lent et méditatif.', popularity: 5, clubCount: 980, parentId: 'kung-fu' },
  { id: 'wushu', name: 'Wushu', category: 'combat', icon: '🥋', description: 'Arts martiaux chinois sportifs.', popularity: 3, clubCount: 280, parentId: 'kung-fu' },
  { id: 'hapkido', name: 'Hapkido', category: 'combat', icon: '🥋', description: 'Art martial coréen complet.', popularity: 3, clubCount: 220 },
  { id: 'krav-maga', name: 'Krav Maga', category: 'combat', icon: '🥊', description: 'Self-défense israélienne efficace.', popularity: 5, clubCount: 650 },
  { id: 'self-defense', name: 'Self-défense', category: 'combat', icon: '🥊', description: 'Techniques de protection personnelle.', popularity: 5, clubCount: 720 },
  { id: 'sambo', name: 'Sambo', category: 'combat', icon: '🥋', description: 'Art martial russe de combat.', popularity: 3, clubCount: 180 },
  { id: 'capoeira', name: 'Capoeira', category: 'combat', icon: '🤸', description: 'Art martial brésilien dansé.', popularity: 4, clubCount: 420 },
  { id: 'escrime', name: 'Escrime', category: 'combat', icon: '🤺', description: 'Sport d\'épée où la France excelle.', popularity: 5, clubCount: 880 },
  { id: 'escrime-epee', name: 'Escrime à l\'épée', category: 'combat', icon: '🤺', description: 'Arme la plus utilisée en escrime.', popularity: 5, clubCount: 720, parentId: 'escrime' },
  { id: 'escrime-fleuret', name: 'Escrime au fleuret', category: 'combat', icon: '🤺', description: 'Arme légère, cible limitée.', popularity: 4, clubCount: 620, parentId: 'escrime' },
  { id: 'escrime-sabre', name: 'Escrime au sabre', category: 'combat', icon: '🤺', description: 'Arme de taille et d\'estoc.', popularity: 4, clubCount: 520, parentId: 'escrime' },

  // ============================================
  // SPORTS NATURE
  // ============================================
  
  // Escalade et variantes
  { id: 'escalade', name: 'Escalade', category: 'nature', icon: '🧗', description: 'Sport de grimpe en salle ou en extérieur.', popularity: 7, clubCount: 950 },
  { id: 'escalade-bloc', name: 'Escalade bloc', category: 'nature', icon: '🧗', description: 'Grimpe sans corde sur structures basses.', popularity: 7, clubCount: 680, parentId: 'escalade' },
  { id: 'escalade-voie', name: 'Escalade de voie', category: 'nature', icon: '🧗', description: 'Grimpe avec corde sur hauteur.', popularity: 6, clubCount: 750, parentId: 'escalade' },
  { id: 'escalade-vitesse', name: 'Escalade de vitesse', category: 'nature', icon: '🧗', description: 'Course verticale chronométrée.', popularity: 4, clubCount: 280, parentId: 'escalade' },
  { id: 'alpinisme', name: 'Alpinisme', category: 'nature', icon: '🏔️', description: 'Ascension de sommets montagneux.', popularity: 4, clubCount: 380 },
  { id: 'canyoning', name: 'Canyoning', category: 'nature', icon: '🏞️', description: 'Descente de canyons aquatiques.', popularity: 4, clubCount: 280 },
  { id: 'via-ferrata', name: 'Via Ferrata', category: 'nature', icon: '🧗', description: 'Parcours aménagés en paroi rocheuse.', popularity: 4, clubCount: 220 },

  // Ski et variantes
  { id: 'ski', name: 'Ski alpin', category: 'glisse', icon: '⛷️', description: 'Sport de glisse pratiqué en montagne.', popularity: 7, clubCount: 1100 },
  { id: 'ski-slalom', name: 'Ski slalom', category: 'glisse', icon: '⛷️', description: 'Descente entre les piquets.', popularity: 5, clubCount: 680, parentId: 'ski' },
  { id: 'ski-geant', name: 'Ski géant', category: 'glisse', icon: '⛷️', description: 'Descente technique rapide.', popularity: 5, clubCount: 620, parentId: 'ski' },
  { id: 'ski-descente', name: 'Ski de descente', category: 'glisse', icon: '⛷️', description: 'Descente vitesse pure.', popularity: 4, clubCount: 420, parentId: 'ski' },
  { id: 'ski-freeride', name: 'Ski freeride', category: 'glisse', icon: '⛷️', description: 'Ski hors-piste libre.', popularity: 5, clubCount: 480, parentId: 'ski' },
  { id: 'ski-freestyle', name: 'Ski freestyle', category: 'glisse', icon: '⛷️', description: 'Ski acrobatique (bosses, saut, half-pipe).', popularity: 5, clubCount: 380, parentId: 'ski' },
  { id: 'ski-fond', name: 'Ski de fond', category: 'nature', icon: '🎿', description: 'Ski nordique d\'endurance.', popularity: 5, clubCount: 620 },
  { id: 'ski-fond-classique', name: 'Ski de fond classique', category: 'nature', icon: '🎿', description: 'Technique traditionnelle.', popularity: 4, clubCount: 480, parentId: 'ski-fond' },
  { id: 'ski-fond-skating', name: 'Ski de fond skating', category: 'nature', icon: '🎿', description: 'Technique de patinage.', popularity: 4, clubCount: 420, parentId: 'ski-fond' },
  { id: 'biathlon', name: 'Biathlon', category: 'nature', icon: '🎿', description: 'Ski de fond et tir à la carabine.', popularity: 4, clubCount: 180 },
  { id: 'ski-alpinisme', name: 'Ski de randonnée', category: 'nature', icon: '⛷️', description: 'Ski en montée et descente hors-piste.', popularity: 5, clubCount: 420 },
  { id: 'snowboard', name: 'Snowboard', category: 'glisse', icon: '🏂', description: 'Glisse sur neige sur planche.', popularity: 6, clubCount: 520 },
  { id: 'snowboard-freestyle', name: 'Snowboard freestyle', category: 'glisse', icon: '🏂', description: 'Snowboard acrobatique.', popularity: 5, clubCount: 380, parentId: 'snowboard' },
  { id: 'snowboard-freeride', name: 'Snowboard freeride', category: 'glisse', icon: '🏂', description: 'Snowboard hors-piste.', popularity: 5, clubCount: 320, parentId: 'snowboard' },

  // Randonnée et trail
  { id: 'randonnee', name: 'Randonnée', category: 'nature', icon: '🥾', description: 'Marche sportive en pleine nature.', popularity: 8, clubCount: 3400 },
  { id: 'trail', name: 'Trail running', category: 'nature', icon: '🏃', description: 'Course à pied en pleine nature.', popularity: 7, clubCount: 1200 },
  { id: 'ultra-trail', name: 'Ultra-trail', category: 'nature', icon: '🏃', description: 'Trail longue distance (+80km).', popularity: 5, clubCount: 480, parentId: 'trail' },
  { id: 'course-orientation', name: 'Course d\'orientation', category: 'nature', icon: '🧭', description: 'Navigation en nature avec carte et boussole.', popularity: 4, clubCount: 520 },
  { id: 'marche-nordique', name: 'Marche nordique', category: 'nature', icon: '🥾', description: 'Marche dynamique avec bâtons.', popularity: 5, clubCount: 680 },
  { id: 'raquettes', name: 'Raquettes à neige', category: 'nature', icon: '🥾', description: 'Randonnée sur neige avec raquettes.', popularity: 4, clubCount: 380 },

  // Équitation et variantes
  { id: 'equitation', name: 'Équitation', category: 'nature', icon: '🏇', description: '3ème fédération française en nombre de licenciés.', popularity: 8, clubCount: 8500 },
  { id: 'dressage', name: 'Dressage', category: 'nature', icon: '🏇', description: 'Art équestre de la précision.', popularity: 5, clubCount: 3200, parentId: 'equitation' },
  { id: 'cso', name: 'Saut d\'obstacles', category: 'nature', icon: '🏇', description: 'Franchissement d\'obstacles à cheval.', popularity: 6, clubCount: 4500, parentId: 'equitation' },
  { id: 'concours-complet', name: 'Concours complet', category: 'nature', icon: '🏇', description: 'Triathlon équestre (dressage, cross, CSO).', popularity: 4, clubCount: 1200, parentId: 'equitation' },
  { id: 'endurance-equestre', name: 'Endurance équestre', category: 'nature', icon: '🏇', description: 'Courses de fond à cheval.', popularity: 4, clubCount: 680, parentId: 'equitation' },
  { id: 'polo', name: 'Polo', category: 'nature', icon: '🐴', description: 'Sport équestre de balle.', popularity: 2, clubCount: 85, parentId: 'equitation' },
  { id: 'voltige', name: 'Voltige équestre', category: 'nature', icon: '🏇', description: 'Gymnastique sur cheval au galop.', popularity: 3, clubCount: 280, parentId: 'equitation' },
  { id: 'horse-ball', name: 'Horse-ball', category: 'nature', icon: '🏇', description: 'Sport collectif à cheval avec ballon.', popularity: 3, clubCount: 220, parentId: 'equitation' },
  { id: 'western', name: 'Équitation western', category: 'nature', icon: '🤠', description: 'Monte à l\'américaine.', popularity: 4, clubCount: 520, parentId: 'equitation' },

  // Tir et précision
  { id: 'tir-arc', name: 'Tir à l\'arc', category: 'precision', icon: '🏹', description: 'Sport de précision ancestral.', popularity: 5, clubCount: 1650 },
  { id: 'tir-arc-classique', name: 'Tir à l\'arc classique', category: 'precision', icon: '🏹', description: 'Arc olympique traditionnel.', popularity: 5, clubCount: 1200, parentId: 'tir-arc' },
  { id: 'tir-arc-compound', name: 'Tir à l\'arc compound', category: 'precision', icon: '🏹', description: 'Arc à poulies moderne.', popularity: 4, clubCount: 680, parentId: 'tir-arc' },
  { id: 'tir-arc-3d', name: 'Tir à l\'arc 3D', category: 'precision', icon: '🏹', description: 'Tir sur cibles animalières en nature.', popularity: 4, clubCount: 520, parentId: 'tir-arc' },
  { id: 'tir-arc-campagne', name: 'Tir à l\'arc en campagne', category: 'precision', icon: '🏹', description: 'Tir en parcours naturel.', popularity: 3, clubCount: 420, parentId: 'tir-arc' },
  { id: 'tir-sportif', name: 'Tir sportif', category: 'precision', icon: '🎯', description: 'Tir de précision à la carabine ou pistolet.', popularity: 4, clubCount: 1580 },
  { id: 'tir-10m', name: 'Tir à 10m', category: 'precision', icon: '🎯', description: 'Tir à air comprimé indoor.', popularity: 4, clubCount: 1200, parentId: 'tir-sportif' },
  { id: 'tir-25m', name: 'Tir à 25m', category: 'precision', icon: '🎯', description: 'Tir au pistolet de sport.', popularity: 3, clubCount: 820, parentId: 'tir-sportif' },
  { id: 'tir-50m', name: 'Tir à 50m', category: 'precision', icon: '🎯', description: 'Tir à la carabine.', popularity: 3, clubCount: 680, parentId: 'tir-sportif' },
  { id: 'tir-trap', name: 'Ball-trap', category: 'precision', icon: '🎯', description: 'Tir sur plateaux d\'argile.', popularity: 3, clubCount: 520 },

  // ============================================
  // FITNESS & BIEN-ÊTRE
  // ============================================
  { id: 'yoga', name: 'Yoga', category: 'fitness', icon: '🧘', description: 'Pratique corps-esprit d\'origine indienne.', popularity: 8, clubCount: 5200 },
  { id: 'yoga-hatha', name: 'Hatha Yoga', category: 'fitness', icon: '🧘', description: 'Yoga traditionnel postural.', popularity: 7, clubCount: 3200, parentId: 'yoga' },
  { id: 'yoga-vinyasa', name: 'Vinyasa Yoga', category: 'fitness', icon: '🧘', description: 'Yoga dynamique et fluide.', popularity: 7, clubCount: 2800, parentId: 'yoga' },
  { id: 'yoga-ashtanga', name: 'Ashtanga Yoga', category: 'fitness', icon: '🧘', description: 'Yoga intense et structuré.', popularity: 5, clubCount: 1200, parentId: 'yoga' },
  { id: 'yoga-bikram', name: 'Bikram Yoga', category: 'fitness', icon: '🧘', description: 'Yoga en salle chauffée.', popularity: 4, clubCount: 280, parentId: 'yoga' },
  { id: 'yoga-yin', name: 'Yin Yoga', category: 'fitness', icon: '🧘', description: 'Yoga doux et méditatif.', popularity: 5, clubCount: 1400, parentId: 'yoga' },
  { id: 'pilates', name: 'Pilates', category: 'fitness', icon: '🧘', description: 'Méthode de renforcement musculaire.', popularity: 7, clubCount: 3800 },
  { id: 'pilates-mat', name: 'Pilates Mat', category: 'fitness', icon: '🧘', description: 'Pilates au sol.', popularity: 7, clubCount: 3200, parentId: 'pilates' },
  { id: 'pilates-reformer', name: 'Pilates Reformer', category: 'fitness', icon: '🧘', description: 'Pilates sur machine.', popularity: 5, clubCount: 1200, parentId: 'pilates' },
  { id: 'danse', name: 'Danse', category: 'fitness', icon: '💃', description: 'Expression artistique par le mouvement.', popularity: 8, clubCount: 6200 },
  { id: 'danse-classique', name: 'Danse classique', category: 'fitness', icon: '🩰', description: 'Ballet traditionnel.', popularity: 6, clubCount: 2400, parentId: 'danse' },
  { id: 'danse-contemporaine', name: 'Danse contemporaine', category: 'fitness', icon: '💃', description: 'Danse d\'expression moderne.', popularity: 5, clubCount: 1800, parentId: 'danse' },
  { id: 'danse-jazz', name: 'Danse jazz', category: 'fitness', icon: '💃', description: 'Danse énergique et rythmée.', popularity: 6, clubCount: 2200, parentId: 'danse' },
  { id: 'danse-hip-hop', name: 'Danse hip-hop', category: 'fitness', icon: '💃', description: 'Danse urbaine.', popularity: 7, clubCount: 2800, parentId: 'danse' },
  { id: 'danse-salsa', name: 'Salsa', category: 'fitness', icon: '💃', description: 'Danse latine en couple.', popularity: 6, clubCount: 1800, parentId: 'danse' },
  { id: 'danse-tango', name: 'Tango', category: 'fitness', icon: '💃', description: 'Danse argentine passionnée.', popularity: 4, clubCount: 680, parentId: 'danse' },
  { id: 'danse-rock', name: 'Rock\'n\'roll', category: 'fitness', icon: '💃', description: 'Danse acrobatique en couple.', popularity: 4, clubCount: 520, parentId: 'danse' },
  { id: 'pole-dance', name: 'Pole dance', category: 'fitness', icon: '💃', description: 'Danse acrobatique sur barre verticale.', popularity: 5, clubCount: 680 },
  { id: 'crossfit', name: 'CrossFit', category: 'fitness', icon: '🏋️', description: 'Entraînement fonctionnel haute intensité.', popularity: 6, clubCount: 980 },
  { id: 'musculation', name: 'Musculation', category: 'fitness', icon: '💪', description: 'Renforcement musculaire en salle.', popularity: 8, clubCount: 4500 },
  { id: 'halterophilie', name: 'Haltérophilie', category: 'fitness', icon: '🏋️', description: 'Arraché et épaulé-jeté olympiques.', popularity: 4, clubCount: 480 },
  { id: 'powerlifting', name: 'Powerlifting', category: 'fitness', icon: '🏋️', description: 'Force athlétique (squat, développé, soulevé).', popularity: 4, clubCount: 380 },
  { id: 'stretching', name: 'Stretching', category: 'fitness', icon: '🧘', description: 'Étirements et souplesse.', popularity: 5, clubCount: 1200 },
  { id: 'body-combat', name: 'Body Combat', category: 'fitness', icon: '🥊', description: 'Fitness inspiré des arts martiaux.', popularity: 5, clubCount: 680 },
  { id: 'zumba', name: 'Zumba', category: 'fitness', icon: '💃', description: 'Fitness dansé latino.', popularity: 6, clubCount: 1800 },

  // ============================================
  // SPORTS MÉCANIQUES
  // ============================================
  { id: 'moto', name: 'Motocyclisme', category: 'mecanique', icon: '🏍️', description: 'Sports mécaniques à moto.', popularity: 5, clubCount: 680 },
  { id: 'moto-vitesse', name: 'Moto de vitesse', category: 'mecanique', icon: '🏍️', description: 'Courses sur circuit.', popularity: 4, clubCount: 280, parentId: 'moto' },
  { id: 'motocross', name: 'Motocross', category: 'mecanique', icon: '🏍️', description: 'Courses tout-terrain.', popularity: 5, clubCount: 420, parentId: 'moto' },
  { id: 'enduro-moto', name: 'Enduro moto', category: 'mecanique', icon: '🏍️', description: 'Rallye tout-terrain.', popularity: 4, clubCount: 320, parentId: 'moto' },
  { id: 'trial-moto', name: 'Trial moto', category: 'mecanique', icon: '🏍️', description: 'Franchissement d\'obstacles techniques.', popularity: 3, clubCount: 180, parentId: 'moto' },
  { id: 'supermotard', name: 'Supermotard', category: 'mecanique', icon: '🏍️', description: 'Mix route et tout-terrain.', popularity: 3, clubCount: 120, parentId: 'moto' },
  { id: 'karting', name: 'Karting', category: 'mecanique', icon: '🏎️', description: 'Course automobile en kart.', popularity: 5, clubCount: 580 },
  { id: 'automobile', name: 'Sport automobile', category: 'mecanique', icon: '🏎️', description: 'Courses et rallyes automobiles.', popularity: 4, clubCount: 420 },
  { id: 'rallye', name: 'Rallye', category: 'mecanique', icon: '🏎️', description: 'Course automobile sur routes.', popularity: 4, clubCount: 280, parentId: 'automobile' },
  { id: 'circuit', name: 'Circuit automobile', category: 'mecanique', icon: '🏎️', description: 'Courses sur circuit fermé.', popularity: 3, clubCount: 180, parentId: 'automobile' },
  { id: 'drift', name: 'Drift', category: 'mecanique', icon: '🏎️', description: 'Glisse contrôlée en voiture.', popularity: 3, clubCount: 120, parentId: 'automobile' },

  // ============================================
  // SPORTS DE GLISSE URBAINS
  // ============================================
  { id: 'skateboard', name: 'Skateboard', category: 'glisse', icon: '🛹', description: 'Sport urbain olympique.', popularity: 6, clubCount: 520 },
  { id: 'skateboard-street', name: 'Skateboard street', category: 'glisse', icon: '🛹', description: 'Skate de rue et mobilier urbain.', popularity: 6, clubCount: 420, parentId: 'skateboard' },
  { id: 'skateboard-park', name: 'Skateboard park', category: 'glisse', icon: '🛹', description: 'Skate en bowl et rampes.', popularity: 5, clubCount: 380, parentId: 'skateboard' },
  { id: 'longboard', name: 'Longboard', category: 'glisse', icon: '🛹', description: 'Planche longue, cruising et descente.', popularity: 4, clubCount: 220, parentId: 'skateboard' },
  { id: 'roller', name: 'Roller', category: 'glisse', icon: '🛼', description: 'Sport de glisse urbain.', popularity: 5, clubCount: 680 },
  { id: 'roller-freestyle', name: 'Roller freestyle', category: 'glisse', icon: '🛼', description: 'Roller acrobatique (slalom, saut).', popularity: 4, clubCount: 280, parentId: 'roller' },
  { id: 'roller-derby', name: 'Roller derby', category: 'glisse', icon: '🛼', description: 'Sport de contact sur patins.', popularity: 4, clubCount: 180, parentId: 'roller' },
  { id: 'roller-hockey', name: 'Roller in line hockey', category: 'glisse', icon: '🏒', description: 'Hockey sur rollers.', popularity: 3, clubCount: 220, parentId: 'roller' },
  { id: 'trottinette', name: 'Trottinette freestyle', category: 'glisse', icon: '🛴', description: 'Trottinette acrobatique.', popularity: 5, clubCount: 320 },

  // ============================================
  // AUTRES SPORTS
  // ============================================
  { id: 'petanque', name: 'Pétanque', category: 'precision', icon: '🎱', description: 'Sport traditionnel provençal.', popularity: 7, clubCount: 5800 },
  { id: 'boules-lyonnaises', name: 'Boules lyonnaises', category: 'precision', icon: '🎱', description: 'Jeu de boules traditionnel.', popularity: 3, clubCount: 580, parentId: 'petanque' },
  { id: 'billard', name: 'Billard', category: 'precision', icon: '🎱', description: 'Sport de précision sur table.', popularity: 4, clubCount: 1090 },
  { id: 'billard-francais', name: 'Billard français', category: 'precision', icon: '🎱', description: 'Carambole à 3 billes.', popularity: 3, clubCount: 480, parentId: 'billard' },
  { id: 'billard-americain', name: 'Billard américain', category: 'precision', icon: '🎱', description: 'Pool avec poches.', popularity: 4, clubCount: 620, parentId: 'billard' },
  { id: 'snooker', name: 'Snooker', category: 'precision', icon: '🎱', description: 'Billard anglais à 22 billes.', popularity: 3, clubCount: 180, parentId: 'billard' },
  { id: 'bowling', name: 'Bowling', category: 'precision', icon: '🎳', description: 'Sport de quilles américain.', popularity: 4, clubCount: 520 },
  { id: 'flechettes', name: 'Fléchettes', category: 'precision', icon: '🎯', description: 'Sport de précision convivial.', popularity: 4, clubCount: 380 },
  { id: 'echecs', name: 'Échecs', category: 'autre', icon: '♟️', description: 'Sport cérébral millénaire.', popularity: 5, clubCount: 1090 },
  { id: 'go', name: 'Go', category: 'autre', icon: '⚫', description: 'Jeu de stratégie asiatique.', popularity: 3, clubCount: 180 },
  { id: 'bridge', name: 'Bridge', category: 'autre', icon: '🃏', description: 'Jeu de cartes de réflexion.', popularity: 4, clubCount: 680 },
  { id: 'parkour', name: 'Parkour', category: 'autre', icon: '🏃', description: 'Art du déplacement urbain.', popularity: 5, clubCount: 380 },
  { id: 'cheerleading', name: 'Cheerleading', category: 'autre', icon: '📣', description: 'Sport acrobatique d\'équipe.', popularity: 4, clubCount: 280 },
  { id: 'twirling', name: 'Twirling bâton', category: 'autre', icon: '🪄', description: 'Gymnastique avec bâton.', popularity: 3, clubCount: 420 },
];

export const getPopularDisciplines = (limit = 8) => 
  [...disciplines].filter(d => !d.parentId).sort((a, b) => b.popularity - a.popularity).slice(0, limit);

export const getDisciplinesByCategory = (category: string) => 
  disciplines.filter(d => d.category === category);

export const getDisciplineById = (id: string) => 
  disciplines.find(d => d.id === id);

export const getParentDisciplines = () =>
  disciplines.filter(d => !d.parentId);

export const getSubDisciplines = (parentId: string) =>
  disciplines.filter(d => d.parentId === parentId);

export const getAllDisciplinesWithVariants = () => {
  const parents = disciplines.filter(d => !d.parentId);
  return parents.map(parent => ({
    ...parent,
    variants: disciplines.filter(d => d.parentId === parent.id)
  }));
};
