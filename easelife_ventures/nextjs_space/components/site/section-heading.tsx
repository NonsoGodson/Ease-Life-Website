import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  variant = 'dark',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: 'center' | 'left';
  variant?: 'dark' | 'light';
  className?: string;
}) {
  const isLight = variant === 'light';
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'mb-2 text-sm font-semibold uppercase tracking-wider',
            isLight ? 'text-gold' : 'text-gold'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'font-display text-3xl font-bold tracking-tight sm:text-4xl',
          isLight ? 'text-white' : 'text-navy'
        )}
      >
        {title}
      </h2>
      <div className={cn('accent-rule mt-4', align === 'center' && 'mx-auto')} />
      {description && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed',
            isLight ? 'text-white/80' : 'text-muted-foreground'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
