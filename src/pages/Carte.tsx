import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Filter, Layers, ZoomIn, ZoomOut, Navigation } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { clubs, levels } from '@/data/clubs';
import { disciplines } from '@/data/disciplines';
import { cn } from '@/lib/utils';

export default function Carte() {
  const [selectedDiscipline, setSelectedDiscipline] = useState('all');
  const [selectedClub, setSelectedClub] = useState<string | null>(null);

  const filteredClubs = selectedDiscipline === 'all'
    ? clubs
    : clubs.filter((c) => c.discipline === selectedDiscipline);

  const activeClub = selectedClub ? clubs.find(c => c.id === selectedClub) : null;

  return (
    <Layout>
      <div className="relative h-[calc(100vh-80px)]">
        {/* Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200">
          {/* Simulated map */}
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* France outline simplified */}
            <path
              d="M400 100 L500 80 L600 90 L700 120 L750 180 L800 250 L820 350 L800 450 L750 520 L700 580 L650 620 L580 650 L500 680 L420 660 L350 620 L300 560 L280 480 L270 400 L290 320 L320 250 L360 180 L400 100"
              fill="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth="2"
            />
            
            {/* Rivers */}
            <path d="M450 200 Q500 300 480 400 Q450 500 500 600" stroke="#93C5FD" strokeWidth="3" fill="none" />
            <path d="M600 150 Q620 250 700 350" stroke="#93C5FD" strokeWidth="2" fill="none" />
            
            {/* Regions */}
            <circle cx="500" cy="250" r="80" fill="#F1F5F9" stroke="#CBD5E1" />
            <circle cx="650" cy="400" r="60" fill="#F1F5F9" stroke="#CBD5E1" />
            <circle cx="400" cy="450" r="70" fill="#F1F5F9" stroke="#CBD5E1" />
          </svg>
        </div>

        {/* Club Markers */}
        <div className="absolute inset-0 pointer-events-none">
          {filteredClubs.map((club, index) => {
            // Distribute clubs across the map
            const positions = [
              { top: '25%', left: '45%' },
              { top: '35%', left: '55%' },
              { top: '45%', left: '40%' },
              { top: '55%', left: '60%' },
              { top: '40%', left: '50%' },
              { top: '30%', left: '35%' },
              { top: '50%', left: '45%' },
              { top: '60%', left: '35%' },
              { top: '35%', left: '65%' },
              { top: '45%', left: '30%' },
              { top: '55%', left: '50%' },
              { top: '25%', left: '60%' },
            ];
            const pos = positions[index % positions.length];
            
            return (
              <button
                key={club.id}
                className={cn(
                  "absolute pointer-events-auto transform -translate-x-1/2 -translate-y-full transition-all duration-200",
                  selectedClub === club.id && "z-10 scale-125"
                )}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setSelectedClub(club.id)}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full shadow-lg flex items-center justify-center",
                  levels[club.level].color
                )}>
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                {selectedClub === club.id && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl p-3 w-48 animate-scale-in">
                    <p className="font-semibold text-sm text-foreground truncate">{club.name}</p>
                    <p className="text-xs text-muted-foreground">{club.city}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="absolute top-4 left-4 right-4 flex flex-col sm:flex-row gap-4 z-20">
          {/* Filter */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 flex items-center gap-3">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline}>
              <SelectTrigger className="w-48 border-0 bg-transparent">
                <SelectValue placeholder="Toutes les disciplines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les disciplines</SelectItem>
                {disciplines.slice(0, 15).map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.icon} {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stats */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-4 py-3">
            <p className="text-sm">
              <span className="font-semibold text-foreground">{filteredClubs.length}</span>
              <span className="text-muted-foreground"> clubs affichés</span>
            </p>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          <Button size="icon" variant="secondary" className="shadow-lg">
            <ZoomIn className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="secondary" className="shadow-lg">
            <ZoomOut className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="secondary" className="shadow-lg">
            <Navigation className="w-5 h-5" />
          </Button>
        </div>

        {/* Selected Club Panel */}
        {activeClub && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-20 animate-fade-up">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">
                    {disciplines.find(d => d.id === activeClub.discipline)?.icon || '🏆'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <Badge className={cn("text-white border-0 mb-1", levels[activeClub.level].color)}>
                    {levels[activeClub.level].name}
                  </Badge>
                  <h3 className="font-semibold text-foreground truncate">{activeClub.name}</h3>
                  <p className="text-sm text-muted-foreground">{activeClub.city}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Licence adulte</p>
                  <p className="font-bold text-foreground">{activeClub.licensePrice.adult}€/an</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Note</p>
                  <p className="font-bold text-foreground">⭐ {activeClub.rating}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Link to={`/club/${activeClub.id}`} className="flex-1">
                  <Button className="w-full">Voir le club</Button>
                </Link>
                <Button variant="outline" onClick={() => setSelectedClub(null)}>
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 z-10 hidden lg:block">
          <h4 className="font-semibold text-sm mb-3">Légende</h4>
          <div className="space-y-2">
            {Object.entries(levels).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={cn("w-4 h-4 rounded-full", value.color)} />
                <span className="text-sm text-muted-foreground">{value.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
