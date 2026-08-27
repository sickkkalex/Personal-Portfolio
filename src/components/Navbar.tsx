import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IconChevron, IconInstagram, IconGithub, IconLinkedin, IconMail } from '../icons'
import { playSound } from '../hooks/useSounds'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const goToContatti = (e: React.MouseEvent) => {
    e.preventDefault()
    playSound('click')
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    } else {
      document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? window.scrollY / h : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    height: '64px', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', padding: '0 1.5rem',
    background: scrolled || menuOpen ? 'rgba(255,255,255,0.95)' : 'transparent',
    backdropFilter: scrolled || menuOpen ? 'blur(20px) saturate(180%)' : 'none',
    WebkitBackdropFilter: scrolled || menuOpen ? 'blur(20px) saturate(180%)' : 'none',
    borderBottom: scrolled && !menuOpen ? '1px solid rgba(0,0,0,0.06)' : 'none',
    transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
  }

  const linkStyle: React.CSSProperties = {
    fontSize: '13px', fontWeight: 450, color: '#000',
    textDecoration: 'none', letterSpacing: '-0.01em',
  }

  const btnStyle: React.CSSProperties = {
    ...linkStyle, background: 'none', border: 'none',
    display: 'flex', alignItems: 'center', gap: '4px', padding: 0,
    cursor: 'pointer',
  }

  const dropStyle: React.CSSProperties = {
    position: 'absolute', top: 'calc(100% + 14px)', right: 0,
    background: 'rgba(255,255,255,0.96)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(0,0,0,0.07)', borderRadius: '14px',
    padding: '6px', minWidth: '180px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.04)',
  }

  const dropItemStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '10px 12px', borderRadius: '9px',
    textDecoration: 'none', color: '#000',
    fontSize: '13px', fontWeight: 420,
  }

  const NAV_LINKS = [
    { label: 'home',      to: '/' },
    { label: 'bio',       to: '/bio' },
    { label: 'progetti',  to: '/progetti' },
    { label: 'note',      to: '/note' },
  ]

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-hamburger { display: none !important; }
          .nav-mobile-overlay { display: none !important; }
        }
        .nav-mobile-link {
          display: block;
          font-size: 2rem;
          font-weight: 600;
          letter-spacing: -0.04em;
          color: #000;
          text-decoration: none;
          padding: 0.6rem 0;
          border-bottom: 1px solid #f5f5f5;
          transition: opacity 0.2s ease;
        }
        .nav-mobile-link:last-child { border-bottom: none; }
        .nav-mobile-link:hover { opacity: 0.5; }
        .ham-line {
          display: block;
          width: 22px; height: 1.5px;
          background: #000;
          border-radius: 999px;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease;
          transform-origin: center;
        }
      `}</style>

      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />

      <nav style={navStyle}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          onClick={() => { playSound('click'); window.scrollTo({ top: 0 }) }}
          aria-label="Torna alla homepage">
          <img src="/logo.svg" alt="logo" style={{ height: '52px' }} />
        </Link>

        {/* ── Desktop nav ── */}
        <div className="nav-desktop" style={{ alignItems: 'center', gap: '2.2rem' }}>
          {NAV_LINKS.map(l => (
            <Link key={l.to} to={l.to} className="nav-link" style={linkStyle}
              onMouseEnter={() => playSound('hover')} onClick={() => playSound('click')}>
              {l.label}
            </Link>
          ))}
          <a href="/#contatti" className="nav-link" style={linkStyle}
            onMouseEnter={() => playSound('hover')} onClick={goToContatti}>
            contatti
          </a>

          {/* social */}
          <div className="dropdown-trigger" style={{ position: 'relative' }}>
            <button style={btnStyle} onMouseEnter={() => playSound('hover')} onClick={() => playSound('open')} aria-label="Menu social media" aria-haspopup="true">social <IconChevron /></button>
            <div className="dropdown-menu" style={dropStyle}>
              {[
                { label: 'instagram', icon: <IconInstagram />, href: 'https://www.instagram.com/sickkkalex/' },
                { label: 'github', icon: <IconGithub />, href: 'https://github.com/sickkkalex' },
                { label: 'linkedin', icon: <IconLinkedin />, href: 'https://www.linkedin.com/in/alessio-saulli-07b189399/' },
              ].map(it => (
                <a key={it.label} href={it.href} target="_blank" rel="noreferrer"
                  className="dropdown-item" style={dropItemStyle}>
                  <span style={{ color: '#666' }}>{it.icon}</span>{it.label}
                </a>
              ))}
            </div>
          </div>

          {/* recapiti */}
          <div className="dropdown-trigger" style={{ position: 'relative' }}>
            <button style={btnStyle} onMouseEnter={() => playSound('hover')} onClick={() => playSound('open')} aria-label="Menu recapiti email" aria-haspopup="true">recapiti <IconChevron /></button>
            <div className="dropdown-menu" style={{ ...dropStyle, minWidth: '220px' }}>
              {[
                { label: 'email privata', sub: 'alessiosaulli4@gmail.com', href: 'mailto:alessiosaulli4@gmail.com' },
                { label: 'email professionale', sub: 'alessiosaulli@outlook.it', href: 'mailto:alessiosaulli@outlook.it' },
              ].map(it => (
                <a key={it.label} href={it.href}
                  className="dropdown-item" style={dropItemStyle}>
                  <span style={{ color: '#666' }}><IconMail /></span>
                  <span>
                    <span style={{ display: 'block' }}>{it.label}</span>
                    <span style={{ display: 'block', fontSize: '11px', color: '#999', marginTop: '1px' }}>{it.sub}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Hamburger button ── */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '8px', display: 'flex', flexDirection: 'column',
            gap: '5px', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span className="ham-line" style={{ transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
          <span className="ham-line" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="ham-line" style={{ transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
        </button>
      </nav>

      {/* ── Mobile full-screen overlay ── */}
      <div
        className="nav-mobile-overlay"
        style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: '#fff',
          padding: '100px 2rem 3rem',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* main links */}
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.to} to={l.to}
              className="nav-mobile-link"
              style={{ transitionDelay: menuOpen ? `${i * 0.05}s` : '0s' }}
            >
              {l.label}
            </Link>
          ))}
          <a href="/#contatti" className="nav-mobile-link" onClick={goToContatti}>
            contatti
          </a>
        </nav>

        {/* bottom: social links */}
        <div style={{ display: 'flex', gap: '1.5rem', paddingTop: '2rem', borderTop: '1px solid #f0f0f0' }}>
          {[
            { label: 'ig', href: 'https://www.instagram.com/sickkkalex/' },
            { label: 'gh', href: 'https://github.com/sickkkalex' },
            { label: 'li', href: 'https://www.linkedin.com/in/alessio-saulli-07b189399/' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              style={{ fontSize: '12px', color: '#aaa', letterSpacing: '0.04em', textDecoration: 'none' }}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
