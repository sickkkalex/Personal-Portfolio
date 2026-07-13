import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'

let lenis: Lenis | null = null

export function useLenis() {
  const location = useLocation()

  useEffect(() => {
    // Prevent browser from restoring scroll position or jumping to hash on load
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // Force native scroll to top BEFORE Lenis init so there's no flash
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // init Lenis once
    lenis = new Lenis({
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })

    // Immediately tell Lenis we're at the top too
    lenis.scrollTo(0, { immediate: true })

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
    window.scrollTo(0, 0)
    lenis?.scrollTo(0, { immediate: true })
  }, [location.pathname])
}
