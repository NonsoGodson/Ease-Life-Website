import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/testimonials';
import { SectionHeading } from '@/components/site/section-heading';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Social Proof"
            title="What our clients say"
            description="Real results, real relationships. (Sample testimonials — easily updated as new reviews arrive.)"
          />
        </FadeIn>
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="card-hover flex h-full flex-col rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
                <Quote className="h-8 w-8 text-gold/40" />
                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-navy">
                  “{t.quote}”
                </blockquote>
                <div className="mt-4 flex items-center gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <figcaption className="mt-3 border-t border-border pt-3">
                  <p className="font-display text-sm font-bold text-navy">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
