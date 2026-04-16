import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { useCountUp } from '../hooks/useCountUp'

export default function ScoreCard() {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const score = useCountUp(603, 2200, isInView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: shouldReduce ? 1 : 0, x: shouldReduce ? 0 : 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.4, ease: [0.0, 0.0, 0.2, 1] }}
      style={{
        background: '#FFFFFF',
        borderRadius: 'var(--r-xl)',
        overflow: 'hidden',
        boxShadow: '0 4px 40px rgba(0,0,0,0.3), 0 1px 6px rgba(0,0,0,0.15)',
        width: '100%',
      }}
    >
      {/* Header */}
      <div style={{
        background: 'var(--bg)',
        borderBottom: '1px solid var(--rule)',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--sub)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>
            Title Confidence Score
          </div>
          <div style={{ fontFamily: 'var(--body)', fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>
            Survey No. 42/3A · Gurugram
          </div>
        </div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          fontFamily: 'var(--mono)',
          fontSize: 9,
          color: 'var(--emerald)',
          letterSpacing: '0.06em',
          background: 'rgba(26,122,94,0.08)',
          border: '1px solid rgba(26,122,94,0.18)',
          padding: '4px 9px',
          borderRadius: 'var(--r-sm)',
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--emerald2)' }} />
          Live · 2 min ago
        </div>
      </div>

      {/* Score row */}
      <div style={{
        padding: '18px 18px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        borderBottom: '1px solid var(--rule)',
      }}>
        <div>
          <div>
            <span style={{
              fontFamily: 'var(--body)',
              fontSize: 56,
              fontWeight: 900,
              color: 'var(--ink)',
              lineHeight: 1,
              letterSpacing: '-2px',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {score}
            </span>
            <span style={{ fontFamily: 'var(--body)', fontSize: 18, fontWeight: 500, color: 'var(--sub)' }}>/850</span>
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--sub)', letterSpacing: '0.07em', textTransform: 'uppercase', marginTop: 3 }}>
            Akuuva Land Rating
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--sub)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
            Confidence level
          </div>
          <div style={{ height: 9, background: 'var(--rule)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: isInView ? '70.9%' : '0%' }}
              transition={{ delay: 0.4, duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '100%',
                borderRadius: 'var(--r-full)',
                background: 'linear-gradient(90deg, var(--emerald), var(--emerald2))',
              }}
            />
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--emerald)', fontWeight: 500, marginTop: 5 }}>
            70.9% — Good Standing
          </div>
        </div>
      </div>

      {/* Status 2×2 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--rule)' }}>
        {[
          { label: 'Encumbrances', value: 'None detected', type: 'ok' },
          { label: 'Litigation',   value: 'Clear',         type: 'ok' },
          { label: 'History Depth', value: '30 years',     type: 'neutral' },
          { label: 'Mutation Status', value: 'Pending',    type: 'warn' },
        ].map((item, i) => (
          <div
            key={item.label}
            style={{
              padding: '11px 18px',
              borderRight: i % 2 === 0 ? '1px solid var(--rule)' : undefined,
              borderTop: i >= 2 ? '1px solid var(--rule)' : undefined,
            }}
          >
            <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--sub)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 3 }}>
              {item.label}
            </div>
            <div style={{
              fontFamily: 'var(--body)',
              fontSize: 12,
              fontWeight: 600,
              color: item.type === 'ok' ? 'var(--emerald)' : item.type === 'warn' ? 'var(--amber)' : 'var(--ink)',
            }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Advocate */}
      <div style={{
        padding: '12px 18px',
        background: 'rgba(26,122,94,0.04)',
        borderBottom: '1px solid rgba(26,122,94,0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <div style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'rgba(26,122,94,0.1)',
            border: '1.5px solid rgba(26,122,94,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden',
          }}>
            <img src="/assets/logo-mark-green.svg" alt="Akuuva verified" width={18} height={18} style={{ display: 'block' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginBottom: 2 }}>
              Adv. S. Agarwal
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--sub)', letterSpacing: '0.04em', lineHeight: 1.6 }}>
              Senior Advocate, Bar Council of Delhi<br />
              Verified: 14 Apr 2025 · Enr. No. D/1284/98
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--emerald)', letterSpacing: '0.05em', marginTop: 4 }}>
              <svg width={11} height={11} viewBox="0 0 11 11" fill="none">
                <circle cx="5.5" cy="5.5" r="4.5" stroke="#1A7A5E" strokeWidth="1.1" />
                <path d="M3 5.5L5 7.5L8.5 3.5" stroke="#1A7A5E" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Advocate Co-Signature Verified
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '9px 18px',
        display: 'flex',
        justifyContent: 'space-between',
        background: 'var(--bg)',
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--sub)', letterSpacing: '0.05em' }}>AKV-2025-04-0391</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--sub)', letterSpacing: '0.04em' }}>Last scrape: 2 min ago</span>
      </div>
    </motion.div>
  )
}
