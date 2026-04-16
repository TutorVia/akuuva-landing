import { useState, useCallback, useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import india from '@svg-maps/india'

interface StateDoc {
  name: string
  docs: string[]
  live: boolean
}

const STATE_DATA: Record<string, StateDoc> = {
  mh: { name: 'Maharashtra',            live: true,  docs: ['7/12 Utara (सात-बारा उतारा)', 'Property Card (मिळकतपत्रिका)', 'Ferfar / Mutation Entry'] },
  rj: { name: 'Rajasthan',              live: true,  docs: ['Jamabandi (जमाबंदी)', 'Khasra / Khatauni', 'Naksha (नक्शा)'] },
  dl: { name: 'Delhi',                  live: true,  docs: ['Sale Deed', 'Registry (रजिस्ट्री)', 'Khasra / Khatauni'] },
  up: { name: 'Uttar Pradesh',          live: true,  docs: ['Khatauni (खतौनी)', 'Khasra (खसरा)', 'Mutation / Dakhil Kharij'] },
  mp: { name: 'Madhya Pradesh',         live: true,  docs: ['Khasra B1 (खसरा बी-1)', 'Naksha (नक्शा)', 'Bhu-Adhikar Pustika'] },
  gj: { name: 'Gujarat',               live: true,  docs: ['7/12 Utara (સાત-બારા)', '6 Hakk Patrak (૬ હક્ક પત્રક)', 'E-Dhara Record'] },
  ka: { name: 'Karnataka',              live: true,  docs: ['RTC / Pahani (ಪಹಣಿ)', 'Mutation Register (MR)', 'Village Map'] },
  tn: { name: 'Tamil Nadu',             live: true,  docs: ['Patta (பட்டா)', 'Chitta (சிட்டா)', 'A-Register'] },
  ap: { name: 'Andhra Pradesh',         live: true,  docs: ['Adangal / Pahani (అదంగల్)', '1-B Extract', 'RoR Record'] },
  tg: { name: 'Telangana',             live: true,  docs: ['Pahani (పహాణి)', 'Dharani RoR', 'Mutation Certificate'] },
  hr: { name: 'Haryana',               live: true,  docs: ['Jamabandi (जमाबंदी)', 'Khasra Girdawari', 'Mutation / Intkal'] },
  pb: { name: 'Punjab',                live: true,  docs: ['Fard / Jamabandi (ਜਮਾਬੰਦੀ)', 'Khasra', 'Mutation Entry'] },
  wb: { name: 'West Bengal',            live: false, docs: ['RoR / Khatian (খতিয়ান)', 'Plot Information Record', 'Mutation Certificate'] },
  kl: { name: 'Kerala',                live: false, docs: ['Thandapper (തണ്ടപ്പേർ)', 'Possession Certificate', 'Encumbrance Certificate'] },
  br: { name: 'Bihar',                 live: false, docs: ['Khatiyan (खतियान)', 'Register 2', 'Dakhil Kharij'] },
  or: { name: 'Odisha',               live: false, docs: ['RoR / Patta (ପଟ୍ଟା)', 'Khatiyan', 'Mutation Record'] },
  jh: { name: 'Jharkhand',             live: false, docs: ['Khatian (खतियान)', 'Plot Register', 'Mutation Certificate'] },
  ct: { name: 'Chhattisgarh',          live: false, docs: ['Khasra B1', 'Bhu-Naksha', 'Nakal / Certified Copy'] },
  ut: { name: 'Uttarakhand',           live: false, docs: ['Khatauni (खतौनी)', 'Khasra', 'Mutation Record'] },
  hp: { name: 'Himachal Pradesh',      live: false, docs: ['Jamabandi (जमाबंदी)', 'Shajra Nasb', 'Mutation Entry'] },
  jk: { name: 'Jammu & Kashmir',       live: false, docs: ['Jamabandi (جمع بندی)', 'Girdawari', 'Mutation Certificate'] },
  ga: { name: 'Goa',                   live: false, docs: ['Form I & XIV', 'Property Card', 'Conversion Sanad'] },
  as: { name: 'Assam',                 live: false, docs: ['Jamabandi', 'Patta', 'Dag Number Record'] },
  sk: { name: 'Sikkim',               live: false, docs: ['Land Possession Certificate', 'Mutation Record'] },
  mn: { name: 'Manipur',              live: false, docs: ['Patta', 'Land Record Certificate'] },
  ml: { name: 'Meghalaya',            live: false, docs: ['Cadastral Survey Record', 'Land Settlement Certificate'] },
  mz: { name: 'Mizoram',             live: false, docs: ['Land Use Certificate', 'Temporary Occupation Permit'] },
  nl: { name: 'Nagaland',             live: false, docs: ['Land Holding Certificate', 'Village Land Record'] },
  ar: { name: 'Arunachal Pradesh',    live: false, docs: ['Land Possession Certificate', 'Deed of Settlement'] },
  tr: { name: 'Tripura',              live: false, docs: ['Khatian', 'RoR Certificate'] },
  an: { name: 'Andaman & Nicobar',   live: false, docs: ['Grant / Lease Deed', 'Land Allotment Certificate'] },
  ch: { name: 'Chandigarh',           live: false, docs: ['Property Tax Record', 'Registry / Sale Deed'] },
  py: { name: 'Puducherry',           live: false, docs: ['Patta (பட்டா)', 'Town Survey Register'] },
  dn: { name: 'Dadra & Nagar Haveli', live: false, docs: ['Form of Rights', 'Mutation Record'] },
  dd: { name: 'Daman & Diu',         live: false, docs: ['Property Register', 'Grant Deed'] },
  ld: { name: 'Lakshadweep',          live: false, docs: ['Patta', 'Land Allotment Record'] },
}

interface TooltipState {
  id: string
  x: number
  y: number
}

export default function IndiaMapSection() {
  const shouldReduce = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0 })
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleMouseEnter = useCallback((e: React.MouseEvent<SVGPathElement>, id: string) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    setActiveId(id)
    setTooltip({ id, x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGPathElement>) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect || !activeId) return
    setTooltip(t => t ? { ...t, x: e.clientX - rect.left, y: e.clientY - rect.top } : null)
  }, [activeId])

  const handleMouseLeave = useCallback(() => {
    setActiveId(null)
    setTooltip(null)
  }, [])

  const activeState = tooltip ? STATE_DATA[tooltip.id] : null
  const liveCount = Object.values(STATE_DATA).filter(s => s.live).length

  return (
    <section
      ref={sectionRef}
      id="coverage"
      style={{ padding: 'var(--sp-3xl) var(--sp-2xl)', background: 'var(--bg)', borderBottom: '1px solid var(--rule)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
        >
          <div className="sec-label">Coverage</div>
          <h2 style={{
            fontFamily: 'var(--body)',
            fontSize: 'clamp(24px, 2.8vw, 36px)',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            color: 'var(--ink)',
            marginBottom: 10,
            lineHeight: 1.1,
            textWrap: 'balance' as React.CSSProperties['textWrap'],
          }}>
            Land records across India.{' '}
            <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, color: 'var(--emerald)' }}>By their local name.</em>
          </h2>
          <p style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--mid)', lineHeight: 1.75, maxWidth: 520, marginBottom: 40 }}>
            Every state has different names for the same documents. Akuuva knows them all — and scrapes the right portals automatically.
            Hover any state to see which records we pull.
          </p>
        </motion.div>

        <div className="map-layout">

          {/* Map */}
          <motion.div
            style={{ position: 'relative', flex: '1 1 auto', minWidth: 0 }}
            initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <svg
              ref={svgRef}
              viewBox={india.viewBox}
              style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
              aria-label="Map of India showing land record coverage by state"
            >
              <defs>
                <filter id="state-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {india.locations.map((loc) => {
                const data = STATE_DATA[loc.id]
                const isActive = activeId === loc.id
                const isLive = data?.live ?? false

                return (
                  <path
                    key={loc.id}
                    id={loc.id}
                    d={loc.path}
                    fill={isActive ? (isLive ? '#1A7A5E' : '#2A4A6A') : (isLive ? 'rgba(26,122,94,0.25)' : 'rgba(10,25,47,0.12)')}
                    stroke={isActive ? (isLive ? '#22C55E' : '#4A8AB0') : (isLive ? 'rgba(26,122,94,0.5)' : 'rgba(10,25,47,0.25)')}
                    strokeWidth={isActive ? 1.5 : 0.7}
                    style={{
                      cursor: data ? 'pointer' : 'default',
                      transition: 'fill 180ms, stroke 180ms',
                      filter: isActive ? 'url(#state-glow)' : undefined,
                    }}
                    onMouseEnter={data ? (e) => handleMouseEnter(e, loc.id) : undefined}
                    onMouseMove={data ? handleMouseMove : undefined}
                    onMouseLeave={data ? handleMouseLeave : undefined}
                    role={data ? 'button' : undefined}
                    aria-label={data ? `${data.name} — ${data.docs.length} document types` : undefined}
                    tabIndex={data ? 0 : undefined}
                    onFocus={data ? (e) => {
                      const rect = svgRef.current?.getBoundingClientRect()
                      const pathRect = (e.target as SVGPathElement).getBoundingClientRect()
                      if (!rect) return
                      setActiveId(loc.id)
                      setTooltip({ id: loc.id, x: pathRect.left - rect.left + pathRect.width / 2, y: pathRect.top - rect.top })
                    } : undefined}
                    onBlur={data ? handleMouseLeave : undefined}
                    onKeyDown={data ? (e) => { if (e.key === 'Enter' || e.key === ' ') e.currentTarget.dispatchEvent(new MouseEvent('click')) } : undefined}
                  />
                )
              })}

              {/* Pulsing live dots on active-coverage state centroids (approximate) */}
              {isInView && !shouldReduce && [
                { id: 'mh', cx: 200, cy: 390 },
                { id: 'rj', cx: 155, cy: 250 },
                { id: 'dl', cx: 195, cy: 195 },
                { id: 'up', cx: 270, cy: 230 },
                { id: 'mp', cx: 235, cy: 320 },
                { id: 'gj', cx: 115, cy: 320 },
                { id: 'ka', cx: 195, cy: 470 },
                { id: 'tn', cx: 225, cy: 540 },
                { id: 'ap', cx: 245, cy: 460 },
                { id: 'tg', cx: 230, cy: 420 },
                { id: 'hr', cx: 190, cy: 195 },
                { id: 'pb', cx: 168, cy: 175 },
              ].map((dot, i) => (
                <motion.circle
                  key={dot.id}
                  cx={dot.cx}
                  cy={dot.cy}
                  r={4}
                  fill="#22C55E"
                  style={{ pointerEvents: 'none' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0.9, 0.3, 0.9], scale: [1, 1.4, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
                />
              ))}
            </svg>

            {/* Floating tooltip */}
            {tooltip && activeState && (
              <div
                style={{
                  position: 'absolute',
                  left: tooltip.x,
                  top: tooltip.y,
                  transform: 'translate(-50%, calc(-100% - 12px))',
                  background: 'var(--navy)',
                  border: `1px solid ${activeState.live ? 'rgba(26,122,94,0.4)' : 'rgba(255,255,255,0.12)'}`,
                  borderRadius: 10,
                  padding: '12px 14px',
                  minWidth: 210,
                  maxWidth: 260,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                  pointerEvents: 'none',
                  zIndex: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--body)', fontSize: 13, fontWeight: 700, color: '#fff' }}>{activeState.name}</span>
                  {activeState.live ? (
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: '#22C55E', letterSpacing: '0.07em', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 4, padding: '2px 6px' }}>LIVE</span>
                  ) : (
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.07em', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '2px 6px' }}>MAPPED</span>
                  )}
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 7 }}>
                  Land Documents
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {activeState.docs.map((doc) => (
                    <div key={doc} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: activeState.live ? '#22C55E' : 'rgba(255,255,255,0.25)', marginTop: 5, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{doc}</span>
                    </div>
                  ))}
                </div>
                {/* Arrow */}
                <div style={{
                  position: 'absolute',
                  bottom: -6,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 10,
                  height: 6,
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  background: activeState.live ? 'rgba(26,122,94,0.5)' : 'rgba(255,255,255,0.12)',
                }} />
              </div>
            )}
          </motion.div>

          {/* Right panel: stats + legend */}
          <motion.div
            className="map-sidebar"
            initial={{ opacity: 0, x: shouldReduce ? 0 : 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            {/* Live stat */}
            <div style={{
              background: 'rgba(26,122,94,0.06)',
              border: '1px solid rgba(26,122,94,0.15)',
              borderRadius: 12,
              padding: '18px 20px',
              marginBottom: 16,
            }}>
              <div style={{ fontFamily: 'var(--body)', fontSize: 40, fontWeight: 900, color: 'var(--emerald)', lineHeight: 1, letterSpacing: '-1px', fontVariantNumeric: 'tabular-nums' }}>
                {liveCount}
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--sub)', letterSpacing: '0.06em', marginTop: 5 }}>states with live data scraping</div>
              <div style={{ marginTop: 10, height: 4, background: 'var(--rule)', borderRadius: 4, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: '0%' }}
                  animate={isInView ? { width: `${Math.round((liveCount / 36) * 100)}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: '100%', background: 'var(--emerald)', borderRadius: 4 }}
                />
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--emerald)', marginTop: 5 }}>
                {Math.round((liveCount / 36) * 100)}% of India's 36 states & UTs
              </div>
            </div>

            {/* Legend */}
            <div style={{ marginBottom: 20 }}>
              {[
                { color: '#1A7A5E', fill: 'rgba(26,122,94,0.25)', label: 'Live scraping active', sub: 'Data pulled on request' },
                { color: 'rgba(10,25,47,0.3)', fill: 'rgba(10,25,47,0.12)', label: 'Documents mapped', sub: 'Rollout in progress' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 22, height: 14, borderRadius: 4, background: item.fill, border: `1.5px solid ${item.color}`, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{item.label}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--sub)', letterSpacing: '0.03em' }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Active state list (live states) */}
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--sub)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>
              Live States
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {Object.entries(STATE_DATA)
                .filter(([, v]) => v.live)
                .map(([id, v]) => (
                  <div
                    key={id}
                    style={{
                      fontFamily: 'var(--body)',
                      fontSize: 11,
                      fontWeight: 500,
                      color: activeId === id ? 'var(--emerald)' : 'var(--mid)',
                      background: activeId === id ? 'rgba(26,122,94,0.08)' : 'transparent',
                      border: `1px solid ${activeId === id ? 'rgba(26,122,94,0.3)' : 'var(--rule)'}`,
                      borderRadius: 4,
                      padding: '3px 8px',
                      transition: 'all 150ms',
                      cursor: 'default',
                    }}
                  >
                    {v.name}
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .map-layout {
          display: flex;
          gap: 40px;
          align-items: flex-start;
        }
        .map-sidebar {
          width: 240px;
          flex-shrink: 0;
          padding-top: 8px;
        }
        @media (max-width: 860px) {
          .map-layout { flex-direction: column; }
          .map-sidebar { width: 100%; }
        }
      `}</style>
    </section>
  )
}
