'use client'

import { useEffect, useRef } from 'react'
import type { Paper } from '@/types'

// Python parallel:
// def Flashcard(paper: Paper, onClose: Callable) -> HTML:
//     ...

interface FlashcardProps {
  paper: Paper
  onClose: () => void
}

export default function Flashcard({ paper, onClose }: FlashcardProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Scroll into view when a paper is selected
  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [paper.id])

  // Close on Escape key — good UX practice
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      ref={panelRef}
      style={{
        background: 'var(--cream)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '2rem 2.2rem',
        marginTop: '2.5rem',
        boxShadow: '0 8px 40px rgba(30,20,10,0.1)',
        animation: 'fadeUp .3s ease',
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
        <span style={{
          background: 'var(--amber)', color: '#fff', padding: '.2rem .7rem',
          borderRadius: 4, fontSize: '.72rem', fontWeight: 500,
          letterSpacing: '.08em', flexShrink: 0,
        }}>
          {paper.year}
        </span>
        <h3 style={{
          fontFamily: 'Playfair Display, serif', fontSize: '1.3rem',
          color: 'var(--ink)', lineHeight: 1.3, flex: 1,
        }}>
          {paper.title}
        </h3>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            width: 28, height: 28, border: '1px solid var(--border)',
            borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', color: 'var(--ink3)',
            fontSize: '.9rem', flexShrink: 0, background: 'transparent',
            transition: 'all .18s',
          }}
        >
          ✕
        </button>
      </div>

      <p style={{ fontSize: '.8rem', color: 'var(--amber)', marginBottom: '1.4rem', fontWeight: 500 }}>
        {paper.journal}
      </p>

      {/* Four info blocks — like a Python dict with 4 keys */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1rem',
        marginBottom: '1.4rem',
      }}>
        {[
          { label: '❓ The Problem Before', text: paper.problem, bg: 'var(--parchment)' },
          { label: '🧪 What We Did',        text: paper.method,  bg: 'var(--parchment)' },
          { label: '📈 Results',            text: paper.results, bg: 'var(--parchment)' },
          { label: '🌱 Impact Created',     text: paper.impact_long, bg: 'var(--warm)' },
        ].map((block) => (
          <div key={block.label} style={{
            background: block.bg, borderRadius: 8, padding: '1rem 1.1rem',
          }}>
            <p style={{ fontSize: '.65rem', letterSpacing: '.15em', textTransform: 'uppercase',
              color: 'var(--amber)', fontWeight: 500, marginBottom: '.4rem' }}>
              {block.label}
            </p>
            <p style={{ fontSize: '.86rem', color: 'var(--ink2)', lineHeight: 1.7 }}>
              {block.text}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '.8rem',
        borderTop: '1px solid var(--border)', paddingTop: '1rem',
      }}>
        <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
          {paper.tags.map((tag) => (
            <span key={tag} style={{
              background: 'rgba(90,138,74,0.12)', color: 'var(--moss)',
              padding: '.2rem .6rem', borderRadius: 4, fontSize: '.7rem', fontWeight: 500,
            }}>
              {tag}
            </span>
          ))}
        </div>
        {paper.citations !== undefined && (
          <span style={{ fontSize: '.78rem', color: 'var(--ink3)' }}>
            {paper.citations} citations
          </span>
        )}
        
        <a  href={paper.link}
        target="_blank"
        rel="noopener noreferrer"
          style={{
            fontSize: '.8rem', color: 'var(--moss)', textDecoration: 'none',
            border: '1px solid rgba(90,138,74,0.3)', padding: '.3rem .8rem',
            borderRadius: 5, transition: 'all .18s',
          }}
        >
          View Paper →
        </a>
      </div>
    </div>
  )
}