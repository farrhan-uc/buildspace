import './globals.css';
import { LanguageProvider } from '@/components/language-provider';
import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });

export const metadata: Metadata = {
  title: 'BuildSpace — House cost estimator for Indian builders',
  description:
    'Estimate the complete cost of a house, from footing to finishing. Stage-wise line items, local Rajasthan pricing and nearby suppliers in one workflow.',
};

export const viewport: Viewport = {
  themeColor: '#f7f1e6',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-ink font-sans text-paper"><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
