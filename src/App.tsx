import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import BioPage from './pages/BioPage'
import ProgettiPage from './pages/ProgettiPage'
import NotFound from './pages/NotFound'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import { useLenis } from './hooks/useLenis'

function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // set initial (hidden) state
    el.style.transition = 'none'
    el.style.opacity = '0'
    el.style.transform = 'translateY(16px)'
    el.style.filter = 'blur(3px)'
    el.style.willChange = 'opacity, transform, filter'

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition =
          'opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1), filter 0.5s cubic-bezier(0.22,1,0.36,1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        el.style.filter = 'blur(0px)'

        // ── CRITICAL FIX ──
        // After animation ends, reset transform/filter to 'none' (not '0'/'0px').
        // Any non-none transform or filter value creates a new stacking context
        // that breaks position:fixed on child elements (Navbar).
        const cleanup = setTimeout(() => {
          el.style.transition = 'none'
          el.style.transform = 'none'
          el.style.filter = 'none'
          el.style.willChange = 'auto'
        }, 520)

        return () => clearTimeout(cleanup)
      })
    })

    return () => cancelAnimationFrame(raf)
  }, [location.key])

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  useLenis()
  return (
    <PageTransition key={location.key}>
      <Routes location={location}>
        <Route path="/"          element={<Home />} />
        <Route path="/bio"       element={<BioPage />} />
        <Route path="/progetti"  element={<ProgettiPage />} />
        <Route path="/note"      element={<BlogPage />} />
        <Route path="/note/:slug" element={<BlogPostPage />} />
        <Route path="*"          element={<NotFound />} />
      </Routes>
    </PageTransition>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
