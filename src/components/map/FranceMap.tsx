import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clubs } from '@/data/clubs';
import { getDisciplineById } from '@/data/disciplines';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Colors by category
const categoryColors: Record<string, string> = {
  collectif: '#2563eb',
  individuel: '#8b5cf6',
  aquatique: '#0891b2',
  combat: '#ea580c',
  raquette: '#16a34a',
  nature: '#059669',
  fitness: '#ec4899',
  glisse: '#06b6d4',
  mecanique: '#dc2626',
  precision: '#9333ea',
  autre: '#6b7280',
};

// France center coordinates
const FRANCE_CENTER: [number, number] = [46.603354, 1.888334];
const FRANCE_ZOOM = 6;

interface FranceMapProps {
  height?: string;
  showControls?: boolean;
  selectedDiscipline?: string;
  maxClubs?: number;
}

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
}

export function FranceMap({ 
  height = '500px', 
  showControls = true,
  selectedDiscipline = 'all',
  maxClubs
}: FranceMapProps) {
  const mapRef = useRef<L.Map>(null);

  // Filter clubs
  const filteredClubs = clubs.filter(club => {
    if (selectedDiscipline === 'all') return true;
    return club.discipline === selectedDiscipline;
  });

  const displayedClubs = maxClubs ? filteredClubs.slice(0, maxClubs) : filteredClubs;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg" style={{ height }}>
      <MapContainer
        ref={mapRef}
        center={FRANCE_CENTER}
        zoom={FRANCE_ZOOM}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController center={FRANCE_CENTER} zoom={FRANCE_ZOOM} />
        
        {displayedClubs.map((club) => {
          const discipline = getDisciplineById(club.discipline);
          const color = discipline ? categoryColors[discipline.category] || '#2563eb' : '#2563eb';
          
          return (
            <Marker
              key={club.id}
              position={[club.coordinates.lat, club.coordinates.lng]}
              icon={createCustomIcon(color)}
            >
              <Popup className="club-popup">
                <div className="p-1 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{discipline?.icon || '🏆'}</span>
                    <Badge variant="secondary" className="text-xs">
                      {club.disciplineName}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{club.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {club.city}, {club.region}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>⭐ {club.rating}</span>
                    <span>•</span>
                    <span>À partir de {club.licensePrice.child}€</span>
                  </div>
                  <Link to={`/club/${club.id}`}>
                    <Button size="sm" className="w-full">
                      Voir le club
                    </Button>
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Overlay info */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-border z-[1000]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{displayedClubs.length} clubs</p>
            <p className="text-sm text-muted-foreground">sur la carte</p>
          </div>
        </div>
      </div>
    </div>
  );
}
