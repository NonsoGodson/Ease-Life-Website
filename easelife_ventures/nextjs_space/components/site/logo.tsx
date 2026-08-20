import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  variant = 'dark',
  showText = true,
}: {
  className?: string;
  variant?: 'dark' | 'light';
  showText?: boolean;
}) {
  const textColor = variant === 'light' ? 'text-white' : 'text-navy';
  const subColor = variant === 'light' ? 'text-white/70' : 'text-muted-foreground';

  return (
    <Link href="/" className={cn('flex items-center gap-2.5 group', className)} aria-label="Ease Life Ventures Limited home">
      <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy shadow-sm">
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden="true">
          {/* gear */}
          <path
            d="M16 3.2l1.6.9 1.8-.3.9 1.6 1.6.9-.3 1.8.9 1.6-1 1.5 1 1.5-.9 1.6.3 1.8-1.6.9-.9 1.6-1.8-.3-1.6.9-1.6-.9-1.8.3-.9-1.6-1.6-.9.3-1.8-.9-1.6 1-1.5-1-1.5.9-1.6-.3-1.8 1.6-.9.9-1.6 1.8.3z"
            stroke="#D4A017"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* quill nib */}
          <path
            d="M20.5 11.5L13 19l-1.6 3.6 3.6-1.6 7.5-7.5-2-2z"
            fill="#ffffff"
          />
          <path d="M13 19l3 3" stroke="#D4A017" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </span>
      {showText && (
        <span className="flex flex-col leading-none">
          <span className={cn('font-display text-[15px] font-bold tracking-tight', textColor)}>
            Ease Life Ventures
          </span>
          <span className={cn('text-[10px] font-medium tracking-wide', subColor)}>
            Crafting Success. Opening Doors.
          </span>
        </span>
      )}
    </Link>
  );
}
