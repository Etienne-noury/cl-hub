import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { clubs, levels } from '@/data/clubs';
import { cn } from '@/lib/utils';

export function FeaturedClubs() {
  // Get top rated clubs
  const featuredClubs = [...clubs]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Clubs recommandés
            </h2>
            <p className="text-muted-foreground text-lg">
              Les clubs les mieux notés par notre communauté
            </p>
          </div>
          <Link to="/recherche">
            <Button variant="outline" className="gap-2">
              Voir tous les clubs
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredClubs.map((club, index) => (
            <Link
              key={club.id}
              to={`/club/${club.id}`}
              className="group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-card rounded-2xl border border-border/50 overflow-hidden card-hover h-full flex flex-col">
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl opacity-50">
                      {club.discipline === 'football' ? '⚽' :
                       club.discipline === 'tennis' ? '🎾' :
                       club.discipline === 'natation' ? '🏊' :
                       club.discipline === 'judo' ? '🥋' :
                       club.discipline === 'basketball' ? '🏀' :
                       club.discipline === 'equitation' ? '🏇' :
                       club.discipline === 'yoga' ? '🧘' :
                       club.discipline === 'escalade' ? '🧗' :
                       club.discipline === 'trail' ? '🏃' :
                       club.discipline === 'padel' ? '🎾' : '🏆'}
                    </span>
                  </div>
                  
                  {/* Level badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className={cn(
                      "text-white border-0",
                      levels[club.level].color
                    )}>
                      {levels[club.level].name}
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="text-sm font-semibold">{club.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex-1">
                    <p className="text-sm text-primary font-medium mb-1">
                      {club.disciplineName}
                    </p>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {club.name}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{club.city}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Licence adulte</p>
                      <p className="font-semibold text-foreground">
                        {club.licensePrice.adult}€<span className="text-muted-foreground font-normal">/an</span>
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
