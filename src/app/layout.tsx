import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://altanesmer.github.io'),
  title: 'Altan Esmer — Software Engineer',
  description:
    'Full-stack software engineer building reliable, accessible software across web, mobile, and desktop. Based in Denmark, open to remote roles across the EU.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
