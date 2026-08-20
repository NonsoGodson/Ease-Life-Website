import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideIn } from '@/components/ui/animate';

const ABOUT_IMAGE = 'https://cdn.abacus.ai/images/3bf6ed02-db54-43ef-aac7-b7e1711cf620.png';

const points = [
  'Business consulting & digital transformation',
  'Branding, UI/UX & website development',
  'CRM automation & professional documentation',
];

export function AboutPreview() {
  return (
    <section className="section-alt py-16 sm:py-24">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <SlideIn from="left">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted shadow-lg ring-1 ring-border">
            <Image
              src={ABOUT_IMAGE}
              alt="The Ease Life Ventures team collaborating on client projects in Nigeria"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </SlideIn>
        <FadeIn>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">About Us</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Building Better Businesses Through Innovation
          </h2>
          <div className="accent-rule mt-4" />
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Ease Life Ventures Limited is a business consulting and digital solutions
            company helping businesses, organisations, entrepreneurs, and professionals
            succeed through branding, technology, automation, research, and strategic
            business support.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm font-medium text-navy">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                {p}
              </li>
            ))}
          </ul>
          <Link href="/about" className="mt-8 inline-block">
            <Button size="lg" className="gap-2">
              Our Story
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
