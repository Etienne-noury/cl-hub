import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Navigation, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FranceMap } from '@/components/map/FranceMap';
import { getParentDisciplines } from '@/data/disciplines';

export function InteractiveMapSection() {
  const [selectedDiscipline, setSelectedDiscipline] = useState('all');
  const parentDisciplines = getParentDisciplines().slice(0, 20); // Top 20 disciplines

  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
              <Navigation className="w-4 h-4" />
              Carte interactive
            </div>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              Trouvez les clubs <span className="text-primary">près de chez vous</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter */}
            <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline}>
              <SelectTrigger className="w-[200px] bg-card">
                <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Filtrer par sport" />
              </SelectTrigger>
              <SelectContent className="bg-card z-[2000]">
                <SelectItem value="all">Tous les sports</SelectItem>
                {parentDisciplines.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.icon} {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Link to="/carte">
              <Button variant="outline" className="gap-2">
                Voir en plein écran
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Map */}
        <FranceMap 
          height="450px" 
          selectedDiscipline={selectedDiscipline}
        />

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { icon: '📍', text: 'Localisation précise' },
            { icon: '🔍', text: 'Filtrage par sport' },
            { icon: '⭐', text: 'Avis des membres' },
            { icon: '🗺️', text: 'Itinéraire GPS' },
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-lg">{feature.icon}</span>
              {feature.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
