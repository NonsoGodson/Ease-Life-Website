import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Target,
  Eye,
  ShieldCheck,
  Lightbulb,
  Award,
  Users,
  Handshake,
  GraduationCap,
  Quote,
} from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { SectionHeading } from '@/components/site/section-heading';
import { FadeIn, SlideIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { CtaBand } from '@/components/home/cta-band';

export const metadata: Metadata = {
  title: 'About Us | Business Solutions & Digital Transformation Nigeria',
  description:
    'Learn about Ease Life Ventures Limited — a business consulting and digital solutions company in Nigeria delivering branding, technology, automation, research and strategic support. Your Vision. Our Expertise. Your Success.',
  alternates: { canonical: '/about' },
};

const ABOUT_IMAGE = 'https://cdn.abacus.ai/images/3bf6ed02-db54-43ef-aac7-b7e1711cf620.png';

const coreValues = [
  { Icon: ShieldCheck, title: 'Integrity', desc: 'We conduct every engagement with honesty, transparency, and accountability.' },
  { Icon: Lightbulb, title: 'Innovation', desc: 'We embrace creative thinking and modern technologies to solve complex challenges.' },
  { Icon: Award, title: 'Excellence', desc: 'We strive for the highest standards in every project we undertake.' },
  { Icon: Users, title: 'Customer Success', desc: "Our clients' growth and satisfaction define our success." },
  { Icon: Handshake, title: 'Collaboration', desc: 'We believe lasting results come through strong partnerships.' },
  { Icon: GraduationCap, title: 'Continuous Learning', desc: 'We constantly evolve to stay ahead in a changing digital landscape.' },
];

const teamExpertise = [
  'Business Consulting',
  'Digital Transformation',
  'UI/UX Design',
  'Graphic Design & Branding',
  'Website Design & Development',
  'CRM Automation',
  'Software Solutions',
  'Academic & Professional Writing',
  'Corporate Documentation',
  'Research & Data Analysis',
  'Information Technology Support',
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Your Vision. Our Expertise. Your Success."
        description="Every great idea deserves the right strategy, technology, and professional support to succeed — and that is exactly what we deliver."
        crumbs={[{ label: 'About Us' }]}
      />

      {/* Company story */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <SlideIn from="left">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted shadow-lg ring-1 ring-border">
              <Image
                src={ABOUT_IMAGE}
                alt="Ease Life Ventures multidisciplinary team collaborating in Nigeria"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </SlideIn>
          <FadeIn>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">Our Story</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              About Ease Life Ventures Limited
            </h2>
            <div className="accent-rule mt-3" />
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Ease Life Ventures Limited was founded with a simple belief: every great
                idea deserves the right strategy, technology, and professional support to
                succeed.
              </p>
              <p>
                We recognised that many businesses, startups, professionals, and
                organisations struggle to access high-quality business consulting,
                branding, digital solutions, and professional documentation from a single
                trusted provider. Our goal was to bridge that gap by creating a company
                that delivers innovative, reliable, and affordable solutions tailored to
                each client's needs.
              </p>
              <p>
                Today, we serve entrepreneurs, SMEs, corporate organisations, educational
                institutions, and professionals by combining creativity, technology, and
                strategic thinking to transform ideas into measurable success — whether
                you're building a new brand, automating your business processes,
                developing a professional website, or preparing important business and
                academic documents.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-alt py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-[1200px] gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <FadeIn>
            <div className="h-full rounded-xl bg-navy p-8 text-white shadow-lg">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold text-gold-foreground">
                <Target className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight">Our Mission</h3>
              <p className="mt-3 leading-relaxed text-white/80">
                To empower businesses, organisations, and individuals through innovative
                technology, strategic business solutions, professional consulting, and
                exceptional customer service that simplify operations, accelerate growth,
                and create lasting value.
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="h-full rounded-xl bg-card p-8 shadow-lg ring-1 ring-border">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white">
                <Eye className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-navy">Our Vision</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                To become Africa's leading business solutions and digital transformation
                company, recognised for delivering innovative technologies, exceptional
                professional services, and sustainable solutions that help businesses
                thrive in a rapidly evolving world.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Founder message */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-xl bg-secondary/60 p-8 text-center shadow-sm ring-1 ring-border sm:p-10">
              <Quote className="mx-auto h-10 w-10 text-gold/50" />
              <p className="mb-2 mt-4 text-sm font-semibold uppercase tracking-wider text-gold">
                Meet Our Founder
              </p>
              <div className="space-y-4 text-[15px] leading-relaxed text-navy">
                <p>
                  Ease Life Ventures Limited was founded by experienced technology and
                  business professionals driven by a passion for innovation, digital
                  transformation, and helping organisations unlock their full potential.
                </p>
                <p>
                  With expertise spanning engineering, information technology, business
                  consulting, branding, automation, and digital solutions, our leadership
                  understands the challenges faced by modern businesses and develops
                  practical solutions that produce measurable results.
                </p>
                <p className="font-medium">
                  Every project we undertake is guided by integrity, excellence,
                  creativity, and a commitment to delivering value beyond expectations.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Core values */}
      <section className="section-alt py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              eyebrow="Core Values"
              title="The principles that guide us"
            />
          </FadeIn>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map(({ Icon, title, desc }) => (
              <StaggerItem key={title}>
                <div className="card-hover flex h-full flex-col rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-navy text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold tracking-tight text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              eyebrow="Our Team"
              title="A multidisciplinary team of experts"
              description="Together, we collaborate to provide comprehensive solutions that enable our clients to grow confidently and compete successfully in today's digital economy."
            />
          </FadeIn>
          <Stagger className="mt-10 flex flex-wrap justify-center gap-3">
            {teamExpertise.map((e) => (
              <StaggerItem key={e}>
                <span className="inline-flex rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-navy shadow-sm">
                  {e}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Positioning */}
      <section className="navy-gradient py-16 sm:py-20">
        <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">Our Positioning</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              We don't just deliver services — we build partnerships that transform ideas into reality.
            </h2>
            <div className="accent-rule mx-auto mt-5" />
            <p className="mt-5 leading-relaxed text-white/80">
              By combining strategic thinking, innovative technology, creative design, and
              business expertise, we help individuals and organisations overcome
              challenges, embrace opportunities, and achieve sustainable growth. From
              startups launching their first brand to established businesses pursuing
              digital transformation, we deliver solutions that inspire confidence and
              produce measurable results.
            </p>
            <p className="mt-6 font-display text-lg font-bold text-gold">
              More than documents. We deliver opportunities.
            </p>
          </FadeIn>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
