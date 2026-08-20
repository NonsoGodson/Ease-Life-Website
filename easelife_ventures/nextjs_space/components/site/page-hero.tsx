import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="navy-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #D4A017 0, transparent 40%), radial-gradient(circle at 80% 0%, #ffffff 0, transparent 35%)',
          }}
        />
      </div>
      <div className="relative mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {crumbs.length > 0 && (
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-gold">{c.label}</Link>
                ) : (
                  <span className="text-white/90">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">{eyebrow}</p>
        )}
        <h1 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
