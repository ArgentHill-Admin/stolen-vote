'use client'

import Link from 'next/link'
import { ManHoursReport } from '@/lib/parseManHours'

export default function ReportCard({ report }: { report: ManHoursReport }) {
  return (
    <Link href={`/reports/${report.date}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #D5D5D7',
          borderBottom: '1px solid #D5D5D7',
          borderRight: '1px solid #D5D5D7',
          borderLeft: '4px solid #D5D5D7',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          cursor: 'pointer',
          transition: 'border-left-color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderLeftColor = '#9F2236')}
        onMouseLeave={e => (e.currentTarget.style.borderLeftColor = '#D5D5D7')}
      >
        <div>
          <div style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            fontStyle: 'italic',
            color: '#646667',
            fontSize: '12px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '6px',
          }}>
            {report.displayDate}
          </div>
          <div style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            color: '#1C1C1C',
            fontSize: '18px',
            fontWeight: '700',
            lineHeight: '1.3',
          }}>
            {report.runSummary.itemsCollected} items documented
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Badge value={report.runSummary.strongCount} label="STRONG" color="#2D5A1B" bg="#E8F4E8" />
          <Badge value={report.runSummary.moderateCount} label="MOD" color="#495772" bg="#E8ECF2" />
          {report.runSummary.weakCount > 0 && (
            <Badge value={report.runSummary.weakCount} label="WEAK" color="#646667" bg="#EBEBEB" />
          )}
          {report.runSummary.coverageGapsCount > 0 && (
            <Badge value={report.runSummary.coverageGapsCount} label="GAPS" color="#9F2236" bg="#F5E8EB" />
          )}
        </div>
      </div>
    </Link>
  )
}

function Badge({ value, label, color, bg }: { value: number; label: string; color: string; bg: string }) {
  return (
    <span style={{
      backgroundColor: bg,
      color,
      fontFamily: 'var(--font-lora), Georgia, serif',
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '0.07em',
      padding: '3px 9px',
      border: `1px solid ${color}22`,
    }}>
      {value} {label}
    </span>
  )
}
