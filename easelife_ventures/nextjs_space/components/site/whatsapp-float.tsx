'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { whatsappLink, siteConfig } from '@/lib/site-config';

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const quickMessages = [
    'Hi, I would like a quote for your services.',
    'Hello, I need help with a CV / cover letter.',
    'Hi, I need a business plan / proposal.',
    'Hello, I need remote IT support.',
  ];

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-[300px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5"
          >
            <div className="flex items-center justify-between bg-navy px-4 py-3">
              <div className="flex items-center gap-2 text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">Chat with us</p>
                  <p className="text-[11px] text-white/70">Typically replies within 24 hrs</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-white/80 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2 p-4">
              <p className="text-xs text-muted-foreground">Pick a message to get started:</p>
              {quickMessages.map((m) => (
                <a
                  key={m}
                  href={whatsappLink(m)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 rounded-lg bg-secondary px-3 py-2 text-left text-[13px] font-medium text-navy transition-colors hover:bg-gold hover:text-gold-foreground"
                >
                  <span>{m}</span>
                  <Send className="h-3.5 w-3.5 shrink-0" />
                </a>
              ))}
              <a
                href={whatsappLink('Hi Ease Life Ventures, I have an enquiry.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block rounded-lg bg-[#25D366] px-3 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Open WhatsApp • {siteConfig.contact.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open WhatsApp chat"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
      </button>
    </div>
  );
}
