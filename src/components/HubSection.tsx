import { motion, useReducedMotion } from 'framer-motion'

const inputNodes = [
  {
    label: 'State Revenue Portals',
    sub: 'Dharitri · IGRS · Bhoomi',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" width={16} height={16}>
        <rect x="2" y="2" width="12" height="12" rx="2" /><path d="M5 8h6M5 5.5h6M5 10.5h4" />
      </svg>
    ),
  },
  {
    label: 'Mutation Registers',
    sub: '30-year chain of title',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" width={16} height={16}>
        <circle cx="8" cy="8" r="6" /><path d="M8 5v3l2 2" />
      </svg>
    ),
  },
  {
    label: 'Encumbrance Certificates',
    sub: 'Sub-registrar filings',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" width={16} height={16}>
        <path d="M3 4h10M3 8h7M3 12h5" /><path d="M12 10l2 2-2 2" />
      </svg>
    ),
  },
  {
    label: 'Court Filings',
    sub: 'eCourts API · District courts',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" width={16} height={16}>
        <path d="M8 2L2 6v8h12V6L8 2z" /><path d="M6 14V9h4v5" />
      </svg>
    ),
  },
]

const outputNodes = [
  {
    label: 'ALR Score (0–850)',
    sub: 'Quantified risk rating',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" width={16} height={16}>
        <circle cx="8" cy="8" r="6" /><path d="M5 8l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: 'Full Title Report',
    sub: 'PDF · delivered in 2–4 hrs',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" width={16} height={16}>
        <path d="M4 2h8l2 3v9H2V5l2-3z" /><path d="M6 7h4M6 10h3" />
      </svg>
    ),
  },
  {
    label: 'Advocate Co-Signature',
    sub: 'Bar Council verified · 48hr SLA',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" width={16} height={16}>
        <path d="M8 2v4M8 10v4M2 8h4M10 8h4" /><circle cx="8" cy="8" r="2" />
      </svg>
    ),
  },
  {
    label: 'Portfolio Watch',
    sub: 'Live alerts · 15-min latency',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" width={16} height={16}>
        <path d="M3 8a5 5 0 1010 0A5 5 0 003 8z" /><path d="M8 5v3l1.5 1.5" />
      </svg>
    ),
  },
]

export default function HubSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section style={{ padding: 'var(--sp-3xl) var(--sp-2xl)', background: 'var(--bg)', borderBottom: '1px solid var(--rule)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="sec-label">The Process</div>
        <h2 style={{ fontFamily: 'var(--body)', fontSize: 'clamp(24px,2.8vw,36px)', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--ink)', lineHeight: 1.1, textWrap: 'balance' as React.CSSProperties['textWrap'] }}>
          From raw land record{' '}
          <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, color: 'var(--emerald)' }}>to rated report.</em>
        </h2>

        {/* Desktop 3-col layout */}
        <div className="hub-layout">
          {/* Left: inputs */}
          <div className="hub-col hub-left">
            {inputNodes.map((node, i) => (
              <motion.div
                key={node.label}
                className="hub-node hub-node-left"
                initial={{ opacity: shouldReduce ? 1 : 0, x: shouldReduce ? 0 : -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.08, ease: [0.0, 0.0, 0.2, 1] }}
              >
                <div className="hub-node-icon hub-node-icon-default">{node.icon}</div>
                <div className="hub-node-text hub-node-text-right">
                  <div style={{ fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>{node.label}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--sub)', letterSpacing: '0.05em', marginTop: 2 }}>{node.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center: core */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={shouldReduce ? {} : { scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 160,
                height: 160,
                borderRadius: '50%',
                background: 'var(--navy)',
                border: '3px solid var(--terra)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 'var(--sp-md)',
                boxShadow: '0 0 0 12px rgba(201,106,61,0.08), 0 4px 32px rgba(10,25,47,0.3)',
                flexShrink: 0,
              }}
            >
              <div style={{ width: 40, height: 40, marginBottom: 'var(--sp-sm)' }}>
                <img src="/assets/logo-mark-black.svg" alt="Akuuva" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'invert(1)', opacity: 0.9 }} />
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(62,213,152,0.8)', marginBottom: 4 }}>ALR Engine</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Title Intelligence, Quantified</div>
            </motion.div>
          </div>

          {/* Right: outputs */}
          <div className="hub-col hub-right">
            {outputNodes.map((node, i) => (
              <motion.div
                key={node.label}
                className="hub-node hub-node-right"
                initial={{ opacity: shouldReduce ? 1 : 0, x: shouldReduce ? 0 : 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.08, ease: [0.0, 0.0, 0.2, 1] }}
              >
                <div className="hub-node-icon hub-node-icon-emerald">{node.icon}</div>
                <div className="hub-node-text">
                  <div style={{ fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>{node.label}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--sub)', letterSpacing: '0.05em', marginTop: 2 }}>{node.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hub-layout {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: var(--sp-xl);
          align-items: center;
          margin-top: var(--sp-2xl);
        }
        .hub-col {
          display: flex;
          flex-direction: column;
          gap: var(--sp-md);
        }
        .hub-left { align-items: flex-end; }
        .hub-right { align-items: flex-start; }
        .hub-node {
          display: flex;
          align-items: center;
          gap: var(--sp-md);
          background: #FFFFFF;
          border: 1px solid var(--rule);
          border-radius: var(--r-lg);
          padding: 14px var(--sp-md);
          min-width: 200px;
          position: relative;
        }
        .hub-node-left { flex-direction: row-reverse; }
        .hub-node-text-right { text-align: right; }
        .hub-node-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--r-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .hub-node-icon-default {
          background: var(--bg2);
          border: 1px solid var(--rule2);
          color: var(--navy);
        }
        .hub-node-icon-emerald {
          background: rgba(26,122,94,0.08);
          border: 1px solid rgba(26,122,94,0.2);
          color: var(--emerald);
        }
        /* connector lines */
        .hub-node-left::after {
          content: '';
          position: absolute;
          right: -32px;
          top: 50%;
          width: 28px;
          height: 1px;
          background: var(--rule2);
        }
        .hub-node-right::before {
          content: '';
          position: absolute;
          left: -32px;
          top: 50%;
          width: 28px;
          height: 1px;
          background: var(--rule2);
        }

        @media (max-width: 900px) {
          .hub-layout {
            grid-template-columns: 1fr;
            gap: var(--sp-lg);
          }
          .hub-left, .hub-right { align-items: stretch; }
          .hub-node-left { flex-direction: row; }
          .hub-node-text-right { text-align: left; }
          .hub-node-left::after, .hub-node-right::before { display: none; }
          .hub-node { min-width: unset; }
        }
      `}</style>
    </section>
  )
}
