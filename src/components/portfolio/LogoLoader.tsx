import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { usePortfolioTheme } from './ThemeContext'
import { CartoonAvatar } from './Hero'

/* ─────────────────────────────────────────────
   SEEDED RANDOM
───────────────────────────────────────────── */
function seededRand(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

/* ─────────────────────────────────────────────
   AURORA BACKGROUND
───────────────────────────────────────────── */
function AuroraLayer({
  violet,
  cyan,
  isDark,
}: {
  violet: string
  cyan: string
  isDark: boolean
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.3, 0.85, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '55vw',
          height: '55vw',
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          background: `radial-gradient(ellipse, ${violet}${isDark ? '22' : '14'} 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        animate={{
          x: [0, -80, 50, 0],
          y: [0, 60, -50, 0],
          scale: [1, 0.7, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          borderRadius: '60% 40% 30% 70% / 50% 60% 40% 50%',
          background: `radial-gradient(ellipse, ${cyan}${isDark ? '1a' : '10'} 0%, transparent 70%)`,
          filter: 'blur(50px)',
        }}
      />
      <motion.div
        animate={{
          x: [0, 40, -60, 0],
          y: [0, -30, 80, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 7,
        }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '30%',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${violet}${isDark ? '0e' : '08'} 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   NEURAL NETWORK CANVAS
───────────────────────────────────────────── */
function NeuralCanvas({
  violet,
  cyan,
  isDark,
}: {
  violet: string
  cyan: string
  isDark: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const rand = seededRand(42)
    type Node = {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      pulse: number
      pulseSpeed: number
    }
    const nodes: Node[] = Array.from({ length: 60 }, (_, i) => ({
      x: rand() * window.innerWidth,
      y: rand() * window.innerHeight,
      vx: (rand() - 0.5) * 0.5,
      vy: (rand() - 0.5) * 0.5,
      size: rand() * 2.2 + 0.8,
      color: i % 3 === 0 ? violet : i % 3 === 1 ? cyan : '#ffffff',
      pulse: rand() * Math.PI * 2,
      pulseSpeed: rand() * 0.03 + 0.01,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        n.pulse += n.pulseSpeed
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
        const alpha = (Math.sin(n.pulse) * 0.3 + 0.7) * (isDark ? 0.7 : 0.35)
        ctx.globalAlpha = alpha
        ctx.fillStyle = n.color
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = alpha * 0.25
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.size * 3, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.lineWidth = 0.5
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.globalAlpha = (1 - dist / 120) * 0.18 * (isDark ? 1 : 0.5)
            const grad = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y,
            )
            grad.addColorStop(0, nodes[i].color)
            grad.addColorStop(1, nodes[j].color)
            ctx.strokeStyle = grad
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [violet, cyan, isDark])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.8,
      }}
    />
  )
}

/* ─────────────────────────────────────────────
   DNA HELIX
───────────────────────────────────────────── */
function DNAHelix({
  violet,
  cyan,
  side,
}: {
  violet: string
  cyan: string
  side: 'left' | 'right'
}) {
  const points = 18
  const spacing = 28
  const amp = 14
  const w = amp * 2 + 20
  const h = points * spacing

  return (
    <div
      style={{
        position: 'absolute',
        [side]: 'clamp(8px, 3vw, 36px)',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }}
    >
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <defs>
          <filter id={`dnaGlow${side}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[0, 1].map((strand) => (
          <polyline
            key={strand}
            points={Array.from({ length: points }, (_, i) => {
              const y = i * spacing + spacing / 2
              const phase =
                (i / points) * Math.PI * 3 + (strand === 1 ? Math.PI : 0)
              const x = amp + 10 + Math.sin(phase) * amp
              return `${x},${y}`
            }).join(' ')}
            fill="none"
            stroke={strand === 0 ? violet : cyan}
            strokeWidth="1.5"
            opacity="0.45"
          />
        ))}
        {Array.from({ length: points }, (_, i) => {
          const y = i * spacing + spacing / 2
          const phase1 = (i / points) * Math.PI * 3
          const phase2 = phase1 + Math.PI
          const x1 = amp + 10 + Math.sin(phase1) * amp
          const x2 = amp + 10 + Math.sin(phase2) * amp
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke={`${violet}60`}
                strokeWidth="0.8"
              />
              <motion.circle
                cx={x1}
                cy={y}
                r={2.5}
                fill={violet}
                filter={`url(#dnaGlow${side})`}
                animate={{ r: [2, 3.5, 2], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, delay: i * 0.08, repeat: Infinity }}
              />
              <motion.circle
                cx={x2}
                cy={y}
                r={2.5}
                fill={cyan}
                filter={`url(#dnaGlow${side})`}
                animate={{ r: [2, 3.5, 2], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  delay: i * 0.08 + 1,
                  repeat: Infinity,
                }}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────
   AUDIO VISUALIZER
───────────────────────────────────────────── */
function AudioViz({
  violet,
  cyan,
  progress,
}: {
  violet: string
  cyan: string
  progress: number
}) {
  const bars = 28
  const [heights, setHeights] = useState<number[]>(() =>
    Array.from({ length: bars }, (_, i) => Math.sin(i) * 0.5 + 0.5),
  )

  useEffect(() => {
    const id = setInterval(() => {
      setHeights((prev) =>
        prev.map((h, i) => {
          const base = Math.sin(Date.now() / 280 + i * 0.55) * 0.35 + 0.55
          return base * 0.55 + h * 0.45
        }),
      )
    }, 55)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 2,
        height: 28,
        opacity: Math.min(progress * 1.2, 0.75),
      }}
    >
      {heights.map((h, i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: `${Math.max(12, h * 100)}%`,
            borderRadius: 2,
            background: `linear-gradient(180deg, ${cyan}, ${violet})`,
            transition: 'height 0.055s ease',
            boxShadow: `0 0 4px ${violet}55`,
          }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   HOLOGRAPHIC SHARDS
───────────────────────────────────────────── */
function HoloShards({
  violet,
  cyan,
  isDark,
}: {
  violet: string
  cyan: string
  isDark: boolean
}) {
  const shards = [
    {
      x: '7%',
      y: '10%',
      size: 42,
      rotation: 25,
      color: violet,
      delay: 0,
      dur: 22,
    },
    {
      x: '87%',
      y: '7%',
      size: 30,
      rotation: -40,
      color: cyan,
      delay: 0.3,
      dur: 18,
    },
    {
      x: '4%',
      y: '78%',
      size: 34,
      rotation: 55,
      color: cyan,
      delay: 0.6,
      dur: 25,
    },
    {
      x: '91%',
      y: '76%',
      size: 26,
      rotation: -20,
      color: violet,
      delay: 0.15,
      dur: 20,
    },
    {
      x: '14%',
      y: '46%',
      size: 20,
      rotation: 70,
      color: violet,
      delay: 0.45,
      dur: 28,
    },
    {
      x: '84%',
      y: '44%',
      size: 24,
      rotation: -65,
      color: cyan,
      delay: 0.75,
      dur: 16,
    },
    {
      x: '50%',
      y: '5%',
      size: 16,
      rotation: 15,
      color: violet,
      delay: 0.9,
      dur: 30,
    },
    {
      x: '50%',
      y: '88%',
      size: 14,
      rotation: -35,
      color: cyan,
      delay: 1.1,
      dur: 24,
    },
  ]
  return (
    <>
      {shards.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: s.rotation - 30 }}
          animate={{
            opacity: [
              0,
              isDark ? 0.45 : 0.22,
              isDark ? 0.28 : 0.14,
              isDark ? 0.45 : 0.22,
            ],
            scale: [0, 1.1, 0.95, 1],
            rotate: [s.rotation - 30, s.rotation + 5, s.rotation],
          }}
          transition={{
            delay: s.delay + 0.4,
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.5, 0.75, 1],
          }}
          style={{
            position: 'absolute',
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            pointerEvents: 'none',
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: s.dur, repeat: Infinity, ease: 'linear' }}
            style={{ width: '100%', height: '100%' }}
          >
            <svg width={s.size} height={s.size} viewBox="0 0 40 40">
              <polygon
                points="20,2 38,38 2,38"
                fill={`${s.color}${isDark ? '18' : '0e'}`}
                stroke={s.color}
                strokeWidth="1"
                opacity="0.8"
              />
              <polygon
                points="20,8 32,32 8,32"
                fill="none"
                stroke={s.color}
                strokeWidth="0.5"
                opacity="0.4"
              />
            </svg>
          </motion.div>
        </motion.div>
      ))}
    </>
  )
}

/* ─────────────────────────────────────────────
   SCAN LINES
───────────────────────────────────────────── */
function ScanLines({ isDark }: { isDark: boolean }) {
  return (
    <>
      <motion.div
        animate={{ y: ['-5%', '110%'] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 1.5,
        }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 3,
          top: 0,
          background: `linear-gradient(180deg, transparent, ${isDark ? 'rgba(124,92,252,0.35)' : 'rgba(109,68,248,0.18)'}, transparent)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${isDark ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.025)'} 3px, ${isDark ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.025)'} 4px)`,
        }}
      />
    </>
  )
}

/* ─────────────────────────────────────────────
   FLOATING CODE TOKENS
───────────────────────────────────────────── */
const CODE_TOKENS = [
  'const vivek = {',
  'skills: [...],',
  'passion: true,',
  'await deploy()',
  'git push origin',
  'npm run build',
  'type Safe = 💯',
  'useEffect(()=>{',
  '> node server.js',
  'λ functional',
  '01101100',
  '// TODO: sleep',
]

function FloatingTokens({
  violet,
  cyan,
  isDark,
}: {
  violet: string
  cyan: string
  isDark: boolean
}) {
  const tokens = CODE_TOKENS.map((t, i) => ({
    text: t,
    idx: i,
    x: seededRand(i * 7)() * 82 + 2,
    y: seededRand(i * 13)() * 78 + 5,
    delay: i * 0.2,
    color: i % 2 === 0 ? violet : cyan,
  }))
  return (
    <>
      {tokens.map((tok) => (
        <motion.div
          key={tok.idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, isDark ? 0.2 : 0.12, isDark ? 0.16 : 0.08, 0],
            y: [20, 0, -10, -28],
          }}
          transition={{
            delay: tok.delay,
            duration: 5.5 + tok.idx * 0.25,
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
          style={{
            position: 'absolute',
            left: `${tok.x}%`,
            top: `${tok.y}%`,
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(8px, 1.1vw, 10px)',
            color: tok.color,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            letterSpacing: '0.04em',
          }}
        >
          {tok.text}
        </motion.div>
      ))}
    </>
  )
}

/* ─────────────────────────────────────────────
   AVATAR MONOGRAM — avatar inside progress ring, CSS bob only
───────────────────────────────────────────── */
function AvatarMonogram({
  violet,
  cyan,
  progress,
  isDark,
}: {
  violet: string
  cyan: string
  progress: number
  isDark: boolean
}) {
  const size = 200
  const r2 = 76
  const circumference = 2 * Math.PI * r2
  const dash = circumference * progress
  const dotAngle = -Math.PI / 2 + 2 * Math.PI * progress

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Inject CSS keyframe once */}
      <style>{`
        @keyframes loaderBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      {/* Outer pulse halo */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.32, 0.12] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: -28,
          borderRadius: '50%',
          border: `1px solid ${violet}28`,
          boxShadow: `0 0 40px ${violet}18`,
        }}
      />
      {/* Ring 1 — slow CCW */}
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', inset: -4 }}
      >
        <svg
          width={size + 8}
          height={size + 8}
          viewBox={`0 0 ${size + 8} ${size + 8}`}
        >
          <circle
            cx={(size + 8) / 2}
            cy={(size + 8) / 2}
            r={(size + 8) / 2 - 4}
            fill="none"
            stroke={`${violet}40`}
            strokeWidth="1.5"
            strokeDasharray="3 7"
          />
        </svg>
      </motion.div>
      {/* Ring 2 — fast CW */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', inset: 8 }}
      >
        <svg
          width={size - 16}
          height={size - 16}
          viewBox={`0 0 ${size - 16} ${size - 16}`}
        >
          <circle
            cx={(size - 16) / 2}
            cy={(size - 16) / 2}
            r={(size - 16) / 2 - 2}
            fill="none"
            stroke={`${cyan}28`}
            strokeWidth="1"
            strokeDasharray="2 10"
          />
        </svg>
      </motion.div>
      {/* Progress arc */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
      >
        <defs>
          <linearGradient id="arcGradVB" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={violet} />
            <stop offset="50%" stopColor={cyan} />
            <stop offset="100%" stopColor={violet} />
          </linearGradient>
          <filter id="arcGlowVB">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r2}
          fill="none"
          stroke={`${violet}12`}
          strokeWidth="5"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r2}
          fill="none"
          stroke="url(#arcGradVB)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          filter="url(#arcGlowVB)"
          style={{ transition: 'stroke-dasharray 0.04s linear' }}
        />
        {progress > 0.02 && (
          <>
            <circle
              cx={size / 2 + r2 * Math.cos(dotAngle)}
              cy={size / 2 + r2 * Math.sin(dotAngle)}
              r="8"
              fill={cyan}
              opacity="0.2"
              filter="url(#arcGlowVB)"
            />
            <circle
              cx={size / 2 + r2 * Math.cos(dotAngle)}
              cy={size / 2 + r2 * Math.sin(dotAngle)}
              r="4.5"
              fill={cyan}
              filter="url(#arcGlowVB)"
            />
          </>
        )}
      </svg>

      {/* Inner circle — avatar with CSS-only bob */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0, rotateY: -90 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ delay: 0.2, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          inset: 22,
          borderRadius: '50%',
          background: isDark
            ? `radial-gradient(circle at 35% 35%, ${violet}55, ${cyan}33)`
            : `radial-gradient(circle at 35% 35%, ${violet}40, ${cyan}28)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 55px ${violet}80, 0 0 110px ${violet}28, inset 0 2px 2px rgba(255,255,255,0.35)`,
          overflow: 'hidden',
        }}
      >
        {/* Rotating shimmer overlay */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `conic-gradient(from 0deg, transparent 50%, rgba(255,255,255,0.18) 75%, transparent 100%)`,
            zIndex: 2,
          }}
        />
        {/* Pulse inner glow */}
        <motion.div
          animate={{ scale: [0.6, 1.4], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${cyan}55 0%, transparent 65%)`,
            zIndex: 1,
          }}
        />
        {/* Avatar — CSS bob, no JS motion values */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            width: '78%',
            height: '92%',
            animation: 'loaderBob 2.8s ease-in-out infinite',
          }}
        >
          <CartoonAvatar isDark={isDark} />
        </div>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   GLITCH NAME
───────────────────────────────────────────── */
function GlitchName({
  name,
  violet,
  cyan,
  textColor,
}: {
  name: string
  violet: string
  cyan: string
  textColor: string
}) {
  const [glitchOn, setGlitchOn] = useState(false)
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const burst = () => {
      let count = 0
      const flicker = () => {
        setGlitchOn(true)
        setFrame((f) => f + 1)
        count++
        t = setTimeout(
          () => {
            setGlitchOn(false)
            if (count < 4 + Math.floor(Math.random() * 4)) {
              t = setTimeout(flicker, 40 + Math.random() * 60)
            } else {
              t = setTimeout(burst, 900 + Math.random() * 1300)
            }
          },
          50 + Math.random() * 80,
        )
      }
      flicker()
    }
    t = setTimeout(burst, 600)
    return () => clearTimeout(t)
  }, [])

  const clips = [
    'polygon(0 0%, 100% 0%, 100% 28%, 0 28%)',
    'polygon(0 35%, 100% 35%, 100% 58%, 0 58%)',
    'polygon(0 65%, 100% 65%, 100% 85%, 0 85%)',
    'polygon(0 10%, 100% 10%, 100% 45%, 0 45%)',
  ]
  const offsets = [3, -3, 4, -2, 5, -4]

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 4,
          left: 4,
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 800,
          fontSize: 'clamp(28px, 5vw, 54px)',
          color: violet,
          opacity: 0.15,
          filter: 'blur(12px)',
          letterSpacing: '-0.04em',
          pointerEvents: 'none',
        }}
      >
        {name}
      </span>
      <motion.span
        initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.25, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'block',
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 800,
          fontSize: 'clamp(28px, 5vw, 54px)',
          color: textColor,
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        {name}
      </motion.span>
      {glitchOn &&
        [0, 1].map((layer) => (
          <span
            key={layer}
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: offsets[(frame + layer * 2) % offsets.length],
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 800,
              fontSize: 'clamp(28px, 5vw, 54px)',
              color: layer === 0 ? violet : cyan,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              clipPath: clips[(frame + layer) % clips.length],
              opacity: 0.8,
              pointerEvents: 'none',
              mixBlendMode: 'screen' as const,
            }}
          >
            {name}
          </span>
        ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   TYPEWRITER TAGLINE
───────────────────────────────────────────── */
const TAGLINES = [
  'Full Stack Developer',
  'Security Engineer',
  'AI / ML Builder',
  'Open Source Contributor',
  'Problem Architect',
]

function TypewriterTagline({
  dimmed,
  violet,
}: {
  dimmed: string
  violet: string
}) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = TAGLINES[idx]
    let t: ReturnType<typeof setTimeout>
    if (!deleting) {
      if (text.length < target.length)
        t = setTimeout(() => setText(target.slice(0, text.length + 1)), 48)
      else t = setTimeout(() => setDeleting(true), 1600)
    } else {
      if (text.length > 0) t = setTimeout(() => setText(text.slice(0, -1)), 28)
      else {
        setDeleting(false)
        setIdx((i) => (i + 1) % TAGLINES.length)
      }
    }
    return () => clearTimeout(t)
  }, [text, deleting, idx])

  return (
    <div
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 'clamp(10px, 1.6vw, 13px)',
        color: dimmed,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        height: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <span style={{ color: violet, opacity: 0.7 }}>{'</'}</span>
      <span>{text}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.65, repeat: Infinity }}
        style={{
          display: 'inline-block',
          width: 2,
          height: '0.9em',
          background: violet,
          verticalAlign: 'text-bottom',
        }}
      />
      <span style={{ color: violet, opacity: 0.7 }}>{'>'}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────
   STATUS PANEL
───────────────────────────────────────────── */
const STATUS_LOG = [
  { code: '200', label: 'INIT', text: 'Booting systems…', color: '#22d3ee' },
  { code: '201', label: 'AUTH', text: 'Identity verified…', color: '#7c5cfc' },
  { code: '202', label: 'LOAD', text: 'Fetching portfolio…', color: '#22d3ee' },
  { code: '203', label: 'COMP', text: 'Compiling projects…', color: '#7c5cfc' },
  { code: '204', label: 'LINK', text: 'Resolving modules…', color: '#22d3ee' },
  { code: '200', label: 'DONE', text: 'Launch ready. 🚀', color: '#10b981' },
]

function StatusPanel({
  progress,
  isDark,
  violet,
  cyan,
}: {
  progress: number
  isDark: boolean
  violet: string
  cyan: string
}) {
  const visibleCount = Math.max(1, Math.ceil(progress * STATUS_LOG.length))
  const entries = STATUS_LOG.slice(0, visibleCount)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        width: '100%',
        maxHeight: 88,
        overflow: 'hidden',
      }}
    >
      {entries.map((entry, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(8px, 1.2vw, 10px)',
          }}
        >
          <span
            style={{
              color: entry.color,
              opacity: 0.55,
              letterSpacing: '0.1em',
              fontSize: 8,
            }}
          >
            {entry.code}
          </span>
          <span
            style={{
              color: entry.color,
              border: `1px solid ${entry.color}35`,
              padding: '1px 5px',
              borderRadius: 3,
              fontSize: 8,
              letterSpacing: '0.12em',
            }}
          >
            {entry.label}
          </span>
          <span
            style={{
              color: isDark ? 'rgba(240,239,248,0.38)' : 'rgba(15,14,26,0.42)',
              letterSpacing: '0.05em',
            }}
          >
            {entry.text}
          </span>
          {i === entries.length - 1 && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ color: entry.color, fontSize: 10 }}
            >
              ▌
            </motion.span>
          )}
        </motion.div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   PROGRESS BAR
───────────────────────────────────────────── */
function ProgressBar({
  progress,
  violet,
  cyan,
  isDark,
}: {
  progress: number
  violet: string
  cyan: string
  isDark: boolean
}) {
  const pct = Math.round(progress * 100)
  const segments = 24

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <div style={{ display: 'flex', gap: 2 }}>
        {Array.from({ length: segments }, (_, i) => {
          const filled = progress * segments >= i + 1
          const partial = progress * segments > i && progress * segments < i + 1
          const pFill = partial ? (progress * segments - i) * 100 : 0
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: 5,
                borderRadius: 2,
                overflow: 'hidden',
                background: isDark
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(0,0,0,0.07)',
                position: 'relative',
              }}
            >
              {(filled || partial) && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: filled ? '100%' : `${pFill}%` }}
                  transition={{ duration: 0.06 }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    background: `linear-gradient(90deg, ${violet}, ${cyan})`,
                    boxShadow: `0 0 6px ${violet}80`,
                    borderRadius: 2,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <AudioViz violet={violet} cyan={cyan} progress={progress} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 'clamp(18px, 2.8vw, 26px)',
              fontWeight: 700,
              color: pct >= 100 ? cyan : violet,
              textShadow: `0 0 20px ${pct >= 100 ? cyan : violet}`,
              letterSpacing: '-0.04em',
            }}
          >
            {pct}
          </span>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            }}
          >
            %
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   CORNER BRACKETS
───────────────────────────────────────────── */
function CornerBrackets({
  violet,
  cyan,
  progress,
}: {
  violet: string
  cyan: string
  progress: number
}) {
  const corners = [
    { top: 16, left: 16, isTop: true, isLeft: true },
    { top: 16, right: 16, isTop: true, isLeft: false },
    { bottom: 16, left: 16, isTop: false, isLeft: true },
    { bottom: 16, right: 16, isTop: false, isLeft: false },
  ] as const

  return (
    <>
      {corners.map((c, i) => {
        const color = i % 2 === 0 ? violet : cyan
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.65, scale: 1 }}
            transition={{
              delay: i * 0.12,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: 'absolute',
              ...c,
              width: 32,
              height: 32,
              pointerEvents: 'none',
              borderTop: c.isTop ? `2px solid ${color}` : 'none',
              borderBottom: !c.isTop ? `2px solid ${color}` : 'none',
              borderLeft: c.isLeft ? `2px solid ${color}` : 'none',
              borderRight: !c.isLeft ? `2px solid ${color}` : 'none',
            }}
          >
            {i === 0 && (
              <motion.div
                style={{
                  position: 'absolute',
                  top: -4,
                  left: -4,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: violet,
                  boxShadow: `0 0 12px ${violet}, 0 0 24px ${violet}50`,
                  opacity: progress,
                }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>
        )
      })}
    </>
  )
}

/* ─────────────────────────────────────────────
   SIDE METRICS HUD
───────────────────────────────────────────── */
function SideMetrics({
  violet,
  cyan,
  isDark,
  progress,
}: {
  violet: string
  cyan: string
  isDark: boolean
  progress: number
}) {
  const metrics = [
    { label: 'PROJECTS', value: Math.floor(progress * 12) },
    { label: 'SKILLS', value: Math.floor(progress * 20) },
    { label: 'YRS EXP', value: +(progress * 4).toFixed(1) },
  ]
  return (
    <>
      {/* Left vertical line */}
      <div
        style={{
          position: 'absolute',
          left: 'clamp(10px, 4vw, 44px)',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          style={{
            width: 1,
            height: 100,
            transformOrigin: 'top',
            background: `linear-gradient(180deg, transparent, ${violet}, transparent)`,
            opacity: 0.45,
          }}
          animate={{ scaleY: progress }}
        />
        {['SYS', 'NET', 'APP'].map((l, i) => (
          <motion.span
            key={l}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.38 }}
            transition={{ delay: 0.6 + i * 0.15 }}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 7,
              color: violet,
              letterSpacing: '0.2em',
              writingMode: 'vertical-rl' as const,
              textTransform: 'uppercase' as const,
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>
      {/* Right metrics */}
      <div
        style={{
          position: 'absolute',
          right: 'clamp(10px, 4vw, 44px)',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          pointerEvents: 'none',
          alignItems: 'flex-end',
        }}
      >
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.2 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 2,
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 7,
                color: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
              }}
            >
              {m.label}
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 15,
                fontWeight: 700,
                color: i % 2 === 0 ? cyan : violet,
                textShadow: `0 0 10px ${i % 2 === 0 ? cyan : violet}`,
              }}
            >
              {m.value}
            </span>
          </motion.div>
        ))}
      </div>
    </>
  )
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export function LogoLoader({
  visible,
  onDone,
}: {
  visible: boolean
  onDone: () => void
}) {
  const { T, isDark } = usePortfolioTheme()
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  useEffect(() => {
    if (!visible) {
      setProgress(0)
      return
    }
    setProgress(0)
    startRef.current = 0
    const DURATION = 2600

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now
      const elapsed = now - startRef.current
      const raw = Math.min(elapsed / DURATION, 1)
      let p: number
      if (raw < 0.4) p = raw * 1.5
      else if (raw < 0.8) p = 0.6 + (raw - 0.4) * 0.5
      else p = 0.8 + (raw - 0.8) * 1.0
      p = Math.min(p, 1)
      setProgress(p)
      if (raw < 1) rafRef.current = requestAnimationFrame(tick)
      else setTimeout(onDone, 520)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [visible]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="logo-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4 } }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: 'blur(22px) saturate(200%)',
            transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: isDark
              ? 'radial-gradient(ellipse at 20% 30%, #0d0720 0%, #04040a 55%, #070812 100%)'
              : 'radial-gradient(ellipse at 20% 30%, #eee8f9 0%, #f5f1ec 55%, #f0ecf8 100%)',
          }}
        >
          {/* Layered backgrounds */}
          <AuroraLayer violet={T.violet} cyan={T.cyan} isDark={isDark} />
          <NeuralCanvas violet={T.violet} cyan={T.cyan} isDark={isDark} />
          <FloatingTokens violet={T.violet} cyan={T.cyan} isDark={isDark} />
          <HoloShards violet={T.violet} cyan={T.cyan} isDark={isDark} />
          <ScanLines isDark={isDark} />

          {/* DNA Helixes on sm+ */}
          <div className="hidden sm:block">
            <DNAHelix violet={T.violet} cyan={T.cyan} side="left" />
            <DNAHelix violet={T.violet} cyan={T.cyan} side="right" />
          </div>

          {/* Corner brackets */}
          <CornerBrackets violet={T.violet} cyan={T.cyan} progress={progress} />

          {/* Side HUD */}
          <SideMetrics
            violet={T.violet}
            cyan={T.cyan}
            isDark={isDark}
            progress={progress}
          />

          {/* ── MAIN CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 44, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'clamp(14px, 2.4vw, 24px)',
              padding: 'clamp(22px, 4vw, 42px) clamp(18px, 5vw, 54px)',
              borderRadius: 28,
              background: isDark
                ? 'rgba(255,255,255,0.025)'
                : 'rgba(255,255,255,0.68)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(109,68,248,0.12)'}`,
              backdropFilter: 'blur(32px) saturate(160%)',
              boxShadow: isDark
                ? `0 40px 100px rgba(0,0,0,0.72), 0 0 100px ${T.violet}15, inset 0 1px 0 rgba(255,255,255,0.05)`
                : `0 40px 100px rgba(0,0,0,0.1), 0 0 80px ${T.violet}10, inset 0 1px 0 rgba(255,255,255,0.9)`,
              maxWidth: 'min(500px, 88vw)',
              width: '100%',
            }}
          >
            {/* Scan sweep over card */}
            <motion.div
              animate={{ x: ['-120%', '220%'] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 1.2,
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '35%',
                height: '100%',
                background: `linear-gradient(90deg, transparent, ${T.violet}06, ${T.cyan}04, transparent)`,
                pointerEvents: 'none',
                borderRadius: 28,
              }}
            />

            {/* Avatar monogram (avatar inside the progress ring) */}
            <AvatarMonogram
              violet={T.violet}
              cyan={T.cyan}
              progress={progress}
              isDark={isDark}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <GlitchName
                name="Vivek Bukka"
                violet={T.violet}
                cyan={T.cyan}
                textColor={T.text}
              />
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  width: 'clamp(70px, 14vw, 110px)',
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${T.violet}, ${T.cyan}, transparent)`,
                }}
              />
              <TypewriterTagline dimmed={T.dimmed} violet={T.violet} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ width: '100%' }}
            >
              <StatusPanel
                progress={progress}
                isDark={isDark}
                violet={T.violet}
                cyan={T.cyan}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ width: '100%' }}
            >
              <ProgressBar
                progress={progress}
                violet={T.violet}
                cyan={T.cyan}
                isDark={isDark}
              />
            </motion.div>
          </motion.div>

          {/* Bottom signature */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.28, y: 0 }}
            transition={{ delay: 1.1 }}
            style={{
              position: 'absolute',
              bottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Space Mono', monospace",
              fontSize: 'clamp(7px, 1vw, 9px)',
              color: T.dimmed,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            <motion.span
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ▸
            </motion.span>
            <span>Vivek Bukka · Portfolio 2025 · v4.0.0</span>
            <motion.span
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              ◂
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
