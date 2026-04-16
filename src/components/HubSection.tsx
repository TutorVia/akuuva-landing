import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion'

const STEPS = [
  {
    id: 'ingest',
    number: '01',
    phase: 'Data Ingestion',
    title: 'Four independent government databases. Cross-referenced automatically.',
    body: 'Every parcel analysis begins with a live scrape across state revenue portals, sub-registrar filings, mutation registers, and the eCourts API. No cached data. No third-party resellers. Raw government records, pulled at the moment of request.',
    sources: [
      { name: 'Dharitri / IGRS', type: 'Revenue Portal', status: 'live' },
      { name: 'Mutation Register', type: '30-yr title chain', status: 'live' },
      { name: 'Encumbrance Cert.', type: 'Sub-registrar', status: 'live' },
      { name: 'eCourts API', type: 'District courts', status: 'live' },
    ],
    stat: { n: '4', label: 'live data sources', sub: 'scraped at request time' },
    accent: '#3ED598',
  },
  {
    id: 'engine',
    number: '02',
    phase: 'ALR Scoring Engine',
    title: 'Forty signals. One number. Fully explainable.',
    body: 'The Akuuva Land Rating engine weighs 40+ risk signals — encumbrance depth, litigation history, mutation gaps, ownership chain continuity, and regulatory overlays — into a single 0–850 score calibrated to institutional lending thresholds.',
    sources: [
      { name: 'Encumbrance depth', type: 'Risk signal', status: 'weighted' },
      { name: 'Litigation history', type: 'Risk signal', status: 'weighted' },
      { name: 'Mutation continuity', type: 'Risk signal', status: 'weighted' },
      { name: 'Ownership chain', type: 'Risk signal', status: 'weighted' },
    ],
    stat: { n: '40+', label: 'risk signals', sub: 'per parcel analysis' },
    accent: '#C96A3D',
  },
  {
    id: 'advocate',
    number: '03',
    phase: 'Advocate Co-Signature',
    title: 'Every report carries a real lawyer\'s enrollment number.',
    body: 'Machine intelligence is necessary but not sufficient. Every Akuuva report is reviewed and co-signed by a Senior Advocate registered with the Bar Council of Delhi. This creates a legally auditable chain of custody that opinion letters from generic firms cannot match.',
    sources: [
      { name: 'Bar Council Delhi', type: 'Legal standing', status: 'verified' },
      { name: 'Enrollment number', type: 'On every report', status: 'verified' },
      { name: 'Digital signature', type: 'Tamper-evident', status: 'verified' },
      { name: '48hr SLA', type: 'Guaranteed turnaround', status: 'verified' },
    ],
    stat: { n: '48hr', label: 'advocate SLA', sub: 'Bar Council of Delhi' },
    accent: '#1A7A5E',
  },
  {
    id: 'deliver',
    number: '04',
    phase: 'Delivery & Watch',
    title: 'A report in days. Monitoring forever after.',
    body: 'The full intelligence package — ALR score, title report PDF, and advocate co-signature — is delivered in 2–4 working days. Portfolio Watch then monitors every survey number 24/7 for new EC filings, court cases, or regulatory changes, alerting within 15 minutes.',
    sources: [
      { name: 'ALR Score (0–850)', type: 'Quantified rating', status: 'delivered' },
      { name: 'Full Title Report', type: 'PDF, 2–4 working days', status: 'delivered' },
      { name: 'Advocate sign-off', type: 'Legal standing', status: 'delivered' },
      { name: 'Portfolio Watch', type: '15-min alert latency', status: 'delivered' },
    ],
    stat: { n: '2–4d', label: 'full report SLA', sub: 'then 24/7 watch' },
    accent: '#C96A3D',
  },
]

const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  live:      { bg: 'rgba(62,213,152,0.1)',   text: 'rgba(62,213,152,0.9)',  dot: '#3ED598' },
  weighted:  { bg: 'rgba(201,106,61,0.1)',   text: 'rgba(201,106,61,0.9)', dot: '#C96A3D' },
  verified:  { bg: 'rgba(26,122,94,0.12)',   text: 'rgba(26,122,94,0.9)',  dot: '#22C55E' },
  delivered: { bg: 'rgba(201,106,61,0.1)',   text: 'rgba(201,106,61,0.9)', dot: '#C96A3D' },
}

// Animated terminal-style data stream lines
function DataStream({ accent, active }: { accent: string; active: boolean }) {
  const lines = [
    'FETCH  dharitri.gov.in/khasra/42-3A',
    'FETCH  igrs.gov.in/ec?survey=42-3A',
    'FETCH  ecourts.gov.in/case?plot=42-3A',
    'PARSE  mutation_chain [30yr] ✓',
    'CROSS  encumbrance × mutation × court',
    'SCORE  alr_engine v2.4 → 603/850',
    'SIGN   adv_sagarwal@barcouncil.del',
    'EMIT   AKV-2025-04-0391.pdf',
  ]
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (!active) { setVisibleCount(0); return }
    setVisibleCount(0)
    let i = 0
    const timer = setInterval(() => {
      i++
      setVisibleCount(i)
      if (i >= lines.length) clearInterval(timer)
    }, 280)
    return () => clearInterval(timer)
  }, [active])

  return (
    <div style={{
      background: 'rgba(0,0,0,0.35)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 8,
      padding: '14px 16px',
      fontFamily: 'var(--mono)',
      fontSize: 11,
      lineHeight: 1.7,
      minHeight: 160,
    }}>
      <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
        </div>
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 10, letterSpacing: '0.05em' }}>akuuva-engine — zsh</span>
      </div>
      {lines.slice(0, visibleCount).map((line, i) => {
        const cmd = line.split('  ')[0]
        const rest = line.slice(cmd.length)
        const isLast = i === visibleCount - 1
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            style={{ display: 'flex', gap: 8, color: isLast ? accent : 'rgba(255,255,255,0.45)' }}
          >
            <span style={{ color: isLast ? accent : 'rgba(255,255,255,0.2)', minWidth: 52 }}>{cmd}</span>
            <span style={{ wordBreak: 'break-all' }}>{rest}</span>
          </motion.div>
        )
      })}
      {active && visibleCount < lines.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          style={{ display: 'inline-block', width: 7, height: 13, background: accent, verticalAlign: 'text-bottom', marginLeft: 2 }}
        />
      )}
    </div>
  )
}

export default function HubSection() {
  const shouldReduce = useReducedMotion()
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  // Auto-advance steps every 5s when in view, pause on user hover
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isInView || paused || shouldReduce) return
    timerRef.current = setInterval(() => {
      setActiveStep(s => (s + 1) % STEPS.length)
    }, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isInView, paused, shouldReduce])

  const step = STEPS[activeStep]

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--navy)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }} />

      {/* Radial glow behind active step accent */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{
            position: 'absolute',
            top: '30%',
            right: '-10%',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${step.accent}18 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
      </AnimatePresence>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--sp-3xl) var(--sp-2xl)', position: 'relative' }}>

        {/* Section eyebrow */}
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(62,213,152,0.7)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 18, height: 1, background: 'rgba(62,213,152,0.4)' }} />
          The Process
        </div>

        <h2 style={{
          fontFamily: 'var(--body)',
          fontSize: 'clamp(28px, 3.2vw, 44px)',
          fontWeight: 900,
          letterSpacing: '-1px',
          color: '#fff',
          lineHeight: 1.06,
          marginBottom: 8,
          textWrap: 'balance' as React.CSSProperties['textWrap'],
        }}>
          From raw land record{' '}
          <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(245,241,232,0.5)' }}>to rated report.</span>
        </h2>
        <p style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, maxWidth: 480, marginBottom: 52 }}>
          Four sequential steps. Automated data ingestion, algorithmic scoring, legal co-signature, and continuous monitoring — the full intelligence stack.
        </p>

        <div className="hub-main-grid">

          {/* ── LEFT: step selector ───────────────────────────── */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {STEPS.map((s, i) => {
              const isActive = i === activeStep
              return (
                <button
                  key={s.id}
                  onClick={() => { setActiveStep(i); setPaused(true) }}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    padding: '16px 18px',
                    borderRadius: 10,
                    background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(255,255,255,0.1)' : 'transparent'}`,
                    transition: 'all 200ms',
                    textAlign: 'left',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Progress bar on active step */}
                  {isActive && !paused && !shouldReduce && (
                    <motion.div
                      key={`${s.id}-progress`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: 'linear' }}
                      style={{
                        position: 'absolute',
                        bottom: 0, left: 0,
                        height: 2,
                        width: '100%',
                        background: s.accent,
                        transformOrigin: 'left',
                        borderRadius: 1,
                      }}
                    />
                  )}

                  {/* Step number */}
                  <div style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    color: isActive ? s.accent : 'rgba(255,255,255,0.2)',
                    paddingTop: 2,
                    minWidth: 22,
                    transition: 'color 200ms',
                  }}>
                    {s.number}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 9,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: isActive ? s.accent : 'rgba(255,255,255,0.25)',
                      marginBottom: 4,
                      transition: 'color 200ms',
                    }}>
                      {s.phase}
                    </div>
                    <div style={{
                      fontFamily: 'var(--body)',
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                      lineHeight: 1.35,
                      transition: 'all 200ms',
                    }}>
                      {s.title}
                    </div>
                  </div>

                  {/* Active indicator dot */}
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: isActive ? s.accent : 'transparent',
                    flexShrink: 0,
                    marginTop: 6,
                    transition: 'background 200ms',
                  }} />
                </button>
              )
            })}
          </div>

          {/* ── RIGHT: detail panel ───────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
              transition={{ duration: 0.3, ease: [0.2, 0, 0.2, 1] }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14,
                padding: '28px 28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              {/* Phase tag + stat */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: `${step.accent}18`,
                  border: `1px solid ${step.accent}35`,
                  borderRadius: 'var(--r-full)',
                  padding: '5px 12px',
                }}>
                  <motion.div
                    animate={shouldReduce ? {} : { opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{ width: 5, height: 5, borderRadius: '50%', background: step.accent, flexShrink: 0 }}
                  />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: step.accent, letterSpacing: '0.09em', textTransform: 'uppercase', fontWeight: 500 }}>
                    {step.phase}
                  </span>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--body)', fontSize: 28, fontWeight: 900, color: step.accent, lineHeight: 1, letterSpacing: '-1px', fontVariantNumeric: 'tabular-nums' }}>
                    {step.stat.n}
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em', marginTop: 3 }}>{step.stat.label}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em', marginTop: 1 }}>{step.stat.sub}</div>
                </div>
              </div>

              {/* Body */}
              <p style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, margin: 0, textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
                {step.body}
              </p>

              {/* Source/signal chips */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {step.sources.map((src, i) => {
                  const sc = STATUS_COLORS[src.status]
                  return (
                    <motion.div
                      key={src.name}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.25 }}
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: 8,
                        padding: '10px 12px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                      }}
                    >
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: sc.dot, marginTop: 4, flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)', lineHeight: 1.2 }}>{src.name}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em', marginTop: 2 }}>{src.type}</div>
                      </div>
                      <div style={{
                        marginLeft: 'auto',
                        flexShrink: 0,
                        fontFamily: 'var(--mono)',
                        fontSize: 8,
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                        background: sc.bg,
                        color: sc.text,
                        borderRadius: 4,
                        padding: '2px 6px',
                        alignSelf: 'center',
                      }}>
                        {src.status}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Terminal data stream */}
              <DataStream accent={step.accent} active={isInView} />

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom step progress dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 32, justifyContent: 'center' }}>
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setActiveStep(i); setPaused(true) }}
              style={{
                all: 'unset',
                cursor: 'pointer',
                width: i === activeStep ? 24 : 6,
                height: 6,
                borderRadius: 3,
                background: i === activeStep ? s.accent : 'rgba(255,255,255,0.15)',
                transition: 'all 300ms ease',
              }}
            />
          ))}
        </div>

      </div>

      <style>{`
        .hub-main-grid {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .hub-main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
