import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://altanesmer.github.io'),
  title: 'Altan Esmer — Portfolio',
  description:
    'Software engineer building performant, thoughtful web experiences. Projects, writing, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Nav />
        <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
