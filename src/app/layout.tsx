import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

// ── LAYER 1 + 2: Basic SEO + Open Graph ──────────────────
//
// Metadata in Next.js automatically generates the correct
// <meta> tags in your page's <head>. You never write <head>
// manually — Next.js handles that.
//
// Python parallel:
// This is like a dictionary that a templating engine
// (Jinja2) reads to inject values into <head> slots.


const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',  // show text immediately with fallback font
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})


export const metadata: Metadata = {
  // ── BASIC META ──────────────────────────────────────────
  
  // This appears as the blue clickable title in Google results
  // Rule: under 60 characters, include the person's name
  title: {
    default: 'Dr. Ankit Singh | Neuroscience',
   
    template: '%s | Dr. Ankit Singh',
  },

  // This appears as the grey text below the title in Google results
  // Rule: 150-160 characters, describe what the page offers
  description:
    'Research Scholar specialising in Neuroscience, ' +
    '4 publications, 21 citations. ' +
    'Department of ACBR, University of Delhi.',

  // Keywords — less important for Google now but still used
  // by academic search engines like Semantic Scholar
  keywords: [
    'Ankit Singh',
    'Neuroscience',
    'University of Delhi',
    'Zoology',
    'Brain Research',
    'Alzheimer',
    'Neuroinflammation',
  ],

  // The official URL of your site — tells Google this is
  // the canonical (authoritative) version, preventing
  // duplicate content penalties
  metadataBase: new URL('https://shashank-portfolio-xi.vercel.app'),

  // Canonical URL — prevents duplicate indexing if your site
  // is accessible from multiple URLs
  alternates: {
    canonical: '/',
  },

  // ── LAYER 2: OPEN GRAPH ────────────────────────────────
  // Open Graph is a protocol created by Facebook.
  // Every major platform (WhatsApp, LinkedIn, Twitter,
  // Slack) reads these tags to generate link previews.
  //
  // When someone shares your URL on WhatsApp, this is
  // what determines the card that appears.

  openGraph: {
    type: 'profile',           // tells platforms this is a person's profile
    locale: 'en_IN',           // language and region
    url: 'https://shashank-portfolio-xi.vercel.app',
    siteName: 'Dr. Ankit Singh — Research Portfolio',
    title: 'Dr. Ankit Singh | Neurobiology & Neuroscience',
    description:
      'Exploring the molecular frontiers of brain immunity, microglia aging, ' +
      'and neurodegeneration. 48 peer-reviewed publications.',
    // og:image — the thumbnail shown when link is shared
    // We will add a real image in the performance step
    // For now this is a placeholder
    images: [
      {
        url: '/Dr. Ankit Singh.jpg',   // place this file in /public folder
        width: 1200,
        height: 630,
        alt: 'Dr. Ankit Singh — Neuroscience Research Portfolio',
      },
    ],
    // Profile-specific Open Graph fields
    // These power Google's knowledge panel if your page
    // gets enough authority
    firstName: 'Ankit',
    lastName: 'Singh',
    username: 'Ankit-Singh-neuro',
    gender: 'male',
  },

  // ── TWITTER CARD ───────────────────────────────────────
  // Separate from Open Graph — Twitter has its own system
  // summary_large_image = big image card format
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Ankit Singh | Neuroscience Research',
    description:
      'Microglia biology, neurodegeneration, and neuroimmunology research. ' +
      '48 publications from University of Delhi.',
    images: ['/og-image.png'],
  },

  // ── ROBOTS ─────────────────────────────────────────────
  // Tells Google's crawler what it is allowed to do
  // index = include this page in search results
  // follow = follow links on this page to discover more pages
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,          // -1 means no limit on snippet length
    },
  },

  // ── VERIFICATION ───────────────────────────────────────
  // When you add your site to Google Search Console,
  // Google gives you a verification code to prove ownership.
  // Add it here instead of putting a <meta> tag manually.
  // Leave blank for now — we will fill this after deployment.
  verification: {
    google: '',
  },

  // ── AUTHOR INFO ────────────────────────────────────────
  authors: [{ name: 'Dr. Ankit Singh' }],
  creator: 'Abhishek Maurya',
  publisher: 'Dr. Ankit Singh',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"  className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}