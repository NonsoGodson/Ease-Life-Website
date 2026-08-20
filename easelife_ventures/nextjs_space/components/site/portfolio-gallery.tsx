'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lock, MessageCircle, Eye, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Stagger, StaggerItem } from '@/components/ui/animate';
import { portfolioItems, type PortfolioItem } from '@/lib/portfolio-data';
import { whatsappLink } from '@/lib/site-config';

export function PortfolioGallery() {
  const categories = ['All', ...Array.from(new Set(portfolioItems.map((p) => p?.category ?? '')))];
  const [active, setActive] = useState<string>('All');

  const filtered =
    active === 'All'
      ? portfolioItems
      : portfolioItems.filter((p) => p?.category === active);

  return (
    <div>
      {/* Category filters */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={[
              'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
              active === c
                ? 'bg-navy text-white shadow-sm'
                : 'bg-secondary text-navy hover:bg-navy/10',
            ].join(' ')}
          >
            {c}
          </button>
        ))}
      </div>

      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <StaggerItem key={item?.id}>
            <PortfolioCard item={item} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const message = `Hi Ease Life Ventures, I saw the "${item?.title ?? 'sample'}" on your portfolio. Please share a full sample and a quote.`;

  return (
    <figure className="card-hover group flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-border">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={item?.image ?? ''}
          alt={item?.imageAlt ?? 'Portfolio sample'}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover blur-[6px] scale-105 transition-all duration-500 group-hover:blur-[3px]"
        />
        {/* Watermark + protection overlay */}
        <div className="absolute inset-0 bg-navy/45" aria-hidden="true" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white ring-1 ring-white/30 backdrop-blur-sm">
            <Lock className="h-3 w-3" />
            Sample Preview
          </span>
          <p className="font-display text-lg font-bold text-white drop-shadow">Ease Life Ventures</p>
          <p className="text-xs text-white/70">Full sample shared privately on request</p>
        </div>
        {/* Repeating diagonal watermark ribbon */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 22px)',
          }}
        />
      </div>

      <figcaption className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">{item?.category}</p>
        <h3 className="mt-1 font-display text-lg font-bold text-navy">{item?.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item?.description}</p>
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4"
        >
          <Button variant="outline" className="w-full gap-2 border-navy/20 text-navy hover:bg-navy hover:text-white">
            <MessageCircle className="h-4 w-4" />
            Request Full Sample
          </Button>
        </a>
      </figcaption>
    </figure>
  );
}

export function PortfolioNote() {
  return (
    <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-3 rounded-xl bg-secondary p-6 text-center sm:flex-row sm:text-left">
      <ShieldCheck className="h-10 w-10 shrink-0 text-gold" />
      <p className="text-sm leading-relaxed text-navy">
        <strong>Why are samples blurred?</strong> To protect our clients&apos; confidential work, previews
        are watermarked. We&apos;ll gladly share relevant full samples privately once we understand your
        project. <Eye className="inline h-4 w-4 text-gold" /> Just ask.
      </p>
    </div>
  );
}
