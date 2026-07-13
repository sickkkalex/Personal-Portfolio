import { useState, useRef, useEffect, useCallback } from 'react'

/* ── types ── */
type Line = { type: 'input' | 'output' | 'welcome'; content: string | React.ReactNode }
type Theme = 'default' | 'matrix' | 'dracula' | 'fedora' | 'light'

/* ── theme palettes ── */
const THEMES: Record<Theme, { bg: string; titleBar: string; text: string; prompt1: string; prompt2: string; promptSym: string; cursor: string; border: string }> = {
  default:  { bg: 'rgba(15,17,21,0.82)',   titleBar: 'rgba(28,31,38,0.9)',  text: '#c9d1d9',  prompt1: '#79c0ff', prompt2: '#ffa657', promptSym: '#d2a8ff', cursor: '#79c0ff', border: 'rgba(255,255,255,0.06)' },
  matrix:   { bg: 'rgba(0,10,0,0.90)',      titleBar: 'rgba(0,20,0,0.95)',   text: '#00ff41',  prompt1: '#00ff41', prompt2: '#39ff14', promptSym: '#adff2f', cursor: '#00ff41', border: 'rgba(0,255,65,0.15)' },
  dracula:  { bg: 'rgba(40,42,54,0.88)',    titleBar: 'rgba(33,34,44,0.95)', text: '#f8f8f2',  prompt1: '#bd93f9', prompt2: '#ffb86c', promptSym: '#ff79c6', cursor: '#bd93f9', border: 'rgba(189,147,249,0.15)' },
  fedora:   { bg: 'rgba(10,18,40,0.88)',    titleBar: 'rgba(6,12,30,0.95)',  text: '#e2e8f0',  prompt1: '#60a5fa', prompt2: '#93c5fd', promptSym: '#bfdbfe', cursor: '#60a5fa', border: 'rgba(96,165,250,0.15)' },
  light:    { bg: 'rgba(245,246,247,0.92)', titleBar: 'rgba(229,231,235,0.97)', text: '#1e293b', prompt1: '#1d4ed8', prompt2: '#b45309', promptSym: '#7c3aed', cursor: '#1d4ed8', border: 'rgba(0,0,0,0.08)' },
}

/* ── uptime helper ── */
function useUptime(startRef: React.MutableRefObject<number>) {
  const [uptime, setUptime] = useState('0s')
  useEffect(() => {
    const id = setInterval(() => {
      const s = Math.floor((Date.now() - startRef.current) / 1000)
      const m = Math.floor(s / 60); const sec = s % 60
      setUptime(m > 0 ? `${m}m ${sec}s` : `${sec}s`)
    }, 1000)
    return () => clearInterval(id)
  }, [startRef])
  return uptime
}

/* ── prompt label ── */
function Prompt({ t }: { t: (typeof THEMES)[Theme] }) {
  return (
    <span style={{ userSelect: 'none' }}>
      <span style={{ color: t.prompt1, fontWeight: 700 }}>sickkkalexx</span>
      <span style={{ color: t.text, opacity: 0.5 }}>@</span>
      <span style={{ color: t.prompt2, fontWeight: 600 }}>portfolio</span>
      <span style={{ color: t.text, opacity: 0.5 }}>:</span>
      <span style={{ color: t.promptSym }}>~</span>
      <span style={{ color: t.text, opacity: 0.7 }}>$ </span>
    </span>
  )
}

/* ── neofetch art ── */
const NEOFETCH_ART = [
  '      ___       ',
  '     /   \\      ',
  '    / /\\ |      ',
  '   / / / /      ',
  '  / / / /       ',
  ' /_/ /_/        ',
  '                ',
]

export default function Terminal() {
  const startRef = useRef(Date.now())
  const uptime = useUptime(startRef)
  const [theme, setTheme] = useState<Theme>('default')
  const t = THEMES[theme]

  const [lines, setLines] = useState<Line[]>([
    {
      type: 'welcome',
      content: (
        <span>
          <span style={{ color: '#79c0ff', fontWeight: 700 }}>Welcome to AlexOS v1.0.0</span>
          <span style={{ color: '#8b949e' }}> (Fedora-powered portfolio)</span>
          {'\n'}
          <span style={{ color: '#8b949e' }}>Type </span>
          <span style={{ color: '#ffa657' }}>'help'</span>
          <span style={{ color: '#8b949e' }}> to see the list of available commands.</span>
          {'\n'}
          <span style={{ color: '#8b949e' }}>Type </span>
          <span style={{ color: '#ffa657' }}>'neofetch'</span>
          <span style={{ color: '#8b949e' }}> to see system information.</span>
        </span>
      ),
    },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [lines])

  const focusInput = () => inputRef.current?.focus()

  const renderNeofetch = useCallback((up: string): React.ReactNode => {
    const info = [
      ['OS',      'AlexOS 2026 / Fedora Shell'],
      ['Kernel',  'Front-End Trainee Core 5.4.0'],
      ['Uptime',  up],
      ['Shell',   'zsh-alessio 5.9'],
      ['IDE',     'VS Code / Neovim'],
      ['Lang',    'TypeScript, HTML, CSS'],
      ['Tools',   'React, Angular, Docker, Git'],
      ['Contact', 'github.com/sickkkalexx'],
    ]
    return (
      <span style={{ display: 'block', lineHeight: 1.6 }}>
        {NEOFETCH_ART.map((row, i) => (
          <span key={i} style={{ display: 'block' }}>
            <span style={{ color: '#60a5fa', fontWeight: 700 }}>{row}</span>
            {info[i] ? (
              <span>
                <span style={{ color: '#79c0ff', fontWeight: 700 }}>{info[i][0]}</span>
                <span style={{ color: '#8b949e' }}>: </span>
                <span style={{ color: '#e6edf3' }}>{info[i][1]}</span>
              </span>
            ) : null}
          </span>
        ))}
      </span>
    )
  }, [])

  const COMMANDS: Record<string, (args: string) => string | React.ReactNode> = {
    help: () => (
      <span style={{ display: 'block', lineHeight: 2 }}>
        {[
          ['help',        'mostra questa lista di comandi'],
          ['about',       'chi sono e cosa faccio'],
          ['skills',      'il mio tech stack'],
          ['projects',    'i miei progetti principali'],
          ['contact',     'come contattarmi'],
          ['clear',       'pulisce il terminale'],
          ['neofetch',    'informazioni di sistema'],
          ['whoami',      'identità del developer'],
          ['sudo <cmd>',  'prova pure...'],
          ['theme <nome>','cambia tema: matrix | dracula | fedora | light | default'],
          ['gui',         'torna all\'interfaccia grafica'],
        ].map(([cmd, desc]) => (
          <span key={cmd} style={{ display: 'block' }}>
            <span style={{ color: t.promptSym, fontWeight: 700, minWidth: '120px', display: 'inline-block' }}>{cmd}</span>
            <span style={{ color: t.text, opacity: 0.6 }}>  {desc}</span>
          </span>
        ))}
      </span>
    ),
    about: () => (
      <span style={{ display: 'block', lineHeight: 1.8 }}>
        <span style={{ color: t.prompt1, fontWeight: 700 }}>alessio saulli</span>
        <span style={{ color: t.text, opacity: 0.7 }}> — web developer & designer</span>
        {'\n'}
        <span style={{ color: t.text, opacity: 0.7 }}>
          19 anni. studio informatica e mi focalizzo sul mondo front-end.{'\n'}
          costruisco interfacce digitali pulite, funzionali e memorabili.{'\n'}
          fedora linux, neovim, caffè e typescript sono il mio stack di sopravvivenza.
        </span>
      </span>
    ),
    skills: () => (
      <span style={{ display: 'block', lineHeight: 2 }}>
        {[
          ['Frontend', 'React, Angular, TypeScript, HTML5, CSS3'],
          ['Styling',  'Tailwind, SCSS, Glassmorphism, Animations'],
          ['Tools',    'Docker, Git, GitHub, Supabase, Vite'],
          ['OS',       'Fedora Linux, WSL2'],
          ['Learning', 'Node.js, REST API, Next.js'],
        ].map(([cat, val]) => (
          <span key={cat} style={{ display: 'block' }}>
            <span style={{ color: t.prompt2, fontWeight: 700 }}>{cat}</span>
            <span style={{ color: t.text, opacity: 0.5 }}>: </span>
            <span style={{ color: t.text }}>{val}</span>
          </span>
        ))}
      </span>
    ),
    projects: () => (
      <span style={{ display: 'block', lineHeight: 2 }}>
        {[
          { name: 'portfolio personale', desc: 'design minimalista, animazioni curate, react + ts', url: null, year: '2026' },
          { name: 'microbank',           desc: 'dashboard bancaria, ux pulita, rest api',          url: null, year: '2025' },
        ].map(p => (
          <span key={p.name} style={{ display: 'block' }}>
            <span style={{ color: t.promptSym, fontWeight: 700 }}>{p.name}</span>
            <span style={{ color: t.text, opacity: 0.4 }}> [{p.year}]</span>
            <span style={{ color: t.text, opacity: 0.6 }}> — {p.desc}</span>
          </span>
        ))}
      </span>
    ),
    contact: () => (
      <span style={{ display: 'block', lineHeight: 2 }}>
        <span style={{ display: 'block' }}>
          <span style={{ color: t.prompt2, fontWeight: 700 }}>GitHub   </span>
          <a href="https://github.com/sickkkalexx" target="_blank" rel="noopener noreferrer" style={{ color: t.prompt1, textDecoration: 'underline' }}>github.com/sickkkalexx</a>
        </span>
        <span style={{ display: 'block' }}>
          <span style={{ color: t.prompt2, fontWeight: 700 }}>Email    </span>
          <a href="mailto:alessio@example.com" style={{ color: t.prompt1, textDecoration: 'underline' }}>alessio.saulli@email.com</a>
        </span>
        <span style={{ display: 'block' }}>
          <span style={{ color: t.prompt2, fontWeight: 700 }}>LinkedIn </span>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: t.prompt1, textDecoration: 'underline' }}>linkedin.com/in/alessiosaulli</a>
        </span>
      </span>
    ),
    whoami: () => (
      <span style={{ color: t.text }}>
        a front-end developer runner fueled by coffee and TypeScript ☕
      </span>
    ),
    neofetch: () => renderNeofetch(uptime),
    sudo: (_args: string) => (
      <span style={{ color: '#f85149', fontWeight: 600 }}>
        [sudo] password for sickkkalexx: {'\n'}
        sickkkalexx is not in the sudoers file. This incident will be reported.
      </span>
    ),
    gui: () => {
      setTimeout(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, 300)
      return <span style={{ color: t.prompt1 }}>switching to GUI mode... scrolling up 🖥️</span>
    },
    theme: (args: string) => {
      const requested = args.trim() as Theme
      if (THEMES[requested]) {
        setTimeout(() => setTheme(requested), 10)
        return <span style={{ color: t.prompt1 }}>theme set to <strong>{requested}</strong> ✨</span>
      }
      return (
        <span style={{ color: '#f85149' }}>
          theme sconosciuto. usa: <span style={{ color: t.promptSym }}>default | matrix | dracula | fedora | light</span>
        </span>
      )
    },
    clear: () => { setTimeout(() => setLines([]), 0); return '' },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const raw = input.trim()
    if (!raw) return

    const [cmd, ...rest] = raw.split(' ')
    const args = rest.join(' ')

    setHistory(h => [raw, ...h])
    setHistIdx(-1)
    setInput('')

    const handler = COMMANDS[cmd.toLowerCase()]
    const output = handler ? handler(args) : (
      <span style={{ color: '#f85149' }}>
        comando non trovato: <strong>{cmd}</strong>. digita <span style={{ color: t.promptSym }}>help</span> per la lista.
      </span>
    )

    const newLines: Line[] = [
      { type: 'input', content: raw },
    ]
    if (output !== '') newLines.push({ type: 'output', content: output })
    setLines(l => [...l, ...newLines])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(next)
      setInput(history[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next === -1 ? '' : history[next])
    }
  }

  return (
    <section
      id="terminal"
      style={{
        padding: '6rem 2.5rem',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* subtle gradient bg blob */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(121,192,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* section header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', zIndex: 1 }}>
        <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', color: '#ccc' }}>/ terminale</span>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.1,
          color: '#000', margin: '0.8rem 0 0.4rem',
        }}>
          esplora il mio portfolio
        </h2>
        <p style={{ fontSize: '13px', color: '#aaa', letterSpacing: '-0.01em' }}>
          digita <code style={{ background: '#f5f5f5', padding: '1px 7px', borderRadius: '4px', fontSize: '12px' }}>help</code> per iniziare
        </p>
      </div>

      {/* window box */}
      <div
        ref={containerRef}
        onClick={focusInput}
        style={{
          width: '100%', maxWidth: '780px', zIndex: 1,
          borderRadius: '14px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.14)',
          border: `1px solid ${t.border}`,
          overflow: 'hidden',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          background: t.bg,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Courier New', monospace",
          transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
          cursor: 'text',
        }}
      >
        {/* title bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '11px 16px',
          background: t.titleBar,
          borderBottom: `1px solid ${t.border}`,
          transition: 'background 0.4s ease',
        }}>
          {/* traffic lights */}
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            {['#ff5f57','#ffbd2e','#28c840'].map((c, i) => (
              <div key={i} style={{
                width: '12px', height: '12px', borderRadius: '50%',
                background: c,
                boxShadow: `0 0 0 0.5px rgba(0,0,0,0.2)`,
                transition: 'opacity 0.15s',
              }} />
            ))}
          </div>
          {/* title */}
          <span style={{
            flex: 1, textAlign: 'center',
            fontSize: '12px', color: '#6b7280',
            letterSpacing: '0.02em', userSelect: 'none',
          }}>
            sickkkalexx@fedora: ~
          </span>
          {/* theme badge */}
          <span style={{
            fontSize: '10px', color: t.prompt1, opacity: 0.6,
            letterSpacing: '0.06em', userSelect: 'none',
          }}>
            {theme}
          </span>
        </div>

        {/* terminal body */}
        <div
          data-lenis-prevent
          style={{
            padding: '18px 20px', minHeight: '340px', maxHeight: '460px',
            overflowY: 'auto', fontSize: '13px', lineHeight: 1.7,
            color: t.text, transition: 'color 0.4s ease',
          }}
          onClick={focusInput}
        >
          {lines.map((line, i) => (
            <div key={i} style={{ marginBottom: line.type === 'output' ? '10px' : '2px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {line.type === 'input' && (
                <span>
                  <Prompt t={t} />
                  <span style={{ color: t.text }}>{line.content as string}</span>
                </span>
              )}
              {line.type === 'output' && (
                <span style={{ paddingLeft: '4px', display: 'block' }}>{line.content}</span>
              )}
              {line.type === 'welcome' && (
                <span style={{ display: 'block', marginBottom: '14px' }}>{line.content}</span>
              )}
            </div>
          ))}

          {/* input row */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
            <Prompt t={t} />
            <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                style={{
                  background: 'transparent', border: 'none', outline: 'none',
                  color: t.text, fontFamily: 'inherit', fontSize: '13px',
                  width: '100%', caretColor: 'transparent',
                  transition: 'color 0.4s ease',
                }}
              />
              {/* blinking cursor */}
              <span style={{
                position: 'absolute',
                left: `${input.length}ch`,
                width: '2px', height: '15px',
                background: t.cursor,
                animation: 'termCursorBlink 1.1s ease infinite',
                borderRadius: '1px',
                transition: 'background 0.4s ease',
              }} />
            </div>
          </form>

          <div ref={bottomRef} />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
        @keyframes termCursorBlink {
          0%, 100% { opacity: 1; }
          45%, 55% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
