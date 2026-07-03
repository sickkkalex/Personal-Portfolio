import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroVisual from '../components/HeroVisual'

/* ─────────────── helpers ─────────────── */
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
        <span key={i} style={{
          display: 'inline-block',
          animation: `charIn 0.8s cubic-bezier(0.22,1,0.36,1) ${delay + i * 36}ms both`,
        }}>{c === ' ' ? '\u00a0' : c}</span>
      ))}
    </span>
  )
}

function AnimWords({ text, delay = 0, style = {} }: { text: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.22em', ...style }}>
      {text.split(' ').map((w, i) => (
        <span key={i} style={{
          display: 'inline-block',
          animation: `wordIn 0.6s cubic-bezier(0.22,1,0.36,1) ${delay + i * 50}ms both`,
        }}>{w}</span>
      ))}
    </span>
  )
}

function Label({ children }: { children: string }) {
  return (
    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', color: '#bbb', display: 'block', marginBottom: '2rem' }}>
      / {children}
    </span>
  )
}

/* ─────────────── Modal ─────────────── */
interface ModalData { year: string; place: string; role: string; body: string; image?: string }

function Modal({ data, onClose }: { data: ModalData; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
        animation: 'bgBlur 0.3s ease both',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 24, overflow: 'hidden',
          maxWidth: 580, width: '100%',
          boxShadow: '0 40px 100px rgba(0,0,0,0.20), 0 4px 16px rgba(0,0,0,0.08)',
          animation: 'modalIn 0.4s cubic-bezier(0.22,1,0.36,1) both',
          position: 'relative', maxHeight: '90vh', overflowY: 'auto',
        }}
      >
        {/* image */}
        {data.image && (
          <div style={{ width: '100%', height: 200, overflow: 'hidden', position: 'relative' }}>
            <img src={data.image} alt={data.place} style={{
              width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
              transition: 'transform 0.6s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, background: 'linear-gradient(transparent, #fff)' }}/>
          </div>
        )}

        <div style={{ padding: '2.5rem' }}>
          {/* close */}
          <button onClick={onClose} style={{
            position: 'absolute', top: '1.2rem', right: '1.2rem',
            width: 32, height: 32, borderRadius: '50%',
            border: '1px solid #e8e8e8', background: 'rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '14px', color: '#999',
            transition: 'all 0.2s ease', backdropFilter: 'blur(4px)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#000'; (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.9)'; (e.currentTarget as HTMLButtonElement).style.color = '#999' }}>
            ✕
          </button>

          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: '#bbb' }}>{data.year}</span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#000', margin: '0.5rem 0 0.3rem' }}>{data.place}</h3>
          <p style={{ fontSize: '11px', color: '#aaa', fontWeight: 500, letterSpacing: '0.04em', margin: '0 0 1.4rem' }}>{data.role}</p>
          <div style={{ width: 32, height: 1, background: '#e8e8e8', marginBottom: '1.5rem' }}/>
          <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.82, letterSpacing: '-0.01em', margin: 0 }}>{data.body}</p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── Clickable entry row ─────────────── */
function EntryRow({ item, delay = 0 }: { item: ModalData; delay?: number }) {
  const { ref, v } = useInView()
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)

  return (
    <>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'grid', gridTemplateColumns: '90px 1fr auto',
          alignItems: 'center', gap: '1.5rem',
          padding: '1.4rem 1.2rem',
          borderBottom: '1px solid #f0f0f0',
          cursor: 'pointer',
          background: hover ? '#fafafa' : 'transparent',
          borderRadius: 10,
          animation: v ? `rowIn 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms both` : 'none',
          transition: 'background 0.22s ease',
        }}
      >
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: '#bbb' }}>{item.year}</span>
        <div>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#000', letterSpacing: '-0.02em', display: 'block' }}>{item.place}</span>
          <span style={{ fontSize: '11px', color: '#aaa', letterSpacing: '0.02em' }}>{item.role}</span>
        </div>
        <span style={{
          transform: hover ? 'translateX(4px)' : 'translateX(0)',
          transition: 'transform 0.25s ease, color 0.25s ease',
          color: hover ? '#000' : '#ccc',
        }}>→</span>
      </div>
      {open && <Modal data={item} onClose={() => setOpen(false)} />}
    </>
  )
}

/* ─────────────── skill tags ─────────────── */
function SkillGroup({ cat, tags, delay = 0 }: { cat: string; tags: string[]; delay?: number }) {
  const { ref, v } = useInView()
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ marginBottom: '2.2rem' }}>
      <span style={{
        fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: '#bbb', display: 'block', marginBottom: '0.9rem',
        opacity: v ? 1 : 0, transition: `opacity 0.5s ease ${delay}ms`,
      }}>{cat}</span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
        {tags.map((t, i) => (
          <span key={t} style={{
            fontSize: '11px', fontWeight: 500, padding: '7px 15px', borderRadius: 999,
            border: '1px solid #e8e8e8', color: '#444', background: '#fafafa',
            animation: v ? `scaleIn 0.45s cubic-bezier(0.34,1.56,0.64,1) ${delay + 50 + i * 40}ms both` : 'none',
            display: 'inline-block',
          }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function LangBar({ lang, level, pct, delay = 0 }: { lang: string; level: string; pct: number; delay?: number }) {
  const { ref, v } = useInView()
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ marginBottom: '1.8rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{
          fontSize: '13px', fontWeight: 600, color: '#000', letterSpacing: '-0.01em',
          opacity: v ? 1 : 0, transform: v ? 'none' : 'translateX(-10px)',
          transition: `all 0.5s ease ${delay}ms`,
        }}>{lang}</span>
        <span style={{ fontSize: '11px', color: '#aaa', opacity: v ? 1 : 0, transition: `opacity 0.5s ease ${delay + 100}ms` }}>{level}</span>
      </div>
      <div style={{ height: 2, background: '#f0f0f0', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          height: '100%', background: '#000', borderRadius: 99,
          width: v ? `${pct}%` : '0%',
          transition: `width 1.1s cubic-bezier(0.22,1,0.36,1) ${delay + 180}ms`,
        }}/>
      </div>
    </div>
  )
}

/* ─────────────── DATA ─────────────── */
const EXP: ModalData[] = [
  {
    year: '2025',
    place: 'md hellas',
    role: 'graphic designer & programmer · erasmus+',
    image: 'https://www.md-hellas.gr/wp-content/uploads/2025/08/cropped-European-Global-projects.png',
    body: 'Nell\'ambito del programma Erasmus+, ho svolto un tirocinio formativo presso MD HELLAS, azienda operativa a Creta, Grecia. Il percorso mi ha permesso di assumere un duplice ruolo professionale: come Graphic Designer ho curato la produzione di materiali visivi e l\'identità grafica di progetti aziendali; come Software Developer ho contribuito allo sviluppo di soluzioni software su misura, lavorando all\'interno di un team internazionale e confrontandomi con standard operativi di livello professionale.',
  },
  {
    year: '2023 — oggi',
    place: 'freelance',
    role: 'web developer',
    body: 'Parallelamente al percorso accademico, svolgo attività freelance nel campo dello sviluppo web. Mi occupo di progettazione e realizzazione di siti vetrina, web application e interfacce digitali per clienti privati e professionisti. Ogni progetto è un\'opportunità per affinare le competenze tecniche e di design, con attenzione costante alla qualità del codice, all\'esperienza utente e alle performance. Collaboro anche con colleghi di corso su iniziative a lungo termine orientate alla creazione di prodotti digitali.',
  },
]

const EDU: ModalData[] = [
  {
    year: '2021 — oggi',
    place: 'iiss volta de gemmis',
    role: 'diploma in informatica e telecomunicazioni · bari, bitonto',
    image: 'https://dabitonto.com/wp-content/uploads/2024/02/11252img1.jpg',
    body: 'Percorso quinquennale ad indirizzo tecnico-informatico presso l\'Istituto Istruzione Superiore Statale Volta De Gemmis di Bitonto. Il piano di studi ha previsto lo studio approfondito di programmazione (Java, C, C++), progettazione di basi di dati, sistemi e reti informatiche, sviluppo web e telematica. Il percorso ha posto solide basi tecniche e metodologiche per l\'approccio alla risoluzione di problemi complessi in ambito informatico.',
  },
  {
    year: '2026',
    place: 'ef campus · dublino',
    role: 'corso di lingua inglese · livello b2.3',
    image: 'https://a.storyblok.com/f/239725/1500x1128/83087dd4de/01_ie_dbl_gallery_destination_efschool.png/m/1920x1444/filters:quality(70)',
    body: 'Corso intensivo di lingua inglese in contesto accademico internazionale presso EF Campus a Dublino. Il programma ha consentito di raggiungere una padronanza avanzata della lingua sia in ambito comunicativo che tecnico-professionale, con particolare attenzione alla produzione scritta e alle interazioni in contesti multiculturali.',
  },
]

/* ─────────────── PAGE ─────────────── */
export default function BioPage() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t) }, [])

  const { ref: aboutRef, v: aboutV } = useInView(0.1)
  const { ref: softRef,  v: softV  } = useInView(0.1)

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif", WebkitFontSmoothing: 'antialiased' } as React.CSSProperties}>
      <Navbar />

      <main style={{ paddingTop: '76px', overflowX: 'hidden' }}>

        {/* ── HERO ── */}
        <section className="bio-hero" style={{
          minHeight: '86vh', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '6rem 2.5rem 4rem',
          borderBottom: '1px solid #ebebeb', position: 'relative', overflow: 'hidden',
        }}>
          {/* subtle dot grid */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: loaded ? 1 : 0, transition: 'opacity 2s ease',
          }}/>

          <div className="hero-grid" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
            
            {/* left column: text */}
            <div>
              <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease', marginBottom: '1.8rem' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', color: '#bbb' }}>/ profilo</span>
              </div>

            <h1 style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', fontWeight: 700, letterSpacing: '-0.055em', lineHeight: 0.92, color: '#000', margin: '0 0 1.4rem' }}>
              {loaded && <AnimChars text="alessio" delay={100} />}
              <br />
              {loaded && <AnimChars text="saulli." delay={380} style={{ color: 'rgba(0,0,0,0.15)' }} />}
            </h1>

            {loaded && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem', flexWrap: 'wrap', marginTop: '1.8rem' }}>
                <AnimWords
                  text="it specialist · web developer & designer"
                  delay={860}
                  style={{ fontSize: '13px', color: '#888', letterSpacing: '-0.01em' }}
                />
                <div style={{ display: 'flex', gap: '7px', animation: 'fadeUp 0.6s ease 1100ms both' }}>
                  {['bari — it', '19 anni', 'open to work'].map(tag => (
                    <span key={tag} style={{
                      fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em',
                      padding: '5px 12px', borderRadius: 999,
                      border: '1px solid #e5e5e5', color: '#777', background: '#fff',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            )}

            </div>

            {/* right column: visual */}
            <div className="hero-visual-container" style={{ minHeight: '440px', opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 400ms' }}>
              <HeroVisual />
            </div>
          </div>

          <div style={{
            position: 'absolute', bottom: '2.5rem', right: '2.5rem',
            display: 'flex', alignItems: 'center', gap: '10px',
            animation: loaded ? 'fadeUp 0.6s ease 1400ms both' : 'none',
          }}>
            <div style={{ width: 28, height: 1, background: '#ccc' }}/>
            <span style={{ fontSize: '10px', color: '#bbb', letterSpacing: '0.09em' }}>scroll</span>
          </div>
        </section>

        {/* ── PROFILO ── */}
        <section className="bio-section" style={{ padding: '7rem 2.5rem', background: '#fff' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="bio-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>

            <div ref={aboutRef as React.RefObject<HTMLDivElement>}>
              <Label>su di me</Label>
              {[
                { t: 'Con una solida formazione tecnica in ambito informatico e una naturale attitudine al design, mi dedico allo sviluppo di interfacce digitali che coniugano estetica e funzionalità. Sono convinto che ogni progetto richieda rigore metodologico e attenzione al dettaglio, qualità che ho coltivato sia attraverso il percorso accademico sia nell\'attività freelance.', d: 0 },
                { t: 'Affronto i problemi con metodo: definisco le priorità, mantengo il focus sugli obiettivi e gestisco il cambiamento senza perdere di vista il risultato. In un contesto di squadra porto chiarezza, ascolto attivo e contribuisco a creare un ambiente di lavoro costruttivo.', d: 120 },
              ].map(({ t, d }, i) => (
                <p key={i} style={{
                  fontSize: '15px', lineHeight: 1.82, color: '#555', letterSpacing: '-0.01em',
                  margin: i === 0 ? '0 0 1.2rem' : '0',
                  opacity: aboutV ? 1 : 0, transform: aboutV ? 'none' : 'translateY(16px)',
                  transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${d}ms`,
                }}>{t}</p>
              ))}
            </div>

            <div ref={softRef as React.RefObject<HTMLDivElement>}>
              <Label>soft skills</Label>
              {[
                ['problem solving', 'approccio analitico e soluzioni pratiche anche in contesti nuovi.'],
                ['team work', 'collaborazione efficace, ascolto attivo e comunicazione chiara.'],
                ['adattabilità', 'flessibilità nel gestire cambiamenti di requisiti o di contesto.'],
                ['apprendimento continuo', 'capacità di acquisire nuove tecnologie e metodologie autonomamente.'],
                ['gestione del tempo', 'pianificazione delle attività con attenzione a scadenze e priorità.'],
              ].map(([name, desc], i) => (
                <div key={name} style={{
                  padding: '1.1rem 0', borderBottom: '1px solid #f0f0f0',
                  opacity: softV ? 1 : 0, transform: softV ? 'none' : 'translateX(-12px)',
                  transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.25rem' }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#000', flexShrink: 0 }}/>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#000', letterSpacing: '-0.01em' }}>{name}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.6, margin: '0 0 0 14px' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ESPERIENZA ── */}
        <section className="bio-section" style={{ padding: '7rem 2.5rem', background: '#fafafa', borderTop: '1px solid #ebebeb' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <Label>esperienza professionale</Label>
            <p style={{ fontSize: '12px', color: '#bbb', marginBottom: '1.5rem', letterSpacing: '0.02em' }}>clicca su una voce per approfondire</p>
            <div style={{ borderTop: '1px solid #f0f0f0' }}>
              {EXP.map((e, i) => <EntryRow key={e.place} item={e} delay={i * 80} />)}
            </div>
          </div>
        </section>

        {/* ── ISTRUZIONE ── */}
        <section className="bio-section" style={{ padding: '7rem 2.5rem', background: '#fff', borderTop: '1px solid #ebebeb' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <Label>istruzione e formazione</Label>
            <p style={{ fontSize: '12px', color: '#bbb', marginBottom: '1.5rem', letterSpacing: '0.02em' }}>clicca su una voce per approfondire</p>
            <div style={{ borderTop: '1px solid #f0f0f0' }}>
              {EDU.map((e, i) => <EntryRow key={e.place} item={e} delay={i * 80} />)}
            </div>
          </div>
        </section>

        {/* ── COMPETENZE ── */}
        <section className="bio-section" style={{ padding: '7rem 2.5rem', background: '#fafafa', borderTop: '1px solid #ebebeb' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="bio-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
            <div>
              <Label>competenze tecniche</Label>
              <SkillGroup cat="frontend" tags={['html', 'css', 'javascript', 'typescript', 'react']} delay={0}/>
              <SkillGroup cat="backend & sistemi" tags={['java', 'c', 'c++', 'sql', 'node.js']} delay={100}/>
              <SkillGroup cat="tools & design" tags={['figma', 'git', 'vs code', 'adobe illustrator']} delay={200}/>
            </div>
            <div>
              <Label>lingue</Label>
              <LangBar lang="italiano" level="madrelingua" pct={100} delay={0}/>
              <LangBar lang="inglese" level="c1 — b2.3 certificato" pct={82} delay={160}/>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
