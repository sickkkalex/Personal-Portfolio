import { useState, useRef, useEffect, useCallback } from 'react'
import { useReveal } from '../hooks/useReveal'

/* ── Timeline data ── */
const EVENTS = [
  {
    year: '2021',
    month: 'set',
    title: 'iiss volta de gemmis',
    role: 'studente · informatica & telecomunicazioni',
    body: 'inizio del percorso quinquennale. prime righe di codice, primo contatto con html, css e la logica dei sistemi informatici.',
    category: 'education',
    icon: '🎓',
    accent: '#6366f1',
  },
  {
    year: '2023',
    month: 'gen',
    title: 'freelancer',
    role: 'web developer · primo cliente',
    body: 'primo sito vetrina per un cliente reale. scoperta del processo completo: brief, design, sviluppo, consegna. typescript e react entrano nello stack.',
    category: 'work',
    icon: '💻',
    accent: '#0ea5e9',
  },
  {
    year: '2024',
    month: 'mar',
    title: 'microbank',
    role: 'progetto personale · dashboard bancaria',
    body: 'interfaccia bancaria completa con ux pulita, rest api e animazioni fluide. il progetto più ambizioso fino ad allora: 4 mesi di sviluppo.',
    category: 'project',
    icon: '🏦',
    accent: '#10b981',
  },
  {
    year: '2025',
    month: 'feb',
    title: 'md hellas · erasmus+',
    role: 'graphic designer & programmer · creta, grecia',
    body: 'tirocinio formativo internazionale in grecia. duplice ruolo su progetti aziendali concreti in un contesto multiculturale e professionale.',
    category: 'work',
    icon: '🌍',
    accent: '#f59e0b',
  },
  {
    year: '2026',
    month: 'gen',
    title: 'ef campus',
    role: 'corso di lingua inglese · certificazione b2.3',
    body: 'approfondimento della lingua inglese in contesto accademico internazionale. comunicazione professionale e technical english.',
    category: 'education',
    icon: '🇬🇧',
    accent: '#ec4899',
  },
  {
    year: '2026',
    month: 'giu',
    title: 'portfolio v2',
    role: 'progetto personale · react + typescript',
    body: 'questo sito. design minimalista ispirato ad apple, animazioni curate, terminal interattivo e time-travel timeline. il culminare di 5 anni di apprendimento.',
    category: 'project',
    icon: '✦',
    accent: '#8b5cf6',
  },
]

const CATEGORY_LABEL: Record<string, string> = {
  work: 'lavoro',
  education: 'istruzione',
  project: 'progetto',
}

/* ── single card ── */
function EventCard({ event, active }: { event: typeof EVENTS[0]; active: boolean }) {
  return (
    <div
      style={{
        position: 'relative',
        background: active ? '#fff' : '#fafafa',
        border: `1px solid ${active ? event.accent + '30' : '#f0f0f0'}`,
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: active
          ? `0 20px 60px ${event.accent}18, 0 4px 20px rgba(0,0,0,0.06)`
          : '0 2px 12px rgba(0,0,0,0.04)',
        transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        transform: active ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.98)',
        opacity: active ? 1 : 0.5,
        minHeight: '240px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        overflow: 'hidden',
      }}
    >
      {/* accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: active ? `linear-gradient(90deg, ${event.accent}, transparent)` : 'transparent',
        transition: 'all 0.6s ease',
        borderRadius: '20px 20px 0 0',
      }} />

      {/* header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontSize: '22px', lineHeight: 1,
            filter: active ? 'none' : 'grayscale(1)',
            transition: 'filter 0.4s ease',
          }}>{event.icon}</span>
          <div>
            <span style={{
              display: 'inline-block',
              fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em',
              color: active ? event.accent : '#bbb',
              background: active ? event.accent + '15' : '#f5f5f5',
              padding: '2px 8px', borderRadius: '999px',
              textTransform: 'uppercase',
              transition: 'all 0.4s ease',
            }}>
              {CATEGORY_LABEL[event.category]}
            </span>
          </div>
        </div>
        <span style={{
          fontSize: '11px', fontWeight: 700, color: active ? event.accent : '#ccc',
          letterSpacing: '0.04em', flexShrink: 0,
          transition: 'color 0.4s ease',
        }}>
          {event.month} {event.year}
        </span>
      </div>

      {/* content */}
      <div>
        <h3 style={{
          fontSize: '15px', fontWeight: 600, color: '#000',
          margin: '0 0 0.2rem', letterSpacing: '-0.03em',
        }}>
          {event.title}
        </h3>
        <span style={{ fontSize: '11px', color: '#999', fontWeight: 500 }}>
          {event.role}
        </span>
      </div>

      <p style={{
        fontSize: '13px', color: '#888', lineHeight: 1.65,
        margin: 0, flex: 1,
      }}>
        {event.body}
      </p>
    </div>
  )
}

export default function Timeline() {
  const { ref, visible } = useReveal()
  const [activeIdx, setActiveIdx] = useState(EVENTS.length - 1)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const [displayIdx, setDisplayIdx] = useState(EVENTS.length - 1)

  /* sync display after state settles */
  useEffect(() => { setDisplayIdx(activeIdx) }, [activeIdx])

  /* compute position from mouse/touch on the track */
  const getIdxFromX = useCallback((clientX: number) => {
    const track = trackRef.current
    if (!track) return activeIdx
    const { left, width } = track.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (clientX - left) / width))
    return Math.round(pct * (EVENTS.length - 1))
  }, [activeIdx])

  const handleTrackClick = (e: React.MouseEvent) => {
    setActiveIdx(getIdxFromX(e.clientX))
  }
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    setActiveIdx(getIdxFromX(e.clientX))
  }, [isDragging, getIdxFromX])
  const stopDrag = useCallback(() => setIsDragging(false), [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', stopDrag)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', stopDrag)
    }
  }, [handleMouseMove, stopDrag])

  /* touch support */
  const handleTouchMove = (e: React.TouchEvent) => {
    setActiveIdx(getIdxFromX(e.touches[0].clientX))
  }

  const sliderPct = (activeIdx / (EVENTS.length - 1)) * 100

  return (
    <section
      id="timeline"
      style={{
        padding: '7rem 2.5rem',
        borderTop: '1px solid #ebebeb',
        background: '#fff',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* heading */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`reveal-fade${visible ? ' visible' : ''}`}
          style={{ marginBottom: '4rem' }}
        >
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', color: '#ccc' }}>/ percorso</span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.1,
            color: '#000', margin: '0.8rem 0 0.5rem',
          }}>
            time travel
          </h2>
          <p style={{ fontSize: '13px', color: '#aaa', letterSpacing: '-0.01em', maxWidth: '420px', lineHeight: 1.6 }}>
            scorri la linea del tempo per vedere la mia evoluzione, anno dopo anno.
          </p>
        </div>

        {/* card display */}
        <div style={{ position: 'relative', minHeight: '280px', marginBottom: '3rem' }}>
          {EVENTS.map((ev, i) => (
            <div
              key={ev.year + ev.title}
              className={i === displayIdx ? 'timeline-card-enter' : ''}
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                top: 0, left: 0, right: 0,
                opacity: i === displayIdx ? 1 : 0,
                pointerEvents: i === displayIdx ? 'auto' : 'none',
                transition: 'opacity 0.35s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <EventCard event={ev} active={i === displayIdx} />
            </div>
          ))}
        </div>

        {/* ── Timeline scrubber ── */}
        <div style={{ userSelect: 'none' }}>
          {/* dots + labels row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            marginBottom: '10px',
          }}>
            {EVENTS.map((ev, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: '6px', background: 'none', border: 'none', cursor: 'pointer',
                  padding: '4px 2px',
                }}
              >
                <span style={{
                  fontSize: '10px', fontWeight: i === activeIdx ? 700 : 400,
                  color: i === activeIdx ? EVENTS[i].accent : '#ccc',
                  letterSpacing: '0.04em',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                }}>
                  {ev.year}
                </span>
                <span style={{
                  fontSize: '9px', color: i === activeIdx ? EVENTS[i].accent + 'aa' : '#ddd',
                  transition: 'all 0.3s ease',
                }}>
                  {ev.icon}
                </span>
              </button>
            ))}
          </div>

          {/* scrubber track */}
          <div
            ref={trackRef}
            onClick={handleTrackClick}
            onMouseDown={() => setIsDragging(true)}
            onTouchMove={handleTouchMove}
            style={{
              position: 'relative', height: '3px',
              background: '#f0f0f0', borderRadius: '999px',
              cursor: 'pointer',
            }}
          >
            {/* fill */}
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: `${sliderPct}%`, height: '100%',
              background: `linear-gradient(90deg, ${EVENTS[0].accent}, ${EVENTS[activeIdx].accent})`,
              borderRadius: '999px',
              transition: 'width 0.35s cubic-bezier(0.22,1,0.36,1), background 0.5s ease',
            }} />

            {/* thumb */}
            <div
              style={{
                position: 'absolute', top: '50%',
                left: `${sliderPct}%`,
                transform: 'translate(-50%, -50%)',
                width: isDragging ? '18px' : '14px',
                height: isDragging ? '18px' : '14px',
                background: '#fff',
                border: `2px solid ${EVENTS[activeIdx].accent}`,
                borderRadius: '50%',
                boxShadow: `0 0 0 4px ${EVENTS[activeIdx].accent}20`,
                transition: 'left 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.5s ease, width 0.2s ease, height 0.2s ease, box-shadow 0.5s ease',
                cursor: 'grab',
              }}
            />

            {/* segment dots */}
            {EVENTS.map((_, i) => {
              const pct = (i / (EVENTS.length - 1)) * 100
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute', top: '50%',
                    left: `${pct}%`, transform: 'translate(-50%, -50%)',
                    width: i === activeIdx ? '8px' : '5px',
                    height: i === activeIdx ? '8px' : '5px',
                    background: i <= activeIdx ? EVENTS[activeIdx].accent : '#e0e0e0',
                    borderRadius: '50%',
                    transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                    pointerEvents: 'none',
                  }}
                />
              )
            })}
          </div>

          {/* nav arrows */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
            <button
              onClick={() => setActiveIdx(i => Math.max(0, i - 1))}
              disabled={activeIdx === 0}
              style={{
                width: '34px', height: '34px', borderRadius: '50%',
                background: '#f5f5f5', border: '1px solid #ebebeb',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: activeIdx === 0 ? 'not-allowed' : 'pointer',
                opacity: activeIdx === 0 ? 0.35 : 1,
                transition: 'all 0.2s ease', fontSize: '14px',
              }}
            >
              ←
            </button>
            <button
              onClick={() => setActiveIdx(i => Math.min(EVENTS.length - 1, i + 1))}
              disabled={activeIdx === EVENTS.length - 1}
              style={{
                width: '34px', height: '34px', borderRadius: '50%',
                background: '#000', border: '1px solid #000',
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: activeIdx === EVENTS.length - 1 ? 'not-allowed' : 'pointer',
                opacity: activeIdx === EVENTS.length - 1 ? 0.35 : 1,
                transition: 'all 0.2s ease', fontSize: '14px',
              }}
            >
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
