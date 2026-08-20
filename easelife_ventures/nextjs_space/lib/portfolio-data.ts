// -----------------------------------------------------------------------------
// Editable portfolio / sample-work gallery. These are representative previews
// only — actual samples are shared privately on request to protect client work.
// -----------------------------------------------------------------------------

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  serviceTag: string; // maps to a contact-form service value
  description: string;
  image: string;
  imageAlt: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'business-plan',
    title: 'Investor-Ready Business Plan',
    category: 'Business Documents',
    serviceTag: 'business-documents',
    description:
      'A bankable business plan with market analysis, financial projections and a clear growth roadmap — formatted to impress investors and lenders.',
    image: 'https://cdn.abacus.ai/images/04c7ef8c-228c-447e-82be-cea56d66e61c.png',
    imageAlt: 'Sample professional business plan document prepared by Ease Life Ventures',
  },
  {
    id: 'cv-resume',
    title: 'Professional CV & Résumé',
    category: 'CV & Career Documents',
    serviceTag: 'cv-career',
    description:
      'ATS-friendly, recruiter-optimised CVs and cover letters that position candidates to stand out and land interviews.',
    image: 'https://cdn.abacus.ai/images/ee2bd5ff-cec6-43d8-8e6e-6d2cb30b3d26.png',
    imageAlt: 'Sample professional CV and résumé design by Ease Life Ventures',
  },
  {
    id: 'logo-brand',
    title: 'Logo & Brand Identity',
    category: 'Branding & Design',
    serviceTag: 'branding',
    description:
      'Distinctive logos and cohesive brand identity kits — colours, typography and assets that make businesses memorable.',
    image: 'https://cdn.abacus.ai/images/1951e099-533e-4973-a6a5-30d0e44fcae0.png',
    imageAlt: 'Sample logo and brand identity design by Ease Life Ventures',
  },
  {
    id: 'company-profile',
    title: 'Corporate Company Profile',
    category: 'Business Documents',
    serviceTag: 'business-documents',
    description:
      'Polished company profiles that tell your story, showcase capabilities and win the trust of clients and partners.',
    image: 'https://cdn.abacus.ai/images/33b4bfc6-4e1f-4a3f-a254-e05cad30fcc8.png',
    imageAlt: 'Sample corporate company profile document by Ease Life Ventures',
  },
  {
    id: 'grant-proposal',
    title: 'Grant & Funding Proposal',
    category: 'Business Documents',
    serviceTag: 'business-documents',
    description:
      'Persuasive, well-structured grant and funding proposals crafted to meet donor requirements and unlock support.',
    image: 'https://cdn.abacus.ai/images/7852911c-28a2-45f1-ae63-f73edb8b3db1.png',
    imageAlt: 'Sample grant and funding proposal document by Ease Life Ventures',
  },
  {
    id: 'website-design',
    title: 'Business Website Design',
    category: 'Digital Solutions',
    serviceTag: 'web-digital',
    description:
      'Modern, mobile-responsive websites and landing pages that turn visitors into customers and build online credibility.',
    image: 'https://cdn.abacus.ai/images/87911643-68aa-4d3a-b8c0-0b84d6630c86.png',
    imageAlt: 'Sample business website design by Ease Life Ventures',
  },
];
