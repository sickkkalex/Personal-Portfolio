export default function Footer() {
  return (
    <footer style={{
      padding: '4rem 2.5rem 3rem',
      borderTop: '1px solid #ebebeb',
      display: 'flex', flexDirection: 'column',
      gap: '2.5rem',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem',
      }}>
        <img src="/logo.svg" alt="logo" loading="lazy" style={{ height: '36px', opacity: 0.4 }} />
        <p style={{
          fontSize: '13px', fontStyle: 'italic', color: '#bbb',
          maxWidth: '380px', lineHeight: 1.65, textAlign: 'right', letterSpacing: '-0.01em',
        }}>
          "la semplicità è la sofisticazione suprema."
        </p>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        paddingTop: '2rem', borderTop: '1px solid #f5f5f5',
      }}>
        <p style={{ fontSize: '11px', color: '#ccc', letterSpacing: '0.02em' }}>
          © 2026 alessio saulli — tutti i diritti riservati
        </p>
        <p style={{ fontSize: '11px', color: '#ccc', letterSpacing: '0.02em' }}>
          design & sviluppo · alessio saulli
        </p>
      </div>
    </footer>
  )
}
