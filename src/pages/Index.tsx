import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { InteractiveMapSection } from '@/components/home/InteractiveMapSection';
import { PopularDisciplines } from '@/components/home/PopularDisciplines';
import { FeaturedClubs } from '@/components/home/FeaturedClubs';
import { StatsSection } from '@/components/home/StatsSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <InteractiveMapSection />
      <PopularDisciplines />
      <FeaturedClubs />
      <StatsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
