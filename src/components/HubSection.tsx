import { motion, useReducedMotion } from 'framer-motion'

const inputNodes = [
  { label: 'State Revenue Portals', sub: 'Dharitri · IGRS · Bhoomi', step: '01' },
  { label: 'Mutation Registers', sub: '30-year chain of title', step: '02' },
  { label: 'Encumbrance Certificates', sub: 'Sub-registrar filings', step: '03' },
  { label: 'Court Filings', sub: 'eCourts API · District courts', step: '04' },
]

const outputNodes = [
  { label: 'ALR Score', sub: '0–850 quantified risk rating', badge: 'SCORE', color: '#1A7A5E' },
  { label: 'Full Title Report', sub: 'PDF · delivered in 2–4 hrs', badge: 'REPORT', color: '#1A7A5E' },
  { label: 'Advocate Co-Signature', sub: 'Bar Council · 48hr SLA', badge: 'LEGAL', color: '#1A7A5E' },
  { label: 'Portfolio Watch', sub: 'Live alerts · 15-min latency', badge: 'LIVE', color: '#C96A3D' },
]

export default function HubSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section style={{ padding: 'var(--sp-3xl) var(--sp-2xl)', background: 'var(--bg)', borderBottom: '1px solid var(--rule)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="sec-label">The Process</div>
        <h2 style={{
          fontFamily: 'var(--body)',
          fontSize: 'clamp(24px,2.8vw,36px)',
          fontWeight: 800,
          letterSpacing: '-0.5px',
          color: 'var(--ink)',
          marginBottom: 12,
          lineHeight: 1.1,
          textWrap: 'balance' as React.CSSProperties['textWrap'],
        }}>
          From raw land record{' '}
          <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, color: 'var(--emerald)' }}>to rated report.</em>
        </h2>
        <p style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--mid)', lineHeight: 1.7, maxWidth: 520, marginBottom: 56 }}>
          Akuuva ingests raw government data from four independent sources, cross-references it through the ALR engine, and delivers a legally co-signed intelligence package.
        </p>

        <div className="hub-flow">

          {/* ── LEFT: DATA INPUTS ─────────────────────────────────── */}
          <div className="hub-inputs">
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sub)', marginBottom: 16 }}>
              Data Sources
            </div>
            {inputNodes.map((node, i) => (
              <motion.div
                key={node.label}
                className="hub-input-node"
                initial={{ opacity: shouldReduce ? 1 : 0, x: shouldReduce ? 0 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.0, 0.0, 0.2, 1] }}
              >
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 'var(--r-md)',
                  background: 'var(--bg3)',
                  border: '1px solid var(--rule2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontFamily: 'var(--mono)',
                  fontSize: 9,
                  fontWeight: 500,
                  color: 'var(--sub)',
                  letterSpacing: '0.05em',
                }}>
                  {node.step}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25 }}>{node.label}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--sub)', letterSpacing: '0.04em', marginTop: 2 }}>{node.sub}</div>
                </div>
                {/* Arrow indicator */}
                <div style={{ flexShrink: 0, color: 'var(--rule2)', fontSize: 12 }}>→</div>
              </motion.div>
            ))}
          </div>

          {/* ── CENTER: ALR CORE ───────────────────────────────────── */}
          <div className="hub-center-col">
            {/* Top connector label */}
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(201,106,61,0.08)', border: '1px solid rgba(201,106,61,0.2)', borderRadius: 'var(--r-full)', padding: '4px 12px' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--terra)' }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--terra)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Processing</span>
              </div>
            </div>

            {/* Core orb */}
            <motion.div
              className="hub-core-orb"
              animate={shouldReduce ? {} : { scale: [1, 1.015, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Outer ring */}
              <div className="hub-core-ring" />

              {/* Inner body */}
              <div className="hub-core-body">
                <div style={{ width: 48, height: 48, marginBottom: 12 }}>
                  <img
                    src="/assets/logo-mark-black.svg"
                    alt="Akuuva"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'invert(1)', opacity: 0.95 }}
                  />
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 8, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(62,213,152,0.75)', marginBottom: 6 }}>
                  ALR Engine
                </div>
                <div style={{ fontFamily: 'var(--body)', fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.25, textAlign: 'center' }}>
                  Title Intelligence<br />Quantified
                </div>
                {/* Live pulse */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 12 }}>
                  <motion.div
                    style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--spark)' }}
                    animate={shouldReduce ? {} : { opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'rgba(62,213,152,0.6)', letterSpacing: '0.08em' }}>LIVE · 40+ SIGNALS</span>
                </div>
              </div>
            </motion.div>

            {/* Stats row below core */}
            <div style={{ display: 'flex', gap: 12, marginTop: 20, justifyContent: 'center' }}>
              {[
                { n: '4', l: 'Sources' },
                { n: '40+', l: 'Signals' },
                { n: '2–4hr', l: 'Turnaround' },
              ].map(s => (
                <div key={s.l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--body)', fontSize: 15, fontWeight: 900, color: 'var(--ink)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{s.n}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--sub)', letterSpacing: '0.05em', marginTop: 3 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: OUTPUTS ───────────────────────────────────── */}
          <div className="hub-outputs">
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sub)', marginBottom: 16 }}>
              Deliverables
            </div>
            {outputNodes.map((node, i) => (
              <motion.div
                key={node.label}
                className="hub-output-node"
                initial={{ opacity: shouldReduce ? 1 : 0, x: shouldReduce ? 0 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.0, 0.0, 0.2, 1] }}
              >
                {/* Arrow */}
                <div style={{ flexShrink: 0, color: 'var(--rule2)', fontSize: 12 }}>→</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25 }}>{node.label}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--sub)', letterSpacing: '0.04em', marginTop: 2 }}>{node.sub}</div>
                </div>
                <div style={{
                  flexShrink: 0,
                  fontFamily: 'var(--mono)',
                  fontSize: 8,
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: node.color,
                  background: `${node.color}12`,
                  border: `1px solid ${node.color}30`,
                  borderRadius: 'var(--r-sm)',
                  padding: '2px 6px',
                }}>
                  {node.badge}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hub-flow {
          display: grid;
          grid-template-columns: 1fr 240px 1fr;
          gap: 32px;
          align-items: center;
        }

        .hub-inputs, .hub-outputs {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .hub-input-node, .hub-output-node {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #FFFFFF;
          border: 1px solid var(--rule);
          border-radius: var(--r-lg);
          padding: 13px 14px;
          transition: box-shadow var(--dur-short) var(--ease-out), border-color var(--dur-short);
        }
        .hub-input-node:hover, .hub-output-node:hover {
          box-shadow: 0 4px 16px rgba(10,25,47,0.08);
          border-color: var(--rule2);
        }

        .hub-center-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hub-core-orb {
          position: relative;
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .hub-core-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(201,106,61,0.25);
          box-shadow:
            0 0 0 10px rgba(201,106,61,0.05),
            0 0 0 24px rgba(201,106,61,0.025);
        }
        .hub-core-body {
          position: relative;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: var(--navy);
          border: 2px solid var(--terra);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
          box-shadow: 0 8px 40px rgba(10,25,47,0.4), 0 2px 8px rgba(10,25,47,0.2);
        }

        @media (max-width: 960px) {
          .hub-flow {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .hub-center-col {
            order: -1;
          }
          .hub-input-node, .hub-output-node {
            max-width: 480px;
          }
        }

        @media (max-width: 560px) {
          .hub-input-node > div:last-child,
          .hub-output-node > div:first-child {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
