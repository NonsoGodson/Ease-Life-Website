import { BadgeCheck, Crosshair, Target, Heart, Zap, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';

const reasons = [
  { Icon: BadgeCheck, title: 'Professional & Reliable', desc: 'Consistent, high-quality work you can depend on, every single time.' },
  { Icon: Crosshair, title: 'Accurate & Detail-Oriented', desc: 'We sweat the details so your documents and designs are flawless.' },
  { Icon: Target, title: 'Tailored to Your Goals', desc: 'Every solution is customised to your specific needs and objectives.' },
  { Icon: Heart, title: 'Dedicated to Your Success', desc: 'Your growth and satisfaction are the measure of our success.' },
  { Icon: Zap, title: 'Fast Delivery', desc: '24-hour turnaround after payment on eligible services.' },
  { Icon: ShieldCheck, title: 'Quality Guaranteed', desc: 'Confidential, plagiarism-free and built to the highest standard.' },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="section-alt py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="A partner you can trust"
            description="We combine creativity, technology and strategic thinking to turn your ideas into measurable success."
          />
        </FadeIn>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ Icon, title, desc }) => (
            <StaggerItem key={title}>
              <div className="card-hover flex h-full items-start gap-4 rounded-xl bg-card p-5 shadow-sm ring-1 ring-border">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold tracking-tight text-navy">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
