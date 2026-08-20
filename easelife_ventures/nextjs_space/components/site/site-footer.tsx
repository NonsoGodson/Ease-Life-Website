import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Logo } from './logo';
import { SocialLinks } from './social-links';
import { CurrentYear } from './current-year';
import { navLinks, siteConfig, whatsappLink } from '@/lib/site-config';
import { services } from '@/lib/services-data';

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="text-sm leading-relaxed text-white/70">
              {siteConfig.subTagline}
            </p>
            <SocialLinks variant="light" />
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-gold">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/75 transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-gold">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-white/75 transition-colors hover:text-gold"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-gold">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={whatsappLink('Hi Ease Life Ventures, I have an enquiry.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/75 transition-colors hover:text-gold"
                  suppressHydrationWarning
                >
                  {siteConfig.contact.phone} (Call / WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="break-all text-white/75 transition-colors hover:text-gold"
                  suppressHydrationWarning
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="text-white/75">{siteConfig.serviceArea}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="text-white/75">{siteConfig.businessHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs text-white/60 sm:flex-row sm:text-left">
          <p>
            &copy; <CurrentYear /> {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-medium text-gold">{siteConfig.positioning}</p>
        </div>
      </div>
    </footer>
  );
}
