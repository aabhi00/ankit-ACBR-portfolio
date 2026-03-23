'use client'

import { useEffect, useRef, useState } from 'react'
import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, fadeIn } from '@/lib/animations'

const PHRASES = [
  'Decoding how microglia regulate brain homeostasis.',
  'Mapping Pax6 networks in the aging brain.',
  'Chasing the roots of neuroinflammation.',
  'Bridging gut-brain axis and neurodegeneration.',
]

const DOMAINS = [
  'Neurobiology', 'Microglia Biology', 'Neurodegeneration',
  'Neuroimmunology', 'Epigenetic Regulation',
]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [typed, setTyped] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  // Typewriter
  useEffect(() => {
    const phrase = PHRASES[phraseIndex]
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = phrase.slice(0, charIndex + 1)
        setTyped(next)
        if (next === phrase) setTimeout(() => setDeleting(true), 2200)
        else setCharIndex((c) => c + 1)
      } else {
        const next = phrase.slice(0, charIndex - 1)
        setTyped(next)
        if (next === '') {
          setDeleting(false)
          setCharIndex(0)
          setPhraseIndex((i) => (i + 1) % PHRASES.length)
        } else setCharIndex((c) => c - 1)
      }
    }, deleting ? 48 : 82)
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, phraseIndex])

  // Neural canvas
 useEffect(() => {
  const canvas = canvasRef.current
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  type Node = { x: number; y: number; vx: number; vy: number; r: number }
  let nodes: Node[] = []
  let animId: number

  const resize = () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    nodes = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1,
    }))
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    nodes.forEach((n) => {
      n.x += n.vx; n.y += n.vy
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(196,118,42,0.6)'
      ctx.fill()
    })
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
        if (d < 120) {
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.strokeStyle = `rgba(90,138,74,${0.4 * (1 - d / 120)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
    animId = requestAnimationFrame(draw)
  }

  // Delay canvas start by 300ms so page HTML renders first
  const startTimer = setTimeout(() => {
    resize()
    draw()
    window.addEventListener('resize', resize)
  }, 300)

  // Single cleanup function — runs when component unmounts
  return () => {
    clearTimeout(startTimer)
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  }
}, [])

  return (
    <section id="hero" style={{
      minHeight: '100vh', background: 'var(--ink)', color: 'var(--cream)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.35,
      }} />

      {/* staggerContainer makes each child animate one after another */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{ position: 'relative', zIndex: 2, maxWidth: 780, padding: '3rem 2rem', textAlign: 'center' }}
      >
        <motion.p variants={fadeUp} style={{
          fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase',
          color: 'var(--amber2)', marginBottom: '1.2rem',
        }}>
          Research Portfolio · Neurobiology
        </motion.p>

        <motion.h1 variants={fadeUp} style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2.6rem,6vw,4.4rem)', fontWeight: 400,
          lineHeight: 1.1, marginBottom: '.6rem',
        }}>
          Dr. <em style={{ fontStyle: 'italic', color: 'var(--moss3)' }}>Shashank Kumar</em> Maurya
        </motion.h1>

        <motion.p variants={fadeUp} style={{
          fontSize: '1rem', color: 'rgba(250,246,238,0.65)',
          marginBottom: '2rem', fontWeight: 300, letterSpacing: '.04em',
        }}>
          Assistant Professor, Department of Zoology, University of Delhi
        </motion.p>

        {/* Domain pills — each one staggers in */}
        <motion.div
          variants={staggerContainer}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem',
            justifyContent: 'center', marginBottom: '2.5rem' }}
        >
          {DOMAINS.map((d) => (
            <motion.span
              key={d}
              variants={scaleInPill}
              whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
              style={{
                background: 'rgba(250,246,238,0.07)',
                border: '1px solid rgba(250,246,238,0.14)',
                padding: '.3rem .9rem', borderRadius: 999, fontSize: '.78rem',
                color: 'var(--sage2)', letterSpacing: '.05em', cursor: 'default',
              }}
            >
              {d}
            </motion.span>
          ))}
        </motion.div>

        <motion.p variants={fadeIn} style={{
          fontSize: '1.1rem', color: 'var(--amber3)',
          fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
          minHeight: '1.6em', marginBottom: '2.4rem',
        }}>
          {typed}<span style={{ opacity: 0.6 }}>|</span>
        </motion.p>

        <motion.div
          variants={fadeUp}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {[
            { href: '#timeline', label: 'Explore Research Journey', primary: true },
            { href: '#publications', label: 'View Publications', primary: false },
          ].map((btn) => (
            <motion.a
              key={btn.href}
              href={btn.href}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '.65rem 1.6rem', borderRadius: 6, fontSize: '.85rem',
                fontWeight: 500, letterSpacing: '.04em', textDecoration: 'none',
                background: btn.primary ? 'var(--moss)' : 'transparent',
                color: btn.primary ? '#fff' : 'var(--amber2)',
                border: btn.primary ? 'none' : '1px solid rgba(196,118,42,0.4)',
              }}
            >
              {btn.label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem' }}
      >
        <span style={{ fontSize: '.72rem', letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'rgba(250,246,238,0.3)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [0.8, 1, 0.8], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 32,
            background: 'linear-gradient(to bottom, transparent, rgba(250,246,238,0.3))' }}
        />
      </motion.div>
    </section>
  )
}




const scaleInPill: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}