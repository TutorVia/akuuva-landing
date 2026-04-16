export default function QuoteSection() {
  return (
    <section style={{
      padding: 'var(--sp-2xl) var(--sp-2xl)',
      background: 'var(--bg)',
      borderBottom: '1px solid var(--rule)',
    }}>
      <div style={{
        maxWidth: 760,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 28,
      }}>
        <div style={{
          width: 3,
          minHeight: 80,
          background: 'var(--terra)',
          borderRadius: 'var(--r-full)',
          flexShrink: 0,
          alignSelf: 'stretch',
        }} />
        <div>
          <p style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(16px, 2vw, 21px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--ink)',
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
            textWrap: 'pretty' as React.CSSProperties['textWrap'],
          }}>
            "Legal scrutiny reports <strong style={{ fontStyle: 'normal', fontWeight: 700 }}>don't hold ground much</strong> with sophisticated buyers. They want structured intelligence — not an opinion letter."
          </p>
          <div style={{
            marginTop: 14,
            fontFamily: 'var(--mono)',
            fontSize: 10,
            color: 'var(--sub)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            Land Revenue Ecosystem, India
          </div>
        </div>
      </div>
    </section>
  )
}
