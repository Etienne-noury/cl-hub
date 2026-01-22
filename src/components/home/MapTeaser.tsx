import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MapTeaser() {
  return (
    <section className="py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Navigation className="w-4 h-4" />
              Géolocalisation
            </div>
            
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Trouvez les clubs{' '}
              <span className="text-primary">près de chez vous</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Notre carte interactive vous permet de visualiser tous les clubs sportifs 
              autour de votre position. Filtrez par discipline, niveau ou prix et trouvez 
              le club parfait en quelques clics.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                'Visualisez les clubs sur une carte interactive',
                'Filtrez par discipline, niveau et tarif',
                'Obtenez l\'itinéraire vers le club',
                'Consultez les avis des membres',
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <Link to="/carte">
              <Button size="lg" className="gap-2">
                <MapPin className="w-5 h-5" />
                Explorer la carte
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Map Preview */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border/50">
              {/* Map placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200">
                {/* Simulated map elements */}
                <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                  {/* Roads */}
                  <path d="M0 150 L400 150" stroke="#CBD5E1" strokeWidth="4" />
                  <path d="M200 0 L200 300" stroke="#CBD5E1" strokeWidth="4" />
                  <path d="M50 50 L350 250" stroke="#CBD5E1" strokeWidth="2" />
                  <path d="M50 250 L350 50" stroke="#CBD5E1" strokeWidth="2" />
                  
                  {/* Water */}
                  <ellipse cx="320" cy="220" rx="60" ry="40" fill="#93C5FD" opacity="0.5" />
                  
                  {/* Parks */}
                  <circle cx="100" cy="80" r="30" fill="#86EFAC" opacity="0.5" />
                  <circle cx="280" cy="100" r="25" fill="#86EFAC" opacity="0.5" />
                </svg>
              </div>
              
              {/* Club markers */}
              <div className="absolute inset-0">
                {[
                  { top: '30%', left: '25%', color: 'bg-primary' },
                  { top: '45%', left: '55%', color: 'bg-accent' },
                  { top: '60%', left: '35%', color: 'bg-primary' },
                  { top: '25%', left: '70%', color: 'bg-success' },
                  { top: '70%', left: '65%', color: 'bg-primary' },
                ].map((marker, index) => (
                  <div
                    key={index}
                    className="absolute animate-pulse-glow"
                    style={{ top: marker.top, left: marker.left }}
                  >
                    <div className={`w-8 h-8 rounded-full ${marker.color} shadow-lg flex items-center justify-center`}>
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                  </div>
                ))}
                
                {/* User location */}
                <div
                  className="absolute"
                  style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                >
                  <div className="w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-lg animate-pulse" />
                  <div className="absolute inset-0 w-6 h-6 rounded-full bg-blue-500/30 animate-ping" />
                </div>
              </div>

              {/* Overlay card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">5 clubs à proximité</p>
                    <p className="text-sm text-muted-foreground">Dans un rayon de 5 km</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
