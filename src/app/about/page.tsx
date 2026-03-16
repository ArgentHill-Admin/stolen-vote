import Header from '@/components/Header'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>
        <Link href="/" style={{ color: '#58a6ff', fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}>
          ← Reports
        </Link>

        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: '700', color: '#e6edf3', margin: '0 0 24px' }}>
          About stolen.vote
        </h1>

        <div style={{ color: '#c9d1d9', fontSize: '16px', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p style={{ margin: 0 }}>
            <strong style={{ color: '#e6edf3' }}>stolen.vote</strong> is a non-partisan voting integrity watchdog.
            We aggregate, document, and rate stories about voting rights, election security, and electoral legitimacy —
            daily, with sourcing shown.
          </p>
          <p style={{ margin: 0 }}>
            Every item includes its primary source, a bias rating, documentation quality assessment, and
            a coverage gap analysis identifying which parts of the political spectrum are covering or ignoring the story.
          </p>
          <p style={{ margin: 0 }}>
            We don&apos;t take sides on policy. We document what is being claimed, by whom, with what evidence,
            and where the press is looking away.
          </p>

          <div style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '20px', marginTop: '8px' }}>
            <h2 style={{ color: '#8b949e', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px' }}>
              Documentation Quality
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ backgroundColor: '#1a4731', color: '#3fb950', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px' }}>STRONG</span>
                <span style={{ color: '#8b949e', fontSize: '14px' }}>Primary source documents, official records, verified filings</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ backgroundColor: '#2d2a00', color: '#d29922', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px' }}>MODERATE</span>
                <span style={{ color: '#8b949e', fontSize: '14px' }}>Multiple outlet confirmation, some primary sourcing</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ backgroundColor: '#3d0f0f', color: '#f85149', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px' }}>WEAK</span>
                <span style={{ color: '#8b949e', fontSize: '14px' }}>Single source, disputed data, or primary source not confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
