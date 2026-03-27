import Header from '@/components/Header'
import ReportCard from '@/components/ReportCard'
import EmailCapture from '@/components/EmailCapture'
import { getAllReports } from '@/lib/parseManHours'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const reports = getAllReports()

  const totalItems = reports.reduce((sum, r) => sum + r.runSummary.itemsCollected, 0)
  const totalGaps  = reports.reduce((sum, r) => sum + r.runSummary.coverageGapsCount, 0)

  return (
    <>
      <Header />

      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Dateline */}
        <div style={{
          fontFamily: 'var(--font-lora), Georgia, serif',
          fontStyle: 'italic',
          fontSize: '12px',
          color: '#646667',
          letterSpacing: '0.04em',
          marginBottom: '32px',
          textTransform: 'uppercase',
        }}>
          Non-partisan voting integrity watchdog &mdash; Every claim documented. Every source rated. Every gap exposed.
        </div>

        {/* Two-column layout: main + sidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px', alignItems: 'start' }}>

          {/* Left: Reports */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '16px',
              marginBottom: '20px',
              borderBottom: '2px solid #1C1C1C',
              paddingBottom: '8px',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '13px',
                fontWeight: '700',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: 0,
                color: '#1C1C1C',
              }}>
                Latest Reports
              </h2>
            </div>

            {reports.length === 0 ? (
              <div style={{
                padding: '48px 0',
                fontFamily: 'var(--font-lora), Georgia, serif',
                fontStyle: 'italic',
                color: '#646667',
                fontSize: '16px',
              }}>
                No reports published yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {reports.map(report => (
                  <ReportCard key={report.date} report={report} />
                ))}
              </div>
            )}
          </div>

          {/* Right: Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Stats */}
            {reports.length > 0 && (
              <div style={{
                borderTop: '2px solid #1C1C1C',
                paddingTop: '16px',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: '13px',
                  fontWeight: '700',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  margin: '0 0 16px',
                  color: '#1C1C1C',
                }}>
                  By The Numbers
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <StatBlock value={reports.length} label="Reports published" />
                  <div style={{ borderTop: '1px solid #D5D5D7' }} />
                  <StatBlock value={totalItems} label="Items documented" />
                  <div style={{ borderTop: '1px solid #D5D5D7' }} />
                  <StatBlock value={totalGaps} label="Coverage gaps flagged" accent />
                </div>
              </div>
            )}

            {/* Newsletter */}
            <EmailCapture context="homepage" />

          </div>
        </div>
      </main>

      <footer style={{
        borderTop: '3px solid #1C1C1C',
        marginTop: '64px',
        padding: '28px 24px',
        backgroundColor: '#F0EFEB',
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '16px',
            fontWeight: '700',
            color: '#1C1C1C',
            letterSpacing: '-0.3px',
          }}>
            <span style={{ color: '#9F2236' }}>STOLEN</span>.VOTE
          </span>
          <span style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            fontStyle: 'italic',
            fontSize: '12px',
            color: '#646667',
          }}>
            Non-partisan. All claims documented. All sources rated. All gaps exposed.
          </span>
        </div>
      </footer>
    </>
  )
}

function StatBlock({ value, label, accent = false }: { value: number; label: string; accent?: boolean }) {
  return (
    <div>
      <div style={{
        fontFamily: 'var(--font-playfair), Georgia, serif',
        fontSize: '32px',
        fontWeight: '800',
        color: accent ? '#9F2236' : '#1C1C1C',
        lineHeight: '1',
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: 'var(--font-lora), Georgia, serif',
        fontSize: '12px',
        color: '#646667',
        marginTop: '3px',
        letterSpacing: '0.02em',
      }}>
        {label}
      </div>
    </div>
  )
}
