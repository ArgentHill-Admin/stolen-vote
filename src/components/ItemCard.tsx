import { ManHoursItem, ManHoursSource, ManHoursLink } from '@/lib/parseManHours'

// ─── Sub-components ───────────────────────────────────────────────────────────

function QualityBadge({ quality }: { quality: 'STRONG' | 'MODERATE' | 'WEAK' }) {
  const map: Record<string, { color: string; bg: string }> = {
    STRONG:   { color: '#2D5A1B', bg: '#E8F4E8' },
    MODERATE: { color: '#495772', bg: '#E8ECF2' },
    WEAK:     { color: '#646667', bg: '#EBEBEB' },
  }
  const s = map[quality]
  return (
    <span style={{
      backgroundColor: s.bg,
      color: s.color,
      fontFamily: 'var(--font-lora), Georgia, serif',
      fontSize: '10px',
      fontWeight: '700',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      padding: '2px 8px',
      border: `1px solid ${s.color}33`,
    }}>
      {quality}
    </span>
  )
}

function CategoryBadge({ category }: { category: string }) {
  const map: Record<string, { color: string }> = {
    LEGISLATION:    { color: '#495772' },
    LEGAL:          { color: '#5A4A7A' },
    ADMINISTRATION: { color: '#2D5A1B' },
    SECURITY:       { color: '#7A4A1B' },
    CLAIM:          { color: '#7A6A1B' },
  }
  const c = (map[category] || { color: '#646667' }).color
  return (
    <span style={{
      fontFamily: 'var(--font-lora), Georgia, serif',
      fontSize: '10px',
      fontWeight: '700',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: c,
      backgroundColor: '#F0EFEB',
      border: '1px solid #D5D5D7',
      padding: '2px 8px',
    }}>
      {category}
    </span>
  )
}

function BiasChip({ bias }: { bias: string }) {
  if (!bias) return null
  const lower = bias.toLowerCase()
  let color = '#646667'
  if (lower.includes('far left'))                                         color = '#9F2236'
  else if (lower.includes('center-left') || lower.includes('center left')) color = '#7A4A1B'
  else if (lower.includes('left'))                                         color = '#7A3A1B'
  else if (lower === 'center')                                             color = '#646667'
  else if (lower.includes('center-right') || lower.includes('center right')) color = '#495772'
  else if (lower.includes('right'))                                        color = '#3A4A72'
  else if (lower.includes('government'))                                   color = '#5A4A7A'
  else if (lower.includes('academic'))                                     color = '#2D5A1B'

  return (
    <span style={{
      fontFamily: 'var(--font-lora), Georgia, serif',
      fontStyle: 'italic',
      color,
      fontSize: '11px',
    }}>
      {bias}
    </span>
  )
}

function LinkList({ links }: { links: ManHoursLink[] }) {
  if (!links.length) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {links.map((l, i) => (
        <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" style={{
          fontFamily: 'var(--font-lora), Georgia, serif',
          color: '#495772',
          fontSize: '13px',
          textDecoration: 'none',
          borderBottom: '1px solid #49577266',
        }}>
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
          <a href={s.url} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            color: '#495772',
            fontSize: '13px',
            textDecoration: 'none',
            borderBottom: '1px solid #49577266',
          }}>
            {s.name}
          </a>
          {s.bias && (
            <>
              <span style={{ color: '#D5D5D7' }}>·</span>
              <BiasChip bias={s.bias} />
            </>
          )}
        </span>
      ))}
    </div>
  )
}

// ─── Label / Section header ───────────────────────────────────────────────────

function FieldLabel({ text }: { text: string }) {
  return (
    <div style={{
      fontFamily: 'var(--font-lora), Georgia, serif',
      fontSize: '10px',
      fontWeight: '700',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#646667',
      marginBottom: '4px',
    }}>
      {text}
    </div>
  )
}

// ─── Main Item Card ───────────────────────────────────────────────────────────

export default function ItemCard({ item }: { item: ManHoursItem }) {
  return (
    <article style={{
      backgroundColor: '#FFFFFF',
      border: '1px solid #D5D5D7',
      borderLeft: '3px solid #D5D5D7',
      padding: '22px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
    }}>

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          color: '#9F2236',
          fontSize: '12px',
          fontWeight: '700',
          fontStyle: 'italic',
          marginRight: '4px',
        }}>
          #{String(item.number).padStart(2, '0')}
        </span>
        <CategoryBadge category={item.category} />
        <QualityBadge quality={item.documentationQuality} />
        {item.coverageGapNotable && (
          <span style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            backgroundColor: '#F5E8EB',
            color: '#9F2236',
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '0.08em',
            padding: '2px 8px',
            border: '1px solid #9F223633',
            textTransform: 'uppercase',
          }}>
            ⚠ Coverage Gap
          </span>
        )}
      </div>

      {/* Headline */}
      <h2 style={{
        fontFamily: 'var(--font-playfair), Georgia, serif',
        color: '#1C1C1C',
        fontSize: '18px',
        fontWeight: '700',
        lineHeight: '1.4',
        margin: 0,
        letterSpacing: '-0.2px',
      }}>
        {item.headline}
      </h2>

      <div style={{ borderTop: '1px solid #D5D5D7' }} />

      {/* Claimant */}
      <div>
        <FieldLabel text="Claimant" />
        <p style={{
          fontFamily: 'var(--font-lora), Georgia, serif',
          color: '#1C1C1C',
          fontSize: '14px',
          margin: 0,
          lineHeight: '1.55',
        }}>
          {item.claimant}
        </p>
      </div>

      {/* Primary sources */}
      {item.sources.length > 0 && (
        <div>
          <FieldLabel text="Source" />
          <SourceList sources={item.sources} />
        </div>
      )}

      {/* Documentation quality note */}
      {item.documentationQualityNote && (
        <div style={{
          backgroundColor: '#F0EFEB',
          borderLeft: '3px solid #D5D5D7',
          padding: '10px 14px',
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-start',
        }}>
          <QualityBadge quality={item.documentationQuality} />
          <p style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            fontStyle: 'italic',
            color: '#646667',
            fontSize: '13px',
            margin: 0,
            lineHeight: '1.55',
          }}>
            {item.documentationQualityNote}
          </p>
        </div>
      )}

      {/* Coverage gap */}
      {item.coverageGap && (
        <div>
          <FieldLabel text="Coverage Gap" />
          <p style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            color: item.coverageGapNotable ? '#9F2236' : '#646667',
            fontStyle: item.coverageGapNotable ? 'normal' : 'italic',
            fontSize: '14px',
            margin: 0,
            lineHeight: '1.55',
          }}>
            {item.coverageGap}
          </p>
        </div>
      )}

      {/* Notes */}
      {item.notes && (
        <div>
          <FieldLabel text="Notes" />
          <p style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            color: '#1C1C1C',
            fontSize: '14px',
            margin: 0,
            lineHeight: '1.6',
          }}>
            {item.notes}
          </p>
        </div>
      )}

      {/* Coverage spread */}
      {item.coverageSpread.length > 0 && (
        <div>
          <FieldLabel text="Coverage Spread" />
          <SourceList sources={item.coverageSpread} />
        </div>
      )}

      {/* Documentation links */}
      {item.documentation.length > 0 && (
        <div>
          <FieldLabel text="Documentation" />
          <LinkList links={item.documentation} />
        </div>
      )}

    </article>
  )
}
