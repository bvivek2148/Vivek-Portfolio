'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { usePortfolioTheme } from './ThemeContext'
import { HERO_ROLES, OWNER } from './data'
import { ResumeModal } from './ResumeModal'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
}

function ParticleMesh({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mousePos = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const isDarkRef = useRef(isDark)

  useEffect(() => {
    isDarkRef.current = isDark
  }, [isDark])

  const getColors = useCallback(
    () =>
      isDark
        ? ['#7c5cfc', '#22d3ee', '#a78bfa', '#34d399']
        : ['#6d44f8', '#0891b2', '#8b6ef5', '#059669'],
    [isDark],
  )

  const initParticles = useCallback(
    (w: number, h: number) => {
      const count = Math.floor((w * h) / 14000)
      const colors = getColors()
      particles.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.8 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.2,
      }))
    },
    [getColors],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const connectionColor = isDark ? '#7c5cfc' : '#6d44f8'

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      const pts = particles.current
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        const dx = p.x - mousePos.current.x
        const dy = p.y - mousePos.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120
          p.vx += (dx / dist) * force * 0.15
          p.vy += (dy / dist) * force * 0.15
        }
        p.vx *= 0.98
        p.vy *= 0.98
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = isDarkRef.current ? p.opacity : p.opacity * 0.5
        ctx.fill()
        ctx.globalAlpha = 1
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const ex = p.x - q.x
          const ey = p.y - q.y
          const eDist = Math.sqrt(ex * ex + ey * ey)
          if (eDist < 110) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            const alpha = (1 - eDist / 110) * (isDarkRef.current ? 0.15 : 0.08)
            ctx.strokeStyle = connectionColor
            ctx.globalAlpha = alpha
            ctx.lineWidth = 0.6
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [initParticles, isDark])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: isDark ? 0.9 : 0.6 }}
    />
  )
}

function useTypewriter(words: string[]) {
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    const current = words[wordIdx]
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx))
        setCharIdx((c) => c + 1)
      }, 65)
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setCharIdx((c) => c - 1)
        setDisplayed(current.slice(0, charIdx - 1))
      }, 28)
    } else {
      setDeleting(false)
      setWordIdx((w) => (w + 1) % words.length)
    }
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words])
  return displayed
}

function Chip({
  label,
  icon,
  x,
  y,
  delay,
  accent,
}: {
  label: string
  icon: string
  x: string
  y: string
  delay: number
  accent: string
}) {
  const { isDark } = usePortfolioTheme()
  return (
    <motion.div
      className="absolute hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl pointer-events-none"
      style={{
        left: x,
        top: y,
        background: isDark ? 'rgba(15,15,26,0.85)' : 'rgba(255,255,255,0.85)',
        border: `1px solid ${accent}35`,
        backdropFilter: 'blur(20px)',
        boxShadow: `0 8px 32px ${accent}20, inset 0 1px 0 rgba(255,255,255,0.06)`,
        transition: 'background 0.4s ease',
      }}
      initial={{ opacity: 0, y: 20, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span
        style={{
          fontSize: 12,
          fontFamily: "'Space Mono', monospace",
          color: accent,
          fontWeight: 400,
        }}
      >
        {label}
      </span>
    </motion.div>
  )
}

// ── Cartoon Avatar SVG ────────────────────────────────────────────────
export function CartoonAvatar({ isDark }: { isDark: boolean }) {
  return (
    <svg
      viewBox="0 0 160 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Shadow under feet */}
      <ellipse
        cx="80"
        cy="182"
        rx="32"
        ry="6"
        fill={isDark ? '#7c5cfc' : '#6d44f8'}
        opacity="0.18"
      />

      {/* Body / Hoodie */}
      <path
        d="M36 155 Q36 128 52 118 Q62 112 80 110 Q98 112 108 118 Q124 128 124 155 L124 175 Q80 182 36 175 Z"
        fill={isDark ? '#7c5cfc' : '#6d44f8'}
      />
      {/* Hoodie center stripe */}
      <path
        d="M80 110 L80 175"
        stroke={isDark ? '#5a3fd6' : '#5535d4'}
        strokeWidth="3"
        strokeDasharray="6 4"
        opacity="0.7"
      />
      {/* Hoodie pocket */}
      <rect
        x="58"
        y="140"
        width="44"
        height="22"
        rx="8"
        fill={isDark ? '#5a3fd6' : '#5535d4'}
      />
      <rect
        x="68"
        y="145"
        width="24"
        height="3"
        rx="1.5"
        fill={isDark ? '#7c5cfc' : '#6d44f8'}
        opacity="0.6"
      />

      {/* Arms */}
      <path
        d="M36 130 Q20 140 22 158 Q24 165 32 165 Q36 160 36 150 Z"
        fill={isDark ? '#7c5cfc' : '#6d44f8'}
      />
      <path
        d="M124 130 Q140 140 138 158 Q136 165 128 165 Q124 160 124 150 Z"
        fill={isDark ? '#7c5cfc' : '#6d44f8'}
      />
      {/* Hands */}
      <ellipse cx="26" cy="163" rx="10" ry="9" fill="#f5c9a0" />
      <ellipse cx="134" cy="163" rx="10" ry="9" fill="#f5c9a0" />

      {/* Laptop held on lap */}
      <rect
        x="44"
        y="155"
        width="72"
        height="14"
        rx="4"
        fill={isDark ? '#0f0f1a' : '#1e1b4b'}
      />
      <rect
        x="48"
        y="142"
        width="64"
        height="16"
        rx="3"
        fill={isDark ? '#0f0f1a' : '#1e1b4b'}
      />
      {/* Screen glow */}
      <rect
        x="50"
        y="144"
        width="60"
        height="12"
        rx="2"
        fill={isDark ? '#1a1040' : '#2d1b69'}
      />
      <rect
        x="50"
        y="144"
        width="60"
        height="12"
        rx="2"
        fill={`url(#screenGlow${isDark ? 'Dark' : 'Light'})`}
        opacity="0.5"
      />
      {/* Code lines on screen */}
      <rect
        x="54"
        y="146.5"
        width="22"
        height="2"
        rx="1"
        fill={isDark ? '#22d3ee' : '#0891b2'}
      />
      <rect
        x="54"
        y="150"
        width="14"
        height="2"
        rx="1"
        fill={isDark ? '#34d399' : '#059669'}
      />
      <rect
        x="70"
        y="150"
        width="10"
        height="2"
        rx="1"
        fill={isDark ? '#a78bfa' : '#8b6ef5'}
      />
      <rect
        x="54"
        y="153.5"
        width="18"
        height="2"
        rx="1"
        fill={isDark ? '#7c5cfc' : '#6d44f8'}
      />

      {/* Neck */}
      <rect x="68" y="100" width="24" height="16" rx="6" fill="#f5c9a0" />

      {/* Head */}
      <ellipse cx="80" cy="76" rx="34" ry="36" fill="#f5c9a0" />

      {/* Ear */}
      <ellipse cx="46" cy="78" rx="7" ry="9" fill="#f5c9a0" />
      <ellipse cx="114" cy="78" rx="7" ry="9" fill="#f5c9a0" />
      <ellipse cx="46" cy="78" rx="4" ry="6" fill="#e8b08a" />
      <ellipse cx="114" cy="78" rx="4" ry="6" fill="#e8b08a" />

      {/* Hair */}
      <ellipse
        cx="80"
        cy="44"
        rx="35"
        ry="18"
        fill={isDark ? '#1a1a2e' : '#2d1b69'}
      />
      <ellipse
        cx="50"
        cy="62"
        rx="11"
        ry="18"
        fill={isDark ? '#1a1a2e' : '#2d1b69'}
      />
      <ellipse
        cx="110"
        cy="62"
        rx="11"
        ry="18"
        fill={isDark ? '#1a1a2e' : '#2d1b69'}
      />
      {/* Hair highlight */}
      <ellipse cx="74" cy="40" rx="14" ry="5" fill="white" opacity="0.08" />

      {/* Headphone band */}
      <path
        d="M46 72 Q46 36 80 36 Q114 36 114 72"
        stroke={isDark ? '#22d3ee' : '#0891b2'}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      {/* Headphone cups */}
      <rect
        x="38"
        y="66"
        width="16"
        height="22"
        rx="7"
        fill={isDark ? '#22d3ee' : '#0891b2'}
      />
      <rect
        x="106"
        y="66"
        width="16"
        height="22"
        rx="7"
        fill={isDark ? '#22d3ee' : '#0891b2'}
      />
      {/* Cup inner detail */}
      <rect
        x="42"
        y="70"
        width="8"
        height="14"
        rx="4"
        fill={isDark ? '#0891b2' : '#0e7490'}
        opacity="0.6"
      />
      <rect
        x="110"
        y="70"
        width="8"
        height="14"
        rx="4"
        fill={isDark ? '#0891b2' : '#0e7490'}
        opacity="0.6"
      />

      {/* Eyebrows */}
      <path
        d="M62 66 Q68 62 74 65"
        stroke={isDark ? '#1a1a2e' : '#2d1b69'}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M86 65 Q92 62 98 66"
        stroke={isDark ? '#1a1a2e' : '#2d1b69'}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Eyes */}
      <ellipse cx="68" cy="76" rx="7" ry="8" fill="white" />
      <ellipse cx="92" cy="76" rx="7" ry="8" fill="white" />
      <ellipse cx="68" cy="77" rx="5" ry="6" fill="#1a1a2e" />
      <ellipse cx="92" cy="77" rx="5" ry="6" fill="#1a1a2e" />
      {/* Pupils */}
      <circle cx="70" cy="75" r="2" fill="white" />
      <circle cx="94" cy="75" r="2" fill="white" />
      {/* Eye lashes top */}
      <path
        d="M61 70 Q68 66 75 70"
        stroke="#1a1a2e"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M85 70 Q92 66 99 70"
        stroke="#1a1a2e"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Nose */}
      <path
        d="M76 82 Q80 87 84 82"
        stroke="#c8845a"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Smile */}
      <path
        d="M66 93 Q80 103 94 93"
        stroke="#c8845a"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Cheek blush */}
      <ellipse cx="60" cy="89" rx="8" ry="5" fill="#f08080" opacity="0.22" />
      <ellipse cx="100" cy="89" rx="8" ry="5" fill="#f08080" opacity="0.22" />

      {/* Defs for gradients */}
      <defs>
        <linearGradient id="screenGlowDark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c5cfc" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="screenGlowLight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6d44f8" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// ── Fixed avatar — pure CSS bob, no JS animation, no scroll link ──────
function FloatingAvatar() {
  const { isDark, T } = usePortfolioTheme()

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, scale: 0.6 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 1.0, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center pointer-events-none"
    >
      {/* Outer glow ring */}
      <div
        style={{
          position: 'relative',
          filter: `drop-shadow(0 0 20px ${T.violet}70) drop-shadow(0 12px 40px ${T.cyan}40)`,
          /* CSS-only bob — no JS, not affected by scroll */
          animation: 'avatarBob 3s ease-in-out infinite',
        }}
      >
        {/* Animated orbit ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: -10,
            borderRadius: '50%',
            border: `1.5px dashed ${T.violet}50`,
          }}
        />
        {/* Background circle */}
        <div
          style={{
            width: 'clamp(90px, 12vw, 140px)',
            height: 'clamp(90px, 12vw, 140px)',
            borderRadius: '50%',
            background: isDark
              ? `radial-gradient(circle, ${T.violet}20 0%, transparent 80%)`
              : `radial-gradient(circle, ${T.violet}15 0%, transparent 80%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 'clamp(80px, 11vw, 128px)',
              height: 'clamp(96px, 13.5vw, 155px)',
            }}
          >
            <CartoonAvatar isDark={isDark} />
          </div>
        </div>
      </div>

      {/* Code tag below */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity }}
        style={{
          marginTop: 10,
          fontFamily: "'Space Mono', monospace",
          fontSize: 'clamp(8px, 1.2vw, 11px)',
          letterSpacing: '0.12em',
          color: T.cyan,
          textAlign: 'center',
          background: isDark ? 'rgba(15,15,26,0.7)' : 'rgba(255,255,255,0.7)',
          padding: '3px 10px',
          borderRadius: 6,
          border: `1px solid ${T.cyan}30`,
          backdropFilter: 'blur(8px)',
        }}
      >
        &lt;/vivek&gt;
      </motion.div>

      {/* Keyframe definition injected once */}
      <style>{`
        @keyframes avatarBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </motion.div>
  )
}

export function Hero() {
  const { isDark, T } = usePortfolioTheme()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })
  const displayed = useTypewriter(HERO_ROLES)
  const [resumeOpen, setResumeOpen] = useState(false)

  const heroRef = useRef<HTMLElement>(null)

  const layer1X = useMotionValue(0)
  const layer1Y = useMotionValue(0)
  const layer2X = useMotionValue(0)
  const layer2Y = useMotionValue(0)
  const textX = useMotionValue(0)
  const textY = useMotionValue(0)

  useEffect(() => {
    const unsubX = springX.on('change', (v) => {
      layer1X.set(v * 0.05)
      layer2X.set(v * -0.036)
      textX.set(v * 0.008)
    })
    const unsubY = springY.on('change', (v) => {
      layer1Y.set(v * 0.036)
      layer2Y.set(v * -0.024)
      textY.set(v * 0.006)
    })
    return () => {
      unsubX()
      unsubY()
    }
  }, [springX, springY, layer1X, layer1Y, layer2X, layer2Y, textX, textY])

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => window.removeEventListener('mousemove', onMouse)
  }, [mouseX, mouseY])

  return (
    <>
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: T.bg, transition: 'background 0.45s ease' }}
      >
        <ParticleMesh isDark={isDark} />

        {/* Radial glow layers */}
        <motion.div
          style={{ x: layer1X, y: layer1Y }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute"
            style={{
              left: '15%',
              top: '10%',
              width: 700,
              height: 700,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${T.violet}${isDark ? '18' : '10'} 0%, transparent 65%)`,
              filter: 'blur(40px)',
            }}
          />
          <div
            className="absolute"
            style={{
              right: '5%',
              bottom: '15%',
              width: 500,
              height: 500,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${T.cyan}${isDark ? '12' : '08'} 0%, transparent 70%)`,
              filter: 'blur(30px)',
            }}
          />
        </motion.div>
        <motion.div
          style={{ x: layer2X, y: layer2Y }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute"
            style={{
              right: '20%',
              top: '8%',
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${T.emerald}${isDark ? '10' : '08'} 0%, transparent 70%)`,
              filter: 'blur(20px)',
            }}
          />
        </motion.div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${T.violet}${isDark ? '04' : '06'} 1px, transparent 1px), linear-gradient(90deg, ${T.violet}${isDark ? '04' : '06'} 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            maskImage:
              'radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%)',
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Floating chips */}
        <Chip
          label="Security+"
          icon="🛡️"
          x="6%"
          y="32%"
          delay={1.8}
          accent={T.cyan}
        />
        <Chip
          label="AI Agentic"
          icon="🤖"
          x="78%"
          y="26%"
          delay={2.0}
          accent={T.emerald}
        />
        <Chip
          label="15+ Projects"
          icon="⚡"
          x="80%"
          y="65%"
          delay={2.2}
          accent={T.violet}
        />
        <Chip
          label="Top CTF"
          icon="🏆"
          x="4%"
          y="68%"
          delay={2.4}
          accent={T.rose}
        />

        {/* Main content */}
        <motion.div
          style={{ x: textX, y: textY }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="inline-flex items-center gap-2.5 mb-10 px-5 py-2.5 rounded-full"
            style={{
              background: `${T.violet}${isDark ? '10' : '12'}`,
              border: `1px solid ${T.violet}35`,
              backdropFilter: 'blur(20px)',
            }}
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: T.emerald }}
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span
              style={{
                color: T.violetLight,
                fontFamily: T.fontMono,
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
              }}
            >
              Available for opportunities
            </span>
          </motion.div>

          {/* Name block — avatar floats to the LEFT of the name */}
          <div className="relative flex items-start justify-center">
            {/* ── Avatar — LEFT of name, fixed in place (CSS bob only) ── */}
            <div
              className="flex-shrink-0 self-center"
              style={{
                marginRight: 'clamp(12px, 2.5vw, 36px)',
                marginTop: 'clamp(0px, 2vw, 20px)',
              }}
            >
              <FloatingAvatar />
            </div>

            {/* Name text column */}
            <div>
              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: 120, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.1,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.75,
                  }}
                  style={{
                    fontFamily: T.fontSerif,
                    fontSize: 'clamp(64px, 12vw, 150px)',
                    fontWeight: 600,
                    color: T.text,
                    letterSpacing: '-0.03em',
                    lineHeight: 0.9,
                    transition: 'color 0.45s ease',
                  }}
                >
                  {OWNER.firstName}
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1
                  initial={{ y: 120, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.1,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.9,
                  }}
                  style={{
                    fontFamily: T.fontSerif,
                    fontSize: 'clamp(64px, 12vw, 150px)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    background: `linear-gradient(135deg, ${T.violet} 0%, ${T.violetLight} 35%, ${T.cyan} 70%, ${T.emerald} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.0,
                  }}
                >
                  {OWNER.lastName}
                </motion.h1>
              </div>
            </div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mx-auto mb-8 max-w-sm"
          >
            <div
              className="flex-1 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${T.violet}50)`,
              }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: T.violet, opacity: 0.6 }}
            />
            <div
              className="w-1 h-1 rounded-full"
              style={{ background: T.cyan, opacity: 0.5 }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: T.violet, opacity: 0.6 }}
            />
            <div
              className="flex-1 h-px"
              style={{
                background: `linear-gradient(90deg, ${T.violet}50, transparent)`,
              }}
            />
          </motion.div>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25 }}
            className="mb-8 flex items-center justify-center gap-2"
          >
            <span
              style={{
                color: T.muted,
                fontFamily: T.fontBody,
                fontWeight: 300,
                fontSize: 'clamp(16px, 2.5vw, 20px)',
                minWidth: '310px',
                transition: 'color 0.45s ease',
              }}
            >
              {displayed}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.85, repeat: Infinity }}
                style={{ color: T.violet, marginLeft: 2, fontWeight: 300 }}
              >
                _
              </motion.span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed"
            style={{
              color: T.muted,
              fontWeight: 300,
              transition: 'color 0.45s ease',
            }}
          >
            Building secure, intelligent systems at the intersection of
            cybersecurity, full-stack engineering, and AI-driven automation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap"
          >
            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: `0 20px 50px ${T.violet}50`,
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-8 py-4 rounded-xl text-sm font-semibold flex items-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${T.violet}, ${T.violetLight})`,
                color: '#fff',
                fontFamily: T.fontDisplay,
                letterSpacing: '0.01em',
                boxShadow: `0 8px 28px ${T.violet}40`,
              }}
            >
              View My Work
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>

            {/* Resume Button */}
            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: `0 20px 50px ${T.cyan}40`,
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setResumeOpen(true)}
              className="px-8 py-4 rounded-xl text-sm font-semibold flex items-center gap-2"
              style={{
                background: isDark
                  ? `linear-gradient(135deg, ${T.cyan}18, ${T.emerald}12)`
                  : `linear-gradient(135deg, ${T.cyan}15, ${T.emerald}10)`,
                color: T.cyan,
                fontFamily: T.fontDisplay,
                letterSpacing: '0.01em',
                border: `1px solid ${T.cyan}40`,
                backdropFilter: 'blur(12px)',
                boxShadow: `0 4px 20px ${T.cyan}18`,
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
              Resume
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                document
                  .getElementById('about')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-8 py-4 rounded-xl text-sm font-medium"
              style={{
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
                color: T.muted,
                background: isDark
                  ? 'rgba(255,255,255,0.03)'
                  : 'rgba(0,0,0,0.03)',
                fontFamily: T.fontBody,
                backdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease',
              }}
            >
              About Me
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex flex-col items-center gap-2"
            >
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase' as const,
                  color: T.dimmed,
                  fontFamily: T.fontMono,
                }}
              >
                scroll
              </span>
              <div
                className="w-px h-10 rounded-full"
                style={{
                  background: `linear-gradient(to bottom, ${T.violet}70, transparent)`,
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
