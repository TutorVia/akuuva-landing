import { ConfigProvider, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { motion, useReducedMotion } from 'framer-motion'

interface Row {
  key: string
  metric: string
  trad: string
  akuuva: string
}

const data: Row[] = [
  { key: '1', metric: 'Turnaround',    trad: '15–21 working days',              akuuva: '2–4 working days' },
  { key: '2', metric: 'Output Format', trad: 'Qualitative PDF opinions',         akuuva: 'Quantitative Risk Scoring (0–850)' },
  { key: '3', metric: 'Pricing Model', trad: 'High hourly / retainer fees',      akuuva: 'Fixed, transparent per-parcel pricing' },
  { key: '4', metric: 'Reliability',   trad: 'Human error prone',               akuuva: 'Data cross-referenced, advocate co-signed' },
  { key: '5', metric: 'Monitoring',    trad: 'None — point-in-time only',       akuuva: '24/7 Portfolio Watch alerts' },
  { key: '6', metric: 'Legal Standing',trad: 'Varies by advocate',              akuuva: 'Bar Council of Delhi co-signature on every report' },
]

const columns: ColumnsType<Row> = [
  {
    title: 'Metric',
    dataIndex: 'metric',
    key: 'metric',
    width: '22%',
    onHeaderCell: () => ({ style: { background: '#F5F1E8', color: '#7A8FA8', fontWeight: 500, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, letterSpacing: '0.04em' } }),
    onCell: () => ({ style: { background: '#F5F1E8', fontWeight: 600, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13 } }),
  },
  {
    title: 'Traditional Law Firms',
    dataIndex: 'trad',
    key: 'trad',
    width: '39%',
    onHeaderCell: () => ({ style: { background: '#E5E0D5', color: '#4A6080', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12 } }),
    onCell: () => ({ style: { color: '#4A6080', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13 } }),
  },
  {
    title: 'Akuuva',
    dataIndex: 'akuuva',
    key: 'akuuva',
    width: '39%',
    onHeaderCell: () => ({ style: { background: '#0A192F', color: '#ffffff', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12 } }),
    onCell: () => ({ style: { fontWeight: 600, color: '#1A7A5E', background: 'rgba(26,122,94,0.03)', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13 } }),
  },
]

const antdTheme = {
  token: {
    colorBgBase: '#FFFFFF',
    colorTextBase: '#0A192F',
    colorBorder: '#E2E8F0',
    colorPrimary: '#C96A3D',
    borderRadius: 8,
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 13,
  },
  components: {
    Table: {
      headerBg: '#F5F1E8',
      borderColor: '#E2E8F0',
      rowHoverBg: 'rgba(26,122,94,0.04)',
    },
  },
}

export default function DeltaTable() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="why-akuuva" style={{ padding: 'var(--sp-3xl) var(--sp-2xl)', background: '#FFFFFF', borderBottom: '1px solid var(--rule)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="sec-label">Why Akuuva</div>
        <h2 style={{ fontFamily: 'var(--body)', fontSize: 'clamp(24px,2.8vw,36px)', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--ink)', marginBottom: 'var(--sp-xl)', lineHeight: 1.1, textWrap: 'balance' as React.CSSProperties['textWrap'] }}>
          The order-of-magnitude{' '}
          <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, color: 'var(--emerald)' }}>difference.</em>
        </h2>

        <motion.div
          initial={{ opacity: shouldReduce ? 1 : 0, y: shouldReduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.4, ease: [0.0, 0.0, 0.2, 1] }}
          style={{ overflowX: 'auto' }}
        >
          <ConfigProvider theme={antdTheme}>
            <Table
              dataSource={data}
              columns={columns}
              pagination={false}
              size="middle"
              style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--rule)', minWidth: 480 }}
            />
          </ConfigProvider>
        </motion.div>
      </div>
    </section>
  )
}
