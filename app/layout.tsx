import type { Metadata } from 'next';
import './globals.css';
import { LOCAL_BUSINESS_SCHEMA } from '../lib/seo';

export const metadata: Metadata = {
  title: 'The Sener Barber',
  description: 'The Sener Barber in Ninove. Walk-ins welkom voor cuts en baardverzorging.',
  icons: {
    icon: '/icon.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
        {children}
      </body>
    </html>
  );
}
