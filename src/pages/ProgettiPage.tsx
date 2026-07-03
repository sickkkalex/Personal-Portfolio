import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroVisual from '../components/HeroVisual'

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect() } }, { threshold })
    o.observe(el); return () => o.disconnect()
  }, [threshold])
  return { ref, v }
}

function AnimChars({ text, delay = 0, style = {} }: { text: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <span style={{ display: 'inline-block', perspective: '600px', ...style }}>
      {text.split('').map((c, i) => (
        <span key={i} style={{ display: 'inline-block', animation: `charIn 0.8s cubic-bezier(0.22,1,0.36,1) ${delay + i * 36}ms both` }}>
          {c === ' ' ? '\u00a0' : c}
        </span>
      ))}
    </span>
  )
}

function AnimWords({ text, delay = 0, style = {} }: { text: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.22em', ...style }}>
      {text.split(' ').map((w, i) => (
        <span key={i} style={{ display: 'inline-block', animation: `wordIn 0.6s cubic-bezier(0.22,1,0.36,1) ${delay + i * 50}ms both` }}>{w}</span>
      ))}
    </span>
  )
}

function Label({ children }: { children: string }) {
  return <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', color: '#bbb', display: 'block', marginBottom: '2rem' }}>/ {children}</span>
}

/* ─── Modal ─── */
interface ProjectData {
  id: string; title: string; subtitle: string; year: string
  tags: string[]; description: string; link?: string; linkLabel?: string; image?: string
}

function ProjectModal({ data, onClose }: { data: ProjectData; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', animation: 'bgBlur 0.3s ease both',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 24, overflow: 'hidden',
        maxWidth: 660, width: '100%',
        boxShadow: '0 40px 100px rgba(0,0,0,0.22), 0 4px 20px rgba(0,0,0,0.08)',
        animation: 'modalIn 0.4s cubic-bezier(0.22,1,0.36,1) both',
        position: 'relative', maxHeight: '90vh', overflowY: 'auto',
      }}>
        {/* image */}
        {data.image && (
          <div style={{ width: '100%', height: 220, overflow: 'hidden', position: 'relative' }}>
            <img src={data.image} alt={data.title} style={{
              width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
              transition: 'transform 0.6s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
            {/* overlay gradient */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(transparent, #fff)' }}/>
          </div>
        )}

        <div style={{ padding: '2.5rem' }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: '1.2rem', right: '1.2rem',
            width: 32, height: 32, borderRadius: '50%',
            border: '1px solid #e8e8e8', background: 'rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '14px', color: '#999',
            transition: 'all 0.2s ease', backdropFilter: 'blur(4px)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#000'; (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.9)'; (e.currentTarget as HTMLButtonElement).style.color = '#999' }}>✕</button>

          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: '#bbb' }}>{data.year}</span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.035em', color: '#000', margin: '0.5rem 0 0.3rem' }}>{data.title}</h3>
          <p style={{ fontSize: '12px', color: '#aaa', fontWeight: 500, letterSpacing: '0.03em', margin: '0 0 1.2rem' }}>{data.subtitle}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.6rem' }}>
            {data.tags.map(t => (
              <span key={t} style={{ fontSize: '10px', fontWeight: 600, padding: '4px 12px', borderRadius: 999, border: '1px solid #e8e8e8', color: '#555', background: '#fafafa' }}>{t}</span>
            ))}
          </div>

          <div style={{ width: 36, height: 1, background: '#e8e8e8', marginBottom: '1.5rem' }}/>
          <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.82, letterSpacing: '-0.01em', margin: 0, whiteSpace: 'pre-line' }}>{data.description}</p>

          {data.link && (
            <a href={data.link} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '2rem',
              fontSize: '12px', fontWeight: 600, color: '#fff',
              background: '#000', padding: '10px 20px', borderRadius: 999,
              textDecoration: 'none', letterSpacing: '0.02em', transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              {data.linkLabel ?? 'visita il progetto'} →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Project Card (grid view) ─── */
function ProjectCard({ project, index, delay = 0 }: { project: ProjectData; index: number; delay?: number }) {
  const { ref, v } = useInView()
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)

  return (
    <>
      <div ref={ref as React.RefObject<HTMLDivElement>}
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          borderRadius: 18, overflow: 'hidden', cursor: 'pointer',
          border: '1px solid #f0f0f0', background: '#fff',
          boxShadow: hover ? '0 20px 60px rgba(0,0,0,0.10)' : '0 2px 12px rgba(0,0,0,0.04)',
          transform: hover ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
          opacity: v ? 1 : 0,
          animation: v ? `fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms both` : 'none',
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease',
        }}>
        {/* image preview */}
        {project.image && (
          <div style={{ width: '100%', height: 200, overflow: 'hidden', position: 'relative', background: '#f8f8f8' }}>
            <img src={project.image} alt={project.title} style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hover ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
            }} />
            {/* index badge */}
            <div style={{
              position: 'absolute', top: 12, left: 12,
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
              borderRadius: 999, padding: '4px 10px',
              fontSize: '10px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em',
            }}>{String(index + 1).padStart(2, '0')}</div>
          </div>
        )}

        {/* content */}
        <div style={{ padding: '1.6rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '0.9rem' }}>
            {project.tags.slice(0, 3).map(t => (
              <span key={t} style={{ fontSize: '9px', fontWeight: 600, padding: '3px 9px', borderRadius: 999, border: '1px solid #eee', color: '#bbb', letterSpacing: '0.04em' }}>{t}</span>
            ))}
          </div>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#000', letterSpacing: '-0.02em', margin: '0 0 0.3rem' }}>{project.title}</h3>
          <p style={{ fontSize: '11px', color: '#aaa', margin: '0 0 1rem', letterSpacing: '0.02em' }}>{project.year}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#000', fontWeight: 500, opacity: hover ? 1 : 0.4, transition: 'opacity 0.3s ease' }}>scopri →</span>
          </div>
        </div>
      </div>

      {open && <ProjectModal data={project} onClose={() => setOpen(false)} />}
    </>
  )
}

/* ─── DATA ─── */
const PROJECTS: ProjectData[] = [
  {
    id: 'esame-di-stato',
    title: 'portfolio esame di stato',
    subtitle: 'web portfolio · iiss volta de gemmis',
    year: '2026',
    tags: ['html', 'css', 'javascript', 'vercel', 'responsive design'],
    image: '/esame.png',
    link: 'https://alessiosaulliesame.vercel.app/',
    linkLabel: 'visita il sito',
    description:
      'Portfolio digitale progettato e sviluppato per la presentazione all\'Esame di Stato 2025/2026 presso l\'IISS Volta De Gemmis di Bitonto.\n\nIl sito raccoglie le tappe fondamentali del percorso scolastico: l\'Educazione Civica con approfondimenti su Agenda 2030, cittadinanza digitale e salute mentale; i percorsi PCTO — tra cui il tirocinio Erasmus+ a Creta come Graphic Designer & Developer presso MD HELLAS e il soggiorno studio a Dublino; e i Capolavori, lavori personali realizzati negli ultimi tre anni.\n\nRealizzato interamente da zero con HTML, CSS e JavaScript vanilla, con design responsivo e navigazione fluida. Distribuito su Vercel.',
  },
  {
    id: 'nimbuscloud',
    title: 'nimbuscloud',
    subtitle: 'cloud storage platform · self-hosted',
    year: '2026',
    tags: ['react', 'node.js', 'postgresql', 'docker', 'socket.io', 'prisma'],
    image: '/nimbuscloud.png',
    link: 'https://github.com/sickkkalex/NimbusCloud',
    linkLabel: 'vedi su github',
    description:
      'Piattaforma di cloud storage personale full-stack, progettata e sviluppata da zero con un\'architettura moderna e scalabile.\n\nFunzionalità principali: upload e gestione file con cartelle annidate, link di condivisione pubblici, reset password via OTP via email, avatar personalizzato, chat di supporto real-time con Socket.io e sistema di abbonamenti Free/Premium con quota storage differenziata.\n\nBackend in Node.js con Express e Prisma ORM su PostgreSQL, frontend in React con design mobile-first. Tutto containerizzato con Docker per il deploy self-hosted.',
  },
]

/* ─── PAGE ─── */
export default function ProgettiPage() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t) }, [])
  const { ref: introRef, v: introV } = useInView(0.1)
  const { ref: listRef, v: listV } = useInView(0.05)

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif", WebkitFontSmoothing: 'antialiased' } as React.CSSProperties}>
      <Navbar />
      <main style={{ paddingTop: '76px', overflowX: 'hidden' }}>

        {/* HERO */}
        <section style={{
          minHeight: '86vh', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '6rem 2.5rem 4rem',
          borderBottom: '1px solid #ebebeb', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.065) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: loaded ? 1 : 0, transition: 'opacity 2.5s ease',
          }}/>

          <div className="hero-grid" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease 200ms', marginBottom: '1.8rem' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', color: '#bbb' }}>/ lavori</span>
              </div>
              <h1 style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', fontWeight: 700, letterSpacing: '-0.055em', lineHeight: 0.92, color: '#000', margin: '0 0 1.4rem' }}>
                {loaded && <AnimChars text="i miei" delay={100} />}
                <br />
                {loaded && <AnimChars text="progetti." delay={380} style={{ color: 'rgba(0,0,0,0.15)' }} />}
              </h1>
              {loaded && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem', flexWrap: 'wrap', marginTop: '1.8rem' }}>
                  <AnimWords text="interfacce, web app e progetti digitali" delay={860} style={{ fontSize: '13px', color: '#888', letterSpacing: '-0.01em' }} />
                  <div style={{ display: 'flex', gap: '7px', animation: 'fadeUp 0.6s ease 1100ms both' }}>
                    {['web dev', 'design', 'open source'].map(tag => (
                      <span key={tag} style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', padding: '5px 12px', borderRadius: 999, border: '1px solid #e5e5e5', color: '#777', background: '#fff' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="hero-visual-container" style={{ minHeight: '440px', opacity: loaded ? 1 : 0, transition: 'opacity 1.2s ease 500ms' }}>
              <HeroVisual />
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: '2.5rem', right: '2.5rem', display: 'flex', alignItems: 'center', gap: '10px', animation: loaded ? 'fadeUp 0.6s ease 1400ms both' : 'none' }}>
            <div style={{ width: 28, height: 1, background: '#ccc' }}/>
            <span style={{ fontSize: '10px', color: '#bbb', letterSpacing: '0.09em' }}>scroll</span>
          </div>
        </section>

        {/* INTRO */}
        <section style={{ padding: '7rem 2.5rem 5rem', background: '#fff' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div ref={introRef as React.RefObject<HTMLDivElement>} style={{ maxWidth: '640px' }}>
              <Label>approccio</Label>
              {[
                { t: 'Ogni progetto nasce da un\'esigenza concreta e si traduce in un prodotto digitale curato, funzionale e con una propria identità visiva. Affronto ogni lavoro con metodo: definizione del problema, progettazione dell\'architettura, sviluppo iterativo e attenzione costante alla qualità del risultato.', d: 0 },
                { t: 'Dalla scrittura di codice pulito e leggibile alla cura dei dettagli grafici, l\'obiettivo è sempre realizzare qualcosa che funzioni bene e che comunichi in modo chiaro. Clicca su un progetto per scoprire la storia dietro al lavoro.', d: 130 },
              ].map(({ t, d }, i) => (
                <p key={i} style={{
                  fontSize: '15px', lineHeight: 1.82, color: '#555', letterSpacing: '-0.01em',
                  margin: i === 0 ? '0 0 1.2rem' : '0',
                  opacity: introV ? 1 : 0, transform: introV ? 'none' : 'translateY(18px)',
                  transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${d}ms`,
                }}>{t}</p>
              ))}
            </div>
          </div>
        </section>

        {/* GRID */}
        <section style={{ padding: '0 2.5rem 7rem', background: '#fff' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <Label>tutti i progetti</Label>

            <div ref={listRef as React.RefObject<HTMLDivElement>}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.2rem' }}>
              {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} delay={i * 90} />)}
            </div>

            {/* coming soon */}
            <div style={{
              marginTop: '2.5rem', padding: '2.5rem', borderRadius: 16,
              border: '1px dashed #e8e8e8', textAlign: 'center',
              opacity: listV ? 1 : 0, transition: 'opacity 0.7s ease 300ms',
            }}>
              <p style={{ fontSize: '12px', color: '#ccc', letterSpacing: '0.04em' }}>
                altri progetti in arrivo —
                <a href="https://github.com/sickkkalex" target="_blank" rel="noreferrer"
                  style={{ color: '#aaa', marginLeft: '6px', textDecoration: 'none', borderBottom: '1px solid #ddd' }}>
                  github.com/sickkkalex
                </a>
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
