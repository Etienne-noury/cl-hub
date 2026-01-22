import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Filter } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { disciplines, categories } from '@/data/disciplines';
import { cn } from '@/lib/utils';

export default function Disciplines() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'alpha' | 'popularity'>('popularity');

  const filteredDisciplines = disciplines
    .filter(d => {
      const matchesSearch = !searchQuery || 
        d.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || d.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'alpha') return a.name.localeCompare(b.name);
      return b.popularity - a.popularity;
    });

  return (
    <Layout>
      {/* Header */}
      <section className="bg-sport-gradient text-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl lg:text-5xl font-bold mb-4">
            Disciplines sportives
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Explorez plus de {disciplines.length} disciplines sportives pratiquées en France.
            Trouvez le sport qui vous correspond !
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher une discipline..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Sort */}
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'popularity' ? 'default' : 'outline'}
              onClick={() => setSortBy('popularity')}
            >
              Popularité
            </Button>
            <Button
              variant={sortBy === 'alpha' ? 'default' : 'outline'}
              onClick={() => setSortBy('alpha')}
            >
              A-Z
            </Button>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={!selectedCategory ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            Toutes ({disciplines.length})
          </Button>
          {Object.entries(categories).map(([key, value]) => {
            const count = disciplines.filter(d => d.category === key).length;
            return (
              <Button
                key={key}
                variant={selectedCategory === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(key)}
              >
                {value.name} ({count})
              </Button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="text-muted-foreground mb-6">
          {filteredDisciplines.length} discipline{filteredDisciplines.length > 1 ? 's' : ''} trouvée{filteredDisciplines.length > 1 ? 's' : ''}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredDisciplines.map((discipline, index) => (
            <Link
              key={discipline.id}
              to={`/recherche?discipline=${discipline.id}`}
              className="group animate-fade-up"
              style={{ animationDelay: `${index * 0.02}s` }}
            >
              <div className="bg-card rounded-2xl p-5 border border-border/50 card-hover h-full">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{discipline.icon}</span>
                  <Badge variant="secondary" className={cn(
                    "text-xs",
                    categories[discipline.category]?.color
                  )}>
                    {categories[discipline.category]?.name.split(' ')[0]}
                  </Badge>
                </div>
                
                <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {discipline.name}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {discipline.description}
                </p>
                
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <span className="text-sm text-muted-foreground">
                    {discipline.clubCount.toLocaleString()} clubs
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
