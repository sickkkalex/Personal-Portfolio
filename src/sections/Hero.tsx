import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroVisual from '../components/HeroVisual'
import StatusBadge from '../components/StatusBadge'
import { playSound } from '../hooks/useSounds'

function LineReveal({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 120 + delay)
    return () => clearTimeout(t)
  }, [delay])
  return (
    <span className="line-wrap" style={style}>
      <span className={`line-inner${revealed ? ' revealed' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </span>
    </span>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const bgTextRef = useRef<HTMLDivElement>(null)

  // mouse-tracking gradient + bg text parallax
  useEffect(() => {
    const hero = heroRef.current
    const bgText = bgTextRef.current
    if (!hero) return

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = hero.getBoundingClientRect()
      const x = ((e.clientX - left) / width) * 100
      const y = ((e.clientY - top) / height) * 100
      hero.style.setProperty('--mx', `${x}%`)
      hero.style.setProperty('--my', `${y}%`)
      if (bgText) {
        const dx = (e.clientX / window.innerWidth - 0.5) * -18
        const dy = (e.clientY / window.innerHeight - 0.5) * -10
        bgText.style.transform = `translate(${dx}px, ${dy}px)`
      }
    }

    hero.addEventListener('mousemove', onMove)
    return () => hero.removeEventListener('mousemove', onMove)
  }, [])

  const btnPrimary: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    padding: '12px 26px', background: '#000', color: '#fff',
    borderRadius: '999px', textDecoration: 'none',
    fontSize: '13px', fontWeight: 500, letterSpacing: '-0.01em',
    transition: 'opacity 0.2s ease',
  }
  const btnSecondary: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    padding: '12px 26px', background: 'transparent', color: '#000',
    borderRadius: '999px', textDecoration: 'none',
    fontSize: '13px', fontWeight: 450, letterSpacing: '-0.01em',
    border: '1px solid #d8d8d8',
    transition: 'border-color 0.2s ease, background 0.2s ease',
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        minHeight: '100svh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '80px 2.5rem 60px',
        background: `radial-gradient(ellipse 60% 50% at var(--mx,50%) var(--my,40%), #f7f6f4 0%, #ffffff 70%)`,
        position: 'relative', overflow: 'hidden',
        '--mx': '50%', '--my': '40%',
      } as React.CSSProperties}
    >

      {/* grid container */}
      <div className="hero-grid" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', zIndex: 1 }}>
        {/* left column: content */}
        <div style={{ maxWidth: '680px', position: 'relative' }}>
          <LineReveal delay={0} style={{ display: 'block', marginBottom: '1.2rem' }}>
            <StatusBadge variant="tooltip" />
          </LineReveal>

          <LineReveal delay={60} style={{ display: 'block', marginBottom: '1.2rem' }}>
            <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.09em', color: '#aaa' }}>
              alessio saulli · 2026
            </span>
          </LineReveal>

          <h1 style={{
            fontSize: 'clamp(2.6rem, 6.5vw, 5rem)',
            fontWeight: 600, lineHeight: 1.06, letterSpacing: '-0.045em', color: '#000',
            margin: '0 0 0.9rem 0',
          }}>
            <LineReveal delay={80}>web developer</LineReveal>
            {' '}
            <LineReveal delay={180} style={{ color: '#aaa', fontWeight: 400 }}>& designer.</LineReveal>
          </h1>

          <LineReveal delay={300} style={{ display: 'block', marginBottom: '2.8rem' }}>
            <p style={{
              fontSize: '15px', color: '#888', lineHeight: 1.65,
              letterSpacing: '-0.01em', maxWidth: '420px', margin: 0,
            }}>
              ho 19 anni e costruisco interfacce digitali pulite, funzionali e
              memorabili — per brand e professionisti che badano ai dettagli.
            </p>
          </LineReveal>

          <LineReveal delay={420} style={{ display: 'block' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/bio" className="mag-btn" style={btnPrimary}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.82'; playSound('hover') }}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                onClick={() => playSound('click')}>
                scopri di più
              </Link>
              <a href="#progetti" className="mag-btn" style={btnSecondary}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.background = '#fafafa'; playSound('hover') }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#d8d8d8'; e.currentTarget.style.background = 'transparent' }}
                onClick={() => playSound('click')}>
                i miei progetti →
              </a>
            </div>
          </LineReveal>
        </div>

        {/* right column: visual */}
        <div className="hero-visual-container" style={{ minHeight: '440px' }}>
          <HeroVisual />
        </div>
      </div>

      {/* scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '2.5rem',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px',
        zIndex: 1,
      }}>
        <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, transparent, #ccc)', animation: 'floatY 2.5s ease infinite' }} />
        <span style={{ fontSize: '10px', color: '#bbb', letterSpacing: '0.08em', writingMode: 'vertical-lr' }}>scroll</span>
      </div>

      {/* year / role tag */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', right: '2.5rem',
        fontSize: '11px', color: '#ccc', letterSpacing: '0.04em', zIndex: 1,
      }}>
        portfolio · v1
      </div>
    </section>
  )
}
