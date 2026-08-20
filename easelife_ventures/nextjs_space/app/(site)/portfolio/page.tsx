import type { Metadata } from 'next';
import { PageHero } from '@/components/site/page-hero';
import { CtaBand } from '@/components/home/cta-band';
import { SectionHeading } from '@/components/site/section-heading';
import { FadeIn } from '@/components/ui/animate';
import {
  PortfolioGallery,
  PortfolioNote,
} from '@/components/site/portfolio-gallery';

export const metadata: Metadata = {
  title: 'Portfolio & Work Samples',
  description:
    'Explore sample business plans, CVs, logos, company profiles, grant proposals and websites crafted by Ease Life Ventures Limited. Request full samples privately — nationwide service across Nigeria.',
  keywords: [
    'business document samples Nigeria',
    'CV samples Nigeria',
    'logo design portfolio Nigeria',
    'business plan sample Nigeria',
    'company profile sample Nigeria',
  ],
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Portfolio & Work Samples"
        description="A glimpse of the professional documents, brands and digital products we create. Previews are watermarked to protect client confidentiality — request relevant full samples any time."
        crumbs={[{ label: 'Portfolio' }]}
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              eyebrow="Samples"
              title={<>A track record of <span className="gold-text">quality</span></>}
              description="Filter by service to see representative examples of what we deliver for our clients."
            />
          </FadeIn>
          <div className="mt-12">
            <PortfolioGallery />
            <PortfolioNote />
          </div>
        </div>
      </section>

      <CtaBand
        title="Like what you see?"
        subtitle="Let us craft something just as polished for you. Share your project and get a tailored quote."
        message="Hi Ease Life Ventures, I viewed your portfolio and would like to discuss a project."
      />
    </>
  );
}
