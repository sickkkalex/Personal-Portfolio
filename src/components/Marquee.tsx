const ITEMS = [
  'react', 'typescript', 'tailwind css', 'html & css', 'vite',
  'node.js', 'next.js', 'sql', 'java', 'javascript', 'c++', 'php',
  "github", "git", 'c', 'docker'
]

export default function Marquee() {
  const all = [...ITEMS, ...ITEMS]
  return (
    <div style={{
      borderTop: '1px solid #ebebeb', borderBottom: '1px solid #ebebeb',
      padding: '18px 0', overflow: 'hidden', background: '#fff',
    }}>
      <div className="marquee-track" style={{ gap: '0', whiteSpace: 'nowrap' }}>
        {all.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: '20px',
            fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em',
            color: i % 2 === 0 ? '#aaa' : '#ccc',
            paddingRight: '48px',
          }}>
            {item}
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#ddd', flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  )
}
