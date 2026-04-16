import { useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      aria-label="Main navigation"
      style={{
        background: 'rgba(245,241,232,0.95)',
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid var(--rule)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 var(--sp-2xl)',
          height: 58,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo: mark + wordmark side by side.
            Both PNGs are 500×500 with white backgrounds and centered content.
            mixBlendMode:multiply makes white transparent on the parchment nav.
            The wordmark text sits in the middle ~30% of the square, so we
            render it tall and crop the top/bottom whitespace via overflow:hidden. */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 2, textDecoration: 'none', lineHeight: 0 }}>
          {/* Mark: triangle — content fills ~60% of canvas height */}
          <div style={{ height: 30, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
            <img
              src="/assets/logo-mark-black.png"
              alt=""
              aria-hidden="true"
              style={{ display: 'block', height: 52, width: 'auto', marginTop: -10, mixBlendMode: 'multiply' }}
            />
          </div>
          {/* Wordmark: AKUUVA text sits in the middle ~30% of canvas height.
              Render at 66px tall, crop to 20px showing the middle slice. */}
          <div style={{ height: 20, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
            <img
              src="/assets/logo-name.png"
              alt="Akuuva"
              style={{ display: 'block', height: 66, width: 'auto', mixBlendMode: 'multiply' }}
            />
          </div>
        </a>

        {/* Desktop nav links */}
        <ul
          style={{
            display: 'flex',
            gap: 32,
            listStyle: 'none',
          }}
          className="nav-desktop-links"
        >
          <li><a href="#how-it-works" className="nav-link">Intelligence</a></li>
          <li><a href="#why-akuuva" className="nav-link">Reports</a></li>
          <li><a href="#get-started" className="nav-link">Pricing</a></li>
        </ul>

        {/* Desktop CTA */}
        <a
          href="mailto:support@akuuva.com"
          className="nav-cta-btn nav-desktop-cta"
        >
          Get your report
        </a>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className={`hamburger-line ${menuOpen ? 'open-1' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open-2' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open-3' : ''}`} />
        </button>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="nav-mobile-menu">
          <a href="#how-it-works" className="nav-mobile-link" onClick={() => setMenuOpen(false)}>Intelligence</a>
          <a href="#why-akuuva" className="nav-mobile-link" onClick={() => setMenuOpen(false)}>Reports</a>
          <a href="#get-started" className="nav-mobile-link" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="mailto:support@akuuva.com" className="nav-cta-btn nav-mobile-cta" onClick={() => setMenuOpen(false)}>Get your report</a>
        </div>
      )}

      <style>{`
        .nav-link {
          font-family: var(--body);
          font-size: 13px;
          color: var(--mid);
          text-decoration: none;
          font-weight: 400;
          transition: color var(--dur-short);
          padding: 14px 0;
          display: inline-flex;
          align-items: center;
        }
        .nav-link:hover { color: var(--ink); }
        .nav-cta-btn {
          font-family: var(--body);
          font-size: 13px;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: var(--r-full);
          background: var(--terra);
          color: #fff;
          text-decoration: none;
          transition: background var(--dur-short);
          white-space: nowrap;
        }
        .nav-cta-btn:hover { background: var(--terra2); color: #fff; }
        .nav-cta-btn:visited { color: #fff; }

        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .hamburger-line {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--ink);
          border-radius: 2px;
          transition: transform var(--dur-short), opacity var(--dur-short);
        }
        .open-2 { opacity: 0; }
        .open-1 { transform: translateY(7px) rotate(45deg); }
        .open-3 { transform: translateY(-7px) rotate(-45deg); }

        .nav-mobile-menu {
          background: rgba(245,241,232,0.98);
          border-top: 1px solid var(--rule);
          padding: 16px var(--sp-xl);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .nav-mobile-link {
          font-family: var(--body);
          font-size: 15px;
          color: var(--ink);
          text-decoration: none;
          font-weight: 500;
          padding: 12px 0;
          border-bottom: 1px solid var(--rule);
        }
        .nav-mobile-link:hover { color: var(--terra); }
        .nav-mobile-cta {
          margin-top: 12px;
          text-align: center;
          display: block;
        }

        @media (max-width: 680px) {
          .nav-desktop-links { display: none; }
          .nav-desktop-cta { display: none; }
          .nav-hamburger { display: flex; }
        }
      `}</style>
    </nav>
  )
}
