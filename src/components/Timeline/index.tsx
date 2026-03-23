'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Paper } from '@/types'
import Flashcard from '@/components/Flashcard'
import { fadeUp, staggerContainer, scaleIn } from '@/lib/animations'

interface TimelineProps { papers: Paper[] }

const CARD_HEIGHT = 120   // height of each card
const STEM_HEIGHT = 32    // height of connector stem between card and dot
const DOT_SIZE = 14       // diameter of dot on line

export default function Timeline({ papers }: TimelineProps) {
  const [activePaper, setActivePaper] = useState<Paper | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0)
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing'
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - (scrollRef.current.offsetLeft ?? 0)
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current)
  }
  const handleMouseUp = () => {
    isDragging.current = false
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
  }
  const handleNodeClick = (paper: Paper) => {
    setActivePaper((prev) => (prev?.id === paper.id ? null : paper))
  }

  // Total track height:
  // top cards + stem + dot + stem + bottom cards
  const TRACK_HEIGHT = CARD_HEIGHT + STEM_HEIGHT + DOT_SIZE + STEM_HEIGHT + CARD_HEIGHT
  // The line sits exactly at the vertical center
  const LINE_Y = CARD_HEIGHT + STEM_HEIGHT + DOT_SIZE / 2

  return (
    <section id="timeline" style={{ padding: '5rem 0', background: 'var(--parchment)' }}>

      {/* Section header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem', marginBottom: '3rem' }}
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
        }}>
          A Decade of Discovery
        </motion.h2>
        <motion.p variants={fadeUp} style={{
          fontSize: '.95rem', color: 'var(--ink3)', maxWidth: 560, lineHeight: 1.8,
        }}>
          Each paper marks a turning point — a question asked, a method forged, a field shifted.
          Click any node to unfold the story.
        </motion.p>
      </motion.div>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          overflowX: 'auto', overflowY: 'visible',
          cursor: 'grab', userSelect: 'none', scrollbarWidth: 'none',
          padding: '0 2rem',
        }}
      >
        {/* Fixed-height container so the line is always centered */}
        <div style={{
          position: 'relative',
          height: TRACK_HEIGHT,
          width: 'max-content',
          minWidth: '100%',
        }}>

          {/* THE LINE — positioned at exactly LINE_Y from top */}
          <div style={{
            position: 'absolute',
            top: LINE_Y,
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(to right, transparent, var(--amber) 5%, var(--moss) 50%, var(--amber) 95%, transparent)',
            zIndex: 0,
            transform: 'translateY(-50%)',
          }} />

          {/* Nodes row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              height: '100%',
              gap: 0,
            }}
          >
            {papers.map((paper, index) => {
              const isActive = activePaper?.id === paper.id
              const isAbove = index % 2 === 0  // even = card above line

              return (
                <motion.div
                  key={paper.id}
                  variants={scaleIn}
                  onClick={() => handleNodeClick(paper)}
                  style={{
                    position: 'relative',
                    width: 190,
                    flexShrink: 0,
                    height: TRACK_HEIGHT,
                    cursor: 'pointer',
                    padding: '0 6px',
                  }}
                >
                  {/* Card above the line */}
                  {isAbove && (
                    <motion.div
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      animate={{
                        borderColor: isActive ? 'var(--moss2)' : 'var(--border)',
                        boxShadow: isActive
                          ? '0 4px 20px rgba(58,92,58,0.15)'
                          : '0 2px 8px rgba(30,20,10,0.06)',
                      }}
                      transition={{ duration: 0.25 }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 6, right: 6,
                        height: CARD_HEIGHT,
                        background: 'var(--cream)',
                        border: '1px solid var(--border)',
                        borderRadius: 10,
                        padding: '.7rem .8rem',
                        overflow: 'hidden',
                      }}
                    >
                      <CardContent paper={paper} isActive={isActive} />
                    </motion.div>
                  )}

                  {/* Card below the line */}
                  {!isAbove && (
                    <motion.div
                      whileHover={{ y: 3, transition: { duration: 0.2 } }}
                      animate={{
                        borderColor: isActive ? 'var(--moss2)' : 'var(--border)',
                        boxShadow: isActive
                          ? '0 4px 20px rgba(58,92,58,0.15)'
                          : '0 2px 8px rgba(30,20,10,0.06)',
                      }}
                      transition={{ duration: 0.25 }}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 6, right: 6,
                        height: CARD_HEIGHT,
                        background: 'var(--cream)',
                        border: '1px solid var(--border)',
                        borderRadius: 10,
                        padding: '.7rem .8rem',
                        overflow: 'hidden',
                      }}
                    >
                      <CardContent paper={paper} isActive={isActive} />
                    </motion.div>
                  )}

                  {/* Stem from card to dot — above */}
                  {isAbove && (
                    <div style={{
                      position: 'absolute',
                      top: CARD_HEIGHT,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 1.5,
                      height: STEM_HEIGHT,
                      background: isActive ? 'var(--moss)' : 'var(--amber)',
                      opacity: 0.6,
                      transition: 'background 0.25s',
                      zIndex: 1,
                    }} />
                  )}

                  {/* Stem from dot to card — below */}
                  {!isAbove && (
                    <div style={{
                      position: 'absolute',
                      top: LINE_Y + DOT_SIZE / 2,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 1.5,
                      height: STEM_HEIGHT,
                      background: isActive ? 'var(--moss)' : 'var(--amber)',
                      opacity: 0.6,
                      transition: 'background 0.25s',
                      zIndex: 1,
                    }} />
                  )}

                  {/* Dot on the line */}
                  <motion.div
                    animate={{
                      background: isActive ? 'var(--moss)' : 'var(--amber)',
                      boxShadow: isActive
                        ? '0 0 0 3px var(--moss), 0 0 12px rgba(58,92,58,0.4)'
                        : '0 0 0 2px var(--amber)',
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: 'absolute',
                      top: LINE_Y - DOT_SIZE / 2,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: DOT_SIZE,
                      height: DOT_SIZE,
                      borderRadius: '50%',
                      border: '3px solid var(--parchment)',
                      zIndex: 2,
                    }}
                  />

                  {/* Year label — always just below the dot */}
                  <p style={{
                    position: 'absolute',
                    top: isAbove
                       ? LINE_Y + DOT_SIZE / 2 + 6
                       : LINE_Y - DOT_SIZE / 2 - 18,

                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '.6rem',
                    fontWeight: 600,
                     color: isActive ? 'var(--moss)' : 'var(--amber)',
                    letterSpacing: '.08em',
                    whiteSpace: 'nowrap',
                    zIndex: 2,
                    transition: 'color 0.25s',
                  }}>
                    {paper.year}
                  </p>

                </motion.div>
              )
            })}
          </motion.div>

        </div>
      </div>

      {/* Flashcard */}
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
        fontSize: '.75rem',
        color: isActive ? 'var(--moss)' : 'var(--ink)',
        lineHeight: 1.35,
        marginBottom: '.3rem',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {paper.title}
      </p>
      <p style={{
        fontSize: '.62rem',
        color: 'var(--amber)',
        fontWeight: 500,
        letterSpacing: '.04em',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {paper.journal}
      </p>
    </>
  )
}