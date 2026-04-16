import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const STEPS = [
  {
    id: 'ingest',
    number: '01',
    phase: 'Data Ingestion',
    accent: '#3B82F6',
    title: 'Four live government databases. Scraped at the moment of request.',
    body: 'No cached data. No third-party resellers. Raw records pulled directly from state revenue portals, sub-registrar offices, mutation registers, and the eCourts API.',
    tags: ['Dharitri / IGRS', 'Mutation Register', 'Encumbrance Certs.', 'eCourts API'],
  },
  {
    id: 'engine',
    number: '02',
    phase: 'ALR Scoring Engine',
    accent: '#C96A3D',
    title: '40+ risk signals processed into a single 0–850 score.',
    body: 'Encumbrance depth, litigation history, mutation gaps, ownership chain continuity, and regulatory overlays — all weighted, explainable, and calibrated to institutional lending thresholds.',
    tags: ['Encumbrance depth', 'Litigation history', 'Mutation continuity', 'Ownership chain'],
  },
  {
    id: 'advocate',
    number: '03',
    phase: 'Advocate Co-Signature',
    accent: '#22C55E',
    title: 'Every report reviewed and signed by a Senior Advocate.',
    body: 'Bar Council of Delhi enrollment number and digital signature on every report. A legally auditable chain of custody that generic opinion letters cannot replicate.',
    tags: ['Bar Council of Delhi', 'Enrollment number', 'Digital signature', '48hr SLA'],
  },
  {
    id: 'deliver',
    number: '04',
    phase: 'Delivery & Watch',
    accent: '#3ED598',
    title: 'Full report in 24–48 hours. Monitoring continues 24/7.',
    body: 'ALR score, title report PDF, and advocate sign-off delivered in 24–48 hours. Portfolio Watch then monitors every survey number for new EC filings, court cases, or changes — alerting within 15 minutes.',
    tags: ['ALR Score (0–850)', 'Full Title Report PDF', 'Advocate sign-off', 'Portfolio Watch'],
  },
]

export default function HubSection() {
  const shouldReduce = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0 })
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{
        background: 'var(--navy)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: 'var(--sp-3xl) var(--sp-2xl)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle dot grid */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.2, 0, 0.2, 1] }}
          style={{ marginBottom: 64 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(62,213,152,0.75)', marginBottom: 18,
          }}>
            <div style={{ width: 20, height: 1.5, background: 'rgba(62,213,152,0.5)', borderRadius: 2 }} />
            The Process
          </div>
          <h2 style={{
            fontFamily: 'var(--body)',
            fontSize: 'clamp(30px, 3.5vw, 48px)',
            fontWeight: 900,
            letterSpacing: '-1.5px',
            color: '#fff',
            lineHeight: 1.06,
            marginBottom: 16,
            textWrap: 'balance' as React.CSSProperties['textWrap'],
          }}>
            From raw land record{' '}
            <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(245,241,232,0.45)' }}>
              to rated report.
            </em>
          </h2>
          <p style={{
            fontFamily: 'var(--body)', fontSize: 15,
            color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, maxWidth: 500,
          }}>
            Four steps. Fully automated data ingestion, algorithmic scoring, legal co-signature, and continuous monitoring.
          </p>
        </motion.div>

        {/* ── 4-step pipeline grid ── */}
        <div className="steps-grid">
          {STEPS.map((step, i) => {
            const isHovered = hovered === step.id
            return (
              <motion.div
                key={step.id}
                className="step-card"
                onMouseEnter={() => setHovered(step.id)}
                onMouseLeave={() => setHovered(null)}
                initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.2, 0, 0.2, 1] }}
                style={{
                  background: isHovered
                    ? 'rgba(255,255,255,0.055)'
                    : 'rgba(255,255,255,0.025)',
                  border: isHovered ? `1px solid ${step.accent}40` : '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16,
                  padding: '28px 26px 24px',
                  cursor: 'default',
                  transition: 'background 220ms, border-color 220ms',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top accent bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 24, right: 24, height: 2,
                  background: `linear-gradient(90deg, ${step.accent}, transparent)`,
                  borderRadius: '0 0 2px 2px',
                  opacity: isHovered ? 1 : 0.35,
                  transition: 'opacity 220ms',
                }} />

                {/* Step number */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600,
                    letterSpacing: '0.1em', color: step.accent,
                  }}>
                    {step.number}
                  </span>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 9,
                    letterSpacing: '0.09em', textTransform: 'uppercase',
                    color: isHovered ? step.accent : 'rgba(255,255,255,0.2)',
                    background: isHovered ? `${step.accent}14` : 'transparent',
                    border: isHovered ? `1px solid ${step.accent}30` : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 20, padding: '3px 9px',
                    transition: 'all 220ms',
                  }}>
                    {step.phase}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--body)',
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.4,
                  letterSpacing: '-0.2px',
                  marginBottom: 12,
                }}>
                  {step.title}
                </h3>

                {/* Body */}
                <p style={{
                  fontFamily: 'var(--body)', fontSize: 13,
                  color: 'rgba(255,255,255,0.5)', lineHeight: 1.75,
                  marginBottom: 20,
                  textWrap: 'pretty' as React.CSSProperties['textWrap'],
                }}>
                  {step.body}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {step.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: 'var(--mono)', fontSize: 9,
                      color: isHovered ? step.accent : 'rgba(255,255,255,0.3)',
                      background: isHovered ? `${step.accent}10` : 'rgba(255,255,255,0.04)',
                      border: isHovered ? `1px solid ${step.accent}25` : '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 4, padding: '3px 7px',
                      letterSpacing: '0.04em',
                      transition: 'all 220ms',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Connector arrow between cards (not last) */}
                {i < STEPS.length - 1 && (
                  <div className="step-arrow" aria-hidden="true">
                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                      <path d="M8 2v12M4 10l4 4 4-4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* ── Bottom proof bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.7 }}
          style={{
            marginTop: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {[
            { n: '4', l: 'Govt. databases' },
            { n: '40+', l: 'Risk signals' },
            { n: '24–48h', l: 'Report SLA' },
            { n: '15 min', l: 'Alert latency' },
          ].map((stat, i) => (
            <div key={stat.l} style={{
              flex: 1,
              padding: '20px 16px',
              textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : undefined,
            }}>
              <div style={{
                fontFamily: 'var(--body)', fontSize: 24, fontWeight: 900,
                color: '#fff', letterSpacing: '-1px', lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}>{stat.n}</div>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 9,
                color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em',
                marginTop: 6, textTransform: 'uppercase',
              }}>{stat.l}</div>
            </div>
          ))}
        </motion.div>

      </div>

      <style>{`
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          position: relative;
        }
        .step-arrow {
          display: none;
        }
        @media (max-width: 1000px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 580px) {
          .steps-grid {
            grid-template-columns: 1fr;
          }
          .step-arrow {
            display: flex;
            justify-content: center;
            margin-top: 14px;
          }
        }
      `}</style>
    </section>
  )
}
