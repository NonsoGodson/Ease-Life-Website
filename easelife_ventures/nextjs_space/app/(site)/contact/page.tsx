import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Phone, Mail, MessageCircle, Clock, MapPin, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { ContactForm } from '@/components/site/contact-form';
import { SocialLinks } from '@/components/site/social-links';
import { FadeIn, SlideIn } from '@/components/ui/animate';
import { siteConfig, whatsappLink } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Ease Life Ventures Limited for professional documents, branding, digital solutions and IT support. Call or WhatsApp 08037910898, email easelifeventures@gmail.com. Nationwide service across Nigeria — response within 24 hours.',
  keywords: [
    'contact Ease Life Ventures',
    'business services Nigeria contact',
    'request a quote Nigeria',
    'WhatsApp business support Nigeria',
  ],
  alternates: { canonical: '/contact' },
};

const waMessage =
  'Hi Ease Life Ventures, I would like to enquire about your services.';

export default function ContactPage() {
  const contactCards = [
    {
      Icon: Phone,
      label: 'Call Us',
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phoneIntl}`,
      note: 'Speak to our team directly',
    },
    {
      Icon: MessageCircle,
      label: 'WhatsApp',
      value: siteConfig.contact.phone,
      href: whatsappLink(waMessage),
      note: 'Fastest way to reach us',
      external: true,
    },
    {
      Icon: Mail,
      label: 'Email',
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      note: 'We reply within 24 hours',
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Let’s craft your success"
        description="Tell us what you need and we’ll respond within 24 hours with a tailored quote. No fixed prices — just fair, custom pricing for your project."
        crumbs={[{ label: 'Contact' }]}
      />

      {/* Quick contact cards */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {contactCards.map(({ Icon, label, value, href, note, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="card-hover group flex flex-col items-start gap-3 rounded-xl bg-card p-6 shadow-sm ring-1 ring-border"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/5 text-navy transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">{label}</p>
                  <p className="mt-0.5 font-display text-lg font-bold text-navy" suppressHydrationWarning>{value}</p>
                  <p className="text-sm text-muted-foreground">{note}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="section-alt py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <FadeIn>
                <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">Send us a message</h2>
                <div className="accent-rule mt-3" />
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Fill in the form and attach any brief or reference file. We’ll get back to you promptly.
                </p>
                <div className="mt-6">
                  <Suspense fallback={<div className="rounded-xl bg-card p-8 text-center text-muted-foreground shadow-sm ring-1 ring-border">Loading form…</div>}>
                    <ContactForm />
                  </Suspense>
                </div>
              </FadeIn>
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-2">
              <SlideIn from="right">
                <div className="space-y-6">
                  <div className="rounded-xl bg-navy p-6 text-white shadow-sm">
                    <h3 className="font-display text-lg font-bold">Business Hours</h3>
                    <div className="accent-rule mt-3" />
                    <p className="mt-4 flex items-start gap-3 text-sm text-white/80">
                      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <span>{siteConfig.businessHours}</span>
                    </p>
                    <p className="mt-3 flex items-start gap-3 text-sm text-white/80">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <span>{siteConfig.serviceArea}</span>
                    </p>
                  </div>

                  <a
                    href={whatsappLink(waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-hover group flex items-center justify-between gap-3 rounded-xl bg-[#25D366] p-6 text-white shadow-sm"
                  >
                    <span className="flex items-center gap-3">
                      <MessageCircle className="h-8 w-8" />
                      <span>
                        <span className="block font-display text-lg font-bold">Chat on WhatsApp</span>
                        <span className="block text-sm text-white/90">Get an instant reply</span>
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>

                  <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
                    <h3 className="font-display text-lg font-bold text-navy">Follow Us</h3>
                    <div className="accent-rule mt-3" />
                    <p className="mt-4 text-sm text-muted-foreground">Connect with Ease Life Ventures across social media.</p>
                    <SocialLinks variant="dark" className="mt-4" />
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>

          {/* Map */}
          <div className="mt-12 overflow-hidden rounded-xl shadow-sm ring-1 ring-border">
            <iframe
              title="Ease Life Ventures service area — Nigeria"
              src="https://www.google.com/maps?q=Nigeria&output=embed"
              width="100%"
              height="360"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full border-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
