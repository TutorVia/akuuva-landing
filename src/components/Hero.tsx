import { motion, useReducedMotion } from 'framer-motion'
import ScoreCard from './ScoreCard'

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const

function fadeUp(delay: number, shouldReduce: boolean) {
  return {
    initial: { opacity: shouldReduce ? 1 : 0, y: shouldReduce ? 0 : -8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay, ease: EASE_OUT },
  }
}

export default function Hero() {
  const shouldReduce = useReducedMotion()

  return (
    <section style={{ background: 'var(--navy)', padding: 'var(--sp-3xl) var(--sp-2xl) 56px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }} className="hero-inner">

        {/* Left column */}
        <div className="hero-left">
          <motion.div
            {...fadeUp(0, !!shouldReduce)}
            style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(62,213,152,0.8)', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <div style={{ width: 18, height: 1, background: 'rgba(62,213,152,0.6)', flexShrink: 0 }} />
            Institutional Land Due Diligence
          </motion.div>

          <motion.h1
            {...fadeUp(0.1, !!shouldReduce)}
            style={{ fontFamily: 'var(--body)', fontSize: 'clamp(36px,4vw,52px)', fontWeight: 900, lineHeight: 1.04, letterSpacing: '-1px', color: '#FFFFFF', marginBottom: 16, textWrap: 'balance' as React.CSSProperties['textWrap'] }}
          >
            Title Intelligence,<br />Quantified.
          </motion.h1>

          <motion.div
            {...fadeUp(0.2, !!shouldReduce)}
            style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(18px,2.2vw,26px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(245,241,232,0.5)', lineHeight: 1.25, marginBottom: 22, letterSpacing: '-0.02em' }}
          >
            The credit bureau for Indian land.
          </motion.div>

          <motion.div
            {...fadeUp(0.3, !!shouldReduce)}
            style={{ width: 40, height: 2, background: 'var(--terra)', borderRadius: 'var(--r-full)', marginBottom: 20 }}
          />

          <motion.p
            {...fadeUp(0.3, !!shouldReduce)}
            style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: 440, marginBottom: 'var(--sp-xl)', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}
          >
            Replace weeks of manual legal searches with instant, advocate-verified reports.{' '}
            <strong style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>10× faster. 60% more cost-effective.</strong>{' '}
            Trusted by BFSI and PE funds.
          </motion.p>

          <motion.div
            {...fadeUp(0.4, !!shouldReduce)}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}
          >
            <a href="#get-started" className="hero-btn-primary">Analyze your first parcel — free</a>
            <a href="mailto:support@akuuva.com?subject=Sample%20Report%20Request" className="hero-btn-secondary">View sample report</a>
          </motion.div>

          <motion.div
            {...fadeUp(0.5, !!shouldReduce)}
            className="hero-stats"
          >
            {[
              { n: '603',  l: 'Sample ALR score' },
              { n: '2–4hr', l: 'vs. 15–21 days' },
              { n: '40+',  l: 'Risk signals' },
              { n: '48hr', l: 'Advocate SLA' },
            ].map((s, i) => (
              <div key={s.l} className="hstat" style={{ borderRight: i < 3 ? '1px solid var(--dark-rule)' : undefined }}>
                <span style={{ fontFamily: 'var(--body)', fontSize: 18, fontWeight: 900, color: '#FFFFFF', display: 'block', lineHeight: 1, letterSpacing: '-0.5px', fontVariantNumeric: 'tabular-nums' }}>{s.n}</span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 4, display: 'block', fontFamily: 'var(--mono)', letterSpacing: '0.02em' }}>{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column: score card */}
        <div className="hero-right">
          <ScoreCard />
        </div>
      </div>

      {/* Watermark */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: -40, right: -40, width: 420, height: 420, opacity: 0.04, pointerEvents: 'none', userSelect: 'none' }}>
        <img src="/assets/logo-mark-black.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'invert(1)' }} />
      </div>

      <style>{`
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-3xl);
          align-items: center;
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid var(--dark-rule);
          border-radius: var(--r-lg);
          overflow: hidden;
        }
        .hstat {
          padding: 14px var(--sp-md);
        }
        .hero-btn-primary {
          font-family: var(--body);
          font-size: 14px;
          font-weight: 700;
          padding: 13px 24px;
          border-radius: var(--r-md);
          background: #FFFFFF;
          color: var(--navy);
          border: none;
          cursor: pointer;
          display: inline-block;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: opacity var(--dur-short);
        }
        .hero-btn-primary:hover { opacity: 0.9; color: var(--navy); }
        .hero-btn-primary:visited { color: var(--navy); }
        .hero-btn-secondary {
          font-family: var(--body);
          font-size: 14px;
          font-weight: 500;
          padding: 13px 22px;
          border-radius: var(--r-md);
          background: transparent;
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.25);
          cursor: pointer;
          display: inline-block;
          text-decoration: none;
          transition: border-color var(--dur-short);
        }
        .hero-btn-secondary:hover { border-color: rgba(255,255,255,0.5); color: #fff; }
        .hero-btn-secondary:visited { color: #fff; }

        @media (max-width: 860px) {
          .hero-inner {
            grid-template-columns: 1fr;
          }
          .hero-right {
            max-width: 420px;
            width: 100%;
            margin: 0 auto;
          }
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          .hstat:nth-child(2) { border-right: none !important; }
          .hstat:nth-child(3) { border-top: 1px solid var(--dark-rule); }
          .hstat:nth-child(4) { border-top: 1px solid var(--dark-rule); border-right: none !important; }
        }

        @media (max-width: 480px) {
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  )
}
