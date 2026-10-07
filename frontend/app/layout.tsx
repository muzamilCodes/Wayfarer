import type { Metadata } from 'next';
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { SITE } from '@/lib/api';
import SmoothScroll from '@/components/3d/SmoothScroll';
import ScrollProgressBar from '@/components/3d/ScrollProgress';
import CursorGlow from '@/components/3d/CursorGlow';
import GlobalScene from '@/components/3d/GlobalScene';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
});
const body = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Paradise Journey | Kashmir, Ladakh & Himalayan Tours',
    template: '%s | Paradise Journey',
  },
  description:
    'Curated Kashmir, Ladakh and Himalayan tour packages with local guides, hotels and cabs.',
  openGraph: { type: 'website', siteName: 'Paradise Journey' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="relative overflow-x-hidden min-h-screen bg-snow font-body text-ink antialiased">
        <SmoothScroll>
          <Providers>
            {/* Global Smooth Scroll Progress Bar */}
            <ScrollProgressBar />

            {/* Custom Atmospheric Desktop Cursor Glow */}
            <CursorGlow />

            {/* Persistent Ambient Aurora & Snow Scene */}
            <GlobalScene />

            {/* Main Application Layout */}
            <div className="relative z-10 flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 pb-16 md:pb-0">{children}</main>
              <Footer />
              <MobileBottomNav />
            </div>
          </Providers>
        </SmoothScroll>
      </body>
    </html>
  );
}
