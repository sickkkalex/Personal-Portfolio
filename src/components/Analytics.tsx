import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Analytics provider configuration
// Set VITE_ANALYTICS_PROVIDER to 'plausible' or 'google' in .env
const PROVIDER = import.meta.env.VITE_ANALYTICS_PROVIDER || 'plausible'
const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN || 'alessiosaulli.vercel.app'
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''

export default function Analytics() {
  const location = useLocation()

  useEffect(() => {
    // Track page views on route change
    if (PROVIDER === 'plausible' && window.plausible) {
      window.plausible('pageview')
    } else if (PROVIDER === 'google' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      })
    }
  }, [location])

  useEffect(() => {
    // Load analytics script
    if (PROVIDER === 'plausible') {
      const script = document.createElement('script')
      script.defer = true
      script.dataset.domain = PLAUSIBLE_DOMAIN
      script.src = 'https://plausible.io/js/script.js'
      document.head.appendChild(script)

      // TypeScript declaration
      window.plausible = window.plausible || function(...args: any[]) {
        (window.plausible.q = window.plausible.q || []).push(args)
      }

      return () => {
        document.head.removeChild(script)
      }
    } else if (PROVIDER === 'google' && GA_MEASUREMENT_ID) {
      // Google Analytics
      const script1 = document.createElement('script')
      script1.async = true
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      document.head.appendChild(script1)

      const script2 = document.createElement('script')
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          anonymize_ip: true,
          cookie_flags: 'SameSite=None;Secure'
        });
      `
      document.head.appendChild(script2)

      return () => {
        document.head.removeChild(script1)
        document.head.removeChild(script2)
      }
    }
  }, [])

  return null
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    plausible?: any
    gtag?: any
    dataLayer?: any[]
  }
}
