import Header from '@/components/Header'
import ReportCard from '@/components/ReportCard'
import { getAllReports } from '@/lib/parseManHours'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const reports = getAllReports()

  return (
    <>
      <Header />
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Hero */}
        <div style={{ marginBottom: '48px', borderBottom: '1px solid #21262d', paddingBottom: '40px' }}>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '42px',
            fontWeight: '800',
            margin: '0 0 16px',
            letterSpacing: '-1px',
          }}>
            <span style={{ color: '#f85149' }}>stolen</span>
            <span style={{ color: '#e6edf3' }}>.vote</span>
          </h1>
          <p style={{ color: '#8b949e', fontSize: '17px', lineHeight: '1.6', maxWidth: '600px', margin: 0 }}>
            Daily aggregation of voting rights, election integrity, and electoral legitimacy stories.
            Every claim documented. Every source rated. Every coverage gap exposed.
          </p>

          {/* Stats strip */}
          {reports.length > 0 && (
            <div style={{ display: 'flex', gap: '32px', marginTop: '28px' }}>
              <div>
                <div style={{ color: '#e6edf3', fontSize: '28px', fontWeight: '700' }}>{reports.length}</div>
                <div style={{ color: '#484f58', fontSize: '13px' }}>Reports published</div>
              </div>
              <div>
                <div style={{ color: '#e6edf3', fontSize: '28px', fontWeight: '700' }}>
                  {reports.reduce((sum, r) => sum + r.runSummary.itemsCollected, 0)}
                </div>
                <div style={{ color: '#484f58', fontSize: '13px' }}>Items documented</div>
              </div>
              <div>
                <div style={{ color: '#f0883e', fontSize: '28px', fontWeight: '700' }}>
                  {reports.reduce((sum, r) => sum + r.runSummary.coverageGapsCount, 0)}
                </div>
                <div style={{ color: '#484f58', fontSize: '13px' }}>Coverage gaps flagged</div>
              </div>
            </div>
          )}
        </div>

        {/* Report list */}
        {reports.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#484f58' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
            <p style={{ fontSize: '18px', margin: '0 0 8px', color: '#8b949e' }}>No reports published yet.</p>
            <p style={{ fontSize: '14px', margin: 0 }}>
              Add approved ManHours files to <code style={{ color: '#58a6ff' }}>content/approved/</code> to publish.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ color: '#8b949e', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>
              Published Reports
            </h2>
            {reports.map(report => (
              <ReportCard key={report.date} report={report} />
            ))}
          </div>
        )}
      </main>

      <footer style={{
        borderTop: '1px solid #21262d',
        padding: '32px 24px',
        marginTop: '64px',
        textAlign: 'center',
        color: '#484f58',
        fontSize: '13px',
      }}>
        <p style={{ margin: '0 0 4px' }}>stolen.vote — Non-partisan voting integrity watchdog</p>
        <p style={{ margin: 0 }}>All claims documented. All sources rated. All gaps exposed.</p>
      </footer>
    </>
  )
}
