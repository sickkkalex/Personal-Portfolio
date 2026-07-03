import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'

let lenis: Lenis | null = null

export function useLenis() {
  const location = useLocation()

  useEffect(() => {
    // init Lenis once
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    let raf: number
    function loop(time: number) {
      lenis!.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
      lenis = null
    }
  }, [])

  // scroll to top on route change
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
  }, [location.pathname])
}
