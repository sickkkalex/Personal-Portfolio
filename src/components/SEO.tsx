import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  article?: {
    publishedTime?: string
    author?: string
    tag?: string
  }
}

const DEFAULT_TITLE = 'Alessio Saulli — Web Developer & Designer'
const DEFAULT_DESCRIPTION = 'Portfolio di Alessio Saulli, web developer e designer. 19 anni, Bari. Costruisco interfacce digitali pulite, funzionali e memorabili.'
const DEFAULT_IMAGE = 'https://alessiosaulli.vercel.app/logo.png' // Update with your actual domain
const SITE_URL = 'https://alessiosaulli.vercel.app' // Update with your actual domain

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = 'website',
  article,
}: SEOProps) {
  const location = useLocation()
  const fullTitle = title ? `${title} — Alessio Saulli` : DEFAULT_TITLE
  const canonicalUrl = `${SITE_URL}${location.pathname}`

  useEffect(() => {
    // Update document title
    document.title = fullTitle

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let tag = document.querySelector(`meta[${attr}="${property}"]`)

      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, property)
        document.head.appendChild(tag)
      }

      tag.setAttribute('content', content)
    }

    // Standard meta tags
    updateMetaTag('description', description)

    // Open Graph
    updateMetaTag('og:title', fullTitle, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', image, true)
    updateMetaTag('og:url', canonicalUrl, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:site_name', 'Alessio Saulli Portfolio', true)
    updateMetaTag('og:locale', 'it_IT', true)

    // Twitter Cards
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)
    updateMetaTag('twitter:creator', '@sickkkalex') // Update with your Twitter handle

    // Article-specific meta tags
    if (type === 'article' && article) {
      if (article.publishedTime) {
        updateMetaTag('article:published_time', article.publishedTime, true)
      }
      if (article.author) {
        updateMetaTag('article:author', article.author, true)
      }
      if (article.tag) {
        updateMetaTag('article:tag', article.tag, true)
      }
    }

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)
  }, [fullTitle, description, image, canonicalUrl, type, article])

  return null
}
