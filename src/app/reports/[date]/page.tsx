import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import ItemCard from '@/components/ItemCard'
import EmailCapture from '@/components/EmailCapture'
import { getReport, getAllDates } from '@/lib/parseManHours'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const dates = getAllDates()
  return dates.map(date => ({ date }))
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ date: string }>
}) {
  const { date } = await params
  const report = getReport(date)

  if (!report) notFound()

  const { items, runSummary } = report

  // Get unique categories for the filter display
  const categories = Array.from(new Set(items.map(i => i.category)))

  return (
    <>
      <Header />
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Back nav */}
        <Link href="/" style={{ color: '#58a6ff', fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
          ← All Reports
        </Link>

        {/* Report header */}
        <div style={{ marginBottom: '36px', borderBottom: '1px solid #21262d', paddingBottom: '28px' }}>
          <div style={{ color: '#484f58', fontSize: '13px', marginBottom: '8px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Man Hours Report
          </div>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '30px',
            fontWeight: '700',
            color: '#e6edf3',
            margin: '0 0 20px',
          }}>
            {report.displayDate}
          </h1>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <StatPill value={runSummary.itemsCollected} label="Items" color="#e6edf3" />
            <StatPill value={runSummary.strongCount} label="Strong" color="#3fb950" />
            <StatPill value={runSummary.moderateCount} label="Moderate" color="#d29922" />
            <StatPill value={runSummary.weakCount} label="Weak" color="#f85149" />
            <StatPill value={runSummary.coverageGapsCount} label="Coverage Gaps" color="#f0883e" />
          </div>

          {/* Category tags */}
          {categories.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
              {categories.map(cat => (
                <span key={cat} style={{
                  fontSize: '12px',
                  color: '#8b949e',
                  backgroundColor: '#21262d',
                  padding: '2px 10px',
                  borderRadius: '20px',
                  border: '1px solid #30363d',
                }}>
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Item list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
          {items.map(item => (
            <ItemCard key={item.number} item={item} />
          ))}
        </div>

        {/* Editor notes */}
        {runSummary.editorNotes.length > 0 && (
          <div style={{
            backgroundColor: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '8px',
            padding: '24px',
          }}>
            <h2 style={{ color: '#8b949e', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 16px' }}>
              Editor Notes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {runSummary.editorNotes.map((note, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{
                    backgroundColor: '#21262d',
                    color: '#8b949e',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    marginTop: '2px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {note.label}
                  </span>
                  <p style={{ color: '#c9d1d9', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Email capture */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px 48px' }}>
        <EmailCapture context="report" />
      </div>

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

function StatPill({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div>
      <span style={{ color, fontSize: '22px', fontWeight: '700' }}>{value}</span>
      <span style={{ color: '#484f58', fontSize: '13px', marginLeft: '6px' }}>{label}</span>
    </div>
  )
}
