import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sener Barbershop v2',
  description: 'Baseline v2 setup for Sener Barbershop'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
