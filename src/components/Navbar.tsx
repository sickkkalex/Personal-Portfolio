import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconChevron, IconInstagram, IconGithub, IconLinkedin, IconMail } from '../icons'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? window.scrollY / h : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    height: '76px', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', padding: '0 2.5rem',
    background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
    transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
  }

  const linkStyle: React.CSSProperties = {
    fontSize: '13px', fontWeight: 450, color: '#000',
    textDecoration: 'none', letterSpacing: '-0.01em',
  }

  const btnStyle: React.CSSProperties = {
    ...linkStyle, background: 'none', border: 'none',
    display: 'flex', alignItems: 'center', gap: '4px', padding: 0,
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

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <nav style={navStyle}>
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/logo.svg" alt="logo" style={{ height: '48px' }} />
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2.2rem' }}>
          <Link to="/" className="nav-link" style={linkStyle}>home</Link>
          <Link to="/bio" className="nav-link" style={linkStyle}>bio</Link>
          <Link to="/progetti" className="nav-link" style={linkStyle}>progetti</Link>

          {/* social */}
          <div className="dropdown-trigger" style={{ position: 'relative' }}>
            <button style={btnStyle}>social <IconChevron /></button>
            <div className="dropdown-menu" style={dropStyle}>
              {[
                { label: 'instagram', icon: <IconInstagram />, href: 'https://www.instagram.com/sickkkalex/' },
                { label: 'github',    icon: <IconGithub />,    href: 'https://github.com/sickkkalex' },
                { label: 'linkedin',  icon: <IconLinkedin />,  href: 'https://www.linkedin.com/in/alessio-saulli-07b189399/' },
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
            <button style={btnStyle}>recapiti <IconChevron /></button>
            <div className="dropdown-menu" style={{ ...dropStyle, minWidth: '220px' }}>
              {[
                { label: 'email privata',       sub: 'alessiosaulli4@gmail.com',   href: 'mailto:alessiosaulli4@gmail.com' },
                { label: 'email professionale', sub: 'alessiosaulli@outlook.com', href: 'mailto:alessiosaulli@outlook.com' },
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
      </nav>
    </>
  )
}
