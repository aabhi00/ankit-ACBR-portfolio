export default function Footer() {
  return (
    <footer style={{
      background: 'var(--ink)',
      borderTop: '1px solid rgba(250,246,238,0.06)',
      padding: '1.8rem 2rem',
      textAlign: 'center',
    }}>
      <p style={{ fontSize: '.78rem', color: 'rgba(250,246,238,0.25)' }}>
        © {new Date().getFullYear()} Dr. Ankit Singh · Department of ACBR 
      </p>
    </footer>
  )
}