'use client'

// 'use client' means this component runs in the browser, not the server.
// Python parallel: think of server components as your FastAPI backend,
// and client components as the JavaScript that runs after the page loads.

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [visible, setVisible] = useState(false)

  // useEffect = code that runs AFTER the component loads in the browser
  // Python parallel: like an __init__ that fires after setup is done
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300"
      style={{
        background: 'rgba(250,246,238,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        padding: '.7rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '.95rem', color: 'var(--ink)' }}>
        Dr. Priya Nair
      </span>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {['Timeline', 'Publications', 'About', 'Contact'].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{ fontSize: '.8rem', color: 'var(--ink2)', textDecoration: 'none',
              letterSpacing: '.06em', textTransform: 'uppercase', opacity: .7 }}
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  )
}