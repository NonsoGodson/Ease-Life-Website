import { Hero } from '@/components/home/hero';
import { TrustBadgeStrip } from '@/components/site/trust-badge-strip';
import { ServiceTiles } from '@/components/home/service-tiles';
import { WhyChooseUs } from '@/components/home/why-choose-us';
import { StatsBand } from '@/components/home/stats-band';
import { WhoWeHelp } from '@/components/home/who-we-help';
import { AboutPreview } from '@/components/home/about-preview';
import { Testimonials } from '@/components/home/testimonials';
import { CtaBand } from '@/components/home/cta-band';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadgeStrip />
      <ServiceTiles />
      <WhyChooseUs />
      <StatsBand />
      <WhoWeHelp />
      <AboutPreview />
      <Testimonials />
      <CtaBand />
    </>
  );
}
