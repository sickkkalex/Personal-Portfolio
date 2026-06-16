import { useReveal } from '../hooks/useReveal'
import { useRef } from 'react'

/* ── Tilt card (riusato per skill) ── */
function TiltCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { ref: revealRef, visible } = useReveal()
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current!
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.012)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }
  return (
    <div ref={revealRef as React.RefObject<HTMLDivElement>}>
      <div ref={ref} className="card-tilt" onMouseMove={onMove} onMouseLeave={onLeave}
        style={{
          padding: '1.6rem 1.8rem', background: '#fafafa',
          borderRadius: '16px', border: '1px solid #f0f0f0',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(18px)',
          transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        }}>
        {children}
      </div>
    </div>
  )
}

/* ── Timeline item ── */
function TimelineItem({ year, company, role, body, delay = 0 }: { year: string; company: string; role: string; body: string; delay?: number }) {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        display: 'flex', gap: '1.8rem', paddingBottom: '2.4rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-18px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}>
      {/* dot + line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#000', marginTop: 4, flexShrink: 0 }}/>
        <div style={{ width: 1, flex: 1, background: '#ebebeb', marginTop: 6 }}/>
      </div>
      <div style={{ paddingBottom: '0.5rem' }}>
        <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: '#bbb' }}>{year}</span>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#000', margin: '0.3rem 0 0.15rem', letterSpacing: '-0.02em' }}>{company}</h4>
        <span style={{ fontSize: '11px', color: '#999', fontWeight: 500, letterSpacing: '0.02em' }}>{role}</span>
        <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.65, margin: '0.7rem 0 0', maxWidth: '480px' }}>{body}</p>
      </div>
    </div>
  )
}

/* ── Skill tag ── */
const SKILLS = [
  'html', 'css', 'javascript', 'typescript', 'react',
  'java', 'sql', 'c', 'c++', 'figma', 'git', 'node.js',
]

const LANGS = [
  { lang: 'italiano', level: 'madrelingua', pct: 100 },
  { lang: 'inglese',  level: 'C1',           pct: 82  },
]

export default function Bio() {
  const { ref, visible } = useReveal()

  return (
    <section id="bio" style={{ padding: '7rem 2.5rem', borderTop: '1px solid #ebebeb', background: '#fff' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* heading */}
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`reveal-fade${visible ? ' visible' : ''}`}
          style={{ marginBottom: '4rem' }}>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', color: '#ccc' }}>/ bio</span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.1,
            color: '#000', margin: '0.8rem 0 0.6rem',
          }}>chi sono</h2>
          <p style={{ fontSize: '14px', color: '#aaa', letterSpacing: '-0.01em', maxWidth: '520px', lineHeight: 1.6, margin: 0 }}>
            it specialist appassionato di web, design e mondo aziendale. 19 anni, bari.
          </p>
        </div>

        {/* top grid: about + languages */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '4rem' }}>
          <TiltCard delay={0}>
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: '#bbb' }}>su di me</span>
            <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.7, margin: '0.8rem 0 0' }}>
              appassionato di informatica, con un occhio di riguardo anche al marketing e al mondo aziendale. nel tempo libero vado in palestra e gioco a calcio. abituato a stare in gruppo e so divertirmi senza perdere di vista i miei obiettivi.
            </p>
          </TiltCard>
          <TiltCard delay={80}>
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: '#bbb' }}>lingue</span>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {LANGS.map(l => (
                <div key={l.lang}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>{l.lang}</span>
                    <span style={{ fontSize: '11px', color: '#aaa' }}>{l.level}</span>
                  </div>
                  <div style={{ height: 3, background: '#f0f0f0', borderRadius: 99 }}>
                    <div style={{ height: '100%', width: `${l.pct}%`, background: '#000', borderRadius: 99 }}/>
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
        </div>

        {/* two columns: experience + education */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem', alignItems: 'start' }}>

          {/* experience */}
          <div>
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', color: '#ccc', display: 'block', marginBottom: '1.8rem' }}>/ esperienza</span>
            <TimelineItem
              year="2025"
              company="md hellas"
              role="graphic designer & programmer · erasmus+"
              body="tirocinio formativo in grecia, creta. duplice ruolo di graphic designer e software developer su progetti aziendali concreti in un contesto internazionale."
              delay={0}
            />
            <TimelineItem
              year="2023 — presente"
              company="freelancer"
              role="web developer"
              body="sviluppo siti vetrina, progetti scolastici e iniziative con compagni di corso. sguardo rivolto alla creazione di possibili future start-up."
              delay={120}
            />
          </div>

          {/* education */}
          <div>
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', color: '#ccc', display: 'block', marginBottom: '1.8rem' }}>/ istruzione</span>
            <TimelineItem
              year="2021 — presente"
              company="iiss volta de gemmis"
              role="diploma in informatica e telecomunicazioni · bari, bitonto"
              body="percorso quinquennale focalizzato su programmazione, reti e sistemi informatici."
              delay={0}
            />
            <TimelineItem
              year="2026"
              company="ef campus"
              role="corso di lingua inglese"
              body="certificazione B2.3. approfondimento della lingua inglese in contesto accademico internazionale."
              delay={120}
            />
          </div>
        </div>

        {/* tech skills */}
        <div>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', color: '#ccc', display: 'block', marginBottom: '1.4rem' }}>/ competenze tecniche</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {SKILLS.map((s, i) => {
              const { ref: sr, visible: sv } = useReveal()
              return (
                <span key={s} ref={sr as React.RefObject<HTMLSpanElement>}
                  style={{
                    fontSize: '11px', fontWeight: 500,
                    padding: '6px 14px',
                    background: sv ? '#000' : '#f5f5f5',
                    color: sv ? '#fff' : '#666',
                    borderRadius: '999px',
                    border: '1px solid',
                    borderColor: sv ? '#000' : '#eee',
                    letterSpacing: '0.01em',
                    transition: `all 0.5s ease ${i * 40}ms`,
                    cursor: 'default',
                  } as React.CSSProperties}>
                  {s}
                </span>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
