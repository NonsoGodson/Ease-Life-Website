'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { whatsappLink } from '@/lib/site-config';

const HERO_IMAGE = 'https://cdn.abacus.ai/images/4d517bf7-9fab-4522-a7c9-1c6114a3c541.png';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-navy">
      <motion.div style={{ y }} className="absolute inset-0 -z-20">
        <Image
          src={HERO_IMAGE}
          alt="Professional Nigerian business team collaborating in a modern office — Ease Life Ventures"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <motion.div style={{ opacity: overlayOpacity }} className="hero-overlay absolute inset-0 -z-10" />

      <div className="mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-gold" />
            Nationwide Service across Nigeria
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Crafting Success. <span className="text-gold">Opening Doors.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200"
          >
            Your partner in professional documents, digital solutions, and brand
            visibility that power your goals and build your future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={whatsappLink('Hi Ease Life Ventures, I would like to get started.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="w-full gap-2 bg-[#25D366] text-white hover:bg-[#25D366]/90 sm:w-auto">
                <MessageCircle className="h-5 w-5" />
                Get Started on WhatsApp
              </Button>
            </a>
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full gap-2 bg-gold text-gold-foreground hover:bg-gold/90 sm:w-auto"
              >
                Request a Quote
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/60 bg-transparent text-white hover:bg-white/15 hover:text-white sm:w-auto"
              >
                View Our Services
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-gold" /> 100% Confidential
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gold" /> 24-Hr Delivery After Payment
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-gold" /> Quality Guaranteed
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
