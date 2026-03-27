import Link from 'next/link'

export default function Header() {
  return (
    <header style={{ backgroundColor: '#F0EFEB' }}>

      {/* Top crimson rule */}
      <div style={{ height: '4px', backgroundColor: '#9F2236' }} />

      {/* Masthead */}
      <div style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: '20px 24px 16px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
      }}>
        {/* Logo + tagline */}
        <div>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '36px',
              fontWeight: '900',
              letterSpacing: '-1px',
              lineHeight: '1',
              color: '#1C1C1C',
            }}>
              <span style={{ color: '#9F2236' }}>STOLEN</span>
              <span style={{ color: '#1C1C1C' }}>.VOTE</span>
            </div>
          </Link>
          <div style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            fontStyle: 'italic',
            fontSize: '12px',
            color: '#646667',
            marginTop: '4px',
            letterSpacing: '0.02em',
          }}>
            Voting integrity. Documented daily.
          </div>
        </div>

        {/* Nav + subscribe */}
        <nav style={{ display: 'flex', gap: '28px', alignItems: 'center', paddingBottom: '4px' }}>
          <Link href="/" style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            color: '#1C1C1C',
            fontSize: '14px',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            Reports
          </Link>
          <Link href="/about" style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            color: '#1C1C1C',
            fontSize: '14px',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            About
          </Link>
          <Link href="/subscribe" style={{
            backgroundColor: '#9F2236',
            color: '#F0EFEB',
            fontFamily: 'var(--font-lora), Georgia, serif',
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '7px 16px',
          }}>
            Free Newsletter
          </Link>
        </nav>
      </div>

      {/* Bottom rules — double broadsheet rule */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ borderTop: '3px solid #1C1C1C' }} />
        <div style={{ borderTop: '1px solid #1C1C1C', marginTop: '3px' }} />
      </div>
      <div style={{ marginBottom: '0' }} />

    </header>
  )
}
