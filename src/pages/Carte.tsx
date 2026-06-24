import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FranceMap } from '@/components/map/FranceMap';
import { getParentDisciplines } from '@/data/disciplines';
import { regions } from '@/data/clubs';

export default function Carte() {
  const [selectedDiscipline, setSelectedDiscipline] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  
  const parentDisciplines = getParentDisciplines();

  return (
    <Layout>
      {/* Header */}
      <section className="bg-sport-gradient text-white py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-2xl lg:text-4xl font-bold mb-2">
            Carte des clubs sportifs
          </h1>
          <p className="text-white/80 text-lg">
            Visualisez et trouvez tous les clubs de France
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-card border-b border-border sticky top-0 z-[1001]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filtres :</span>
            </div>

            <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Discipline" />
              </SelectTrigger>
              <SelectContent className="bg-card z-[2000]">
                <SelectItem value="all">Toutes les disciplines</SelectItem>
                {[...parentDisciplines].sort((a, b) => b.popularity - a.popularity).map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.icon} {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Région" />
              </SelectTrigger>
              <SelectContent className="bg-card z-[2000]">
                <SelectItem value="all">Toutes les régions</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="h-[calc(100vh-220px)]">
        <FranceMap
          height="100%"
          selectedDiscipline={selectedDiscipline}
          selectedRegion={selectedRegion}
          maxClubs={100}
        />
      </div>
    </Layout>
  );
}
