'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Paper } from '@/types'
import { fadeUp, staggerContainer, scaleIn } from '@/lib/animations'

interface PublicationsProps {
  papers: Paper[]
  domains: string[]
}

export default function Publications({ papers, domains }: PublicationsProps) {
  const [activeDomain, setActiveDomain] = useState('All')

  const filtered = papers.filter(
    (p) => activeDomain === 'All' || p.domain === activeDomain
  )

  return (
    <section id="publications" style={{ padding: '5rem 0', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>

        {/* ── Section header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{ marginBottom: '2rem' }}
        >
          <motion.span
            variants={fadeUp}
            style={{
              fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase',
              color: 'var(--amber)', marginBottom: '.8rem', display: 'block',
            }}
          >
            Scholarly Work
          </motion.span>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 400,
            }}
          >
            Publications
          </motion.h2>
        </motion.div>

        {/* ── Filter buttons ── */}
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

        {/* ── Cards grid ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.2rem',
          }}
        >
          {filtered.map((paper) => (
            <motion.div
              key={paper.id}
              variants={scaleIn}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{
                background: '#fff', border: '1px solid var(--border)',
                borderRadius: 12, padding: '1.4rem 1.5rem', cursor: 'pointer',
              }}
            >
              {/* Meta row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.7rem' }}>
                <span style={{
                  fontSize: '.7rem', background: 'var(--parchment)',
                  color: 'var(--amber)', padding: '.15rem .5rem',
                  borderRadius: 4, fontWeight: 500,
                }}>
                  {paper.year}
                </span>
                <span style={{
                  fontSize: '.7rem', background: 'rgba(90,138,74,0.1)',
                  color: 'var(--moss)', padding: '.15rem .5rem',
                  borderRadius: 4, fontWeight: 500,
                }}>
                  {paper.domain}
                </span>
              </div>

              <p style={{
                fontFamily: 'Playfair Display, serif', fontSize: '.95rem',
                color: 'var(--ink)', lineHeight: 1.4, marginBottom: '.6rem',
              }}>
                {paper.title}
              </p>

              <p style={{
                fontSize: '.8rem', color: 'var(--ink3)', lineHeight: 1.65,
                display: '-webkit-box', WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {paper.method}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '.3rem', flexWrap: 'wrap', marginTop: '.8rem' }}>
                {paper.tags.map((tag) => (
                  <span key={tag} style={{
                    background: 'var(--warm)', color: 'var(--ink3)',
                    padding: '.15rem .5rem', borderRadius: 3, fontSize: '.68rem',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {paper.citations !== undefined && (
                <p style={{ fontSize: '.72rem', color: 'var(--ink3)', marginTop: '.7rem' }}>
                  {paper.citations} citations
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}