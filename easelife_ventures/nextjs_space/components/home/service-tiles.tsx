import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/services-data';
import { ServiceIcon } from '@/components/site/service-icon';
import { SectionHeading } from '@/components/site/section-heading';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';

export function ServiceTiles() {
  return (
    <section id="services" className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="What We Do"
            title="Six ways we help you succeed"
            description="From documents that win funding to websites that capture leads — everything you need to grow with confidence, delivered by one trusted partner."
          />
        </FadeIn>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="card-hover group flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-border"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                  <span className="absolute left-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/95 text-navy shadow-sm">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold tracking-tight text-navy">
                    {service.shortTitle}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors group-hover:text-gold">
                    Learn more
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
