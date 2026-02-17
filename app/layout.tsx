import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Sener Barber',
  description: 'The Sener Barber in Ninove. Walk-ins welkom voor cuts en baardverzorging.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
