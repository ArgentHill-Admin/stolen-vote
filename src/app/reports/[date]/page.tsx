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
  const categories = Array.from(new Set(items.map(i => i.category)))

  return (
    <>
      <Header />

      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '36px 24px' }}>

        {/* Back nav */}
        <Link href="/" style={{
          fontFamily: 'var(--font-lora), Georgia, serif',
          color: '#495772',
          fontSize: '13px',
          textDecoration: 'none',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          display: 'inline-block',
          marginBottom: '28px',
        }}>
          ← All Reports
        </Link>

        {/* Report header */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            fontStyle: 'italic',
            color: '#646667',
            fontSize: '12px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}>
            Man Hours Report
          </div>

          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '36px',
            fontWeight: '800',
            color: '#1C1C1C',
            margin: '0 0 20px',
            lineHeight: '1.15',
            letterSpacing: '-0.5px',
          }}>
            {report.displayDate}
          </h1>

          {/* Double rule */}
          <div style={{ borderTop: '3px solid #1C1C1C' }} />
          <div style={{ borderTop: '1px solid #1C1C1C', marginTop: '3px', marginBottom: '20px' }} />

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <StatPill value={runSummary.itemsCollected}   label="Items"          color="#1C1C1C" />
            <StatPill value={runSummary.strongCount}      label="Strong"         color="#2D5A1B" />
            <StatPill value={runSummary.moderateCount}    label="Moderate"       color="#495772" />
            <StatPill value={runSummary.weakCount}        label="Weak"           color="#646667" />
            <StatPill value={runSummary.coverageGapsCount} label="Coverage Gaps" color="#9F2236" />
          </div>

          {/* Category tags */}
          {categories.length > 0 && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
              {categories.map(cat => (
                <span key={cat} style={{
                  fontFamily: 'var(--font-lora), Georgia, serif',
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  color: '#646667',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5D5D7',
                  padding: '2px 10px',
                  textTransform: 'uppercase',
                }}>
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Item list + sidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '40px', alignItems: 'start' }}>

          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {items.map(item => (
              <ItemCard key={item.number} item={item} />
            ))}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

            {/* Editor notes */}
            {runSummary.editorNotes.length > 0 && (
              <div style={{
                borderTop: '3px solid #9F2236',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D5D5D7',
                borderTopColor: '#9F2236',
                borderTopWidth: '3px',
                padding: '20px',
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: '13px',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  margin: '0 0 16px',
                  color: '#1C1C1C',
                }}>
                  Editor Notes
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {runSummary.editorNotes.map((note, i) => (
                    <div key={i}>
                      <div style={{
                        fontFamily: 'var(--font-lora), Georgia, serif',
                        fontWeight: '700',
                        fontSize: '10px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#9F2236',
                        marginBottom: '4px',
                      }}>
                        {note.label}
                      </div>
                      <p style={{
                        fontFamily: 'var(--font-lora), Georgia, serif',
                        color: '#1C1C1C',
                        fontSize: '13px',
                        margin: 0,
                        lineHeight: '1.6',
                      }}>
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter */}
            <EmailCapture context="report" />

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

function StatPill({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div>
      <span style={{
        fontFamily: 'var(--font-playfair), Georgia, serif',
        color,
        fontSize: '26px',
        fontWeight: '800',
      }}>
        {value}
      </span>
      <span style={{
        fontFamily: 'var(--font-lora), Georgia, serif',
        color: '#646667',
        fontSize: '12px',
        marginLeft: '6px',
        letterSpacing: '0.03em',
      }}>
        {label}
      </span>
    </div>
  )
}
