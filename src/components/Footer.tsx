export default function Footer() {
  return (
    <footer style={{
      background: '#060F1C',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '20px var(--sp-2xl)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, lineHeight: 0 }}>
          <img
            src="/assets/logo-mark-black.svg"
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            style={{ display: 'block', opacity: 0.28, filter: 'invert(1)' }}
          />
          <img
            src="/assets/logo-name.svg"
            alt="Akuuva"
            height={17}
            style={{ display: 'block', width: 'auto', opacity: 0.22, filter: 'invert(1)' }}
          />
        </div>
        <ul style={{ display: 'flex', gap: 22, listStyle: 'none', flexWrap: 'wrap' }}>
          <li>
            <a
              href="mailto:support@akuuva.com"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 10,
                color: 'rgba(255,255,255,0.2)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                padding: '16px 0',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'color var(--dur-short)',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
            >
              support@akuuva.com
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 10,
                color: 'rgba(255,255,255,0.2)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                padding: '16px 0',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'color var(--dur-short)',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="#"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 10,
                color: 'rgba(255,255,255,0.2)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                padding: '16px 0',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'color var(--dur-short)',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
            >
              Privacy
            </a>
          </li>
        </ul>
        <div style={{
          fontFamily: 'var(--mono)',
          fontSize: 10,
          color: 'rgba(255,255,255,0.14)',
          letterSpacing: '0.04em',
        }}>
          © 2025 Akuuva
        </div>
      </div>
    </footer>
  )
}
