import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // reset to initial state
    el.style.opacity = '0'
    el.style.transform = 'translateY(18px)'
    el.style.filter = 'blur(4px)'

    // trigger animation on next frame
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition =
          'opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1), filter 0.55s cubic-bezier(0.22,1,0.36,1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        el.style.filter = 'blur(0px)'
      })
    })

    return () => cancelAnimationFrame(raf)
  }, [location.key])

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: 'translateY(18px)', filter: 'blur(4px)', willChange: 'opacity, transform, filter' }}
    >
      {children}
    </div>
  )
}
