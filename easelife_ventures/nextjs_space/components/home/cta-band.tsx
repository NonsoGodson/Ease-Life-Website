import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/animate';
import { whatsappLink } from '@/lib/site-config';

export function CtaBand({
  title = 'Ready to craft your success?',
  subtitle = 'Tell us what you need and get a tailored quote. No fixed prices — just fair, custom pricing for your project.',
  message = 'Hi Ease Life Ventures, I would like to request a quote.',
}: {
  title?: string;
  subtitle?: string;
  message?: string;
}) {
  return (
    <section className="navy-gradient py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <div className="accent-rule mx-auto mt-4" />
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full gap-2 bg-[#25D366] text-white hover:bg-[#25D366]/90 sm:w-auto">
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full gap-2 bg-gold text-gold-foreground hover:bg-gold/90 sm:w-auto">
                Request a Quote
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
