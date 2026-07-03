import { useRef, useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { playSound } from '../hooks/useSounds'

// ── Intersection Observer reveal hook ──
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

// ── Animated field wrapper ──
function Field({
  label, id, type = 'text', value, onChange, multiline = false, delay = 0,
}: {
  label: string; id: string; type?: string; value: string
  onChange: (v: string) => void; multiline?: boolean; delay?: number
}) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0
  const floated = focused || hasValue

  const sharedStyle: React.CSSProperties = {
    width: '100%',
    padding: '22px 16px 8px',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    fontFamily: 'inherit',
    color: '#000',
    letterSpacing: '-0.01em',
    resize: 'none',
    cursor: 'text',
  }

  return (
    <div
      className="reveal-fade"
      data-delay={delay}
      style={{
        position: 'relative',
        borderBottom: `1px solid ${focused ? '#000' : '#d8d8d8'}`,
        transition: 'border-color 0.3s ease',
        marginBottom: '2rem',
      }}
    >
      {/* floating label */}
      <label
        htmlFor={id}
        style={{
          position: 'absolute',
          left: '16px',
          top: floated ? '6px' : '18px',
          fontSize: floated ? '10px' : '14px',
          color: focused ? '#000' : '#aaa',
          letterSpacing: floated ? '0.06em' : '-0.01em',
          textTransform: floated ? 'uppercase' : 'lowercase',
          transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...sharedStyle, paddingTop: '26px' }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      )}

      {/* bottom line accent */}
      <div style={{
        position: 'absolute', bottom: '-1px', left: 0,
        height: '1px', background: '#000',
        width: focused ? '100%' : '0%',
        transition: 'width 0.35s cubic-bezier(0.22,1,0.36,1)',
      }} />
    </div>
  )
}

// ── Success checkmark SVG animation ──
function SuccessMark() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ display: 'block' }}>
      <circle
        cx="28" cy="28" r="27"
        stroke="#000" strokeWidth="1"
        strokeDasharray="170" strokeDashoffset="0"
        style={{ animation: 'dashIn 0.6s cubic-bezier(0.22,1,0.36,1) both' }}
      />
      <polyline
        points="16,28 24,36 40,20"
        stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="35" strokeDashoffset="35"
        style={{ animation: 'checkIn 0.45s 0.5s cubic-bezier(0.22,1,0.36,1) forwards' }}
      />
    </svg>
  )
}

// ── Main Contact Section ──
export default function Contact() {
  const { ref, visible } = useReveal()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  // Reveal children on scroll
  useEffect(() => {
    if (!visible || !ref.current) return
    const items = ref.current.querySelectorAll<HTMLElement>('.reveal-fade')
    items.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80)
    })
  }, [visible, ref])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return
    setStatus('sending')

    try {
      await emailjs.send(
        'service_abt1ft6',
        'template_dnzs89p',
        { from_name: name, from_email: email, message },
        'r61QMVA-wyT0TPrhC',
      )
      setStatus('success')
      playSound('success')
    } catch {
      setStatus('error')
      playSound('error')
    }
  }

  const handleReset = () => {
    setName(''); setEmail(''); setMessage(''); setStatus('idle')
  }

  return (
    <>
      {/* keyframes for the SVG check animation */}
      <style>{`
        @keyframes dashIn {
          from { stroke-dashoffset: 170; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes checkIn {
          to { stroke-dashoffset: 0; }
        }
        @keyframes spinDot {
          to { transform: rotate(360deg); }
        }
        .contact-link {
          color: #aaa;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: color 0.2s ease, border-color 0.2s ease;
          font-size: 13px;
          letter-spacing: -0.01em;
        }
        .contact-link:hover { color: #000; border-color: #000; }
        .contact-submit-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px;
          background: #000; color: #fff;
          border: none; border-radius: 999px;
          font-family: inherit; font-size: 13px;
          font-weight: 500; letter-spacing: -0.01em;
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .contact-submit-btn:hover:not(:disabled) { opacity: 0.78; transform: translateY(-1px); }
        .contact-submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <section
        id="contact"
        style={{
          padding: '9rem 2.5rem 8rem',
          borderTop: '1px solid #ebebeb',
          background: '#fff',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* header */}
          <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '5rem', alignItems: 'start' }}>

            {/* left: title + info */}
            <div>
              <p className="reveal-fade" style={{ fontSize: '11px', letterSpacing: '0.09em', color: '#aaa', marginBottom: '1.2rem' }}>
                contatti
              </p>

              <h2 className="reveal-fade delay-1" style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
                fontWeight: 600, letterSpacing: '-0.045em',
                lineHeight: 1.08, color: '#000', margin: '0 0 1.8rem',
              }}>
                parliamo<br />
                <span style={{ color: '#ccc', fontWeight: 400 }}>di qualcosa.</span>
              </h2>

              <p className="reveal-fade delay-2" style={{
                fontSize: '14px', color: '#888', lineHeight: 1.7,
                letterSpacing: '-0.01em', maxWidth: '340px', marginBottom: '3rem',
              }}>
                hai un progetto in mente, una collaborazione da proporre
                o semplicemente vuoi fare due chiacchiere? scrivimi.
              </p>

              {/* contact links */}
              <div className="reveal-fade delay-3" style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* mail icon */}
                  <div style={{ width: '34px', height: '34px', border: '1px solid #ebebeb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m2 7 10 7 10-7" />
                    </svg>
                  </div>
                  <a href="mailto:alessiosaulli@gmail.com" className="contact-link">
                    alessiosaulli@gmail.com
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* github icon */}
                  <div style={{ width: '34px', height: '34px', border: '1px solid #ebebeb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </div>
                  <a href="https://github.com/sickkkalexx" target="_blank" rel="noopener noreferrer" className="contact-link">
                    github.com/sickkkalexx
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* location icon */}
                  <div style={{ width: '34px', height: '34px', border: '1px solid #ebebeb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span style={{ fontSize: '13px', color: '#aaa', letterSpacing: '-0.01em' }}>
                    italia, roma
                  </span>
                </div>
              </div>
            </div>

            {/* right: form */}
            <div>
              {status === 'success' ? (
                /* ── success state ── */
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  gap: '1.5rem', padding: '3rem 0',
                  animation: 'fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both',
                }}>
                  <SuccessMark />
                  <div>
                    <p style={{ fontSize: '18px', fontWeight: 500, letterSpacing: '-0.03em', color: '#000', marginBottom: '0.5rem' }}>
                      messaggio inviato.
                    </p>
                    <p style={{ fontSize: '13px', color: '#aaa', letterSpacing: '-0.01em', lineHeight: 1.6 }}>
                      ti rispondo il prima possibile. <br />nel frattempo, dai un'occhiata ai miei progetti.
                    </p>
                  </div>
                  <button onClick={handleReset} className="contact-submit-btn" style={{ background: 'transparent', color: '#000', border: '1px solid #d8d8d8' }}>
                    invia un altro
                  </button>
                </div>
              ) : status === 'error' ? (
                /* ── error state ── */
                <div style={{
                  display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem 0',
                  animation: 'fadeUp 0.4s ease both',
                }}>
                  <p style={{ fontSize: '14px', color: '#000', letterSpacing: '-0.01em' }}>
                    qualcosa è andato storto. riprova o scrivimi direttamente.
                  </p>
                  <button onClick={handleReset} className="contact-submit-btn" style={{ alignSelf: 'flex-start', background: 'transparent', color: '#000', border: '1px solid #d8d8d8' }}>
                    riprova
                  </button>
                </div>
              ) : (
                /* ── form ── */
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  <Field id="contact-name" label="nome" value={name} onChange={setName} delay={100} />
                  <Field id="contact-email" label="email" type="email" value={email} onChange={setEmail} delay={180} />
                  <Field id="contact-msg" label="messaggio" value={message} onChange={setMessage} multiline delay={260} />

                  <div className="reveal-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                    <p style={{ fontSize: '11px', color: '#ccc', letterSpacing: '-0.005em' }}>
                      rispondo in genere entro 24h.
                    </p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="contact-submit-btn"
                    >
                      {status === 'sending' ? (
                        <>
                          <span style={{
                            width: '12px', height: '12px',
                            border: '1.5px solid rgba(255,255,255,0.3)',
                            borderTopColor: '#fff',
                            borderRadius: '50%',
                            display: 'inline-block',
                            animation: 'spinDot 0.7s linear infinite',
                          }} />
                          invio in corso
                        </>
                      ) : (
                        <>invia messaggio →</>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
