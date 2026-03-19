'use client'

import { useState } from 'react'

const LINKS = [
  { icon: '📧', label: 'Email', value: 'p.nair@university.ac.in',
    href: 'mailto:p.nair@university.ac.in', bg: '#fff0e0' },
  { icon: '🎓', label: 'Google Scholar', value: 'View Profile', href: '#', bg: '#e8f4e8' },
  { icon: '🔬', label: 'ResearchGate', value: 'Research Network', href: '#', bg: '#e8eef8' },
  { icon: '💼', label: 'LinkedIn', value: 'Professional Network', href: '#', bg: '#f0e8f0' },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contact" style={{ padding: '5rem 0', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>

        <span style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase',
          color: 'var(--amber)', marginBottom: '.8rem', display: 'block' }}>
          Get In Touch
        </span>
        <h2 style={{ fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 400, marginBottom: '3rem' }}>
          Contact
        </h2>

        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>

          {/* Left — description + links */}
          <div>
            <p style={{ fontSize: '.95rem', color: 'var(--ink3)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Whether you are a prospective student, collaborating researcher, or science journalist —
              I am happy to connect. Replies usually within 3 business days.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
              {LINKS.map((link) => (
                <a key={link.label} href={link.href} style={{
                  display: 'flex', alignItems: 'center', gap: '.8rem',
                  padding: '.8rem 1rem', background: '#fff',
                  border: '1px solid var(--border)', borderRadius: 8,
                  textDecoration: 'none', color: 'var(--ink)', transition: 'all .2s',
                }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--moss2)'
                    el.style.background = 'var(--parchment)'
                    el.style.transform = 'translateX(3px)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--border)'
                    el.style.background = '#fff'
                    el.style.transform = 'translateX(0)'
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: link.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '.85rem', flexShrink: 0 }}>
                    {link.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '.78rem', color: 'var(--ink3)' }}>{link.label}</p>
                    <p style={{ fontSize: '.88rem', fontWeight: 500 }}>{link.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div style={{ background: 'var(--parchment)', borderRadius: 12, padding: '1.8rem' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅</p>
                <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem',
                  color: 'var(--ink)', marginBottom: '.5rem' }}>Message sent!</p>
                <p style={{ fontSize: '.88rem', color: 'var(--ink3)' }}>
                  Thank you — I will be in touch soon.
                </p>
              </div>
            ) : (
              <>
                {[
                  { label: 'Your Name', type: 'text', placeholder: 'Full name' },
                  { label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                  { label: 'Subject', type: 'text', placeholder: 'Collaboration / Research enquiry' },
                ].map((field) => (
                  <div key={field.label} style={{ marginBottom: '1.1rem' }}>
                    <label style={{ fontSize: '.75rem', color: 'var(--ink2)', fontWeight: 500,
                      letterSpacing: '.06em', textTransform: 'uppercase',
                      display: 'block', marginBottom: '.4rem' }}>
                      {field.label}
                    </label>
                    <input type={field.type} placeholder={field.placeholder} style={{
                      width: '100%', padding: '.65rem .9rem', background: '#fff',
                      border: '1px solid var(--border)', borderRadius: 6,
                      fontFamily: 'inherit', fontSize: '.88rem', color: 'var(--ink)', outline: 'none',
                    }} />
                  </div>
                ))}
                <div style={{ marginBottom: '1.1rem' }}>
                  <label style={{ fontSize: '.75rem', color: 'var(--ink2)', fontWeight: 500,
                    letterSpacing: '.06em', textTransform: 'uppercase',
                    display: 'block', marginBottom: '.4rem' }}>
                    Message
                  </label>
                  <textarea placeholder="Tell me about your interest..." style={{
                    width: '100%', padding: '.65rem .9rem', background: '#fff',
                    border: '1px solid var(--border)', borderRadius: 6,
                    fontFamily: 'inherit', fontSize: '.88rem', color: 'var(--ink)',
                    outline: 'none', height: 90, resize: 'none',
                  }} />
                </div>
                <button
                  onClick={() => setSubmitted(true)}
                  style={{
                    width: '100%', background: 'var(--moss)', color: '#fff', border: 'none',
                    padding: '.75rem', borderRadius: 6, fontFamily: 'inherit', fontSize: '.88rem',
                    fontWeight: 500, cursor: 'pointer', letterSpacing: '.04em', transition: 'background .2s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--moss2)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--moss)' }}
                >
                  Send Message
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}