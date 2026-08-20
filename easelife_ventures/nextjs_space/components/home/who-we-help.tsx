import { Users } from 'lucide-react';
import { whoWeHelp } from '@/lib/site-config';
import { SectionHeading } from '@/components/site/section-heading';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';

export function WhoWeHelp() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Who We Help"
            title="Built for ambitious people & organisations"
            description="Whoever you are, we have the expertise to move your goals forward."
          />
        </FadeIn>
        <Stagger className="mt-10 flex flex-wrap justify-center gap-3">
          {whoWeHelp.map((group) => (
            <StaggerItem key={group}>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition-colors hover:bg-gold hover:text-gold-foreground">
                <Users className="h-4 w-4 text-gold" />
                {group}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
