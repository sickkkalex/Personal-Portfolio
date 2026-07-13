import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current!
    const ring = ringRef.current!
    const pos    = { x: -100, y: -100 }
    const dotPos = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    let raf: number

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX; pos.y = e.clientY
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const animate = () => {
      dotPos.x  = lerp(dotPos.x,  pos.x, 0.55)
      dotPos.y  = lerp(dotPos.y,  pos.y, 0.55)
      ringPos.x = lerp(ringPos.x, pos.x, 0.13)
      ringPos.y = lerp(ringPos.y, pos.y, 0.13)
      dot.style.left  = dotPos.x  + 'px'
      dot.style.top   = dotPos.y  + 'px'
      ring.style.left = ringPos.x + 'px'
      ring.style.top  = ringPos.y + 'px'
      raf = requestAnimationFrame(animate)
    }

    const onEnter = () => document.body.classList.add('hovering')
    const onLeave = () => document.body.classList.remove('hovering')

    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
