import type { Metadata } from 'next';
import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler';
import { Providers } from './providers';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });
const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

const siteUrl = process.env.NEXTAUTH_URL || 'https://www.easelifeventures.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ease Life Ventures Limited | Business Documents, Digital Solutions & Branding Nigeria',
    template: '%s | Ease Life Ventures Limited',
  },
  description:
    'Ease Life Ventures Limited — professional CV & business plan writing, academic writing, branding, SEO websites with CRM automation, and remote IT support across Nigeria. Crafting Success. Opening Doors.',
  keywords: [
    'professional CV writing Nigeria',
    'business plan writer Nigeria',
    'grant proposal writing Nigeria',
    'academic writing services Nigeria',
    'SEO website design Nigeria',
    'remote IT support Nigeria',
    'branding services Nigeria',
  ],
  authors: [{ name: siteConfig.name }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    title: 'Ease Life Ventures Limited | Crafting Success. Opening Doors.',
    description:
      'Professional documents, digital solutions and brand visibility that power your goals — nationwide across Nigeria.',
    siteName: siteConfig.name,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Ease Life Ventures Limited' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ease Life Ventures Limited | Crafting Success. Opening Doors.',
    description:
      'Professional documents, digital solutions and brand visibility that power your goals — nationwide across Nigeria.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" async />
      </head>
      <body
        className={`${dmSans.variable} ${jakartaSans.variable} ${jetbrainsMono.variable} font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
          <Toaster />
          {/* IMPORTANT: Do not remove — handles chunk loading race conditions in the dev server */}
          <ChunkLoadErrorHandler />
        </ThemeProvider>
      </body>
    </html>
  );
}
