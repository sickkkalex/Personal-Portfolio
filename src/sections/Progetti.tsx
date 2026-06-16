import { useReveal } from '../hooks/useReveal'
import { IconArrow } from '../icons'

const projects = [
  { title: 'portfolio personale', desc: 'design e sviluppo del sito personale. minimalismo e cura per i dettagli tipografici.', tags: ['react', 'typescript', 'tailwind'], year: '2026' },
  { title: 'microbank', desc: 'interfaccia per gestione bancaria digitale. ux chiara, animazioni fluide, api rest.', tags: ['react', 'rest api', 'scss'], year: '2025' },
  { title: 'sito esame', desc: 'sito web per esame di stato. identità visiva e presentazione interattiva con scroll effects.', tags: ['html', 'css', 'vanilla js'], year: '2026' },
]

function ProjectRow({ title, desc, tags, year, delay }: typeof projects[0] & { delay: number }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`project-row reveal-left${visible ? ' visible' : ''}`}
      style={{
        padding: '2rem 0', display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between', gap: '2rem',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#000', margin: '0 0 0.4rem', letterSpacing: '-0.02em' }}>
          {title}
        </h3>
        <p style={{ fontSize: '13px', color: '#999', margin: '0 0 0.9rem', lineHeight: 1.55 }}>{desc}</p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {tags.map(t => (
            <span key={t} style={{
              fontSize: '10px', fontWeight: 500, color: '#888',
              padding: '3px 9px', background: '#f5f5f5',
              borderRadius: '999px', border: '1px solid #eeeeee',
              letterSpacing: '0.02em',
            }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
        <span style={{ fontSize: '11px', color: '#ccc', fontWeight: 400 }}>{year}</span>
        <span className="proj-arrow" style={{ color: '#aaa' }}><IconArrow /></span>
      </div>
    </div>
  )
}

export default function Progetti() {
  const { ref, visible } = useReveal()
  return (
    <section id="progetti" style={{ padding: '7rem 2.5rem', borderTop: '1px solid #ebebeb', background: '#fff' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`reveal-fade${visible ? ' visible' : ''}`}>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', color: '#ccc' }}>/ progetti</span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.1,
            color: '#000', margin: '0.8rem 0 0.5rem',
          }}>
            lavori selezionati
          </h2>
          <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '2.5rem', letterSpacing: '-0.01em' }}>
            una selezione dei progetti più significativi.
          </p>
        </div>

        <div style={{ borderTop: '1px solid #ebebeb' }}>
          {projects.map((p, i) => <ProjectRow key={p.title} {...p} delay={i * 80} />)}
        </div>
      </div>
    </section>
  )
}
