import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { PopularDisciplines } from '@/components/home/PopularDisciplines';
import { FeaturedClubs } from '@/components/home/FeaturedClubs';
import { MapTeaser } from '@/components/home/MapTeaser';
import { StatsSection } from '@/components/home/StatsSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <PopularDisciplines />
      <FeaturedClubs />
      <MapTeaser />
      <StatsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
