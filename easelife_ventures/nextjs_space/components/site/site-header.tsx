'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { navLinks, whatsappLink, siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div
        className={cn(
          'w-full transition-all duration-normal',
          scrolled
            ? 'bg-white/90 shadow-md backdrop-blur-md'
            : 'bg-white/70 backdrop-blur-sm'
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive(link.href)
                    ? 'text-navy'
                    : 'text-muted-foreground hover:text-navy'
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="mx-3 mt-0.5 block h-0.5 rounded-full bg-gold" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={`tel:${siteConfig.contact.phoneIntl}`}>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Phone className="h-4 w-4" />
                Call
              </Button>
            </a>
            <a
              href={whatsappLink('Hi Ease Life Ventures, I would like to request a quote.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" className="bg-gold text-gold-foreground hover:bg-gold/90">
                Request a Quote
              </Button>
            </a>
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-border bg-white lg:hidden"
            >
              <div className="space-y-1 px-4 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'block rounded-md px-3 py-2.5 text-base font-medium transition-colors',
                      isActive(link.href)
                        ? 'bg-secondary text-navy'
                        : 'text-muted-foreground hover:bg-secondary hover:text-navy'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 pt-3">
                  <a href={`tel:${siteConfig.contact.phoneIntl}`}>
                    <Button variant="outline" className="w-full gap-1.5">
                      <Phone className="h-4 w-4" />
                      Call {siteConfig.contact.phone}
                    </Button>
                  </a>
                  <a
                    href={whatsappLink('Hi Ease Life Ventures, I would like to request a quote.')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
                      Request a Quote
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
