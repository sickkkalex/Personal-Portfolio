import { useEffect, useRef } from 'react'

const RING_COUNT = 12

export default function HeroVisual() {
  const imgRef  = useRef<HTMLDivElement>(null)
  const ring1   = useRef<HTMLDivElement>(null)
  const ring2   = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const m = { x: 0, y: 0 }
    const c = { ax: 0, ay: 0, bx: 0, by: 0, ix: 0, iy: 0, dx: 0, dy: 0 }
    let raf: number
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onMove = (e: MouseEvent) => {
      m.x = e.clientX / window.innerWidth - 0.5
      m.y = e.clientY / window.innerHeight - 0.5
    }
    const tick = () => {
      c.ax = lerp(c.ax, m.x * -14, 0.04)
      c.ay = lerp(c.ay, m.y * -14, 0.04)
      c.bx = lerp(c.bx, m.x *  10, 0.06)
      c.by = lerp(c.by, m.y *  10, 0.06)
      c.ix = lerp(c.ix, m.x *  18, 0.08)
      c.iy = lerp(c.iy, m.y *  18, 0.08)
      c.dx = lerp(c.dx, m.x *  24, 0.05)
      c.dy = lerp(c.dy, m.y *  24, 0.05)

      if (ring1.current)  ring1.current.style.transform  = `translate(${c.ax}px,${c.ay}px)`
      if (ring2.current)  ring2.current.style.transform  = `translate(${c.bx}px,${c.by}px) rotate(${m.x * 6}deg)`
      if (imgRef.current) imgRef.current.style.transform  = `translate(${c.ix}px,${c.iy}px) scale(${1 + Math.abs(m.x) * 0.015})`
      if (dotsRef.current)dotsRef.current.style.transform = `translate(${c.dx}px,${c.dy}px)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  // dots positions around a circle (polar)
  const dots = Array.from({ length: RING_COUNT }, (_, i) => {
    const a = (i / RING_COUNT) * Math.PI * 2
    const r = 210
    return { x: Math.cos(a) * r, y: Math.sin(a) * r, size: i % 3 === 0 ? 4 : 2.5 }
  })

  const SIZE = 340 // circle diameter in px

  return (
    <div style={{
      width: '100%', minHeight: '440px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      {/* outer slow ring */}
      <div ref={ring1} style={{
        position: 'absolute',
        width: SIZE + 130, height: SIZE + 130,
        borderRadius: '50%',
        border: '1px solid rgba(0,0,0,0.08)',
        animation: 'spinSlow 90s linear infinite',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {/* tick marks on the ring */}
        {dots.map((d, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: '50%', top: '50%',
            width: d.size, height: d.size,
            borderRadius: '50%',
            background: `rgba(0,0,0,${i % 3 === 0 ? 0.2 : 0.1})`,
            transform: `translate(calc(-50% + ${d.x}px), calc(-50% + ${d.y}px))`,
          }}/>
        ))}
      </div>

      {/* inner dashed ring */}
      <div ref={ring2} style={{
        position: 'absolute',
        width: SIZE + 60, height: SIZE + 60,
        borderRadius: '50%',
        border: '1px dashed rgba(0,0,0,0.1)',
        animation: 'spinSlow 60s linear infinite reverse',
        flexShrink: 0,
      }}/>

      {/* circle image */}
      <div ref={imgRef} style={{ position: 'relative', flexShrink: 0 }}>
        <img
          src="/logo.png"
          alt="logo"
          style={{
            width: SIZE, height: SIZE,
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            boxShadow: '0 8px 60px rgba(0,0,0,0.10), 0 2px 16px rgba(0,0,0,0.06)',
          }}
        />
      </div>

      {/* floating dots */}
      <div ref={dotsRef} style={{ position: 'absolute', width: SIZE + 320, height: SIZE + 320, pointerEvents: 'none' }}>
        {[
          { t: '8%',  l: '10%',  s: 4 },
          { t: '12%', r: '6%',   s: 3 },
          { b: '15%', l: '8%',   s: 2.5 },
          { b: '10%', r: '10%',  s: 4 },
          { t: '45%', l: '2%',   s: 3 },
          { t: '38%', r: '2%',   s: 2 },
        ].map((d, i) => (
          <div key={i} style={{
            position: 'absolute', ...d,
            width: d.s, height: d.s, borderRadius: '50%',
            background: `rgba(0,0,0,${0.14 + i * 0.04})`,
          }}/>
        ))}
      </div>
    </div>
  )
}
