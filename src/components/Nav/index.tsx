'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: scrolled ? '.7rem 2rem' : '1.2rem 2rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: scrolled ? 'rgba(250,246,238,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.35s ease',
    }}>

      {/* Name */}
      <span style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '.95rem',
        color: scrolled ? 'var(--ink)' : 'var(--cream)',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        transition: 'color 0.35s ease',
      }}>
        Dr. Shashank Kumar Maurya
      </span>

      {/* Links */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {['Timeline', 'Publications', 'About', 'Contact'].map((item) => (
          
           <a key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontSize: '.75rem',
              color: scrolled ? 'var(--ink2)' : 'rgba(250,246,238,0.75)',
              textDecoration: 'none',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              fontWeight: 500,
              transition: 'color 0.35s ease, opacity 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                scrolled ? 'var(--ink)' : '#fff'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                scrolled ? 'var(--ink2)' : 'rgba(250,246,238,0.75)'
            }}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  )
}