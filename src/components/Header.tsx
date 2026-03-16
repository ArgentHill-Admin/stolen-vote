import Link from 'next/link'

export default function Header() {
  return (
    <header style={{ backgroundColor: '#0d1117', borderBottom: '1px solid #21262d' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px', fontWeight: '800', color: '#f85149', letterSpacing: '-0.5px', fontFamily: 'Georgia, serif' }}>
            stolen
          </span>
          <span style={{ fontSize: '20px', fontWeight: '800', color: '#e6edf3', letterSpacing: '-0.5px', fontFamily: 'Georgia, serif' }}>
            .vote
          </span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#8b949e', fontSize: '14px', textDecoration: 'none' }}>
            Reports
          </Link>
          <Link href="/about" style={{ color: '#8b949e', fontSize: '14px', textDecoration: 'none' }}>
            About
          </Link>
          <Link href="/subscribe" style={{
            backgroundColor: '#f85149',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: '700',
            textDecoration: 'none',
            padding: '6px 14px',
            borderRadius: '6px',
          }}>
            Subscribe
          </Link>
        </nav>
      </div>
    </header>
  )
}
