import { useState, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

/* ── Project data ── */
const PROJECTS = [
  {
    id: 'portfolio',
    title: 'portfolio personale',
    desc: 'design minimalismo e cura per i dettagli tipografici. animazioni curate, terminal interattivo e time-travel timeline.',
    tags: ['react', 'typescript', 'vite'],
    year: '2026',
    size: 'large',  // spans 2 cols
    accent: '#8b5cf6',
    bg: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
    emoji: '✦',
    link: null,
  },
  {
    id: 'microbank',
    title: 'microbank',
    desc: 'dashboard bancaria digitale con ux pulita, animazioni fluide e integrazione rest api.',
    tags: ['react', 'rest api', 'scss'],
    year: '2025',
    size: 'small',
    accent: '#0ea5e9',
    bg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    emoji: '🏦',
    link: null,
  },
  {
    id: 'erasmus',
    title: 'md hellas · erasmus',
    desc: 'graphic design e sviluppo software per azienda greca. contesto internazionale.',
    tags: ['figma', 'javascript', 'php'],
    year: '2025',
    size: 'small',
    accent: '#f59e0b',
    bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    emoji: '🌍',
    link: null,
  },
  {
    id: 'nimbuscloud',
    title: 'nimbuscloud',
    desc: 'piattaforma cloud storage self-hosted. upload file, cartelle annidate, link di condivisione, reset password via otp, avatar e chat di supporto real-time.',
    tags: ['react', 'node.js', 'postgresql', 'docker'],
    year: '2026',
    size: 'medium',
    accent: '#38bdf8',
    bg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    emoji: '🌥️',
    link: 'https://github.com/sickkkalex/NimbusCloud',
  },
  {
    id: 'opensource',
    title: 'open source',
    desc: 'contribuzioni a progetti open source e librerie di community.',
    tags: ['git', 'github'],
    year: '2023—',
    size: 'mini',
    accent: '#6366f1',
    bg: '#fafafa',
    emoji: '⚡',
    link: 'https://github.com/sickkkalexx',
  },
]

/* ── 3D Tilt card hook ── */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.015)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }
  return { ref, onMove, onLeave }
}

/* ── Bento Card ── */
function BentoCard({
  project,
  delay,
}: {
  project: typeof PROJECTS[0]
  delay: number
}) {
  const { ref: revealRef, visible } = useReveal()
  const { ref: tiltRef, onMove, onLeave } = useTilt()
  const [hovered, setHovered] = useState(false)

  const isLarge = project.size === 'large'
  const isMini = project.size === 'mini'

  return (
    <div
      ref={revealRef as React.RefObject<HTMLDivElement>}
      className={isLarge ? 'bento-large' : ''}
      style={{
        gridColumn: isLarge ? 'span 2' : 'span 1',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <div
        ref={tiltRef}
        className="bento-card"
        onMouseMove={onMove}
        onMouseLeave={() => { onLeave(); setHovered(false) }}
        onMouseEnter={() => setHovered(true)}
        style={{
          position: 'relative',
          background: project.bg,
          border: `1px solid ${hovered ? project.accent + '30' : '#f0f0f0'}`,
          borderRadius: '20px',
          padding: isMini ? '1.4rem 1.6rem' : '2rem 2.2rem',
          height: '100%',
          minHeight: isLarge ? '220px' : isMini ? '120px' : '190px',
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'border-color 0.35s ease, box-shadow 0.45s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: hovered
            ? `0 24px 64px ${project.accent}18, 0 4px 20px rgba(0,0,0,0.06)`
            : '0 2px 12px rgba(0,0,0,0.04)',
          transformStyle: 'preserve-3d',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        onClick={() => project.link && window.open(project.link, '_blank')}
      >
        {/* glow spot on hover */}
        <div style={{
          position: 'absolute',
          width: '200px', height: '200px',
          background: `radial-gradient(circle, ${project.accent}20 0%, transparent 70%)`,
          borderRadius: '50%',
          top: '-60px', right: '-60px',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }} />

        {/* top row */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isMini ? '0.4rem' : '1rem' }}>
            <span style={{ fontSize: isMini ? '18px' : '24px', lineHeight: 1 }}>{project.emoji}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontSize: '10px', color: '#bbb', fontWeight: 400, letterSpacing: '0.04em',
              }}>
                {project.year}
              </span>
              {project.link && (
                <span style={{
                  fontSize: '10px', color: project.accent,
                  opacity: hovered ? 1 : 0.5,
                  transition: 'all 0.3s ease',
                }}>↗</span>
              )}
            </div>
          </div>

          <h3 style={{
            fontSize: isMini ? '13px' : isLarge ? '18px' : '15px',
            fontWeight: 600, color: '#000',
            margin: '0 0 0.4rem', letterSpacing: '-0.03em',
          }}>
            {project.title}
          </h3>

          {!isMini && (
            <p style={{
              fontSize: '13px', color: '#888',
              lineHeight: 1.6, margin: '0 0 1.2rem',
              maxWidth: isLarge ? '520px' : '100%',
            }}>
              {project.desc}
            </p>
          )}
        </div>

        {/* tags */}
        {!isMini && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontSize: '10px', fontWeight: 500,
                color: hovered ? project.accent : '#999',
                background: hovered ? project.accent + '12' : '#f0f0f0',
                border: `1px solid ${hovered ? project.accent + '25' : '#eee'}`,
                padding: '3px 10px', borderRadius: '999px',
                letterSpacing: '0.02em',
                transition: 'all 0.35s ease',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* accent bottom line on hover */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, ${project.accent}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          borderRadius: '0 0 20px 20px',
        }} />
      </div>
    </div>
  )
}

/* ── Main Section ── */
export default function Progetti() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="progetti"
      style={{
        padding: '7rem 2.5rem',
        borderTop: '1px solid #ebebeb',
        background: '#fff',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`reveal-fade${visible ? ' visible' : ''}`}
          style={{ marginBottom: '3rem' }}
        >
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', color: '#ccc' }}>/ progetti</span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.1,
            color: '#000', margin: '0.8rem 0 0.5rem',
          }}>
            lavori selezionati
          </h2>
          <p style={{ fontSize: '13px', color: '#aaa', letterSpacing: '-0.01em', lineHeight: 1.6 }}>
            una selezione dei progetti più significativi, dal 2023 ad oggi.
          </p>
        </div>

        {/* bento grid */}
        <div className="bento-grid" style={{ gap: '14px' }}>
          {PROJECTS.map((project, i) => (
            <BentoCard key={project.id} project={project} delay={i * 80} />
          ))}
        </div>

        {/* cta */}
        <div style={{
          marginTop: '2.5rem', textAlign: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s ease 500ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) 500ms',
        }}>
          <a
            href="https://github.com/sickkkalexx"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '12px', fontWeight: 500, color: '#888',
              textDecoration: 'none',
              padding: '10px 20px',
              background: '#fafafa',
              border: '1px solid #ebebeb',
              borderRadius: '999px',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.background = '#000'
              el.style.color = '#fff'
              el.style.borderColor = '#000'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.background = '#fafafa'
              el.style.color = '#888'
              el.style.borderColor = '#ebebeb'
            }}
          >
            <span>vedi tutti su github</span>
            <span>↗</span>
          </a>
        </div>

      </div>
    </section>
  )
}
