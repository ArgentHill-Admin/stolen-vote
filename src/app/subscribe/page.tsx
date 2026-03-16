import Header from '@/components/Header'
import EmailCapture from '@/components/EmailCapture'
import Link from 'next/link'

export const metadata = {
  title: 'Subscribe — stolen.vote',
  description: 'Premium analysis, expanded reporting, and curated context delivered to your inbox.',
}

export default function SubscribePage() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: '640px', margin: '0 auto', padding: '48px 24px' }}>
        <Link href="/" style={{ color: '#58a6ff', fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}>
          ← Reports
        </Link>

        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '32px',
            fontWeight: '700',
            color: '#e6edf3',
            margin: '0 0 12px',
          }}>
            Premium coverage.<br />Your inbox.
          </h1>
          <p style={{ color: '#8b949e', fontSize: '16px', lineHeight: '1.7', margin: 0 }}>
            The stolen.vote newsletter goes beyond the daily report cards. Expanded analysis,
            editorial context, and curated coverage that doesn&apos;t make it to the public site —
            delivered at a frequency that matches the news cycle.
          </p>
        </div>

        <EmailCapture context="subscribe" />

        <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            ['Expanded reporting', 'Deeper context on the stories that matter most.'],
            ['Editorial analysis', 'What the coverage gaps actually mean.'],
            ['No noise', 'Only when there\'s something worth saying.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: '#f85149', fontSize: '16px', marginTop: '2px' }}>—</span>
              <div>
                <span style={{ color: '#e6edf3', fontSize: '14px', fontWeight: '600' }}>{title}. </span>
                <span style={{ color: '#8b949e', fontSize: '14px' }}>{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
