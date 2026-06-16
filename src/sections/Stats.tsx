import { useCounter } from '../hooks/useCounter'

const STATS = [
  { value: 19, suffix: '', label: 'anni di età' },
  { value: 12, suffix: '+', label: 'progetti completati' },
  { value: 8,  suffix: '+', label: 'clienti soddisfatti' },
]

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, count } = useCounter(value)
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      <div className="stat-num">{count}{suffix}</div>
      <div style={{ fontSize: '12px', color: '#aaa', marginTop: '6px', letterSpacing: '0.04em' }}>{label}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <section style={{
      borderTop: '1px solid #ebebeb', background: '#fff',
      padding: '1rem 2.5rem',
    }}>
      <div style={{
        maxWidth: '760px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1px', background: '#ebebeb',
        borderRadius: '18px', overflow: 'hidden',
        border: '1px solid #ebebeb',
      }}>
        {STATS.map(s => (
          <div key={s.label} style={{ background: '#fff' }}>
            <StatItem {...s} />
          </div>
        ))}
      </div>
    </section>
  )
}
