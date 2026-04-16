import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Hub-and-spoke nodes
const INPUTS = [
  {
    id: 'igrs',
    label: 'State Revenue Portals',
    sub: 'Dharitri · IGRS · Bhoomi',
    icon: (
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M5 9h8M5 6.5h8M5 11.5h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'mutation',
    label: 'Mutation Registers',
    sub: '30-year title chain',
    icon: (
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M9 5.5v3.5l2.5 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'ec',
    label: 'Encumbrance Certs.',
    sub: 'Sub-registrar filings',
    icon: (
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <path d="M4 2h10l2 3v11H2V5L4 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M6 8h6M6 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'ecourts',
    label: 'Court Filings',
    sub: 'eCourts API · District courts',
    icon: (
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <path d="M9 2L3 6v10h12V6L9 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M7 16V10h4v6" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
  },
]

const OUTPUTS = [
  {
    id: 'alr',
    label: 'ALR Score (0–850)',
    sub: 'Quantified risk rating',
    accent: '#3ED598',
    icon: (
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M5.5 9l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'report',
    label: 'Full Title Report',
    sub: 'PDF · 24–48 hours',
    accent: '#3ED598',
    icon: (
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <path d="M4 2h7l3 3v11H4V2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M11 2v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M7 8h4M7 11h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'advocate',
    label: 'Advocate Co-Signature',
    sub: 'Bar Council · 48hr SLA',
    accent: '#3ED598',
    icon: (
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <path d="M9 2l1.8 3.6L15 6.2l-3 2.9.7 4.1L9 11l-3.7 2.2.7-4.1-3-2.9 4.2-.6L9 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'watch',
    label: 'Portfolio Watch',
    sub: 'Live alerts · 15-min latency',
    accent: '#3ED598',
    icon: (
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <path d="M9 3a6 6 0 100 12A6 6 0 009 3z" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M9 6v3.5l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

// Animated connection line between spoke and hub
interface SpokeConnectorProps { readonly side: 'left' | 'right'; readonly index: number; readonly total: number; readonly active: boolean }
function SpokeConnector({ side, index, total: _total, active }: SpokeConnectorProps) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%',
        [side === 'left' ? 'right' : 'left']: 0,
        width: '100%',
        height: 1,
        transformOrigin: side === 'left' ? 'right' : 'left',
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
      transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : index * 0.1, ease: [0.2, 0, 0.2, 1] }}
    >
      <svg width="100%" height="2" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${side}-${index}`} x1={side === 'left' ? '100%' : '0%'} y1="0%" x2={side === 'left' ? '0%' : '100%'} y2="0%">
            <stop offset="0%" stopColor="#1A7A5E" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#1A7A5E" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <line x1="0" y1="1" x2="100%" y2="1" stroke={`url(#grad-${side}-${index})`} strokeWidth="1" strokeDasharray="4 3"/>
      </svg>
      {/* Traveling particle */}
      {!shouldReduce && active && (
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: '#3ED598',
            transform: 'translateY(-50%)',
            boxShadow: '0 0 6px #3ED598',
          }}
          animate={{ left: side === 'left' ? ['0%', '100%'] : ['100%', '0%'] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4, ease: 'linear', repeatDelay: 1 }}
        />
      )}
    </motion.div>
  )
}

export default function HubSection() {
  const shouldReduce = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0 })

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--navy)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: 'var(--sp-3xl) var(--sp-2xl)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }} />

      {/* Radial glow behind core */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,122,94,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(62,213,152,0.7)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 18, height: 1, background: 'rgba(62,213,152,0.4)' }} />
            The Process
          </div>
          <h2 style={{
            fontFamily: 'var(--body)',
            fontSize: 'clamp(26px, 3vw, 42px)',
            fontWeight: 900,
            letterSpacing: '-1px',
            color: '#fff',
            lineHeight: 1.08,
            marginBottom: 8,
            textWrap: 'balance' as React.CSSProperties['textWrap'],
          }}>
            From raw land record{' '}
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(245,241,232,0.5)' }}>to rated report.</span>
          </h2>
          <p style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, maxWidth: 460, marginBottom: 56 }}>
            Four government databases flow into the ALR engine. One quantified score and advocate-signed report out — in 24–48 hours.
          </p>
        </motion.div>

        {/* Hub-and-spoke infographic */}
        <div className="hub-infographic">

          {/* ── LEFT SPOKES: Data Sources ── */}
          <div className="spoke-col spoke-left">
            {INPUTS.map((node, i) => (
              <motion.div
                key={node.id}
                className="spoke-node input-node"
                initial={{ opacity: 0, x: shouldReduce ? 0 : -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: [0.2, 0, 0.2, 1] }}
              >
                <div className="spoke-icon-wrap spoke-icon-input">
                  {node.icon}
                </div>
                <div className="spoke-text">
                  <div className="spoke-label">{node.label}</div>
                  <div className="spoke-sub">{node.sub}</div>
                </div>
                {/* Connector line */}
                <div className="spoke-connector spoke-connector-left">
                  <SpokeConnector side="left" index={i} total={INPUTS.length} active={isInView} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── CENTER HUB ── */}
          <div className="hub-center-col">
            <motion.div
              className="hub-core-ring"
              initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0, 0.2, 1] }}
            >
              {/* Outer pulsing ring */}
              {!shouldReduce && (
                <motion.div
                  className="hub-pulse-ring"
                  animate={{ scale: [1, 1.18, 1], opacity: [0.15, 0, 0.15] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              {/* Core circle */}
              <div className="hub-core">
                <img src="/assets/logo-mark-green.svg" alt="" width={36} height={36} style={{ display: 'block', marginBottom: 10 }} />
                <div style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(62,213,152,0.7)', marginBottom: 5 }}>ALR Engine</div>
                <div style={{ fontFamily: 'var(--body)', fontSize: 13, fontWeight: 700, color: '#fff', textAlign: 'center', lineHeight: 1.3 }}>Title Intelligence,<br/>Quantified</div>

                {/* Stat pills */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14, width: '100%' }}>
                  {[
                    { n: '40+', l: 'Risk signals' },
                    { n: '24–48h', l: 'Report SLA' },
                  ].map(s => (
                    <div key={s.l} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(62,213,152,0.08)',
                      border: '1px solid rgba(62,213,152,0.15)',
                      borderRadius: 6,
                      padding: '5px 10px',
                    }}>
                      <span style={{ fontFamily: 'var(--body)', fontSize: 14, fontWeight: 900, color: '#3ED598', letterSpacing: '-0.5px', fontVariantNumeric: 'tabular-nums' }}>{s.n}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Advocate badge below hub */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.7 }}
              style={{
                marginTop: 18,
                background: 'rgba(26,122,94,0.1)',
                border: '1px solid rgba(26,122,94,0.2)',
                borderRadius: 8,
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
              }}
            >
              <svg width={10} height={10} viewBox="0 0 11 11" fill="none">
                <circle cx="5.5" cy="5.5" r="4.5" stroke="#1A7A5E" strokeWidth="1.1"/>
                <path d="M3 5.5L5 7.5L8.5 3.5" stroke="#22C55E" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(26,122,94,0.9)', letterSpacing: '0.06em' }}>Advocate Co-Signature on every report</span>
            </motion.div>
          </div>

          {/* ── RIGHT SPOKES: Outputs ── */}
          <div className="spoke-col spoke-right">
            {OUTPUTS.map((node, i) => (
              <motion.div
                key={node.id}
                className="spoke-node output-node"
                initial={{ opacity: 0, x: shouldReduce ? 0 : 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.5 + i * 0.08, ease: [0.2, 0, 0.2, 1] }}
              >
                {/* Connector line */}
                <div className="spoke-connector spoke-connector-right">
                  <SpokeConnector side="right" index={i} total={OUTPUTS.length} active={isInView} />
                </div>
                <div className="spoke-icon-wrap spoke-icon-output">
                  {node.icon}
                </div>
                <div className="spoke-text">
                  <div className="spoke-label">{node.label}</div>
                  <div className="spoke-sub">{node.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Bottom legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, marginTop: 44 }}
        >
          {[
            { dot: 'rgba(255,255,255,0.25)', label: 'Government data sources' },
            { dot: '#1A7A5E', label: 'ALR processing engine' },
            { dot: '#3ED598', label: 'Verified report output' },
          ].map(item => (
            <div key={item.dot} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: item.dot, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>{item.label}</span>
            </div>
          ))}
        </motion.div>

      </div>

      <style>{`
        .hub-infographic {
          display: grid;
          grid-template-columns: 1fr 220px 1fr;
          gap: 0;
          align-items: center;
          min-height: 360px;
        }

        /* Spoke columns */
        .spoke-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .spoke-left { align-items: flex-end; padding-right: 40px; }
        .spoke-right { align-items: flex-start; padding-left: 40px; }

        /* Individual node */
        .spoke-node {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          width: 100%;
          max-width: 260px;
        }
        .input-node { flex-direction: row-reverse; }
        .input-node .spoke-text { text-align: right; }

        .spoke-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 200ms;
        }
        .spoke-icon-input {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.55);
        }
        .spoke-icon-output {
          background: rgba(26,122,94,0.1);
          border: 1px solid rgba(26,122,94,0.2);
          color: #3ED598;
        }
        .spoke-node:hover .spoke-icon-wrap {
          transform: scale(1.06);
        }

        .spoke-text { min-width: 0; }
        .spoke-label {
          font-family: var(--body);
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          line-height: 1.3;
        }
        .spoke-sub {
          font-family: var(--mono);
          font-size: 9px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.04em;
          margin-top: 2px;
        }

        /* Connector line container */
        .spoke-connector {
          position: absolute;
          top: 50%;
          height: 1px;
          width: 40px;
          transform: translateY(-50%);
        }
        .spoke-connector-left { right: -40px; }
        .spoke-connector-right { left: -40px; }

        /* Center hub */
        .hub-center-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hub-core-ring {
          position: relative;
          width: 190px;
          height: 190px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hub-pulse-ring {
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          border: 2px solid rgba(62,213,152,0.3);
        }
        .hub-core {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: var(--navy2);
          border: 2.5px solid #1A7A5E;
          box-shadow: 0 0 0 8px rgba(26,122,94,0.08), 0 4px 40px rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 16px;
          z-index: 1;
        }

        /* Mobile: stack vertically */
        @media (max-width: 860px) {
          .hub-infographic {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .spoke-left, .spoke-right {
            align-items: center;
            padding: 0;
          }
          .spoke-left .spoke-node, .spoke-right .spoke-node {
            flex-direction: row;
            max-width: 280px;
          }
          .spoke-left .spoke-text { text-align: left; }
          .spoke-connector { display: none; }
          .hub-center-col { order: -1; }
        }
      `}</style>
    </section>
  )
}
