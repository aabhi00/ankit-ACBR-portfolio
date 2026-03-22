'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Paper } from '@/types'
import { fadeUp, staggerContainer, scaleIn } from '@/lib/animations'

interface PublicationsProps {
  papers: Paper[]
  domains: string[]
}

const PAGE_SIZE = 9

export default function Publications({ papers, domains }: PublicationsProps) {
  const [activeDomain, setActiveDomain] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = papers.filter(
    (p) => activeDomain === 'All' || p.domain === activeDomain
  )

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleDomainChange = (domain: string) => {
    setActiveDomain(domain)
    setPage(1)   // reset to page 1 on filter change
  }

  return (
    <section id="publications" style={{ padding: '5rem 0', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{ marginBottom: '2rem' }}
        >
          <motion.span variants={fadeUp} style={{
            fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase',
            color: 'var(--amber)', marginBottom: '.8rem', display: 'block',
          }}>
            Scholarly Work
          </motion.span>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 400,
          }}>
            Publications
          </motion.h2>
          <motion.p variants={fadeUp} style={{
            fontSize: '.9rem', color: 'var(--ink3)', marginTop: '.5rem',
          }}>
            {filtered.length} papers · Page {page} of {totalPages}
          </motion.p>
        </motion.div>

        {/* Filters */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '2rem',
        }}>
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => handleDomainChange(domain)}
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
        <motion.div
          key={`${activeDomain}-${page}`}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.2rem',
            marginBottom: '2rem',
          }}
        >
          {paginated.map((paper) => (
            <motion.div
              key={paper.id}
              variants={scaleIn}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{
                background: '#fff', border: '1px solid var(--border)',
                borderRadius: 12, padding: '1.4rem 1.5rem', cursor: 'pointer',
              }}
            >
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
                  maxWidth: 140, overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap',
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

              <div style={{
                display: 'flex', gap: '.3rem', flexWrap: 'wrap', marginTop: '.8rem',
              }}>
                {paper.tags.slice(0, 3).map((tag) => (
                  <span key={tag} style={{
                    background: 'var(--warm)', color: 'var(--ink3)',
                    padding: '.15rem .5rem', borderRadius: 3, fontSize: '.68rem',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {paper.citations !== undefined && paper.citations > 0 && (
                <p style={{
                  fontSize: '.72rem', color: 'var(--ink3)', marginTop: '.7rem',
                }}>
                  {paper.citations} citations
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex', justifyContent: 'center',
            alignItems: 'center', gap: '.5rem', flexWrap: 'wrap',
          }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                padding: '.4rem .9rem', borderRadius: 6, fontSize: '.82rem',
                border: '1px solid var(--border)', background: 'transparent',
                color: page === 1 ? 'var(--ink3)' : 'var(--ink)',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit', opacity: page === 1 ? 0.4 : 1,
              }}
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                style={{
                  width: 36, height: 36, borderRadius: '50%', fontSize: '.82rem',
                  border: '1px solid var(--border)', cursor: 'pointer',
                  fontFamily: 'inherit', transition: 'all .2s',
                  background: page === n ? 'var(--moss)' : 'transparent',
                  color: page === n ? '#fff' : 'var(--ink)',
                  borderColor: page === n ? 'var(--moss)' : 'var(--border)',
                }}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                padding: '.4rem .9rem', borderRadius: 6, fontSize: '.82rem',
                border: '1px solid var(--border)', background: 'transparent',
                color: page === totalPages ? 'var(--ink3)' : 'var(--ink)',
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
                opacity: page === totalPages ? 0.4 : 1,
              }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}