import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { services, getService } from '@/lib/services-data';
import { PageHero } from '@/components/site/page-hero';
import { ServiceIcon } from '@/components/site/service-icon';
import { DeliveryBadge } from '@/components/site/delivery-badge';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { CtaBand } from '@/components/home/cta-band';
import { whatsappLink } from '@/lib/site-config';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      images: [{ url: service.image, alt: service.imageAlt }],
    },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.tagline}
        crumbs={[{ label: 'Services', href: '/services' }, { label: service.shortTitle }]}
      />

      <section className="py-14 sm:py-20">
        <div className="mx-auto grid w-full max-w-[1200px] items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <FadeIn>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted shadow-lg ring-1 ring-border">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {service.showDeliveryBadge && (
              <div className="mt-4">
                <DeliveryBadge />
              </div>
            )}
          </FadeIn>

          <FadeIn>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white">
              <ServiceIcon name={service.icon} className="h-6 w-6" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              What we offer
            </h2>
            <div className="accent-rule mt-3" />
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {service.description}
            </p>
            <ul className="mt-6 grid gap-2.5">
              {service.offerings.map((o) => (
                <li key={o} className="flex items-start gap-2.5 rounded-lg bg-secondary/60 px-3 py-2.5 text-sm font-medium text-navy">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {o}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-alt py-14 sm:py-16">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <Stagger className="grid gap-5 sm:grid-cols-3">
            {service.highlights.map((h) => (
              <StaggerItem key={h}>
                <div className="flex h-full items-center gap-3 rounded-xl bg-card p-5 shadow-sm ring-1 ring-border">
                  <Sparkles className="h-5 w-5 shrink-0 text-gold" />
                  <span className="font-display text-sm font-bold text-navy">{h}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={whatsappLink(`Hi, I am interested in ${service.shortTitle}. Please share details and a quote.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="w-full gap-2 bg-[#25D366] text-white hover:bg-[#25D366]/90 sm:w-auto">
                <MessageCircle className="h-5 w-5" />
                Enquire on WhatsApp
              </Button>
            </a>
            <Link href={`/contact?service=${service.tag}`}>
              <Button size="lg" className="w-full gap-2 bg-gold text-gold-foreground hover:bg-gold/90 sm:w-auto">
                Request a Quote
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold tracking-tight text-navy">Explore more services</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="card-hover group flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm ring-1 ring-border"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                  <ServiceIcon name={o.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-sm font-bold text-navy group-hover:text-gold">
                  {o.shortTitle}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand message={`Hi, I would like a quote for ${service.shortTitle}.`} />
    </>
  );
}
