'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
      if (window.scrollY > 60) setMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = ['Timeline', 'Publications', 'About', 'Contact']

  return (
    <>
      <style>{`
        .nav-desktop { display: flex; }
        .nav-hamburger { display: none; }
        .nav-mobile-drawer { display: none; }
        .nav-backdrop { display: none; }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-mobile-drawer { display: flex; }
          .nav-backdrop { display: block; }
        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: scrolled ? '.7rem 2rem' : '1.2rem 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrolled ? 'rgba(250,246,238,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.35s ease',
      }}>

        {/* Name — always visible */}
        <span style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '.95rem',
          color: scrolled ? 'var(--ink)' : 'var(--cream)',
          fontWeight: 400,
          whiteSpace: 'nowrap',
          transition: 'color 0.35s ease',
        }}>
          Dr. Ankit Singh
        </span>

        {/* Desktop links — visible only above 768px */}
        <div className="nav-desktop" style={{
          gap: '1.5rem', alignItems: 'center',
        }}>
          {navLinks.map((item) => (
            
            <a  key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontSize: '.75rem',
                color: scrolled ? 'var(--ink2)' : 'rgba(250,246,238,0.75)',
                textDecoration: 'none',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                transition: 'color 0.35s ease',
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

        {/* Hamburger — visible only below 768px */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: '4px', flexDirection: 'column',
            gap: 5, zIndex: 2,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block', width: 22, height: 2, borderRadius: 2,
              background: scrolled ? 'var(--ink)' : 'var(--cream)',
              transition: 'all 0.3s ease',
              transform: menuOpen
                ? i === 0 ? 'translateY(7px) rotate(45deg)'
                : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                : 'scaleX(0)'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>

      </nav>

      {/* Mobile drawer — slides in from the RIGHT */}
      <div
        className="nav-mobile-drawer"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 45,
          width: '72vw',
          maxWidth: 280,
          background: 'rgba(250,246,238,0.98)',
          backdropFilter: 'blur(16px)',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2rem',
          gap: 0,
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)',
          borderLeft: '1px solid var(--border)',
          boxShadow: menuOpen ? '-8px 0 32px rgba(30,20,10,0.12)' : 'none',
        }}
      >
        {/* Close button inside drawer */}
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{
            position: 'absolute', top: '1.2rem', right: '1.2rem',
            background: 'transparent', border: '1px solid var(--border)',
            borderRadius: '50%', width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '.85rem', color: 'var(--ink3)',
          }}
        >
          ✕
        </button>

        {/* Nav links in drawer */}
        {navLinks.map((item, i) => (
          
          <a  key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: '1.15rem',
              color: 'var(--ink)',
              textDecoration: 'none',
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              fontWeight: 400,
              fontFamily: 'Playfair Display, serif',
              padding: '1.1rem 0',
              borderBottom: i < navLinks.length - 1
                ? '1px solid var(--border)' : 'none',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(20px)',
              transition: `opacity 0.3s ease ${i * 0.07}s, transform 0.3s ease ${i * 0.07}s`,
            }}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Backdrop — tap outside to close */}
      {menuOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 40,
            background: 'rgba(30,20,10,0.25)',
          }}
        />
      )}
    </>
  )
}