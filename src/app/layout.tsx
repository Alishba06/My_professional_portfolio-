import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import { Navbar } from '@/components/navigation';
import { PortfolioChat } from '@/components/chat';
import { profile } from '@/data/profile';
import { publicEnv } from '@/utils/env';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#030303',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl || 'https://alishba.dev'),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description: `${profile.positioningStatement} ${profile.tagline}`,
  keywords: [
    'Alishba',
    'AI Agent Developer',
    'AI Automation',
    'AI Agents',
    'Generative AI',
    'Prompt Engineering',
    'Google Gemini',
    'Python',
    'Next.js',
  ],
  authors: [{ name: profile.name, url: publicEnv.siteUrl }],
  creator: profile.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: publicEnv.siteUrl,
    siteName: `${profile.name} Portfolio`,
    title: `${profile.name} | ${profile.role}`,
    description: profile.positioningStatement,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${profile.name} - ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} | ${profile.role}`,
    description: profile.positioningStatement,
    creator: '@alishba_ai',
  },
  alternates: {
    canonical: publicEnv.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.role,
      description: profile.positioningStatement,
      url: publicEnv.siteUrl,
      sameAs: [profile.githubUrl, profile.linkedinUrl],
      knowsAbout: profile.skills.map((s) => s.name),
    },
  };

  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      data-theme="cyber"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#030303] font-sans text-neutral-100 antialiased selection:bg-white/20 selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-black focus:outline-none font-bold"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <PortfolioChat />
      </body>
    </html>
  );
}
