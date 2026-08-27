import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { posts } from '../data/posts'

function useRevealAll(count: number) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])
  return Array.from({ length: count }, (_, i) => visible ? i : -1)
}

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  design:   { bg: '#f0f7ff', color: '#1d4ed8' },
  progetto: { bg: '#fef9f0', color: '#92400e' },
  ux:       { bg: '#f0fdf4', color: '#15803d' },
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  const revealFlags = useRevealAll(posts.length)

  return (
    <>
      <SEO
        title="Note"
        description="Pensieri e riflessioni su design, sviluppo web e quello che imparo sbagliando. Nessuna cadenza fissa, solo quando ho qualcosa da dire."
      />
      <Navbar />
      <main style={{ minHeight: '100svh', paddingTop: '76px' }} id="main-content">

        {/* header */}
        <section style={{ padding: '6rem 2.5rem 4rem', maxWidth: '760px', margin: '0 auto' }}>
          <p style={{
            fontSize: '11px', letterSpacing: '0.09em', color: '#aaa',
            marginBottom: '1.2rem',
            opacity: 0, animation: 'fadeUp 0.6s 0.05s cubic-bezier(0.22,1,0.36,1) forwards',
          }}>
            / note
          </p>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 600, letterSpacing: '-0.045em', lineHeight: 1.08,
            color: '#000', margin: '0 0 1.2rem',
            opacity: 0, animation: 'fadeUp 0.6s 0.1s cubic-bezier(0.22,1,0.36,1) forwards',
          }}>
            pensieri<br />
            <span style={{ color: '#ccc', fontWeight: 400 }}>& riflessioni.</span>
          </h1>
          <p style={{
            fontSize: '14px', color: '#888', lineHeight: 1.7, letterSpacing: '-0.01em',
            maxWidth: '420px',
            opacity: 0, animation: 'fadeUp 0.6s 0.18s cubic-bezier(0.22,1,0.36,1) forwards',
          }}>
            scrivo di design, sviluppo e di quello che imparo sbagliando.
            nessuna cadenza fissa — quando ho qualcosa da dire.
          </p>
        </section>

        {/* post list */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 2.5rem 8rem' }}>
          <div style={{ borderTop: '1px solid #ebebeb' }}>
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                to={`/note/${post.slug}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <article
                  style={{
                    padding: '2.4rem 0',
                    borderBottom: '1px solid #ebebeb',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '1.5rem',
                    alignItems: 'start',
                    cursor: 'pointer',
                    opacity: revealFlags[i] >= 0 ? 1 : 0,
                    transform: revealFlags[i] >= 0 ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 0.55s ${i * 0.08}s cubic-bezier(0.22,1,0.36,1), transform 0.55s ${i * 0.08}s cubic-bezier(0.22,1,0.36,1)`,
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.opacity = '0.65'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.opacity = '1'
                  }}
                >
                  <div>
                    {/* tag */}
                    <div style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em',
                        padding: '3px 9px', borderRadius: '999px',
                        background: TAG_COLORS[post.tag]?.bg ?? '#f5f5f5',
                        color: TAG_COLORS[post.tag]?.color ?? '#555',
                      }}>
                        {post.tag}
                      </span>
                      <span style={{ fontSize: '11px', color: '#ccc' }}>·</span>
                      <span style={{ fontSize: '11px', color: '#ccc', letterSpacing: '-0.005em' }}>
                        {post.readTime} lettura
                      </span>
                    </div>

                    <h2 style={{
                      fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
                      fontWeight: 500, letterSpacing: '-0.025em',
                      color: '#000', lineHeight: 1.35, margin: '0 0 0.6rem',
                    }}>
                      {post.title}
                    </h2>

                    <p style={{
                      fontSize: '13px', color: '#888', lineHeight: 1.65,
                      letterSpacing: '-0.01em', margin: 0, maxWidth: '500px',
                    }}>
                      {post.excerpt}
                    </p>
                  </div>

                  {/* date + arrow */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem', paddingTop: '2px', flexShrink: 0 }}>
                    <span style={{ fontSize: '11px', color: '#bbb', letterSpacing: '-0.005em', whiteSpace: 'nowrap' }}>
                      {formatDate(post.date)}
                    </span>
                    <span style={{ fontSize: '16px', color: '#ccc' }}>→</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
