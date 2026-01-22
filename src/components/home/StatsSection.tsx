import { Users, MapPin, Trophy, Star } from 'lucide-react';

const stats = [
  {
    icon: MapPin,
    value: '100K+',
    label: 'Clubs référencés',
    description: 'Partout en France',
  },
  {
    icon: Users,
    value: '2M+',
    label: 'Sportifs actifs',
    description: 'Utilisent CL-HUB',
  },
  {
    icon: Trophy,
    value: '50+',
    label: 'Disciplines',
    description: 'Sports disponibles',
  },
  {
    icon: Star,
    value: '4.8/5',
    label: 'Satisfaction',
    description: 'Note moyenne',
  },
];

export function StatsSection() {
  return (
    <section className="py-16 lg:py-20 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-background/10 mb-4">
                <stat.icon className="w-7 h-7 text-background" />
              </div>
              <div className="font-display text-3xl lg:text-4xl font-bold mb-1">
                {stat.value}
              </div>
              <div className="font-medium text-background/90 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-background/60">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
