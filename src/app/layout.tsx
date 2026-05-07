import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Cursor from '@/components/Cursor';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://altanesmer.github.io'),
  title: 'Altan Esmer — Portfolio',
  description:
    'Software engineer building performant, thoughtful web experiences. Projects, writing, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        <SmoothScrollProvider>
          <Nav />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
