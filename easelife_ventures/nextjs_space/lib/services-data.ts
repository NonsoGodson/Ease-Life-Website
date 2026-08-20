// -----------------------------------------------------------------------------
// Editable service content. Add or edit services here — pages, tiles, the
// contact dropdown and service pages all read from this single source.
// -----------------------------------------------------------------------------

export type Service = {
  slug: string;
  // Stable machine tag used for CRM lead tagging.
  tag: string;
  title: string;
  shortTitle: string;
  icon: string; // lucide-react icon name
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  offerings: string[];
  highlights: string[];
  showDeliveryBadge: boolean;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: 'academic-writing',
    tag: 'academic-writing',
    title: 'Academic Writing & Research Support',
    shortTitle: 'Academic Writing',
    icon: 'GraduationCap',
    tagline: 'Rigorous, plagiarism-free academic support for every milestone.',
    description:
      'From coursework to full dissertations, we provide well-researched, properly referenced and plagiarism-free academic support tailored to your institution’s standards — helping students and researchers submit with confidence.',
    image: 'https://cdn.abacus.ai/images/fdcfb52a-6c25-49b3-8353-58f5007c503e.png',
    imageAlt: 'Academic writing and research support services in Nigeria — thesis and dissertation help',
    offerings: [
      'Essays & assignments',
      'Dissertations & theses',
      'Seminar papers',
      'Research proposals',
      'Academic editing & proofreading',
      'Plagiarism-free guarantee',
    ],
    highlights: ['Plagiarism-Free Guarantee', 'Properly Referenced', 'Confidential'],
    showDeliveryBadge: true,
    metaTitle: 'Academic Writing Services Nigeria | Thesis & Dissertation Help',
    metaDescription:
      'Professional academic writing services in Nigeria — essays, dissertations, theses, seminar papers and research proposals. Plagiarism-free, properly referenced, confidential.',
    keywords: [
      'academic writing services Nigeria',
      'thesis and dissertation help Nigeria',
      'research proposal writing Nigeria',
      'seminar paper writing Nigeria',
    ],
  },
  {
    slug: 'cv-career-documents',
    tag: 'cv-career',
    title: 'CV, Cover Letter & Career Documents',
    shortTitle: 'CV & Career Documents',
    icon: 'FileText',
    tagline: 'Stand out and land interviews with recruiter-ready documents.',
    description:
      'We craft professional, ATS-friendly CVs and compelling cover letters that position you as the ideal candidate — plus SOPs, motivation letters and full job-application support to open doors to your next opportunity.',
    image: 'https://cdn.abacus.ai/images/bb0a4ca5-a71e-4050-9f1b-e944f566c67e.png',
    imageAlt: 'Professional CV writing and career document services in Nigeria — ATS-friendly resumes',
    offerings: [
      'Professional CV writing',
      'ATS-friendly formatting',
      'Custom cover letters',
      'Job application support',
      'SOP & motivation letters',
      'Academic recommendations',
    ],
    highlights: ['ATS-Friendly', 'Recruiter-Approved Layouts', 'Fast Turnaround'],
    showDeliveryBadge: true,
    metaTitle: 'Professional CV Writing Nigeria | Cover Letters & Career Documents',
    metaDescription:
      'Professional CV writing in Nigeria — ATS-friendly resumes, custom cover letters, SOPs and motivation letters. Stand out and land more interviews.',
    keywords: [
      'professional CV writing Nigeria',
      'ATS-friendly CV Nigeria',
      'cover letter writing Nigeria',
      'SOP writing Nigeria',
    ],
  },
  {
    slug: 'business-strategy-documents',
    tag: 'business-documents',
    title: 'Business & Strategy Documents',
    shortTitle: 'Business Documents',
    icon: 'Briefcase',
    tagline: 'Investor-ready documents that win funding and partnerships.',
    description:
      'We develop persuasive, well-structured business and strategy documents — from bankable business plans and feasibility studies to grant applications and company profiles — that help you secure funding, partners and contracts.',
    image: 'https://cdn.abacus.ai/images/408773f1-5c7a-4e13-83a3-460074ad219f.png',
    imageAlt: 'Business plan and strategy document writing services in Nigeria — grant proposals and feasibility studies',
    offerings: [
      'Business plans & feasibility studies',
      'Business proposals',
      'Grant & funding applications',
      'Company profiles & corporate brochures',
      'MOUs, partnership & sponsorship proposals',
      'Project concept notes',
      'Market research & analysis',
      'Financial projections & reports',
    ],
    highlights: ['Investor-Ready', 'Data-Driven', 'Funding-Focused'],
    showDeliveryBadge: true,
    metaTitle: 'Business Plan Writer Nigeria | Grant & Feasibility Study Writing',
    metaDescription:
      'Business plan writer in Nigeria — feasibility studies, grant proposals, company profiles, financial projections and market research that win funding and partnerships.',
    keywords: [
      'business plan writer Lagos',
      'grant proposal writing Nigeria',
      'feasibility study Nigeria',
      'company profile design Nigeria',
    ],
  },
  {
    slug: 'branding-design',
    tag: 'branding',
    title: 'Branding & Design',
    shortTitle: 'Branding & Design',
    icon: 'Palette',
    tagline: 'A distinctive identity that makes your brand unforgettable.',
    description:
      'We build memorable brand identities — from logo design and branded letterheads to your mission, vision and core values — giving your business a professional, cohesive look that earns trust and stands out.',
    image: 'https://cdn.abacus.ai/images/50f2da77-7639-4969-aa78-ca1a0c8887d0.png',
    imageAlt: 'Logo design and branding services in Nigeria — letterhead and corporate identity design',
    offerings: [
      'Company & business logo design',
      'Letterheaded paper design',
      'Core values development',
      'Mission & vision development',
      'Cohesive brand identity',
    ],
    highlights: ['Unique Concepts', 'Print-Ready Files', 'Full Ownership'],
    showDeliveryBadge: true,
    metaTitle: 'Logo Design & Branding Nigeria | Corporate Identity Design',
    metaDescription:
      'Professional logo design and branding in Nigeria — business logos, branded letterheads, and mission, vision & core values development for a standout identity.',
    keywords: [
      'logo design Nigeria',
      'branding services Nigeria',
      'corporate identity design Nigeria',
      'letterhead design Nigeria',
    ],
  },
  {
    slug: 'digital-solutions',
    tag: 'web-digital',
    title: 'Digital Solutions',
    shortTitle: 'Digital Solutions',
    icon: 'Globe',
    tagline: 'SEO-optimised websites with built-in CRM automation.',
    description:
      'We design fast, mobile-first, SEO-optimised business websites with built-in CRM automation — capturing leads, automating follow-ups and giving your business a professional online presence that converts visitors into customers. (This very website is an example.)',
    image: 'https://cdn.abacus.ai/images/68bb8a09-fbe4-4f86-8489-bd54d9d66553.png',
    imageAlt: 'SEO website design and CRM automation services in Nigeria — business websites',
    offerings: [
      'SEO-optimised business websites',
      'CRM automation & lead capture',
      'Mobile-first responsive design',
      'Automated email follow-ups',
      'Admin lead-management dashboard',
    ],
    highlights: ['SEO-Optimised', 'CRM Automation', 'Mobile-First'],
    showDeliveryBadge: false,
    metaTitle: 'SEO Website Design Nigeria | Business Websites with CRM Automation',
    metaDescription:
      'SEO website design in Nigeria — fast, mobile-first business websites with CRM automation and lead capture that turn visitors into customers.',
    keywords: [
      'SEO website design Nigeria',
      'CRM automation Nigeria',
      'business website design Nigeria',
      'web developer Nigeria',
    ],
  },
  {
    slug: 'it-support',
    tag: 'it-support',
    title: 'Remote IT Support & Consultancy',
    shortTitle: 'IT Support',
    icon: 'Laptop',
    tagline: '24-hour turnaround. Remote & on-site ready. All brands covered.',
    description:
      'Reliable remote and on-site IT support for individuals and SMEs — troubleshooting, repairs, maintenance and upgrades with a 24-hour turnaround after payment confirmation. All brands and operating systems of your devices are covered.',
    image: 'https://cdn.abacus.ai/images/fd12350a-75f9-4477-b72b-b55a7a1c5cc7.png',
    imageAlt: 'Remote IT support and laptop repair services in Nigeria — hardware and software support',
    offerings: [
      'Remote troubleshooting',
      'Hardware & software repairs',
      'Laptop & desktop maintenance',
      'Hardware & software upgrades',
      'Tech consultancy for individuals & SMEs',
    ],
    highlights: [
      '24-Hour Turnaround After Payment',
      'Remote & On-Site Ready',
      'All Brands & Operating Systems Covered',
    ],
    showDeliveryBadge: true,
    metaTitle: 'Remote IT Support Nigeria | Laptop Repair & Tech Consultancy',
    metaDescription:
      'Remote IT support in Nigeria — troubleshooting, laptop and desktop repairs, upgrades and tech consultancy. 24-hour turnaround, remote & on-site, all brands covered.',
    keywords: [
      'remote IT support Nigeria',
      'laptop repair services Nigeria',
      'IT consultancy Nigeria',
      'computer repair Nigeria',
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

// Options for the contact form service dropdown + CRM tagging.
export const serviceOptions = services.map((s) => ({
  value: s.tag,
  label: s.shortTitle,
  fullTitle: s.title,
}));

export const serviceTagToLabel: Record<string, string> = services.reduce(
  (acc, s) => {
    acc[s.tag] = s.title;
    return acc;
  },
  { general: 'General Enquiry' } as Record<string, string>
);
