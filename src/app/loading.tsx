export default function Loading() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#1e1a14',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1.5rem',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        border: '3px solid rgba(196,118,42,0.3)',
        borderTopColor: '#c4762a',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{
        fontFamily: 'serif',
        fontSize: '1rem',
        color: 'rgba(250,246,238,0.4)',
        letterSpacing: '.2em',
        textTransform: 'uppercase',
      }}>
        Loading
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}