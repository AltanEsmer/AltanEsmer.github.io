import type { Metadata } from 'next'
import './globals.css'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Nav } from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Altan Esmer — Portfolio',
  description: 'Full-stack developer & creative engineer',
  keywords: ['developer', 'portfolio', 'full-stack', 'react', 'next.js'],
  openGraph: {
    title: 'Altan Esmer — Portfolio',
    description: 'Full-stack developer & creative engineer',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  )
}
