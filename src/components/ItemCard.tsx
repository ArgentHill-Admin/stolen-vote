import { ManHoursItem, ManHoursSource, ManHoursLink } from '@/lib/parseManHours'

// ─── Sub-components ───────────────────────────────────────────────────────────

function QualityBadge({ quality }: { quality: 'STRONG' | 'MODERATE' | 'WEAK' }) {
  const styles: Record<string, { bg: string; color: string }> = {
    STRONG: { bg: '#1a4731', color: '#3fb950' },
    MODERATE: { bg: '#2d2a00', color: '#d29922' },
    WEAK: { bg: '#3d0f0f', color: '#f85149' },
  }
  const s = styles[quality]
  return (
    <span style={{
      backgroundColor: s.bg,
      color: s.color,
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '0.05em',
      padding: '2px 8px',
      borderRadius: '4px',
    }}>
      {quality}
    </span>
  )
}

function CategoryBadge({ category }: { category: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    LEGISLATION: { bg: '#0d2d5e', color: '#79b8ff' },
    LEGAL: { bg: '#2d1a5e', color: '#c0a0ff' },
    ADMINISTRATION: { bg: '#0d3d1a', color: '#56d364' },
    SECURITY: { bg: '#3d2000', color: '#f0883e' },
    CLAIM: { bg: '#3d2d00', color: '#e3b341' },
  }
  const s = styles[category] || { bg: '#21262d', color: '#8b949e' }
  return (
    <span style={{
      backgroundColor: s.bg,
      color: s.color,
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '0.08em',
      padding: '2px 8px',
      borderRadius: '4px',
    }}>
      {category}
    </span>
  )
}

function BiasChip({ bias }: { bias: string }) {
  if (!bias) return null
  const lower = bias.toLowerCase()

  let color = '#8b949e'
  if (lower.includes('far left')) color = '#e11d48'
  else if (lower.includes('center-left') || lower.includes('center left')) color = '#fb923c'
  else if (lower.includes('left')) color = '#f97316'
  else if (lower === 'center') color = '#94a3b8'
  else if (lower.includes('center-right') || lower.includes('center right')) color = '#60a5fa'
  else if (lower.includes('right')) color = '#3b82f6'
  else if (lower.includes('government')) color = '#a78bfa'
  else if (lower.includes('academic')) color = '#34d399'

  return (
    <span style={{ color, fontSize: '11px', fontWeight: '500' }}>{bias}</span>
  )
}

function LinkList({ links }: { links: ManHoursLink[] }) {
  if (!links.length) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {links.map((l, i) => (
        <a
          key={i}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#58a6ff',
            fontSize: '13px',
            textDecoration: 'none',
            padding: '2px 0',
            borderBottom: '1px solid #1f4a7a',
          }}
        >
          {l.text}
        </a>
      ))}
    </div>
  )
}

function SourceList({ sources }: { sources: ManHoursSource[] }) {
  if (!sources.length) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      {sources.map((s, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#58a6ff', fontSize: '13px', textDecoration: 'none' }}
          >
            {s.name}
          </a>
          {s.bias && (
            <>
              <span style={{ color: '#30363d' }}>·</span>
              <BiasChip bias={s.bias} />
            </>
          )}
        </span>
      ))}
    </div>
  )
}

// ─── Main Item Card ───────────────────────────────────────────────────────────

export default function ItemCard({ item }: { item: ManHoursItem }) {
  return (
    <article style={{
      backgroundColor: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '8px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ color: '#484f58', fontSize: '13px', fontWeight: '600' }}>
            #{String(item.number).padStart(2, '0')}
          </span>
          <CategoryBadge category={item.category} />
          <QualityBadge quality={item.documentationQuality} />
          {item.coverageGapNotable && (
            <span style={{
              backgroundColor: '#3d2000',
              color: '#f0883e',
              fontSize: '11px',
              fontWeight: '700',
              padding: '2px 8px',
              borderRadius: '4px',
              letterSpacing: '0.05em',
            }}>
              ⚠ COVERAGE GAP
            </span>
          )}
        </div>
      </div>

      {/* Headline */}
      <h2 style={{
        color: '#e6edf3',
        fontSize: '18px',
        fontWeight: '600',
        lineHeight: '1.4',
        fontFamily: 'Georgia, serif',
        margin: 0,
      }}>
        {item.headline}
      </h2>

      {/* Claimant */}
      <div>
        <span style={{ color: '#484f58', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Claimant
        </span>
        <p style={{ color: '#8b949e', fontSize: '14px', margin: '4px 0 0', lineHeight: '1.5' }}>
          {item.claimant}
        </p>
      </div>

      {/* Primary sources */}
      {item.sources.length > 0 && (
        <div>
          <span style={{ color: '#484f58', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Source
          </span>
          <div style={{ marginTop: '6px' }}>
            <SourceList sources={item.sources} />
          </div>
        </div>
      )}

      {/* Documentation quality note */}
      {item.documentationQualityNote && (
        <div style={{
          backgroundColor: '#0d1117',
          border: '1px solid #21262d',
          borderRadius: '6px',
          padding: '12px 14px',
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-start',
        }}>
          <QualityBadge quality={item.documentationQuality} />
          <p style={{ color: '#8b949e', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>
            {item.documentationQualityNote}
          </p>
        </div>
      )}

      {/* Coverage gap */}
      {item.coverageGap && (
        <div>
          <span style={{ color: '#484f58', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Coverage Gap
          </span>
          <p style={{
            color: item.coverageGapNotable ? '#f0883e' : '#8b949e',
            fontSize: '14px',
            margin: '4px 0 0',
            lineHeight: '1.5',
          }}>
            {item.coverageGap}
          </p>
        </div>
      )}

      {/* Notes */}
      {item.notes && (
        <div>
          <span style={{ color: '#484f58', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Notes
          </span>
          <p style={{ color: '#c9d1d9', fontSize: '14px', margin: '4px 0 0', lineHeight: '1.6' }}>
            {item.notes}
          </p>
        </div>
      )}

      {/* Coverage spread */}
      {item.coverageSpread.length > 0 && (
        <div>
          <span style={{ color: '#484f58', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Coverage Spread
          </span>
          <div style={{ marginTop: '6px' }}>
            <SourceList sources={item.coverageSpread} />
          </div>
        </div>
      )}

      {/* Documentation links */}
      {item.documentation.length > 0 && (
        <div>
          <span style={{ color: '#484f58', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Documentation
          </span>
          <div style={{ marginTop: '6px' }}>
            <LinkList links={item.documentation} />
          </div>
        </div>
      )}

    </article>
  )
}
