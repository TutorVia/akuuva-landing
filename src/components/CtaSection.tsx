import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function CtaSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const shouldReduce = useReducedMotion()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@') || !email.includes('.')) {
      setStatus('error')
      return
    }
    setStatus('success')
    setEmail('')
  }

  return (
    <section id="get-started" style={{ padding: '88px var(--sp-2xl)', background: 'var(--navy)', textAlign: 'center' }}>
      <div style={{ maxWidth: 540, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: shouldReduce ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(62,213,152,0.6)',
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}>
            <span style={{ display: 'block', width: 20, height: 1, background: 'rgba(62,213,152,0.3)' }} />
            Get started
            <span style={{ display: 'block', width: 20, height: 1, background: 'rgba(62,213,152,0.3)' }} />
          </div>

          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(30px,4vw,48px)',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            marginBottom: 10,
            textWrap: 'balance' as React.CSSProperties['textWrap'],
          }}>
            Know the land<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(245,241,232,0.75)' }}>before you move.</em>
          </h2>

          <p style={{
            fontFamily: 'var(--body)',
            fontSize: 14,
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.75,
            marginBottom: 32,
          }}>
            One report. Advocate-verified. Delivered in 24–48 hours, not weeks. No retainer, no ambiguity.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              maxWidth: 360,
              margin: '0 auto 14px',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 'var(--r-full)',
              padding: 4,
            }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setStatus('idle') }}
              required
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                padding: '10px 16px',
                fontSize: 13,
                color: '#fff',
                fontFamily: 'var(--body)',
                minWidth: 0,
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 22px',
                background: 'var(--terra)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 'var(--r-full)',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'var(--body)',
                whiteSpace: 'nowrap',
                transition: 'background var(--dur-short)',
                flexShrink: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--terra2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--terra)')}
            >
              Get your report
            </button>
          </form>

          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 10,
            letterSpacing: '0.04em',
            color: status === 'success'
              ? '#3ED598'
              : status === 'error'
              ? '#ff9980'
              : 'rgba(255,255,255,0.45)',
            minHeight: 18,
            transition: 'color var(--dur-short)',
          }}>
            {status === 'success'
              ? 'Received — we will be in touch within 24 hours.'
              : status === 'error'
              ? 'Please enter a valid email.'
              : 'No commitment · support@akuuva.com · Response within 24 hours'}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
