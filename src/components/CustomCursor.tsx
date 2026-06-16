import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current!
    const ring = ringRef.current!
    const pos = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    let raf: number

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX; pos.y = e.clientY
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const animate = () => {
      ringPos.x = lerp(ringPos.x, pos.x, 0.11)
      ringPos.y = lerp(ringPos.y, pos.y, 0.11)
      ring.style.left = ringPos.x + 'px'
      ring.style.top = ringPos.y + 'px'
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
