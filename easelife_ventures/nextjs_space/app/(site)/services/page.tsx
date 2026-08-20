import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight, MessageCircle } from 'lucide-react';
import { services } from '@/lib/services-data';
import { PageHero } from '@/components/site/page-hero';
import { ServiceIcon } from '@/components/site/service-icon';
import { DeliveryBadge } from '@/components/site/delivery-badge';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/animate';
import { CtaBand } from '@/components/home/cta-band';
import { whatsappLink } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Our Services | Professional Documents, Branding & IT Support Nigeria',
  description:
    'Explore Ease Life Ventures services: academic writing, CV & career documents, business plans & grant proposals, branding & design, SEO websites with CRM automation, and remote IT support across Nigeria.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Everything you need to grow, in one place"
        description="Six professional service areas built to help entrepreneurs, students, job seekers, SMEs, NGOs and government contractors succeed. No fixed prices — contact us for a tailored quote."
        crumbs={[{ label: 'Services' }]}
      />

      {/* Quick anchor tiles */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap justify-center gap-2 px-4 py-5 sm:px-6 lg:px-8">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-gold hover:text-gold-foreground"
            >
              <ServiceIcon name={s.icon} className="h-4 w-4" />
              {s.shortTitle}
            </a>
          ))}
        </div>
      </div>

      {services.map((service, idx) => (
        <section
          key={service.slug}
          id={service.slug}
          className={cn('scroll-mt-24 py-16 sm:py-20', idx % 2 === 1 && 'section-alt')}
        >
          <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <FadeIn className={cn(idx % 2 === 1 && 'lg:order-2')}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted shadow-lg ring-1 ring-border">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn className={cn(idx % 2 === 1 && 'lg:order-1')}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white">
                  <ServiceIcon name={service.icon} className="h-6 w-6" />
                </span>
                {service.showDeliveryBadge && <DeliveryBadge />}
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                {service.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {service.offerings.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-navy">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {o}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href={`/services/${service.slug}`}>
                  <Button className="w-full gap-2 sm:w-auto">
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a
                  href={whatsappLink(`Hi, I am interested in ${service.shortTitle}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full gap-2 sm:w-auto">
                    <MessageCircle className="h-4 w-4" />
                    Enquire on WhatsApp
                  </Button>
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
