import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Star, ArrowRight, Grid3X3, List, SlidersHorizontal, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { clubs, levels, regions } from '@/data/clubs';
import { disciplines } from '@/data/disciplines';
import { cn } from '@/lib/utils';

export default function Recherche() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedDiscipline, setSelectedDiscipline] = useState(searchParams.get('discipline') || '');
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || '');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1500]);

  // Filter clubs
  const filteredClubs = useMemo(() => {
    return clubs.filter(club => {
      const matchesSearch = !searchQuery || 
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.postalCode.includes(searchQuery);
      
      const matchesDiscipline = !selectedDiscipline || club.discipline === selectedDiscipline;
      const matchesRegion = !selectedRegion || club.region === selectedRegion;
      const matchesLevel = !selectedLevel || club.level === selectedLevel;
      const matchesPrice = club.licensePrice.adult >= priceRange[0] && 
                          club.licensePrice.adult <= priceRange[1];

      return matchesSearch && matchesDiscipline && matchesRegion && matchesLevel && matchesPrice;
    });
  }, [searchQuery, selectedDiscipline, selectedRegion, selectedLevel, priceRange]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDiscipline('');
    setSelectedRegion('');
    setSelectedLevel('');
    setPriceRange([0, 1500]);
    setSearchParams({});
  };

  const activeFiltersCount = [
    searchQuery,
    selectedDiscipline,
    selectedRegion,
    selectedLevel,
    priceRange[0] > 0 || priceRange[1] < 1500,
  ].filter(Boolean).length;

  return (
    <Layout>
      {/* Header */}
      <section className="bg-muted/30 border-b border-border py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Rechercher un club
          </h1>
          <p className="text-muted-foreground text-lg">
            {filteredClubs.length} club{filteredClubs.length > 1 ? 's' : ''} trouvé{filteredClubs.length > 1 ? 's' : ''}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-semibold text-lg">Filtres</h2>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                      Effacer
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Recherche
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Ville, code postal..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Discipline */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Discipline
                    </label>
                    <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline}>
                      <SelectTrigger>
                        <SelectValue placeholder="Toutes les disciplines" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Toutes les disciplines</SelectItem>
                        {disciplines.slice(0, 20).map((d) => (
                          <SelectItem key={d.id} value={d.id}>
                            {d.icon} {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Region */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Région
                    </label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger>
                        <SelectValue placeholder="Toutes les régions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Toutes les régions</SelectItem>
                        {regions.map((r) => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Level */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Niveau
                    </label>
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tous les niveaux" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous les niveaux</SelectItem>
                        {Object.entries(levels).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-4 block">
                      Prix licence adulte : {priceRange[0]}€ - {priceRange[1]}€
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={1500}
                      step={50}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden mb-4 gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filtres
                {activeFiltersCount > 0 && (
                  <Badge className="ml-1">{activeFiltersCount}</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filtres</SheetTitle>
                <SheetDescription>Affinez votre recherche</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                {/* Same filters as sidebar */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Recherche</label>
                  <Input
                    placeholder="Ville, code postal..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Discipline</label>
                  <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Toutes</SelectItem>
                      {disciplines.slice(0, 20).map((d) => (
                        <SelectItem key={d.id} value={d.id}>{d.icon} {d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Région</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Toutes</SelectItem>
                      {regions.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                    <X className="w-4 h-4" />
                    Effacer les filtres
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Results */}
            {filteredClubs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  Aucun club trouvé
                </h3>
                <p className="text-muted-foreground mb-6">
                  Essayez de modifier vos critères de recherche
                </p>
                <Button onClick={clearFilters}>Effacer les filtres</Button>
              </div>
            ) : (
              <div className={cn(
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              )}>
                {filteredClubs.map((club) => (
                  <Link key={club.id} to={`/club/${club.id}`}>
                    <div className={cn(
                      "bg-card rounded-2xl border border-border/50 overflow-hidden card-hover",
                      viewMode === 'list' && 'flex'
                    )}>
                      {/* Image */}
                      <div className={cn(
                        "bg-gradient-to-br from-primary/20 to-accent/20 relative",
                        viewMode === 'grid' ? 'aspect-[4/3]' : 'w-48 h-32 flex-shrink-0'
                      )}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl opacity-50">
                            {disciplines.find(d => d.id === club.discipline)?.icon || '🏆'}
                          </span>
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge className={cn("text-white border-0", levels[club.level].color)}>
                            {levels[club.level].name}
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                          <Star className="w-4 h-4 fill-warning text-warning" />
                          <span className="text-sm font-semibold">{club.rating}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1">
                        <p className="text-sm text-primary font-medium mb-1">
                          {club.disciplineName}
                        </p>
                        <h3 className="font-display font-semibold text-lg text-foreground mb-2 line-clamp-2">
                          {club.name}
                        </h3>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                          <MapPin className="w-4 h-4" />
                          <span>{club.city}, {club.region}</span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div>
                            <p className="text-xs text-muted-foreground">Licence adulte</p>
                            <p className="font-semibold text-foreground">
                              {club.licensePrice.adult}€<span className="text-muted-foreground font-normal">/an</span>
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <ArrowRight className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
