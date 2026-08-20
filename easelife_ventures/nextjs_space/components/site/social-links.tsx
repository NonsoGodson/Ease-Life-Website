import { Facebook, Instagram, Linkedin, Youtube, Twitter, AtSign, Music2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

const links = [
  { href: siteConfig.social.facebook, label: 'Facebook', Icon: Facebook },
  { href: siteConfig.social.instagram, label: 'Instagram', Icon: Instagram },
  { href: siteConfig.social.tiktok, label: 'TikTok', Icon: Music2 },
  { href: siteConfig.social.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: siteConfig.social.youtube, label: 'YouTube', Icon: Youtube },
  { href: siteConfig.social.twitter, label: 'Twitter / X', Icon: Twitter },
  { href: siteConfig.social.threads, label: 'Threads', Icon: AtSign },
];

export function SocialLinks({
  className,
  variant = 'light',
}: {
  className?: string;
  variant?: 'light' | 'dark';
}) {
  const base =
    variant === 'light'
      ? 'bg-white/10 text-white hover:bg-gold hover:text-gold-foreground'
      : 'bg-navy/5 text-navy hover:bg-gold hover:text-gold-foreground';
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-fast hover:scale-110',
            base
          )}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
