// -----------------------------------------------------------------------------
// Ease Life Ventures Limited — central editable content configuration.
// Update company details, contact info, and social links here in one place.
// -----------------------------------------------------------------------------

export const siteConfig = {
  name: 'Ease Life Ventures Limited',
  shortName: 'Ease Life Ventures',
  tagline: 'Crafting Success. Opening Doors.',
  subTagline:
    'Your partner in professional documents, digital solutions, and brand visibility that power your goals and build your future.',
  positioning: 'More than documents. We deliver opportunities.',
  description:
    'Ease Life Ventures Limited is a business consulting and digital solutions company helping businesses, organisations, entrepreneurs, and professionals succeed through branding, technology, automation, research, and strategic business support.',
  url: 'https://www.easelifeventures.com',
  serviceArea: 'Nationwide Service (Nigeria)',
  businessHours: 'Monday – Saturday: 8:00 AM – 8:00 PM (WAT)',
  contact: {
    phone: '08037910898',
    phoneIntl: '+2348037910898',
    email: 'easelifeventures@gmail.com',
  },
  social: {
    facebook: 'https://www.facebook.com/Sweetnonny',
    instagram: 'https://www.instagram.com/nonnyboy2023',
    tiktok: 'https://tiktok.com/@nonnygodson',
    linkedin: 'https://www.linkedin.com/in/nonso-onyedumekwu-28035961',
    youtube: 'https://youtube.com/@nonsoonyedumekwu',
    twitter: 'https://x.com/NOnyedumekwu',
    threads: 'https://www.threads.com/@nonnyboy2023',
  },
};

export const WHATSAPP_NUMBER = '2348037910898';

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

export const trustBadges = [
  '100% Confidential',
  'Timely Delivery',
  'Quality Guaranteed',
  'Tailored to Your Needs',
  'Professional & Reliable Support',
];

export const whoWeHelp = [
  'Entrepreneurs',
  'Startups',
  'SMEs',
  'Academics & Students',
  'NGOs',
  'Government Contractors',
  'Job Seekers',
];
