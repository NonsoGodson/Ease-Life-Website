import { siteConfig } from '@/lib/site-config';

// Injects LocalBusiness / ProfessionalService JSON-LD for SEO with NAP consistency.
export function LocalBusinessSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneIntl,
    email: siteConfig.contact.email,
    image: `${siteConfig.url}/og-image.png`,
    slogan: siteConfig.tagline,
    areaServed: { '@type': 'Country', name: 'Nigeria' },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NG',
      addressRegion: 'Nigeria',
    },
    priceRange: 'Contact for a quote',
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.tiktok,
      siteConfig.social.linkedin,
      siteConfig.social.youtube,
      siteConfig.social.twitter,
      siteConfig.social.threads,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
