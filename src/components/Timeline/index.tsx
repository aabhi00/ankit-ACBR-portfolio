'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Paper } from '@/types'
import Flashcard from '@/components/Flashcard'
import { fadeUp, staggerContainer, scaleIn } from '@/lib/animations'

interface TimelineProps { papers: Paper[] }

const DOT_SIZE = 14

export default function Timeline({ papers }: TimelineProps) {
  const [activePaper, setActivePaper] = useState<Paper | null>(null)

  const handleNodeClick = (paper: Paper) => {
    setActivePaper((prev) => (prev?.id === paper.id ? null : paper))
  }

  // Sort papers by increasing year (oldest to newest)
  const sortedPapers = [...papers].sort((a, b) => a.year - b.year)

  return (
    <section id="timeline" style={{ padding: '5rem 0', background: 'var(--parchment)' }}>
      
      {/* Main Container - Keeps it aligned with the rest of the site's max-width */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Section header - Left Aligned */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{ marginBottom: '4rem', textAlign: 'left', maxWidth: 600 }}
        >
          <motion.span variants={fadeUp} style={{
            fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase',
            color: 'var(--amber)', marginBottom: '.8rem', display: 'block',
          }}>
            Research Evolution
          </motion.span>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 400, marginBottom: '1rem',
            color: 'var(--ink)'
          }}>
            Recent Milestones
          </motion.h2>
          <motion.p variants={fadeUp} style={{
            fontSize: '.95rem', color: 'var(--ink3)', lineHeight: 1.8,
          }}>
            Each paper marks a turning point — a question asked, a method forged, a field shifted.
            Click any node to unfold the story.
          </motion.p>
        </motion.div>

        {/* Vertical Timeline Track */}
        <div style={{ position: 'relative', maxWidth: 800 }}>
          
          {/* THE VERTICAL LINE */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '4.5rem', /* Positions the line 4.5rem from the left edge */
            width: 2,
            background: 'linear-gradient(to bottom, transparent, var(--amber) 5%, var(--moss) 50%, var(--amber) 95%, transparent)',
            zIndex: 0,
            transform: 'translateX(-50%)',
          }} />

          {/* Nodes */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
          >
            {sortedPapers.map((paper) => {
              const isActive = activePaper?.id === paper.id

              return (
                <motion.div
                  key={paper.id}
                  variants={scaleIn}
                  onClick={() => handleNodeClick(paper)}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                  }}
                >
                  {/* Year Label */}
                  <div style={{
                    width: '3.5rem',
                    textAlign: 'right',
                    marginTop: '1.2rem', // Aligns year with the dot
                    fontSize: '.8rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--moss)' : 'var(--amber)',
                    letterSpacing: '.05em',
                    transition: 'color 0.25s',
                  }}>
                    {paper.year}
                  </div>

                  {/* Dot on the line */}
                  <motion.div
                    animate={{
                      background: isActive ? 'var(--moss)' : 'var(--amber)',
                      boxShadow: isActive
                        ? '0 0 0 3px var(--moss), 0 0 12px rgba(13,148,136,0.4)'
                        : '0 0 0 2px var(--amber)',
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: 'absolute',
                      left: '4.5rem',
                      top: '1.75rem', // Centers dot vertically with the first line of card text
                      transform: 'translate(-50%, -50%)',
                      width: DOT_SIZE,
                      height: DOT_SIZE,
                      borderRadius: '50%',
                      border: '3px solid var(--parchment)',
                      zIndex: 2,
                    }}
                  />

                  {/* Card Content */}
                  <motion.div
                    whileHover={{ x: 6, transition: { duration: 0.2 } }} // Slides slightly right on hover
                    animate={{
                      borderColor: isActive ? 'var(--moss2)' : 'var(--border)',
                      boxShadow: isActive
                        ? '0 4px 20px rgba(13,148,136,0.15)'
                        : '0 2px 8px rgba(15,23,42,0.06)',
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      flex: 1,
                      marginLeft: '2.5rem', // Space between line and card
                      background: 'var(--cream)',
                      border: '1px solid var(--border)',
                      borderRadius: 10,
                      padding: '1.2rem 1.5rem',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <CardContent paper={paper} isActive={isActive} />
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Flashcard Modal (Unchanged) */}
      <AnimatePresence mode="wait">
        {activePaper && (
          <motion.div
            key={activePaper.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 1100, margin: '2rem auto 0', padding: '0 2rem' }}
          >
            <Flashcard paper={activePaper} onClose={() => setActivePaper(null)} />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

// Extracted card content to keep the map clean
function CardContent({ paper, isActive }: { paper: Paper; isActive: boolean }) {
  return (
    <>
      <p style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '.9rem',
        color: isActive ? 'var(--moss)' : 'var(--ink)',
        lineHeight: 1.4,
        marginBottom: '.4rem',
      }}>
        {paper.title}
      </p>
      <p style={{
        fontSize: '.75rem',
        color: 'var(--ink3)',
        marginBottom: '.6rem',
        lineHeight: 1.6,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {paper.impact}
      </p>
      <p style={{
        fontSize: '.65rem',
        color: 'var(--amber)',
        fontWeight: 600,
        letterSpacing: '.06em',
        textTransform: 'uppercase',
      }}>
        {paper.journal}
      </p>
    </>
  )
}