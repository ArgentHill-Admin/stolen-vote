import type { Metadata } from 'next'
import { Playfair_Display, Lora } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Stolen.Vote — Voting Integrity Watchdog',
  description:
    'Daily aggregation of voting rights, election integrity, and electoral legitimacy stories. Every claim documented. Every source rated. Every gap exposed.',
  openGraph: {
    title: 'Stolen.Vote',
    description: 'Voting integrity. Documented daily.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  )
}
