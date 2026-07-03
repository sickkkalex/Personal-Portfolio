import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#abcdefghijklmnopqrstuvwxyz0123456789'

function useGlitchText(finalText: string, trigger: boolean) {
  const [display, setDisplay] = useState(finalText)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)
  const DURATION = 900

  useEffect(() => {
    if (!trigger) return
    startRef.current = performance.now()

    const animate = (now: number) => {
      const progress = Math.min((now - startRef.current) / DURATION, 1)
      const revealCount = Math.floor(progress * finalText.length)
      const glitched = finalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < revealCount) return char
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        })
        .join('')
      setDisplay(glitched)
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
      else setDisplay(finalText)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [trigger, finalText])

  return display
}

const TERMINAL_LINES = [
  { delay: 0,    text: '$ locate current-page', type: 'cmd' },
  { delay: 600,  text: 'searching filesystem...', type: 'info' },
  { delay: 1200, text: 'ERROR: path not found → 404', type: 'error' },
  { delay: 1900, text: '$ run damage-control.sh', type: 'cmd' },
  { delay: 2500, text: 'loading recovery options...', type: 'info' },
  { delay: 3100, text: 'HINT: try navigating to / or /bio', type: 'success' },
]

function TerminalLine({ text, type, delay }: { text: string; type: string; delay: number }) {
  const [visible, setVisible] = useState(false)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t1)
  }, [delay])

  useEffect(() => {
    if (!visible) return
    if (type !== 'cmd') { setTyped(text); return }
    let i = 0
    const interval = setInterval(() => {
      setTyped(text.slice(0, ++i))
      if (i >= text.length) clearInterval(interval)
    }, 38)
    return () => clearInterval(interval)
  }, [visible, text, type])

  if (!visible) return null

  const color =
    type === 'error'   ? '#ff5f57' :
    type === 'success' ? '#28c840' :
    type === 'cmd'     ? '#fff'    : '#888'

  return (
    <div style={{
      fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
      fontSize: '12px',
      lineHeight: 1.9,
      color,
      animation: 'fadeUp 0.3s ease both',
      letterSpacing: '0.02em',
    }}>
      {typed}
      {type === 'cmd' && typed.length < text.length && (
        <span style={{ display: 'inline-block', width: '7px', height: '13px', background: '#fff', marginLeft: '2px', verticalAlign: 'text-bottom', animation: 'caretBlink 1s steps(1) infinite' }} />
      )}
    </div>
  )
}

export default function NotFound() {
  const navigate = useNavigate()
  const [glitchTrigger, setGlitchTrigger] = useState(false)
  const big404 = useGlitchText('404', glitchTrigger)

  useEffect(() => {
    const t = setTimeout(() => setGlitchTrigger(true), 200)
    return () => clearTimeout(t)
  }, [])

  // re-trigger glitch on hover
  const handleMouseEnter = () => {
    setGlitchTrigger(false)
    requestAnimationFrame(() => setGlitchTrigger(true))
  }

  return (
    <>
      <style>{`
        @keyframes caretBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes glitchShift {
          0%   { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 0); }
          20%  { clip-path: inset(50% 0 30% 0); transform: translate(4px, 0); }
          40%  { clip-path: inset(10% 0 80% 0); transform: translate(-3px, 0); }
          60%  { clip-path: inset(70% 0 10% 0); transform: translate(2px, 0); }
          80%  { clip-path: inset(40% 0 40% 0); transform: translate(-2px, 0); }
          100% { clip-path: inset(0% 0 100% 0); transform: translate(0); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        .not-found-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 24px;
          font-family: inherit; font-size: 13px; font-weight: 500; letter-spacing: -0.01em;
          border-radius: 999px; cursor: pointer;
          transition: opacity 0.2s ease, transform 0.2s ease;
          text-decoration: none;
        }
        .not-found-btn:hover { opacity: 0.75; transform: translateY(-1px); }
        .not-found-btn-primary { background: #000; color: #fff; border: none; }
        .not-found-btn-secondary { background: transparent; color: #000; border: 1px solid #d8d8d8; }
      `}</style>

      <Navbar />

      <main style={{
        minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 2.5rem 60px',
        background: '#fff',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* subtle background grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)',
        }} />

        <div className="not-found-grid" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '900px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

          {/* ── Left: 404 number ── */}
          <div>
            {/* big 404 with glitch */}
            <div
              style={{ position: 'relative', display: 'inline-block', cursor: 'default', marginBottom: '1.5rem' }}
              onMouseEnter={handleMouseEnter}
            >
              <span style={{
                fontSize: 'clamp(6rem, 18vw, 13rem)',
                fontWeight: 700, letterSpacing: '-0.06em',
                color: '#000', lineHeight: 1, display: 'block',
                userSelect: 'none',
              }}>
                {big404}
              </span>

              {/* glitch red layer */}
              <span aria-hidden style={{
                position: 'absolute', inset: 0,
                fontSize: 'clamp(6rem, 18vw, 13rem)',
                fontWeight: 700, letterSpacing: '-0.06em', color: '#ff5f57',
                lineHeight: 1, mixBlendMode: 'multiply',
                animation: 'glitchShift 2.4s steps(1) infinite',
                userSelect: 'none',
              }}>
                {big404}
              </span>

              {/* glitch blue layer */}
              <span aria-hidden style={{
                position: 'absolute', inset: 0,
                fontSize: 'clamp(6rem, 18vw, 13rem)',
                fontWeight: 700, letterSpacing: '-0.06em', color: '#007aff',
                lineHeight: 1, mixBlendMode: 'multiply',
                animation: 'glitchShift 2.4s 0.2s steps(1) infinite',
                userSelect: 'none',
              }}>
                {big404}
              </span>
            </div>

            <p style={{ fontSize: '11px', letterSpacing: '0.09em', color: '#aaa', marginBottom: '0.8rem' }}>
              pagina non trovata
            </p>
            <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, letterSpacing: '-0.01em', maxWidth: '320px', marginBottom: '2.5rem' }}>
              la pagina che stai cercando non esiste o è stata spostata. nessun panico.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/')}
                className="not-found-btn not-found-btn-primary"
              >
                ← torna alla home
              </button>
              <button
                onClick={() => navigate(-1)}
                className="not-found-btn not-found-btn-secondary"
              >
                pagina precedente
              </button>
            </div>
          </div>

          {/* ── Right: fake terminal ── */}
          <div style={{
            background: '#0d0d0d',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.07)',
            position: 'relative',
          }}>
            {/* title bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 16px',
              background: '#1a1a1a',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
              <span style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: '#555', fontFamily: 'monospace', letterSpacing: '0.02em' }}>
                bash — recovery.sh
              </span>
            </div>

            {/* scanline overlay */}
            <div style={{
              position: 'absolute', top: '40px', left: 0, right: 0,
              height: '40%', pointerEvents: 'none', zIndex: 2,
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.015), transparent)',
              animation: 'scanline 4s linear infinite',
            }} />

            {/* terminal content */}
            <div style={{ padding: '20px 20px 24px', minHeight: '220px', position: 'relative' }}>
              {TERMINAL_LINES.map((line, i) => (
                <TerminalLine key={i} text={line.text} type={line.type} delay={line.delay} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
