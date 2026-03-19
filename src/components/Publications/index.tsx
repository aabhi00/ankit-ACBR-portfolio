'use client'

import { useState } from 'react'
import type { Paper } from '@/types'

interface PublicationsProps {
  papers: Paper[]
  domains: string[]
}

export default function Publications({ papers, domains }: PublicationsProps) {
  const [activeDomain, setActiveDomain] = useState('All')

  // Python parallel:
  // filtered = [p for p in papers if domain == 'All' or p.domain == domain]
  const filtered = papers.filter(
    (p) => activeDomain === 'All' || p.domain === activeDomain
  )

  return (
    <section id="publications" style={{ padding: '5rem 0', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <span style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase',
          color: 'var(--amber)', marginBottom: '.8rem', display: 'block' }}>
          Scholarly Work
        </span>
        <h2 style={{ fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 400, marginBottom: '2rem' }}>
          Publications
        </h2>

        {/* Filter buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '2rem' }}>
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setActiveDomain(domain)}
              style={{
                padding: '.35rem .9rem', borderRadius: 999, fontSize: '.78rem',
                border: '1px solid var(--border)', cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all .2s',
                background: activeDomain === domain ? 'var(--moss)' : 'transparent',
                color: activeDomain === domain ? '#fff' : 'var(--ink2)',
                borderColor: activeDomain === domain ? 'var(--moss)' : 'var(--border)',
              }}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.2rem',
        }}>
          {filtered.map((paper) => (
            <div
              key={paper.id}
              style={{
                background: '#fff', border: '1px solid var(--border)',
                borderRadius: 12, padding: '1.4rem 1.5rem',
                transition: 'all .25s', cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.borderColor = 'var(--moss2)'
                el.style.boxShadow = '0 6px 24px rgba(58,92,58,0.1)'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.borderColor = 'var(--border)'
                el.style.boxShadow = 'none'
                el.style.transform = 'translateY(0)'
              }}
            >
              {/* Meta row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.7rem' }}>
                <span style={{ fontSize: '.7rem', background: 'var(--parchment)',
                  color: 'var(--amber)', padding: '.15rem .5rem', borderRadius: 4, fontWeight: 500 }}>
                  {paper.year}
                </span>
                <span style={{ fontSize: '.7rem', background: 'rgba(90,138,74,0.1)',
                  color: 'var(--moss)', padding: '.15rem .5rem', borderRadius: 4, fontWeight: 500 }}>
                  {paper.domain}
                </span>
              </div>

              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '.95rem',
                color: 'var(--ink)', lineHeight: 1.4, marginBottom: '.6rem' }}>
                {paper.title}
              </p>

              <p style={{ fontSize: '.8rem', color: 'var(--ink3)', lineHeight: 1.65,
                display: '-webkit-box', WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {paper.method}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '.3rem', flexWrap: 'wrap', marginTop: '.8rem' }}>
                {paper.tags.map((tag) => (
                  <span key={tag} style={{ background: 'var(--warm)', color: 'var(--ink3)',
                    padding: '.15rem .5rem', borderRadius: 3, fontSize: '.68rem' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {paper.citations !== undefined && (
                <p style={{ fontSize: '.72rem', color: 'var(--ink3)', marginTop: '.7rem' }}>
                  {paper.citations} citations
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}