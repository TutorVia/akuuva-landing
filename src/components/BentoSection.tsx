import { motion, useReducedMotion } from 'framer-motion'

const cards = [
  {
    tag: 'The Engine',
    title: 'Digitized Title Search',
    body: 'Automated scraping of historical land records, mutation registers, and encumbrance filings across state revenue portals.',
    meta: '↳ Cross-references 4 govt. databases per parcel',
    tip: "Akuuva's scraper runs every 4 hours against the IGRS portal, Dharitri, and state sub-registrar records, cross-referencing mutation numbers and khasra entries.",
  },
  {
    tag: 'The Network',
    title: 'Advocate Verification',
    body: 'Every report is co-signed by a Senior Advocate registered with the Bar Council of Delhi, providing legal standing.',
    meta: '↳ 48-hr SLA on advocate co-signature',
    tip: 'Our advocate panel holds active Bar Council enrollments. Every report carries the advocate\'s enrollment number and digital signature, creating a legally auditable trail.',
  },
  {
    tag: 'The Safety Net',
    title: 'Portfolio Watch',
    body: '24/7 monitoring for new litigation filings, encumbrance registrations, or regulatory changes on acquired land.',
    meta: '↳ Alerts delivered within 15 minutes of filing',
    tip: 'Portfolio Watch monitors survey numbers against new EC filings, court case databases (eCourts API), and municipal record changes in real time.',
  },
]

export default function BentoSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="how-it-works" style={{ padding: 'var(--sp-3xl) var(--sp-2xl)', background: 'var(--bg2)', borderBottom: '1px solid var(--rule)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="sec-label">How it works</div>
        <h2 style={{ fontFamily: 'var(--body)', fontSize: 'clamp(24px,2.8vw,36px)', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--ink)', marginBottom: 36, lineHeight: 1.1, textWrap: 'balance' as React.CSSProperties['textWrap'] }}>
          Three pillars.{' '}
          <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, color: 'var(--emerald)' }}>One trusted report.</em>
        </h2>

        <div className="bento-grid">
          {cards.map((card, i) => (
            <motion.div
              key={card.tag}
              className="bcard"
              initial={{ opacity: shouldReduce ? 1 : 0, y: shouldReduce ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.1, ease: [0.0, 0.0, 0.2, 1] }}
              whileHover={{ y: shouldReduce ? 0 : -2, boxShadow: '0 6px 28px rgba(10,25,47,0.1)' }}
            >
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--emerald)', marginBottom: 10 }}>
                {card.tag}
              </div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 17, fontWeight: 800, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.3px', lineHeight: 1.2 }}>
                {card.title}
              </div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--mid)', lineHeight: 1.7, textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
                {card.body}
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--sub)', marginTop: 12, paddingTop: 11, borderTop: '1px solid var(--rule)', letterSpacing: '0.02em' }}>
                {card.meta}
              </div>
              <div className="bcard-tip">
                {card.tip}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .bcard {
          background: #FFFFFF;
          border-radius: var(--r-xl);
          padding: 26px;
          border: 1px solid var(--rule);
          cursor: default;
          overflow: hidden;
          transition: box-shadow var(--dur-short) var(--ease-out), transform var(--dur-short) var(--ease-out);
        }
        .bcard-tip {
          font-family: var(--body);
          font-size: 12px;
          color: var(--emerald);
          line-height: 1.65;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          margin-top: 0;
          transition: max-height var(--dur-medium) var(--ease-inout), opacity var(--dur-medium) var(--ease-inout), margin-top var(--dur-medium);
        }
        .bcard:hover .bcard-tip {
          max-height: 120px;
          opacity: 1;
          margin-top: 11px;
        }
        @media (max-width: 860px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 560px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
