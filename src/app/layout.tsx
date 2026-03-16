import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'stolen.vote — Voting Integrity Watchdog',
  description:
    'Daily aggregation of voting rights, election integrity, and electoral legitimacy stories. Every claim documented. Every source rated. Every gap exposed.',
  openGraph: {
    title: 'stolen.vote',
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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
