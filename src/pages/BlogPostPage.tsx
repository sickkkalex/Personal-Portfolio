import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { posts } from '../data/posts'

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const post = posts.find(p => p.slug === slug)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!post) { navigate('/note', { replace: true }); return }
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [post, navigate])

  if (!post) return null

  const currentIndex = posts.findIndex(p => p.slug === slug)
  const prevPost = posts[currentIndex + 1] ?? null
  const nextPost = posts[currentIndex - 1] ?? null

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        type="article"
        article={{
          publishedTime: post.date,
          author: 'Alessio Saulli',
          tag: post.tag,
        }}
      />
      <style>{`
        .prose h2 {
          font-size: clamp(1.1rem, 2.5vw, 1.35rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #000;
          margin: 2.4rem 0 0.8rem;
          line-height: 1.3;
        }
        .prose p {
          font-size: 15px;
          color: #444;
          line-height: 1.8;
          letter-spacing: -0.01em;
          margin: 0 0 1.2rem;
        }
        .prose ul {
          margin: 0 0 1.2rem;
          padding-left: 1.4rem;
        }
        .prose li {
          font-size: 15px;
          color: #444;
          line-height: 1.8;
          letter-spacing: -0.01em;
          margin-bottom: 0.3rem;
        }
        .prose em {
          color: #000;
          font-style: italic;
        }
        .prose code {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 12px;
          background: #f5f5f5;
          padding: 2px 6px;
          border-radius: 4px;
          color: #333;
        }
        .prose strong {
          color: #000;
          font-weight: 600;
        }
        .post-nav-card {
          flex: 1;
          padding: 1.4rem;
          border: 1px solid #ebebeb;
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s ease, background 0.2s ease;
          min-width: 0;
        }
        .post-nav-card:hover { border-color: #000; background: #fafafa; }
      `}</style>

      <Navbar />
      <main style={{ minHeight: '100svh', paddingTop: '76px' }} id="main-content">
        <article className="blog-article" style={{ maxWidth: '680px', margin: '0 auto', padding: '5rem 2.5rem 6rem' }}>

          {/* back link */}
          <Link
            to="/note"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '12px', color: '#aaa', textDecoration: 'none',
              letterSpacing: '-0.01em', marginBottom: '3rem',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.4s ease, color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#000')}
            onMouseLeave={e => (e.currentTarget.style.color = '#aaa')}
          >
            ← tutte le note
          </Link>

          {/* header */}
          <header style={{
            marginBottom: '3.5rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.55s 0.05s cubic-bezier(0.22,1,0.36,1), transform 0.55s 0.05s cubic-bezier(0.22,1,0.36,1)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.4rem' }}>
              <span style={{
                fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em',
                padding: '3px 9px', borderRadius: '999px',
                background: '#f5f5f5', color: '#555',
              }}>
                {post.tag}
              </span>
              <span style={{ fontSize: '11px', color: '#ccc' }}>·</span>
              <span style={{ fontSize: '11px', color: '#ccc' }}>{post.readTime} lettura</span>
              <span style={{ fontSize: '11px', color: '#ccc' }}>·</span>
              <span style={{ fontSize: '11px', color: '#ccc' }}>{formatDate(post.date)}</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
              fontWeight: 600, letterSpacing: '-0.04em',
              lineHeight: 1.15, color: '#000', margin: '0 0 1.2rem',
            }}>
              {post.title}
            </h1>

            <p style={{
              fontSize: '15px', color: '#888', lineHeight: 1.7,
              letterSpacing: '-0.01em', margin: 0,
            }}>
              {post.excerpt}
            </p>

            <div style={{ height: '1px', background: '#ebebeb', marginTop: '2.5rem' }} />
          </header>

          {/* content */}
          <div
            className="prose"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.55s 0.15s cubic-bezier(0.22,1,0.36,1), transform 0.55s 0.15s cubic-bezier(0.22,1,0.36,1)',
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* post navigation */}
          <nav style={{
            marginTop: '5rem',
            paddingTop: '3rem',
            borderTop: '1px solid #ebebeb',
            display: 'flex',
            gap: '1rem',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.55s 0.3s ease',
          }}>
            {prevPost ? (
              <Link to={`/note/${prevPost.slug}`} className="post-nav-card" style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '10px', color: '#aaa', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>← precedente</p>
                <p style={{ fontSize: '13px', color: '#000', letterSpacing: '-0.015em', lineHeight: 1.4, margin: 0, fontWeight: 500 }}>{prevPost.title}</p>
              </Link>
            ) : <div style={{ flex: 1 }} />}

            {nextPost ? (
              <Link to={`/note/${nextPost.slug}`} className="post-nav-card" style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '10px', color: '#aaa', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>successiva →</p>
                <p style={{ fontSize: '13px', color: '#000', letterSpacing: '-0.015em', lineHeight: 1.4, margin: 0, fontWeight: 500 }}>{nextPost.title}</p>
              </Link>
            ) : <div style={{ flex: 1 }} />}
          </nav>
        </article>
      </main>
      <Footer />
    </>
  )
}
