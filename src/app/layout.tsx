import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BuildSpace',
  description: 'Estimate the complete cost of a house, from footing to finishing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
