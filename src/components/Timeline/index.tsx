'use client'

import { useState, useRef } from 'react'
import type { Paper } from '@/types'
import Flashcard from '@/components/Flashcard'

interface TimelineProps {
  papers: Paper[]
}

export default function Timeline({ papers }: TimelineProps) {
  // useState = a variable that causes the page to re-render when it changes
  // Python parallel: like a mutable instance variable in a class
  const [activePaper, setActivePaper] = useState<Paper | null>(null)

  // Drag-to-scroll state
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
    // Toggle: clicking the same node closes it
    setActivePaper((prev) => (prev?.id === paper.id ? null : paper))
  }

  return (
    <section
      id="timeline"
      style={{ padding: '5rem 0', background: 'var(--parchment)' }}
    >
      {/* Section header */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem', marginBottom: '3rem' }}>
        <span style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase',
          color: 'var(--amber)', marginBottom: '.8rem', display: 'block' }}>
          Research Evolution
        </span>
        <h2 style={{ fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, marginBottom: '1rem' }}>
          A Decade of Discovery
        </h2>
        <p style={{ fontSize: '.95rem', color: 'var(--ink3)', maxWidth: 560, lineHeight: 1.8 }}>
          Each paper marks a turning point — a question asked, a method forged, a field shifted.
          Click any node to unfold the story.
        </p>
      </div>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          overflowX: 'auto', padding: '2rem 0',
          cursor: 'grab', userSelect: 'none',
          scrollbarWidth: 'none',
          // The horizontal line running through all nodes
          borderTop: '2px solid transparent',
        }}
      >
        {/* The timeline line sits behind the nodes */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 28, left: 0, right: 0, height: 2,
            background: 'linear-gradient(to right, transparent, var(--amber), var(--moss), var(--amber), transparent)',
            zIndex: 0,
          }} />

          {/* Nodes row */}
          <div style={{
            display: 'flex', alignItems: 'flex-start',
            width: 'max-content', padding: '0 2rem', gap: 0,
          }}>
            {papers.map((paper) => {
              const isActive = activePaper?.id === paper.id
              return (
                <div
                  key={paper.id}
                  onClick={() => handleNodeClick(paper)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    width: 220, cursor: 'pointer', flexShrink: 0,
                    padding: '0 .5rem', position: 'relative', zIndex: 1,
                  }}
                >
                  {/* Dot */}
                  <div style={{
                    width: 14, height: 14, borderRadius: '50%',
                    background: isActive ? 'var(--moss)' : 'var(--amber)',
                    border: '3px solid var(--parchment)',
                    boxShadow: isActive
                      ? '0 0 0 3px var(--moss), 0 0 12px rgba(58,92,58,0.35)'
                      : '0 0 0 2px var(--amber)',
                    transition: 'all .25s',
                    marginBottom: '.8rem', flexShrink: 0,
                  }} />

                  {/* Year */}
                  <p style={{ fontSize: '.72rem', fontWeight: 500, color: 'var(--amber)',
                    letterSpacing: '.1em', marginBottom: '.3rem', textAlign: 'center' }}>
                    {paper.year}
                  </p>

                  {/* Card */}
                  <div style={{
                    background: 'var(--cream)',
                    border: `1px solid ${isActive ? 'var(--moss2)' : 'var(--border)'}`,
                    borderRadius: 10, padding: '1rem 1.1rem', width: '100%',
                    boxShadow: isActive
                      ? '0 4px 20px rgba(58,92,58,0.12)'
                      : '0 2px 8px var(--shadow)',
                    transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'all .25s',
                  }}>
                    <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '.9rem',
                      color: 'var(--ink)', lineHeight: 1.35, marginBottom: '.4rem' }}>
                      {paper.title}
                    </p>
                    <p style={{ fontSize: '.72rem', color: 'var(--amber)',
                      letterSpacing: '.05em', fontWeight: 500, marginBottom: '.5rem' }}>
                      {paper.journal}
                    </p>
                    <p style={{ fontSize: '.77rem', color: 'var(--ink3)', lineHeight: 1.5 }}>
                      {paper.impact}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Flashcard panel — only shown when a paper is selected */}
      {/* Python parallel: like "if active_paper: render_flashcard(active_paper)" */}
      {activePaper && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
          <Flashcard
            paper={activePaper}
            onClose={() => setActivePaper(null)}
          />
        </div>
      )}
    </section>
  )
}