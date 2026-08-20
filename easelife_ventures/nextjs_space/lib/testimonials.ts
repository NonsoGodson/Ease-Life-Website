// Editable testimonials / social proof. Replace placeholders with real client
// feedback as it comes in. Keep entries concise (1–2 sentences).

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'They turned my rough idea into a bankable business plan that helped me secure funding. Professional, fast and detail-oriented.',
    name: 'A. Okafor',
    role: 'Startup Founder, Lagos',
    rating: 5,
  },
  {
    quote:
      'My new CV started getting me interviews within two weeks. The ATS-friendly formatting made a real difference.',
    name: 'B. Adeyemi',
    role: 'Job Seeker, Abuja',
    rating: 5,
  },
  {
    quote:
      'Delivered my dissertation support on time and plagiarism-free. Clear communication throughout the whole process.',
    name: 'C. Nwosu',
    role: 'Postgraduate Student',
    rating: 5,
  },
  {
    quote:
      'Our new website with CRM automation captures leads automatically. It has completely changed how we follow up with clients.',
    name: 'D. Ibrahim',
    role: 'SME Owner',
    rating: 5,
  },
];

// Simple, honest stats to build trust (edit as the business grows).
export const trustStats = [
  { value: 24, suffix: 'hr', label: 'Delivery After Payment' },
  { value: 100, suffix: '%', label: 'Confidential & Secure' },
  { value: 6, suffix: '', label: 'Core Service Areas' },
  { value: 7, suffix: '+', label: 'Client Types Served' },
];
