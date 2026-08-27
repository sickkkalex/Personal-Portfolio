export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10000,
        background: '#000',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 500,
        textDecoration: 'none',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transition: 'top 0.3s ease',
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = '20px'
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-100px'
      }}
    >
      salta al contenuto principale
    </a>
  )
}
