'use client'

import Link from 'next/link'
import { ManHoursReport } from '@/lib/parseManHours'

export default function ReportCard({ report }: { report: ManHoursReport }) {
  return (
    <Link
      href={`/reports/${report.date}`}
      style={{ textDecoration: 'none' }}
    >
      <div
        style={{
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '8px',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          cursor: 'pointer',
          transition: 'border-color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = '#58a6ff')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = '#30363d')}
      >
        <div>
          <div style={{ color: '#484f58', fontSize: '12px', marginBottom: '4px', fontWeight: '500' }}>
            {report.displayDate}
          </div>
          <div style={{ color: '#e6edf3', fontSize: '16px', fontWeight: '600' }}>
            {report.runSummary.itemsCollected} items documented
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <span style={{ backgroundColor: '#1a4731', color: '#3fb950', fontSize: '12px', fontWeight: '700', padding: '3px 10px', borderRadius: '4px' }}>
            {report.runSummary.strongCount} STRONG
          </span>
          <span style={{ backgroundColor: '#2d2a00', color: '#d29922', fontSize: '12px', fontWeight: '700', padding: '3px 10px', borderRadius: '4px' }}>
            {report.runSummary.moderateCount} MOD
          </span>
          {report.runSummary.weakCount > 0 && (
            <span style={{ backgroundColor: '#3d0f0f', color: '#f85149', fontSize: '12px', fontWeight: '700', padding: '3px 10px', borderRadius: '4px' }}>
              {report.runSummary.weakCount} WEAK
            </span>
          )}
          {report.runSummary.coverageGapsCount > 0 && (
            <span style={{ backgroundColor: '#3d2000', color: '#f0883e', fontSize: '12px', fontWeight: '700', padding: '3px 10px', borderRadius: '4px' }}>
              {report.runSummary.coverageGapsCount} GAPS
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
