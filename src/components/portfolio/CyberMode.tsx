import { useEffect, useRef, useState, useCallback } from 'react'
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
} from 'motion/react'
import {
  OWNER,
  PROJECTS,
  SKILL_CATEGORIES,
  EDUCATION_TIMELINE,
  CERTIFICATIONS,
  ACHIEVEMENTS,
  INTERNSHIPS,
  RADAR_SKILLS,
  ABOUT_STATS,
} from './data'

// ─── THEME TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg: '#000900',
  bgAlt: '#010f01',
  green: '#00ff41',
  greenDim: 'rgba(0,255,65,0.55)',
  greenFaint: 'rgba(0,255,65,0.2)',
  greenGhost: 'rgba(0,255,65,0.07)',
  cyan: '#00ffff',
  red: '#ff0040',
  yellow: '#ffcc00',
  orange: '#ff7700',
  white: '#ffffff',
  mono: "'Share Tech Mono', monospace",
}

// ─── SCANLINE OVERLAY ────────────────────────────────────────────────────────
function ScanlineOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.035]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.15) 2px, rgba(0,255,65,0.15) 4px)',
        mixBlendMode: 'overlay',
      }}
    />
  )
}

// ─── VIGNETTE ────────────────────────────────────────────────────────────────
function Vignette() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9996]"
      style={{
        background:
          'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)',
      }}
    />
  )
}

// ─── FLICKER OVERLAY ─────────────────────────────────────────────────────────
function FlickerOverlay() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const flicker = () => {
      setVisible(true)
      setTimeout(() => setVisible(false), 60 + Math.random() * 80)
    }
    const iv = setInterval(flicker, 6000 + Math.random() * 4000)
    return () => clearInterval(iv)
  }, [])
  if (!visible) return null
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9997]"
      style={{ background: 'rgba(0,255,65,0.02)', mixBlendMode: 'screen' }}
    />
  )
}

// ─── MATRIX RAIN CANVAS ──────────────────────────────────────────────────────
function MatrixRain({ opacity = 0.18 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

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

    const fontSize = 13
    const cols = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(cols).fill(1)
    const chars =
      '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOP@#$%^&*()'

    const draw = () => {
      ctx.fillStyle = 'rgba(0,13,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const isBright = Math.random() > 0.95
        ctx.fillStyle = isBright ? '#ffffff' : '#00ff41'
        ctx.font = `${isBright ? fontSize + 1 : fontSize}px 'Share Tech Mono', monospace`
        ctx.globalAlpha = Math.random() * 0.5 + 0.1
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)
        ctx.globalAlpha = 1
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
          drops[i] = 0
        drops[i]++
      }
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity, zIndex: 0 }}
    />
  )
}

// ─── ANIMATED GRID BACKGROUND ────────────────────────────────────────────────
function AnimatedGrid() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 8, repeat: Infinity }}
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,255,65,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.022) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }}
    />
  )
}

// ─── HEXAGON PATTERN ─────────────────────────────────────────────────────────
function HexPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.025]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="hex"
          x="0"
          y="0"
          width="56"
          height="100"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(0.8)"
        >
          <polygon
            points="28,2 54,16 54,44 28,58 2,44 2,16"
            fill="none"
            stroke="#00ff41"
            strokeWidth="0.8"
          />
          <polygon
            points="28,60 54,74 54,102 28,116 2,102 2,74"
            fill="none"
            stroke="#00ff41"
            strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  )
}

// ─── CORNER BRACKETS ─────────────────────────────────────────────────────────
function CornerBrackets({ color = 'rgba(0,255,65,0.25)' }: { color?: string }) {
  return (
    <>
      {[
        'top-0 left-0 border-t-2 border-l-2',
        'top-0 right-0 border-t-2 border-r-2',
        'bottom-0 left-0 border-b-2 border-l-2',
        'bottom-0 right-0 border-b-2 border-r-2',
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute w-6 h-6 ${cls}`}
          style={{ borderColor: color }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35 }}
        />
      ))}
    </>
  )
}

// ─── SCROLL PROGRESS BAR ─────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #00ff41, #00ffff, #00ff41)',
        boxShadow: '0 0 10px rgba(0,255,65,0.9)',
      }}
    />
  )
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
function CyberHeader({ number, title }: { number: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-2"
    >
      <div className="flex items-center gap-3 mb-3">
        <span style={{ color: C.greenFaint, fontFamily: C.mono, fontSize: 10 }}>
          [{number}]
        </span>
        <div
          className="h-px flex-1"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,255,65,0.4), transparent)',
            maxWidth: 160,
          }}
        />
        <h2
          style={{
            color: C.green,
            fontFamily: C.mono,
            fontSize: 'clamp(18px, 2.8vw, 26px)',
            letterSpacing: '0.12em',
            textShadow: '0 0 24px rgba(0,255,65,0.45)',
          }}
        >
          {title}
        </h2>
        <div
          className="h-px flex-1"
          style={{
            background:
              'linear-gradient(270deg, rgba(0,255,65,0.4), transparent)',
            maxWidth: 160,
          }}
        />
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ color: C.green, fontSize: 12 }}
        >
          █
        </motion.span>
      </div>
      <div
        className="h-px w-full"
        style={{ background: 'rgba(0,255,65,0.06)' }}
      />
    </motion.div>
  )
}

// ─── BOOT SCRIPT ─────────────────────────────────────────────────────────────
const BOOT_SCRIPT: Array<{
  type: 'input' | 'output' | 'blank' | 'delay' | 'system'
  text?: string
  delay?: number
  charDelay?: number
}> = [
  { type: 'blank' },
  {
    type: 'system',
    text: '[ KERNEL ] Booting secure environment v2.4.1...',
    charDelay: 16,
  },
  { type: 'delay', delay: 150 },
  {
    type: 'system',
    text: '[ CRYPTO ] Loading AES-256-GCM cipher modules... [OK]',
    charDelay: 13,
  },
  {
    type: 'system',
    text: '[ NETWORK ] Establishing encrypted tunnel... [OK]',
    charDelay: 13,
  },
  {
    type: 'system',
    text: '[ MEMORY ] Allocating secure heap... [OK]',
    charDelay: 13,
  },
  {
    type: 'system',
    text: '[ FIREWALL ] Activating perimeter defense... [OK]',
    charDelay: 13,
  },
  {
    type: 'system',
    text: '[ IDENTITY ] Verifying certificates... [OK]',
    charDelay: 13,
  },
  { type: 'blank' },
  { type: 'delay', delay: 300 },
  { type: 'output', text: '> initializing system...', charDelay: 36 },
  { type: 'blank' },
  { type: 'delay', delay: 350 },
  { type: 'input', text: '> whoami', charDelay: 95 },
  { type: 'delay', delay: 200 },
  { type: 'output', text: OWNER.name, charDelay: 55 },
  { type: 'blank' },
  { type: 'delay', delay: 300 },
  { type: 'input', text: '> role', charDelay: 95 },
  { type: 'delay', delay: 200 },
  { type: 'output', text: 'Cybersecurity Student', charDelay: 38 },
  { type: 'output', text: 'Full Stack Developer', charDelay: 38 },
  { type: 'output', text: 'AI Builder', charDelay: 52 },
  { type: 'blank' },
  { type: 'delay', delay: 300 },
  { type: 'input', text: '> status', charDelay: 95 },
  { type: 'delay', delay: 200 },
  {
    type: 'output',
    text: 'Building secure & intelligent systems...',
    charDelay: 26,
  },
  { type: 'blank' },
  { type: 'delay', delay: 400 },
]

interface BootLine {
  id: number
  type: 'input' | 'output' | 'blank' | 'system'
  text: string
  done: boolean
  chars: number
}

const LOAD_BARS = [
  { label: 'KERNEL_MODULES', speed: 1.2 },
  { label: 'CRYPTO_ENGINE', speed: 1.05 },
  { label: 'NETWORK_STACK', speed: 0.92 },
  { label: 'SECURE_ENV', speed: 1.0 },
  { label: 'IDENTITY_VAULT', speed: 0.88 },
]

// ─── BOOT BADGE ──────────────────────────────────────────────────────────────
function BootBadge() {
  const lines = [
    {
      t: '┌─────────────────────────────────────────┐',
      c: 'rgba(0,255,65,0.5)',
    },
    { t: '│  ██╗   ██╗██╗██╗   ██╗███████╗██╗  ██╗  │', c: '#00ff41' },
    { t: '│  ██║   ██║██║██║   ██║██╔════╝██║ ██╔╝  │', c: '#00ff41' },
    { t: '│  ██║   ██║██║██║   ██║█████╗  █████╔╝   │', c: '#00ff41' },
    {
      t: '│  ╚██╗ ██╔╝██║╚██╗ ██╔╝██╔══╝  ██╔═██╗   │',
      c: 'rgba(0,255,65,0.8)',
    },
    {
      t: '│   ╚████╔╝ ██║ ╚████╔╝ ███████╗██║  ██╗  │',
      c: 'rgba(0,255,65,0.8)',
    },
    {
      t: '│    ╚═══╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝  │',
      c: 'rgba(0,255,65,0.4)',
    },
    {
      t: '│                                          │',
      c: 'rgba(0,255,65,0.1)',
    },
    { t: '│  ██████╗ ██╗   ██╗██╗  ██╗██╗  ██╗  █╗  │', c: '#00ff41' },
    { t: '│  ██╔══██╗██║   ██║██║ ██╔╝██║ ██╔╝  ██║  │', c: '#00ff41' },
    { t: '│  ██████╔╝██║   ██║█████╔╝ █████╔╝   ██║  │', c: '#00ff41' },
    {
      t: '│  ██╔══██╗██║   ██║██╔═██╗ ██╔═██╗   ╚═╝  │',
      c: 'rgba(0,255,65,0.8)',
    },
    {
      t: '│  ██████╔╝╚██████╔╝██║  ██╗██║  ██╗   █╗  │',
      c: 'rgba(0,255,65,0.8)',
    },
    {
      t: '│  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚╝  │',
      c: 'rgba(0,255,65,0.4)',
    },
    {
      t: '└─────────────────────────────────────────┘',
      c: 'rgba(0,255,65,0.5)',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="flex flex-col items-center"
      style={{ fontFamily: "'Share Tech Mono', monospace" }}
    >
      {/* Glow layer behind the box */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            filter: 'blur(22px)',
            background:
              'radial-gradient(ellipse at center, rgba(0,255,65,0.4) 0%, transparent 70%)',
            borderRadius: 8,
          }}
        />

        <pre
          style={{
            fontSize: 10,
            lineHeight: 1.4,
            letterSpacing: 0,
            margin: 0,
            padding: 0,
            fontFamily: "'Share Tech Mono', monospace",
            textAlign: 'left',
            userSelect: 'none',
          }}
        >
          {lines.map((row, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
              style={{ color: row.c, display: 'block' }}
            >
              {row.t}
            </motion.span>
          ))}
        </pre>
      </div>

      {/* SECURE_BOOT label row */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="flex flex-col items-center gap-1 mt-1"
      >
        {/* Separator */}
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.5, transformOrigin: 'right' }}
            style={{
              width: 60,
              height: 1,
              background:
                'linear-gradient(90deg, transparent, rgba(0,255,65,0.4))',
            }}
          />
          <motion.span
            style={{ color: C.cyan, fontSize: 9, fontFamily: C.mono }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          >
            ◈
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.5, transformOrigin: 'left' }}
            style={{
              width: 60,
              height: 1,
              background:
                'linear-gradient(90deg, rgba(0,255,65,0.4), transparent)',
            }}
          />
        </div>

        {/* SECURE_BOOT */}
        <motion.span
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            fontFamily: C.mono,
            fontSize: 12,
            letterSpacing: '0.3em',
            color: C.green,
            textShadow:
              '0 0 16px rgba(0,255,65,0.8), 0 0 36px rgba(0,255,65,0.3)',
          }}
        >
          SECURE_BOOT
        </motion.span>

        {/* Version line */}
        <div
          className="flex items-center gap-1.5"
          style={{ fontFamily: C.mono, fontSize: 9 }}
        >
          <span
            style={{ color: 'rgba(0,255,65,0.35)', letterSpacing: '0.15em' }}
          >
            v2.4.1
          </span>
          <motion.span
            style={{ color: C.cyan }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.85, repeat: Infinity }}
          >
            ▮
          </motion.span>
          <motion.span
            style={{ color: 'rgba(0,255,65,0.5)', letterSpacing: '0.1em' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            INITIALIZING
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  )
}

function BootScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<BootLine[]>([])
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'terminal'>('loading')
  const innerRef = useRef<HTMLDivElement>(null)
  const lineIdRef = useRef(0)

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.scrollTop = innerRef.current.scrollHeight
    }
  }, [lines])

  useEffect(() => {
    if (phase !== 'loading') return
    let val = 0
    const iv = setInterval(() => {
      val += Math.random() * 7 + 2
      if (val >= 100) {
        val = 100
        clearInterval(iv)
        setTimeout(() => setPhase('terminal'), 450)
      }
      setProgress(Math.min(val, 100))
    }, 75)
    return () => clearInterval(iv)
  }, [phase])

  useEffect(() => {
    if (phase !== 'terminal') return
    let cancelled = false
    const run = async () => {
      for (const step of BOOT_SCRIPT) {
        if (cancelled) return
        if (step.type === 'delay') {
          await new Promise((r) => setTimeout(r, step.delay ?? 300))
          continue
        }
        if (step.type === 'blank') {
          const id = lineIdRef.current++
          setLines((prev) => [
            ...prev,
            { id, type: 'blank', text: '', done: true, chars: 0 },
          ])
          await new Promise((r) => setTimeout(r, 60))
          continue
        }
        const id = lineIdRef.current++
        const text = step.text ?? ''
        const charDelay = step.charDelay ?? 40
        const lineType = step.type as 'input' | 'output' | 'system'
        setLines((prev) => [
          ...prev,
          { id, type: lineType, text, done: false, chars: 0 },
        ])
        for (let c = 1; c <= text.length; c++) {
          if (cancelled) return
          await new Promise((r) => setTimeout(r, charDelay))
          setLines((prev) =>
            prev.map((l) => (l.id === id ? { ...l, chars: c } : l)),
          )
        }
        setLines((prev) =>
          prev.map((l) => (l.id === id ? { ...l, done: true } : l)),
        )
        await new Promise((r) => setTimeout(r, 70))
      }
      if (!cancelled) {
        await new Promise((r) => setTimeout(r, 600))
        onDone()
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [phase, onDone])

  const getLineColor = (type: BootLine['type']) => {
    if (type === 'input') return '#39ff14'
    if (type === 'system') return 'rgba(0,220,255,0.7)'
    return 'rgba(0,255,65,0.9)'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] overflow-hidden flex items-center justify-center"
      style={{ background: '#000900' }}
    >
      <MatrixRain opacity={0.06} />
      <ScanlineOverlay />
      <Vignette />

      {/* Corner brackets on the screen edges */}
      <div className="absolute inset-4 pointer-events-none">
        <CornerBrackets color="rgba(0,255,65,0.4)" />
      </div>

      {/* Animated corner pings */}
      {[
        { top: 16, left: 16 },
        { top: 16, right: 16 },
        { bottom: 16, left: 16 },
        { bottom: 16, right: 16 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            ...pos,
            background: C.green,
            boxShadow: `0 0 6px ${C.green}`,
          }}
          animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* ── Main content: badge + terminal stacked ── */}
      <div
        className="relative z-10 flex flex-col items-center gap-4 w-full max-w-lg px-4"
        style={{ fontFamily: C.mono }}
      >
        {/* Badge */}
        <BootBadge />

        {/* Terminal window */}
        <div className="w-full">
          {/* Window chrome */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-t-xl"
            style={{
              background: 'rgba(0,255,65,0.07)',
              border: '1px solid rgba(0,255,65,0.22)',
              borderBottom: 'none',
            }}
          >
            <div className="flex gap-1.5">
              {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: c }}
                />
              ))}
            </div>
            <span
              style={{
                color: 'rgba(0,255,65,0.4)',
                fontSize: 10,
                marginLeft: 8,
              }}
            >
              root@vivek — secure_shell — 120×36
            </span>
            <motion.div
              className="ml-auto w-1.5 h-1.5 rounded-full"
              style={{ background: C.green }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </div>

          {/* Terminal body */}
          <div
            className="rounded-b-xl"
            style={{
              background: '#000d02',
              border: '1px solid rgba(0,255,65,0.22)',
              borderTop: 'none',
            }}
          >
            {phase === 'loading' ? (
              <div className="px-5 py-5 space-y-3.5">
                {LOAD_BARS.map((item, i) => {
                  const pct = Math.min(progress * item.speed, 100)
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex justify-between mb-1">
                        <span
                          style={{
                            color: 'rgba(0,255,65,0.5)',
                            fontSize: 9,
                            letterSpacing: '0.1em',
                          }}
                        >
                          {item.label}
                        </span>
                        <span
                          style={{
                            color: pct >= 100 ? C.cyan : C.green,
                            fontSize: 9,
                          }}
                        >
                          {pct >= 100 ? 'DONE' : `${Math.round(pct)}%`}
                        </span>
                      </div>
                      <div
                        className="h-1 rounded-full"
                        style={{ background: 'rgba(0,255,65,0.07)' }}
                      >
                        <motion.div
                          className="h-full rounded-full relative overflow-hidden"
                          style={{
                            width: `${pct}%`,
                            background:
                              pct >= 100
                                ? 'linear-gradient(90deg, #00ffff, #00ff41)'
                                : 'linear-gradient(90deg, #00ff41, #39ff14)',
                            boxShadow: `0 0 8px rgba(0,255,65,0.6)`,
                            transition: 'width 0.12s ease',
                          }}
                        >
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background:
                                'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                              backgroundSize: '200% 100%',
                            }}
                            animate={{
                              backgroundPosition: ['-200% 0', '200% 0'],
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  )
                })}

                <motion.div
                  className="flex items-center gap-2 mt-1"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: C.green }}
                    animate={{ scale: [1, 1.8, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                  <span
                    style={{
                      color: 'rgba(0,255,65,0.45)',
                      fontSize: 9,
                      letterSpacing: '0.1em',
                    }}
                  >
                    LOADING SECURE ENVIRONMENT...
                  </span>
                  <span style={{ color: 'rgba(0,255,65,0.3)', fontSize: 9 }}>
                    {Math.round(progress)}%
                  </span>
                </motion.div>
              </div>
            ) : (
              <div
                ref={innerRef}
                className="px-5 py-4 overflow-y-auto"
                style={{ height: 240, fontSize: 12.5 }}
              >
                {lines.map((line) => {
                  if (line.type === 'blank')
                    return <div key={line.id} style={{ height: 8 }} />
                  const displayed = line.text.slice(0, line.chars)
                  const isActive = !line.done
                  const color = getLineColor(line.type)
                  return (
                    <div
                      key={line.id}
                      style={{ color, lineHeight: 2, fontFamily: C.mono }}
                    >
                      {line.type === 'system' && (
                        <span
                          style={{
                            color: 'rgba(0,200,255,0.4)',
                            marginRight: 4,
                          }}
                        >
                          ›
                        </span>
                      )}
                      {displayed}
                      {isActive && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          style={{ marginLeft: 1 }}
                        >
                          █
                        </motion.span>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* Status bar */}
            <div
              className="flex items-center justify-between px-5 py-2 rounded-b-xl"
              style={{
                borderTop: '1px solid rgba(0,255,65,0.08)',
                background: 'rgba(0,255,65,0.02)',
              }}
            >
              <span
                style={{
                  color: 'rgba(0,255,65,0.25)',
                  fontSize: 8,
                  letterSpacing: '0.1em',
                }}
              >
                ENCRYPTED :: AES-256-GCM
              </span>
              <motion.span
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  color: 'rgba(0,255,65,0.35)',
                  fontSize: 8,
                  letterSpacing: '0.1em',
                }}
              >
                SECURE_CHANNEL_ACTIVE
              </motion.span>
            </div>
          </div>

          {/* Master progress line */}
          <div
            className="mt-3 h-px"
            style={{ background: 'rgba(0,255,65,0.06)' }}
          >
            <motion.div
              className="h-full"
              animate={{ width: phase === 'loading' ? `${progress}%` : '100%' }}
              transition={{ duration: 0.2, ease: 'linear' }}
              style={{
                background: 'linear-gradient(90deg, #00ff41, #00ffff)',
                boxShadow: '0 0 8px rgba(0,255,65,0.7)',
              }}
            />
          </div>
        </div>

        {/* Bottom label */}
        <motion.div
          className="flex items-center gap-3"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div
            className="w-8 h-px"
            style={{ background: 'rgba(0,255,65,0.2)' }}
          />
          <span
            style={{
              color: 'rgba(0,255,65,0.3)',
              fontSize: 8,
              fontFamily: C.mono,
              letterSpacing: '0.2em',
            }}
          >
            DO NOT INTERRUPT BOOT PROCESS
          </span>
          <div
            className="w-8 h-px"
            style={{ background: 'rgba(0,255,65,0.2)' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─── INTERACTIVE TERMINAL ────────────────────────────────────────────────────
const TERMINAL_COMMANDS: Record<string, string> = {
  help: `Available commands:\n  about       — Who am I\n  skills      — Technical skill tree\n  projects    — Deployed operations\n  contact     — Get in touch\n  whoami      — System identity\n  clear       — Clear terminal\n  ls          — List sections\n  hack        — Initialize sequence\n  status      — Current status\n  education   — Academic log\n  ctf         — CTF achievements\n  tools       — Arsenal\n  exit        — Exit cyber mode`,
  about: `[IDENTITY CONFIRMED]\nName    : ${OWNER.name}\nRole    : ${OWNER.role}\nStatus  : ${OWNER.tagline}\nFocus   : Cybersecurity, AI, Full Stack`,
  whoami: `root@vivek:~# id\nuid=1337(vivek) gid=1337(sec) groups=1337(sec),1338(dev),1339(ai)\nSECURITY CLEARANCE: ACTIVE\nMISSION: Build. Break. Secure. Repeat.`,
  skills: `[SKILL TREE LOADED]\n▓▓▓▓▓▓▓▓▓░  Penetration Testing   85%\n▓▓▓▓▓▓▓▓▓▓  React / Next.js       90%\n▓▓▓▓▓▓▓▓▓░  TypeScript            88%\n▓▓▓▓▓▓▓▓░░  Python / Scripting    87%\n▓▓▓▓▓▓▓▓░░  AI / LLM Integration  85%\n▓▓▓▓▓▓▓░░░  Cloud & DevOps        74%`,
  projects: `[ACTIVE OPERATIONS]\n${PROJECTS.map((p, i) => `[${String(i + 1).padStart(2, '0')}] ${p.codename}    — ${p.tagline}`).join('\n')}`,
  contact: `[SECURE CHANNEL OPEN]\nEmail   : ${OWNER.email}\nGitHub  : ${OWNER.github}\nLinkedIn: ${OWNER.linkedin}`,
  ls: `drwxr-xr-x  hero/\ndrwxr-xr-x  about/\ndrwxr-xr-x  skills/\ndrwxr-xr-x  projects/\ndrwxr-xr-x  internships/\ndrwxr-xr-x  education/\ndrwxr-xr-x  achievements/\ndrwxr-xr-x  github-activity/\ndrwxr-xr-x  dashboard/\ndrwxr-xr-x  terminal/\ndrwxr-xr-x  contact/`,
  hack: `[INITIATING SEQUENCE...]\n> Scanning target............. done\n> Enumerating services........ done\n> Identifying vectors......... done\n> Exploiting CVE-2024-1337...\n> Bypassing firewall.......... done\n> Privilege escalation........ done\n> ACCESS GRANTED ✓\n\nJust kidding. Stay ethical. 🔒\n\"With great power comes great responsibility.\"`,
  status: `[SYSTEM STATUS]\n● Node online            [OK]\n● Firewall active        [OK]\n● VPN tunnel             [OK]\n● Threat level           [LOW]\n● Available for work     [YES ✓]\n● Currently building     [YES ✓]`,
  education: `[ACADEMIC_LOG]\n[01] Secondary (1-10)     — Completed — Score: 92%\n[02] Intermediate (11-12) — Completed — Score: 88%\n[03] B.Tech CS + CySec    — IN_PROGRESS — 2023-2027`,
  ctf: `[CTF_ACHIEVEMENTS]\n★ HackTheBox — Pro Hacker rank\n★ TryHackMe  — Top 1% global\n★ CTFTime    — Top 100 team ranking\n★ Solved 200+ challenges across all categories`,
  tools: `[ARSENAL]\nWeb     : Burp Suite, OWASP ZAP, Nikto\nNetwork : Nmap, Wireshark, Metasploit\nForensic: Volatility, Autopsy, FTK\nOSINT   : Maltego, Shodan, theHarvester\nDev     : React, Next.js, Python, Go, Rust`,
}

function Terminal({ onExit }: { onExit?: () => void }) {
  const [lines, setLines] = useState<
    { type: 'input' | 'output'; text: string }[]
  >([
    { type: 'output', text: '╔══════════════════════════════════════════╗' },
    {
      type: 'output',
      text: `║   ${OWNER.name.toUpperCase()} :: SECURE TERMINAL v2.0   ║`,
    },
    { type: 'output', text: '╚══════════════════════════════════════════╝' },
    { type: 'output', text: '' },
    { type: 'output', text: "Type 'help' for available commands." },
    { type: 'output', text: '' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()
    if (!cmd) return
    const newLines = [
      ...lines,
      { type: 'input' as const, text: `root@vivek:~$ ${cmd}` },
    ]
    if (cmd === 'clear') {
      setLines([
        { type: 'output', text: 'Terminal cleared.' },
        { type: 'output', text: '' },
      ])
    } else if (cmd === 'exit') {
      onExit?.()
    } else {
      const output =
        TERMINAL_COMMANDS[cmd] ??
        `bash: ${cmd}: command not found\nTry 'help' for available commands.`
      const outputLines = output
        .split('\n')
        .map((l) => ({ type: 'output' as const, text: l }))
      setLines([...newLines, ...outputLines, { type: 'output', text: '' }])
    }
    setHistory((prev) => [cmd, ...prev.slice(0, 49)])
    setHistIdx(-1)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = histIdx + 1
      if (next < history.length) {
        setHistIdx(next)
        setInput(history[next])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = histIdx - 1
      if (next < 0) {
        setHistIdx(-1)
        setInput('')
      } else {
        setHistIdx(next)
        setInput(history[next])
      }
    }
  }

  return (
    <div
      className="rounded-xl overflow-hidden relative"
      style={{
        background: '#000900',
        border: '1px solid rgba(0,255,65,0.28)',
        boxShadow:
          '0 0 60px rgba(0,255,65,0.08), inset 0 0 40px rgba(0,0,0,0.5)',
        fontFamily: C.mono,
        minHeight: 420,
        maxHeight: 520,
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          background: 'rgba(0,255,65,0.06)',
          borderBottom: '1px solid rgba(0,255,65,0.15)',
        }}
      >
        <div className="flex gap-1.5">
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: c }}
            />
          ))}
        </div>
        <span
          style={{ color: 'rgba(0,255,65,0.5)', fontSize: 11, marginLeft: 8 }}
        >
          root@vivek:~# — bash — 120×36
        </span>
        <motion.div
          className="ml-auto w-2 h-2 rounded-full"
          style={{ background: C.green }}
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-0.5"
        style={{ fontSize: 12 }}
      >
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              color: line.type === 'input' ? '#39ff14' : 'rgba(0,255,65,0.8)',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.7,
            }}
          >
            {line.text || '\u00A0'}
          </motion.div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderTop: '1px solid rgba(0,255,65,0.1)' }}
      >
        <span style={{ color: '#39ff14', fontSize: 12, flexShrink: 0 }}>
          root@vivek:~$
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none"
          style={{
            color: C.green,
            fontFamily: C.mono,
            fontSize: 12,
            caretColor: C.green,
          }}
          autoComplete="off"
          autoFocus={false}
          spellCheck={false}
          placeholder="type a command..."
        />
      </form>
    </div>
  )
}

// ─── THREAT MAP ──────────────────────────────────────────────────────────────
const threatNodes = [
  {
    x: 25,
    y: 32,
    label: 'SQL Injection',
    severity: 'CRITICAL',
    status: 'BLOCKED',
  },
  { x: 68, y: 20, label: 'XSS Attack', severity: 'HIGH', status: 'BLOCKED' },
  { x: 45, y: 65, label: 'DDoS Wave', severity: 'HIGH', status: 'MITIGATED' },
  { x: 80, y: 55, label: 'Port Scan', severity: 'MEDIUM', status: 'LOGGED' },
  { x: 15, y: 72, label: 'Brute Force', severity: 'MEDIUM', status: 'BLOCKED' },
  {
    x: 60,
    y: 40,
    label: 'Zero-Day CVE',
    severity: 'CRITICAL',
    status: 'PATCHED',
  },
  { x: 35, y: 18, label: 'Phishing', severity: 'LOW', status: 'BLOCKED' },
  { x: 88, y: 78, label: 'MITM', severity: 'HIGH', status: 'BLOCKED' },
]

const SEVERITY_COLOR: Record<string, string> = {
  CRITICAL: '#ff0040',
  HIGH: '#ffcc00',
  MEDIUM: '#ff7700',
  LOW: '#00ff41',
}

function ThreatMap() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [activePing, setActivePing] = useState(0)
  useEffect(() => {
    const iv = setInterval(
      () => setActivePing((p) => (p + 1) % threatNodes.length),
      1600,
    )
    return () => clearInterval(iv)
  }, [])

  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{
        background: '#000900',
        border: '1px solid rgba(0,255,65,0.2)',
        boxShadow: '0 0 40px rgba(0,255,65,0.05)',
        height: 320,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,65,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.035) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {[80, 140, 200].map((r, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: r * 2,
            height: r * 2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(0,255,65,0.06)',
          }}
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.02, 1] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}

      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2"
        style={{
          background: 'rgba(0,255,65,0.05)',
          borderBottom: '1px solid rgba(0,255,65,0.1)',
          zIndex: 10,
        }}
      >
        <span
          style={{
            color: C.green,
            fontSize: 10,
            fontFamily: C.mono,
            letterSpacing: '0.15em',
          }}
        >
          THREAT MAP :: LIVE FEED
        </span>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: C.red }}
            animate={{ opacity: [1, 0.2, 1], scale: [1, 1.5, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <span style={{ color: C.red, fontSize: 10, fontFamily: C.mono }}>
            MONITORING
          </span>
        </div>
      </div>

      {threatNodes.map((t, i) => {
        const color = SEVERITY_COLOR[t.severity]
        const isActive = activePing === i
        const isHovered = hovered === i
        return (
          <div
            key={i}
            className="absolute cursor-pointer"
            style={{
              left: `${t.x}%`,
              top: `${t.y + 8}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 5,
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {isActive && (
              <motion.div
                className="absolute rounded-full"
                initial={{
                  width: 8,
                  height: 8,
                  opacity: 0.8,
                  x: '-50%',
                  y: '-50%',
                }}
                animate={{
                  width: 44,
                  height: 44,
                  opacity: 0,
                  x: '-50%',
                  y: '-50%',
                }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                style={{ background: `${color}40`, top: 4, left: 4 }}
              />
            )}
            <motion.div
              animate={{ scale: isActive ? [1, 1.6, 1] : 1 }}
              transition={{ duration: 0.5 }}
              className="w-2 h-2 rounded-full"
              style={{ background: color, boxShadow: `0 0 8px ${color}` }}
            />
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-20 px-3 py-2 rounded-lg"
                  style={{
                    bottom: '140%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#000d00',
                    border: `1px solid ${color}40`,
                    minWidth: 150,
                    pointerEvents: 'none',
                  }}
                >
                  <p
                    style={{
                      color,
                      fontSize: 10,
                      fontFamily: C.mono,
                      marginBottom: 2,
                    }}
                  >
                    {t.severity}
                  </p>
                  <p
                    style={{ color: C.green, fontSize: 11, fontFamily: C.mono }}
                  >
                    {t.label}
                  </p>
                  <p
                    style={{
                      color: C.greenDim,
                      fontSize: 10,
                      fontFamily: C.mono,
                    }}
                  >
                    [{t.status}]
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}

      <div
        className="absolute bottom-0 left-0 right-0 flex gap-4 px-4 py-2"
        style={{
          borderTop: '1px solid rgba(0,255,65,0.1)',
          background: 'rgba(0,255,65,0.03)',
        }}
      >
        {[
          { label: 'THREATS', val: threatNodes.length, color: C.green },
          {
            label: 'BLOCKED',
            val: threatNodes.filter((t) => t.status === 'BLOCKED').length,
            color: C.red,
          },
          {
            label: 'CRITICAL',
            val: threatNodes.filter((t) => t.severity === 'CRITICAL').length,
            color: C.yellow,
          },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p
              style={{
                color: s.color,
                fontSize: 14,
                fontFamily: C.mono,
                fontWeight: 700,
              }}
            >
              {s.val}
            </p>
            <p
              style={{
                color: 'rgba(0,255,65,0.4)',
                fontSize: 9,
                fontFamily: C.mono,
                letterSpacing: '0.1em',
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── LIVE SYSTEM LOG ─────────────────────────────────────────────────────────
function LiveSystemLog() {
  const [logLines, setLogLines] = useState<
    Array<{ id: number; time: string; level: string; msg: string }>
  >([])
  const idRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const levelColors: Record<string, string> = {
    INFO: C.green,
    WARN: C.yellow,
    ALERT: C.red,
    DEBUG: 'rgba(0,255,65,0.35)',
  }
  const msgs = [
    'Firewall rule applied successfully',
    'Anomalous traffic pattern detected',
    'SSL certificate renewed',
    'Failed login attempt blocked',
    'Port scan detected from 192.168.x.x',
    'Backup completed — encrypted',
    'IDS signature database updated',
    'System health check passed',
    'New CVE — patching initiated',
    'VPN tunnel re-established',
    'Intrusion attempt mitigated',
    'Auth token rotated',
  ]

  const addLine = useCallback(() => {
    const levels = ['INFO', 'WARN', 'ALERT', 'DEBUG']
    const level = levels[Math.floor(Math.random() * levels.length)]
    const msg = msgs[Math.floor(Math.random() * msgs.length)]
    const now = new Date()
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
    setLogLines((prev) => [
      ...prev.slice(-40),
      { id: idRef.current++, time, level, msg },
    ])
  }, [])

  useEffect(() => {
    for (let i = 0; i < 12; i++) setTimeout(addLine, i * 80)
    const iv = setInterval(addLine, 2200)
    return () => clearInterval(iv)
  }, [addLine])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logLines])

  return (
    <div
      ref={scrollRef}
      className="rounded-xl p-4"
      style={{
        background: '#000900',
        border: '1px solid rgba(0,255,65,0.15)',
        height: 320,
        overflowY: 'auto',
      }}
    >
      {logLines.map((line) => (
        <motion.div
          key={line.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            fontFamily: C.mono,
            fontSize: 10,
            lineHeight: 2,
            borderBottom: '1px solid rgba(0,255,65,0.04)',
            paddingBottom: 2,
          }}
        >
          <span style={{ color: 'rgba(0,255,65,0.25)' }}>[{line.time}] </span>
          <span style={{ color: levelColors[line.level] }}>
            [{line.level}]{' '}
          </span>
          <span style={{ color: 'rgba(0,255,65,0.6)' }}>{line.msg}</span>
        </motion.div>
      ))}
    </div>
  )
}

// ─── RADAR CHART ─────────────────────────────────────────────────────────────
function RadarChart({ inView }: { inView: boolean }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const cx = 200,
    cy = 200,
    r = 145
  const levels = [0.25, 0.5, 0.75, 1.0]
  const n = RADAR_SKILLS.length
  const angleFor = (i: number) => (2 * Math.PI * i) / n - Math.PI / 2
  const pointAt = (i: number, ratio: number) => ({
    x: cx + r * ratio * Math.cos(angleFor(i)),
    y: cy + r * ratio * Math.sin(angleFor(i)),
  })
  const gridPolygon = (ratio: number) =>
    Array.from({ length: n }, (_, i) => {
      const p = pointAt(i, ratio)
      return `${p.x},${p.y}`
    }).join(' ')
  const dataPolygon = RADAR_SKILLS.map((s, i) => {
    const p = pointAt(i, s.value / 100)
    return `${p.x},${p.y}`
  }).join(' ')

  return (
    <div className="flex justify-center">
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        style={{ maxWidth: '100%' }}
      >
        {/* Grid levels */}
        {levels.map((ratio, li) => (
          <polygon
            key={li}
            points={gridPolygon(ratio)}
            fill={li === 3 ? 'rgba(0,255,65,0.03)' : 'none'}
            stroke="rgba(0,255,65,0.1)"
            strokeWidth="1"
          />
        ))}
        {/* Axes */}
        {RADAR_SKILLS.map((_, i) => {
          const outer = pointAt(i, 1.0)
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(0,255,65,0.1)"
              strokeWidth="1"
            />
          )
        })}
        {/* Fill */}
        <motion.polygon
          points={dataPolygon}
          fill="rgba(0,255,65,0.08)"
          stroke="#00ff41"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            filter: 'drop-shadow(0 0 8px rgba(0,255,65,0.5))',
          }}
        />
        {/* Dots */}
        {RADAR_SKILLS.map((s, i) => {
          const p = pointAt(i, s.value / 100)
          const isHovered = hoveredIdx === i
          return (
            <g key={i}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 7 : 4}
                fill={isHovered ? '#00ffff' : '#00ff41'}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.0 + i * 0.06 }}
                style={{
                  filter: `drop-shadow(0 0 ${isHovered ? 8 : 4}px rgba(0,255,65,0.8))`,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
              {isHovered && (
                <text
                  x={p.x}
                  y={p.y - 14}
                  textAnchor="middle"
                  fill="#00ffff"
                  fontSize="10"
                  fontFamily={C.mono}
                >
                  {s.value}%
                </text>
              )}
            </g>
          )
        })}
        {/* Labels */}
        {RADAR_SKILLS.map((s, i) => {
          const p = pointAt(i, 1.24)
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill={hoveredIdx === i ? '#00ffff' : 'rgba(0,255,65,0.7)'}
              fontSize="10"
              fontFamily={C.mono}
            >
              {s.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

// ─── GLITCH TEXT ─────────────────────────────────────────────────────────────
function GlitchText({ text, fontSize }: { text: string; fontSize: string }) {
  const [glitch, setGlitch] = useState(false)
  const [glitchChar, setGlitchChar] = useState(false)

  useEffect(() => {
    const g = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 90)
    }, 4000)
    const g2 = setInterval(() => {
      setGlitchChar(true)
      setTimeout(() => setGlitchChar(false), 55)
    }, 6500)
    return () => {
      clearInterval(g)
      clearInterval(g2)
    }
  }, [])

  const displayText = glitchChar
    ? text.replace('i', '!').replace('e', '3').replace('a', '@')
    : text.replace(' ', '_').toUpperCase()

  return (
    <h1
      style={{
        fontFamily: C.mono,
        fontSize,
        color: glitch ? C.red : C.green,
        letterSpacing: glitch ? '0.18em' : '-0.01em',
        textShadow: glitch
          ? `4px 0 ${C.red}, -4px 0 ${C.cyan}, 0 0 30px ${C.green}`
          : `0 0 40px rgba(0,255,65,0.5), 0 0 80px rgba(0,255,65,0.2)`,
        lineHeight: 1,
        transition: 'color 0.04s, text-shadow 0.04s, letter-spacing 0.04s',
      }}
    >
      {displayText}
    </h1>
  )
}

// ─── TYPING BADGE ─────────────────────────────────────────────────────────────
function TypingBadge({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0)
  const [chars, setChars] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[idx]
    if (!deleting && chars < current.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 80)
      return () => clearTimeout(t)
    }
    if (!deleting && chars === current.length) {
      const t = setTimeout(() => setDeleting(true), 1800)
      return () => clearTimeout(t)
    }
    if (deleting && chars > 0) {
      const t = setTimeout(() => setChars((c) => c - 1), 45)
      return () => clearTimeout(t)
    }
    if (deleting && chars === 0) {
      setDeleting(false)
      setIdx((i) => (i + 1) % texts.length)
    }
  }, [chars, deleting, idx, texts])

  return (
    <span style={{ color: C.cyan, fontFamily: C.mono }}>
      {texts[idx].slice(0, chars)}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        style={{ marginLeft: 1 }}
      >
        |
      </motion.span>
    </span>
  )
}

// ─── CYBER HERO ───────────────────────────────────────────────────────────────
function CyberHero() {
  return (
    <section
      id="cyber-hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#000d00' }}
    >
      <MatrixRain opacity={0.14} />
      <HexPattern />

      {/* Radial glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,255,65,0.07) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,255,65,0.35), transparent)',
          zIndex: 1,
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full"
          style={{
            background: 'rgba(0,255,65,0.06)',
            border: '1px solid rgba(0,255,65,0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ background: C.green }}
            animate={{ opacity: [1, 0.2, 1], scale: [1, 1.6, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span
            style={{
              color: C.green,
              fontFamily: C.mono,
              fontSize: 10,
              letterSpacing: '0.2em',
            }}
          >
            SYSTEM_ONLINE :: AVAILABLE_FOR_MISSIONS
          </span>
        </motion.div>

        {/* Glitch name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{ marginBottom: 12 }}
        >
          <GlitchText text={OWNER.name} fontSize="clamp(40px, 10vw, 96px)" />
        </motion.div>

        {/* Typing subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            color: 'rgba(0,255,65,0.6)',
            fontFamily: C.mono,
            fontSize: 13,
            letterSpacing: '0.12em',
            marginBottom: 14,
          }}
        >
          [{' '}
          <TypingBadge
            texts={[
              'CYBERSECURITY STUDENT',
              'FULL-STACK DEV',
              'AI BUILDER',
              'CTF COMPETITOR',
              'OPEN SOURCE',
            ]}
          />{' '}
          ]
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            color: 'rgba(0,255,65,0.35)',
            fontFamily: C.mono,
            fontSize: 11,
            letterSpacing: '0.08em',
            marginBottom: 40,
          }}
        >
          {OWNER.tagline}
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {ABOUT_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              whileHover={{ scale: 1.08, y: -3 }}
              className="px-5 py-3 rounded-lg cursor-default relative overflow-hidden"
              style={{
                background: 'rgba(0,255,65,0.05)',
                border: '1px solid rgba(0,255,65,0.18)',
              }}
            >
              <CornerBrackets color="rgba(0,255,65,0.3)" />
              <div
                style={{
                  color: C.green,
                  fontSize: 22,
                  fontFamily: C.mono,
                  fontWeight: 700,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  color: 'rgba(0,255,65,0.4)',
                  fontSize: 9,
                  fontFamily: C.mono,
                  letterSpacing: '0.15em',
                }}
              >
                {s.label.toUpperCase().replace(' ', '_')}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: '0 0 35px rgba(0,255,65,0.45)',
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              document
                .getElementById('cyber-projects')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-8 py-3 rounded-lg text-sm font-bold"
            style={{
              background: C.green,
              color: '#000900',
              fontFamily: C.mono,
              letterSpacing: '0.1em',
            }}
          >
            [ VIEW_OPERATIONS ]
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.04,
              borderColor: C.cyan,
              boxShadow: `0 0 20px rgba(0,255,255,0.2)`,
              color: C.cyan,
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              document
                .getElementById('cyber-terminal')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-8 py-3 rounded-lg text-sm font-bold"
            style={{
              border: '1px solid rgba(0,255,65,0.3)',
              color: C.green,
              background: 'transparent',
              fontFamily: C.mono,
              letterSpacing: '0.1em',
              transition: 'all 0.2s',
            }}
          >
            [ OPEN_TERMINAL ]
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              color: 'rgba(0,255,65,0.3)',
              fontFamily: C.mono,
              fontSize: 9,
              letterSpacing: '0.2em',
            }}
          >
            SCROLL_DOWN
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-10"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,255,65,0.5), transparent)',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}

// ─── CYBER ABOUT ─────────────────────────────────────────────────────────────
function CyberAbout() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-200, 200], [8, -8])
  const rotateY = useTransform(mouseX, [-200, 200], [-8, 8])

  const identity = [
    { key: 'NAME', value: OWNER.name },
    { key: 'ROLE', value: OWNER.role },
    { key: 'STATUS', value: OWNER.tagline },
    { key: 'AVAILABLE', value: 'YES — Open to opportunities' },
    { key: 'DEGREE', value: 'B.Tech CS — 2023–2027' },
    { key: 'SPECIALITY', value: 'Penetration Testing, AI Agents' },
    { key: 'GITHUB', value: OWNER.github },
  ]

  return (
    <section
      id="cyber-about"
      className="relative py-24 overflow-hidden"
      style={{ background: '#010f01' }}
    >
      <AnimatedGrid />
      <HexPattern />
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <CyberHeader number="01" title="IDENTITY_PROFILE" />
        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          {/* ── LEFT: Bio text + stats ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              `> I'm a cybersecurity student with a builder's mindset. My work lives at the intersection of offensive security, full-stack architecture, and AI automation.`,
              `> I build, break, and secure — competing in CTF challenges, contributing to open-source security tools, and designing AI-driven automation agents.`,
              `> Currently open to internships, full-time roles, and freelance missions in cybersecurity, full-stack engineering, and AI systems.`,
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15 }}
                style={{
                  color: 'rgba(0,255,65,0.65)',
                  fontFamily: C.mono,
                  fontSize: 12,
                  lineHeight: 2,
                  borderLeft: '2px solid rgba(0,255,65,0.2)',
                  paddingLeft: 16,
                }}
              >
                {text}
              </motion.p>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-3 mt-6"
            >
              {ABOUT_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9 + i * 0.08 }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="p-3 rounded-lg cursor-default relative"
                  style={{
                    background: 'rgba(0,255,65,0.04)',
                    border: '1px solid rgba(0,255,65,0.12)',
                  }}
                >
                  <div
                    style={{
                      color: C.green,
                      fontFamily: C.mono,
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      color: 'rgba(0,255,65,0.4)',
                      fontFamily: C.mono,
                      fontSize: 9,
                      letterSpacing: '0.1em',
                    }}
                  >
                    {stat.label.toUpperCase()}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: 3D identity card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ perspective: 1000 }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              mouseX.set(e.clientX - rect.left - rect.width / 2)
              mouseY.set(e.clientY - rect.top - rect.height / 2)
            }}
            onMouseLeave={() => {
              mouseX.set(0)
              mouseY.set(0)
            }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="rounded-xl overflow-hidden"
            >
              <div
                className="px-4 py-2.5 flex items-center justify-between"
                style={{
                  borderBottom: '1px solid rgba(0,255,65,0.1)',
                  background: 'rgba(0,255,65,0.04)',
                  borderTop: '1px solid rgba(0,255,65,0.2)',
                  borderLeft: '1px solid rgba(0,255,65,0.2)',
                  borderRight: '1px solid rgba(0,255,65,0.2)',
                  borderRadius: '12px 12px 0 0',
                }}
              >
                <span
                  style={{
                    color: 'rgba(0,255,65,0.4)',
                    fontSize: 10,
                    fontFamily: C.mono,
                  }}
                >
                  root@vivek:~$ cat identity.json
                </span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ color: C.green, fontSize: 12 }}
                >
                  █
                </motion.span>
              </div>
              <div
                className="p-6"
                style={{
                  background: '#000900',
                  border: '1px solid rgba(0,255,65,0.2)',
                  borderTop: 'none',
                  borderRadius: '0 0 12px 12px',
                  boxShadow: '0 0 40px rgba(0,255,65,0.04)',
                }}
              >
                <div
                  style={{
                    color: 'rgba(0,255,65,0.3)',
                    fontFamily: C.mono,
                    fontSize: 11,
                    marginBottom: 12,
                  }}
                >
                  {'{'}
                </div>
                {identity.map((item, i) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.07 + 0.3 }}
                    className="flex gap-3 mb-2 pl-4"
                    style={{ fontFamily: C.mono, fontSize: 12 }}
                  >
                    <span style={{ color: C.cyan }}>"{item.key}"</span>
                    <span style={{ color: 'rgba(0,255,65,0.4)' }}>:</span>
                    <span style={{ color: C.green }}>"{item.value}"</span>
                    {i < identity.length - 1 && (
                      <span style={{ color: 'rgba(0,255,65,0.3)' }}>,</span>
                    )}
                  </motion.div>
                ))}
                <div
                  style={{
                    color: 'rgba(0,255,65,0.3)',
                    fontFamily: C.mono,
                    fontSize: 11,
                    marginTop: 12,
                  }}
                >
                  {'}'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── CYBER SKILLS ────────────────────────────────────────────────────────────
function CyberSkills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeTab, setActiveTab] = useState('cybersec')
  const activeCategory = SKILL_CATEGORIES.find((c) => c.id === activeTab)!

  const cyberAccent: Record<string, string> = {
    rose: C.red,
    violet: '#a855f7',
    emerald: C.green,
    cyan: C.cyan,
    amber: C.yellow,
  }

  return (
    <section
      id="cyber-skills"
      className="relative py-24 overflow-hidden"
      style={{ background: '#000d00' }}
    >
      <AnimatedGrid />
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <CyberHeader number="02" title="SKILL_MATRIX" />
        <div className="grid lg:grid-cols-2 gap-12 mt-12 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p
              style={{
                color: 'rgba(0,255,65,0.4)',
                fontFamily: C.mono,
                fontSize: 10,
                letterSpacing: '0.15em',
                marginBottom: 12,
              }}
            >
              SKILL_RADAR :: 8 DOMAINS
            </p>
            <RadarChart inView={inView} />
          </motion.div>

          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {SKILL_CATEGORIES.map((cat) => {
                const accent = cyberAccent[cat.accentKey]
                const isActive = cat.id === activeTab
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-3 py-1.5 rounded text-xs"
                    style={{
                      background: isActive
                        ? `${accent}18`
                        : 'rgba(0,255,65,0.04)',
                      border: `1px solid ${isActive ? accent + '40' : 'rgba(0,255,65,0.12)'}`,
                      color: isActive ? accent : 'rgba(0,255,65,0.5)',
                      fontFamily: C.mono,
                      letterSpacing: '0.05em',
                      transition: 'all 0.2s',
                      boxShadow: isActive ? `0 0 16px ${accent}20` : 'none',
                    }}
                  >
                    {cat.icon} {cat.title}
                  </motion.button>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
              >
                {activeCategory.skills.map((s, i) => {
                  const accent = cyberAccent[activeCategory.accentKey]
                  return (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.06 + 0.1 }}
                      className="flex items-center gap-4 group"
                      whileHover={{ x: 4 }}
                    >
                      <span
                        style={{
                          color: C.cyan,
                          fontFamily: C.mono,
                          fontSize: 11,
                          width: 150,
                          flexShrink: 0,
                        }}
                      >
                        {s.name}
                      </span>
                      <div
                        className="flex-1 h-1.5 rounded-full"
                        style={{ background: 'rgba(0,255,65,0.08)' }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={
                            inView ? { width: `${s.value ?? s.level}%` } : {}
                          }
                          transition={{
                            duration: 1.2,
                            delay: 0.3 + i * 0.06,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          style={{
                            background: `linear-gradient(90deg, ${accent}, ${C.cyan})`,
                            boxShadow: `0 0 8px ${accent}50`,
                          }}
                        />
                      </div>
                      <span
                        style={{
                          color: accent,
                          fontFamily: C.mono,
                          fontSize: 11,
                          width: 32,
                          textAlign: 'right',
                        }}
                      >
                        {s.value ?? s.level}
                      </span>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CYBER PROJECTS ──────────────────────────────────────────────────────────
function CyberProjects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState<(typeof PROJECTS)[0] | null>(null)

  return (
    <section
      id="cyber-projects"
      className="relative py-24 overflow-hidden"
      style={{ background: '#010f01' }}
    >
      <AnimatedGrid />
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <CyberHeader number="03" title="COMMAND_CENTER" />
        <div className="grid lg:grid-cols-2 gap-4 mt-12">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2 }}
              whileHover={{ scale: 1.02, y: -3 }}
              onClick={() => setSelected(selected?.id === p.id ? null : p)}
              className="cursor-pointer p-5 rounded-xl relative overflow-hidden"
              style={{
                background:
                  selected?.id === p.id ? `${p.cyberColor}06` : '#000900',
                border: `1px solid ${selected?.id === p.id ? p.cyberColor + '45' : 'rgba(0,255,65,0.12)'}`,
                transition: 'all 0.3s',
                boxShadow:
                  selected?.id === p.id ? `0 0 30px ${p.cyberColor}12` : 'none',
              }}
            >
              {/* Status pulse */}
              <motion.div
                className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full"
                style={{
                  background: p.cyberColor,
                  boxShadow: `0 0 6px ${p.cyberColor}`,
                }}
                animate={{ opacity: [1, 0.2, 1], scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />

              {/* Corner brackets */}
              <div
                className="absolute top-0 left-0 w-5 h-5"
                style={{
                  borderTop: `2px solid ${p.cyberColor}80`,
                  borderLeft: `2px solid ${p.cyberColor}80`,
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-5 h-5"
                style={{
                  borderBottom: `2px solid ${p.cyberColor}80`,
                  borderRight: `2px solid ${p.cyberColor}80`,
                }}
              />

              {/* Header */}
              <div className="flex items-start gap-3 mb-3 pr-6">
                <span style={{ fontSize: 20 }}>{p.emoji}</span>
                <div>
                  <span
                    style={{
                      color: p.cyberColor,
                      fontFamily: C.mono,
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {p.codename}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        background: `${p.cyberColor}15`,
                        color: p.cyberColor,
                        fontFamily: C.mono,
                        fontSize: 9,
                      }}
                    >
                      {p.cyberType}
                    </span>
                    <span
                      style={{
                        color: 'rgba(0,255,65,0.3)',
                        fontFamily: C.mono,
                        fontSize: 9,
                      }}
                    >
                      {p.year}
                    </span>
                  </div>
                </div>
              </div>

              <p
                style={{
                  color: 'rgba(0,255,65,0.55)',
                  fontFamily: C.mono,
                  fontSize: 11,
                  lineHeight: 1.8,
                  marginBottom: 12,
                }}
              >
                {p.tagline}
              </p>

              <AnimatePresence>
                {selected?.id === p.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p
                      style={{
                        color: 'rgba(0,255,65,0.45)',
                        fontFamily: C.mono,
                        fontSize: 11,
                        lineHeight: 1.8,
                        marginBottom: 10,
                      }}
                    >
                      {p.description}
                    </p>
                    <div className="space-y-1 mb-3">
                      {p.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-2">
                          <span
                            style={{
                              color: p.cyberColor,
                              fontFamily: C.mono,
                              fontSize: 10,
                            }}
                          >
                            ›
                          </span>
                          <span
                            style={{
                              color: 'rgba(0,255,65,0.6)',
                              fontFamily: C.mono,
                              fontSize: 10,
                            }}
                          >
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      color: 'rgba(0,255,65,0.4)',
                      fontFamily: C.mono,
                      fontSize: 9,
                      background: 'rgba(0,255,65,0.05)',
                      border: '1px solid rgba(0,255,65,0.1)',
                      padding: '2px 8px',
                      borderRadius: 4,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Expand hint */}
              <div className="mt-3 flex items-center gap-1.5">
                <span
                  style={{
                    color: 'rgba(0,255,65,0.25)',
                    fontSize: 9,
                    fontFamily: C.mono,
                  }}
                >
                  {selected?.id === p.id ? '▲ COLLAPSE' : '▼ EXPAND'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CYBER INTERNSHIPS ───────────────────────────────────────────────────────
function CyberInternships() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="cyber-internships"
      className="relative py-24 overflow-hidden"
      style={{ background: '#000d00' }}
    >
      <AnimatedGrid />
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <CyberHeader number="04" title="FIELD_OPERATIONS" />
        <div className="mt-12 space-y-6">
          {INTERNSHIPS.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.2 + 0.3 }}
              className="p-6 rounded-xl relative overflow-hidden"
              style={{
                background: '#000900',
                border: `1px solid ${job.color}22`,
              }}
            >
              <motion.div
                className="absolute top-0 left-0 w-1 h-full"
                style={{ background: job.color, opacity: 0.6 }}
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${job.color}08, transparent 70%)`,
                }}
              />
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5 pl-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      style={{
                        color: job.color,
                        fontFamily: C.mono,
                        fontSize: 15,
                        fontWeight: 700,
                      }}
                    >
                      {job.company}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded"
                      style={{
                        background: `${job.color}15`,
                        color: job.color,
                        fontFamily: C.mono,
                        fontSize: 9,
                      }}
                    >
                      {job.type}
                    </span>
                  </div>
                  <p
                    style={{
                      color: 'rgba(0,255,65,0.65)',
                      fontFamily: C.mono,
                      fontSize: 12,
                    }}
                  >
                    {job.role}
                  </p>
                </div>
                <span
                  style={{
                    color: 'rgba(0,255,65,0.35)',
                    fontFamily: C.mono,
                    fontSize: 11,
                  }}
                >
                  {job.period}
                </span>
              </div>
              <div className="pl-4 space-y-2">
                {job.tasks.map((t, ti) => (
                  <motion.div
                    key={ti}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.2 + ti * 0.07 + 0.5 }}
                    className="flex items-start gap-2"
                  >
                    <span
                      style={{
                        color: job.color,
                        fontFamily: C.mono,
                        fontSize: 10,
                        marginTop: 2,
                      }}
                    >
                      ›
                    </span>
                    <span
                      style={{
                        color: 'rgba(0,255,65,0.6)',
                        fontFamily: C.mono,
                        fontSize: 11,
                      }}
                    >
                      {t}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CYBER EDUCATION ─────────────────────────────────────────────────────────
function CyberEducation() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const statusColor = (status: string) =>
    status === 'current' ? C.yellow : C.green

  return (
    <section
      id="cyber-education"
      className="relative py-24 overflow-hidden"
      style={{ background: '#010f01' }}
    >
      <AnimatedGrid />
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <CyberHeader number="05" title="ACADEMIC_LOG" />
        <div className="mt-12 space-y-4 relative">
          <motion.div
            className="absolute left-[22px] top-0 w-px"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,255,65,0.5), rgba(0,255,65,0.1))',
              zIndex: 1,
            }}
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
          {EDUCATION_TIMELINE.map((ed, i) => (
            <motion.div
              key={ed.id}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.2 + 0.3 }}
              className="pl-12 relative"
            >
              <motion.div
                className="absolute w-[11px] h-[11px] rounded-full z-10"
                style={{
                  background: ed.status === 'current' ? C.green : '#003d00',
                  border: `2px solid ${ed.status === 'current' ? C.green : 'rgba(0,255,65,0.4)'}`,
                  boxShadow:
                    ed.status === 'current'
                      ? '0 0 12px rgba(0,255,65,0.8)'
                      : 'none',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
                animate={
                  ed.status === 'current'
                    ? {
                        boxShadow: [
                          '0 0 8px rgba(0,255,65,0.5)',
                          '0 0 20px rgba(0,255,65,1)',
                          '0 0 8px rgba(0,255,65,0.5)',
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div
                className="p-5 rounded-xl relative overflow-hidden"
                style={{
                  background: '#000900',
                  border: `1px solid ${ed.status === 'current' ? 'rgba(0,255,65,0.35)' : 'rgba(0,255,65,0.12)'}`,
                  boxShadow:
                    ed.status === 'current'
                      ? '0 0 30px rgba(0,255,65,0.06)'
                      : 'none',
                }}
              >
                {ed.status === 'current' && (
                  <div
                    className="absolute top-0 left-0 w-1 h-full"
                    style={{
                      background: C.green,
                      boxShadow: '0 0 12px rgba(0,255,65,0.8)',
                    }}
                  />
                )}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span style={{ fontSize: 16 }}>{ed.icon}</span>
                      <span
                        style={{
                          color: 'rgba(0,255,65,0.3)',
                          fontFamily: C.mono,
                          fontSize: 10,
                        }}
                      >
                        [{String(i + 1).padStart(2, '0')}]
                      </span>
                      <h3
                        style={{
                          color: C.green,
                          fontFamily: C.mono,
                          fontSize: 14,
                        }}
                      >
                        {ed.institution}
                      </h3>
                    </div>
                    <p
                      style={{
                        color: 'rgba(0,255,65,0.55)',
                        fontFamily: C.mono,
                        fontSize: 11,
                      }}
                    >
                      {ed.board}
                    </p>
                    <p
                      style={{
                        color: 'rgba(0,255,65,0.4)',
                        fontFamily: C.mono,
                        fontSize: 11,
                        marginTop: 4,
                      }}
                    >
                      {ed.level}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {ed.highlights.map((h) => (
                        <span
                          key={h}
                          style={{
                            color: 'rgba(0,255,65,0.45)',
                            fontFamily: C.mono,
                            fontSize: 9,
                            background: 'rgba(0,255,65,0.05)',
                            border: '1px solid rgba(0,255,65,0.1)',
                            padding: '2px 8px',
                            borderRadius: 4,
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-6 text-right">
                    <div>
                      <p
                        style={{
                          color: C.cyan,
                          fontFamily: C.mono,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        {ed.grade}
                      </p>
                      <p
                        style={{
                          color: 'rgba(0,255,65,0.35)',
                          fontFamily: C.mono,
                          fontSize: 9,
                        }}
                      >
                        {ed.gradeLabel.toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          color: statusColor(ed.status),
                          fontFamily: C.mono,
                          fontSize: 11,
                        }}
                      >
                        {ed.period}
                      </p>
                      <p
                        style={{
                          color: statusColor(ed.status) + '80',
                          fontFamily: C.mono,
                          fontSize: 9,
                        }}
                      >
                        {ed.status === 'current' ? 'IN_PROGRESS' : 'COMPLETED'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certs */}
        <div className="mt-16">
          <p
            style={{
              color: 'rgba(0,255,65,0.4)',
              fontFamily: C.mono,
              fontSize: 10,
              letterSpacing: '0.15em',
              marginBottom: 12,
            }}
          >
            CERTIFICATIONS_LOG
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.07 + 0.5 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="p-4 rounded-xl relative overflow-hidden cursor-default"
                style={{
                  background: '#000900',
                  border: '1px solid rgba(0,255,65,0.12)',
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="text-xl">{cert.emoji}</div>
                  <div>
                    <p
                      style={{
                        color: C.green,
                        fontFamily: C.mono,
                        fontSize: 12,
                        marginBottom: 2,
                      }}
                    >
                      {cert.name}
                    </p>
                    <p
                      style={{
                        color: 'rgba(0,255,65,0.4)',
                        fontFamily: C.mono,
                        fontSize: 10,
                      }}
                    >
                      {cert.issuer} · {cert.year}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <span
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      background:
                        cert.status === 'active'
                          ? 'rgba(0,255,65,0.1)'
                          : cert.status === 'in-progress'
                            ? 'rgba(255,204,0,0.1)'
                            : 'rgba(255,255,255,0.04)',
                      color:
                        cert.status === 'active'
                          ? C.green
                          : cert.status === 'in-progress'
                            ? C.yellow
                            : 'rgba(0,255,65,0.35)',
                      fontFamily: C.mono,
                    }}
                  >
                    {cert.status === 'active'
                      ? 'ACTIVE'
                      : cert.status === 'in-progress'
                        ? 'IN_PROGRESS'
                        : 'PLANNED'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CYBER ACHIEVEMENTS ──────────────────────────────────────────────────────
function CyberAchievements() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="cyber-achievements"
      className="relative py-24 overflow-hidden"
      style={{ background: '#000d00' }}
    >
      <AnimatedGrid />
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <CyberHeader number="06" title="ACHIEVEMENTS_LOG" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.1 + 0.3 }}
              whileHover={{
                scale: 1.05,
                y: -6,
                boxShadow: `0 0 30px ${a.color}20`,
              }}
              className="p-5 rounded-xl relative overflow-hidden cursor-default group"
              style={{
                background: '#000900',
                border: `1px solid ${a.color}22`,
              }}
            >
              <div
                className="absolute top-0 right-0 w-28 h-28 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${a.color}10, transparent 70%)`,
                }}
              />
              <motion.div
                className="text-2xl mb-3"
                whileHover={{ scale: 1.3, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {a.badge}
              </motion.div>
              <h3
                style={{
                  color: a.color,
                  fontFamily: C.mono,
                  fontSize: 13,
                  marginBottom: 4,
                }}
              >
                {a.title}
              </h3>
              <p
                style={{
                  color: 'rgba(0,255,65,0.45)',
                  fontFamily: C.mono,
                  fontSize: 10,
                }}
              >
                {a.desc}
              </p>
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, ${a.color}30, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CYBER GITHUB ACTIVITY ───────────────────────────────────────────────────
function CyberGitHub() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const weeks = 26
  const days = 7
  const grid = useRef(
    Array.from({ length: weeks }, () =>
      Array.from({ length: days }, () => Math.random()),
    ),
  ).current

  const colorFor = (v: number) => {
    if (v < 0.2) return 'rgba(0,255,65,0.05)'
    if (v < 0.45) return 'rgba(0,255,65,0.2)'
    if (v < 0.7) return 'rgba(0,255,65,0.5)'
    return 'rgba(0,255,65,0.9)'
  }

  const recentActivity = [
    {
      time: '2h ago',
      msg: 'push: vulnscan-ai — fix CVE detection regex',
      branch: 'main',
    },
    {
      time: '6h ago',
      msg: 'merge PR #47 — add GPT-4o model support',
      branch: 'feature/gpt4o',
    },
    {
      time: '1d ago',
      msg: 'push: ctf-toolkit — add pwntools wrapper',
      branch: 'dev',
    },
    { time: '2d ago', msg: 'release: cipher-vault v2.1.0', branch: 'main' },
    {
      time: '3d ago',
      msg: 'push: agent-forge — LangGraph integration',
      branch: 'feature/langgraph',
    },
  ]

  return (
    <section
      id="cyber-github"
      className="relative py-24 overflow-hidden"
      style={{ background: '#010f01' }}
    >
      <AnimatedGrid />
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <CyberHeader number="07" title="GITHUB_ACTIVITY" />
        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div
              className="p-5 rounded-xl"
              style={{
                background: '#000900',
                border: '1px solid rgba(0,255,65,0.15)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  style={{
                    color: C.green,
                    fontFamily: C.mono,
                    fontSize: 11,
                    letterSpacing: '0.1em',
                  }}
                >
                  CONTRIBUTION_GRAPH
                </span>
                <span
                  style={{
                    color: 'rgba(0,255,65,0.4)',
                    fontFamily: C.mono,
                    fontSize: 10,
                  }}
                >
                  last 6 months
                </span>
              </div>
              <div className="flex gap-1 overflow-hidden">
                {grid.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((val, di) => (
                      <motion.div
                        key={di}
                        className="rounded-sm cursor-pointer"
                        style={{
                          width: 10,
                          height: 10,
                          background: colorFor(val),
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: (wi * days + di) * 0.004 + 0.3 }}
                        whileHover={{ scale: 1.5, background: C.cyan }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex gap-8 mt-5">
                {[
                  { label: 'COMMITS', val: '487' },
                  { label: 'REPOS', val: '32' },
                  { label: 'STARS', val: '340+' },
                ].map((s) => (
                  <div key={s.label}>
                    <p
                      style={{
                        color: C.green,
                        fontFamily: C.mono,
                        fontSize: 18,
                        fontWeight: 700,
                      }}
                    >
                      {s.val}
                    </p>
                    <p
                      style={{
                        color: 'rgba(0,255,65,0.4)',
                        fontFamily: C.mono,
                        fontSize: 9,
                        letterSpacing: '0.1em',
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className="p-5 rounded-xl"
              style={{
                background: '#000900',
                border: '1px solid rgba(0,255,65,0.15)',
                height: '100%',
              }}
            >
              <div className="mb-4">
                <span
                  style={{
                    color: C.green,
                    fontFamily: C.mono,
                    fontSize: 11,
                    letterSpacing: '0.1em',
                  }}
                >
                  RECENT_COMMITS
                </span>
              </div>
              <div className="space-y-4">
                {recentActivity.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="flex flex-col items-center">
                      <motion.div
                        className="w-2 h-2 rounded-full mt-1"
                        style={{
                          background: C.green,
                          boxShadow: '0 0 6px rgba(0,255,65,0.6)',
                        }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.4,
                        }}
                      />
                      {i < recentActivity.length - 1 && (
                        <div
                          className="w-px flex-1 mt-1"
                          style={{ background: 'rgba(0,255,65,0.15)' }}
                        />
                      )}
                    </div>
                    <div className="pb-3">
                      <p
                        style={{
                          color: C.green,
                          fontFamily: C.mono,
                          fontSize: 11,
                          marginBottom: 2,
                        }}
                      >
                        {a.msg}
                      </p>
                      <div className="flex gap-3">
                        <span
                          style={{
                            color: 'rgba(0,255,65,0.35)',
                            fontFamily: C.mono,
                            fontSize: 9,
                          }}
                        >
                          {a.time}
                        </span>
                        <span
                          style={{
                            color: C.cyan,
                            fontFamily: C.mono,
                            fontSize: 9,
                          }}
                        >
                          branch: {a.branch}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── CYBER DASHBOARD ─────────────────────────────────────────────────────────
function CyberDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => setTick((t) => t + 1), 1800)
    return () => clearInterval(iv)
  }, [])

  const cpuVal = 35 + Math.sin(tick * 0.7) * 20
  const memVal = 62 + Math.sin(tick * 0.4 + 1) * 15
  const netVal = 48 + Math.sin(tick * 0.9 + 2) * 25
  const threatVal = tick % 7 === 0 ? 12 : tick % 5 === 0 ? 8 : 3

  const metrics = [
    { label: 'CPU_USAGE', val: cpuVal, color: C.green, unit: '%' },
    { label: 'MEM_USAGE', val: memVal, color: C.cyan, unit: '%' },
    { label: 'NET_TRAFFIC', val: netVal, color: C.yellow, unit: 'Mbps' },
    { label: 'THREATS_BLOCKED', val: threatVal, color: C.red, unit: '/hr' },
  ]

  return (
    <section
      id="cyber-dashboard"
      className="relative py-24 overflow-hidden"
      style={{ background: '#000d00' }}
    >
      <AnimatedGrid />
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <CyberHeader number="08" title="CYBER_DASHBOARD" />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.3 }}
              whileHover={{ scale: 1.03, y: -3 }}
              className="p-4 rounded-xl relative overflow-hidden"
              style={{
                background: '#000900',
                border: `1px solid ${m.color}22`,
              }}
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${m.color}08, transparent 70%)`,
                }}
              />
              <p
                style={{
                  color: 'rgba(0,255,65,0.4)',
                  fontFamily: C.mono,
                  fontSize: 9,
                  letterSpacing: '0.1em',
                  marginBottom: 8,
                }}
              >
                {m.label}
              </p>
              <motion.p
                key={Math.floor(m.val)}
                initial={{ opacity: 0.5, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  color: m.color,
                  fontFamily: C.mono,
                  fontSize: 28,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {Math.round(m.val)}
                <span style={{ fontSize: 12, opacity: 0.6 }}>{m.unit}</span>
              </motion.p>
              <div
                className="mt-3 h-1 rounded-full"
                style={{ background: 'rgba(0,255,65,0.06)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: `${Math.min(m.val, 100)}%` }}
                  transition={{ duration: 1.8, ease: 'easeInOut' }}
                  style={{
                    background: m.color,
                    boxShadow: `0 0 6px ${m.color}50`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <p
              style={{
                color: 'rgba(0,255,65,0.4)',
                fontFamily: C.mono,
                fontSize: 10,
                letterSpacing: '0.15em',
                marginBottom: 12,
              }}
            >
              THREAT_MAP
            </p>
            <ThreatMap />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            <p
              style={{
                color: 'rgba(0,255,65,0.4)',
                fontFamily: C.mono,
                fontSize: 10,
                letterSpacing: '0.15em',
                marginBottom: 12,
              }}
            >
              SYSTEM_LOG
            </p>
            <LiveSystemLog />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── CYBER TERMINAL SECTION ──────────────────────────────────────────────────
function CyberTerminalSection({ onExit }: { onExit: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="cyber-terminal"
      className="relative py-24 overflow-hidden"
      style={{ background: '#010f01' }}
    >
      <AnimatedGrid />
      <div className="max-w-4xl mx-auto px-6 lg:px-10" ref={ref}>
        <CyberHeader number="09" title="INTERACTIVE_TERMINAL" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12"
        >
          <p
            style={{
              color: 'rgba(0,255,65,0.4)',
              fontFamily: C.mono,
              fontSize: 11,
              marginBottom: 12,
            }}
          >
            {'>'} Type 'help' to explore. Try: about, skills, projects, whoami,
            hack, ctf
          </p>
          <Terminal onExit={onExit} />
        </motion.div>
      </div>
    </section>
  )
}

// ─── CYBER CONTACT ────────────────────────────────────────────────────────────
function CyberContact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)

  const handleSend = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!msg.trim()) return
      setSent(true)
      setTimeout(() => setSent(false), 3000)
      setMsg('')
    },
    [msg],
  )

  const channels = [
    { icon: '📧', label: 'EMAIL', value: OWNER.email, color: C.green },
    { icon: '🐙', label: 'GITHUB', value: OWNER.github, color: '#39ff14' },
    { icon: '💼', label: 'LINKEDIN', value: OWNER.linkedin, color: C.cyan },
    { icon: '🖥️', label: 'HACKTHEBOX', value: OWNER.hackthebox, color: C.red },
  ]

  return (
    <section
      id="cyber-contact"
      className="relative py-24 overflow-hidden"
      style={{ background: '#000d00' }}
    >
      <AnimatedGrid />
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <CyberHeader number="10" title="SECURE_CONTACT" />
        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-3"
          >
            <p
              style={{
                color: 'rgba(0,255,65,0.4)',
                fontFamily: C.mono,
                fontSize: 10,
                letterSpacing: '0.15em',
                marginBottom: 16,
              }}
            >
              COMMUNICATION_CHANNELS
            </p>
            {channels.map((ch, i) => (
              <motion.div
                key={ch.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.3 }}
                whileHover={{ x: 8, boxShadow: `0 0 24px ${ch.color}18` }}
                className="flex items-center gap-4 p-4 rounded-xl cursor-pointer"
                style={{
                  background: '#000900',
                  border: `1px solid ${ch.color}18`,
                  transition: 'all 0.3s',
                }}
              >
                <span className="text-lg">{ch.icon}</span>
                <div>
                  <p
                    style={{
                      color: 'rgba(0,255,65,0.4)',
                      fontFamily: C.mono,
                      fontSize: 9,
                      letterSpacing: '0.15em',
                    }}
                  >
                    {ch.label}
                  </p>
                  <p
                    style={{
                      color: ch.color,
                      fontFamily: C.mono,
                      fontSize: 12,
                    }}
                  >
                    {ch.value}
                  </p>
                </div>
                <motion.span
                  className="ml-auto"
                  style={{
                    color: 'rgba(0,255,65,0.2)',
                    fontFamily: C.mono,
                    fontSize: 12,
                  }}
                  whileHover={{ x: 3, color: ch.color }}
                >
                  →
                </motion.span>
              </motion.div>
            ))}
            <div
              className="flex items-center gap-3 mt-6 p-4 rounded-xl"
              style={{
                background: 'rgba(0,255,65,0.04)',
                border: '1px solid rgba(0,255,65,0.15)',
              }}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ background: C.green }}
                animate={{ opacity: [1, 0.2, 1], scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span
                style={{
                  color: C.green,
                  fontFamily: C.mono,
                  fontSize: 11,
                  letterSpacing: '0.1em',
                }}
              >
                AVAILABLE_FOR_MISSIONS :: OPEN_TO_WORK
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p
              style={{
                color: 'rgba(0,255,65,0.4)',
                fontFamily: C.mono,
                fontSize: 10,
                letterSpacing: '0.15em',
                marginBottom: 16,
              }}
            >
              SEND_MESSAGE
            </p>
            <form onSubmit={handleSend} className="space-y-4">
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  border: '1px solid rgba(0,255,65,0.2)',
                  background: '#000900',
                }}
              >
                <div
                  className="px-3 py-1.5"
                  style={{
                    borderBottom: '1px solid rgba(0,255,65,0.1)',
                    background: 'rgba(0,255,65,0.04)',
                  }}
                >
                  <span
                    style={{
                      color: 'rgba(0,255,65,0.3)',
                      fontFamily: C.mono,
                      fontSize: 10,
                    }}
                  >
                    compose message.enc
                  </span>
                </div>
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  rows={6}
                  placeholder="// Your message here..."
                  className="w-full bg-transparent outline-none p-4 resize-none"
                  style={{
                    color: C.green,
                    fontFamily: C.mono,
                    fontSize: 12,
                    caretColor: C.green,
                  }}
                />
              </div>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl"
                    style={{
                      background: 'rgba(0,255,65,0.08)',
                      border: '1px solid rgba(0,255,65,0.3)',
                    }}
                  >
                    <span
                      style={{
                        color: C.green,
                        fontFamily: C.mono,
                        fontSize: 12,
                      }}
                    >
                      ✓ MESSAGE_TRANSMITTED :: ENCRYPTED_CHANNEL_OPEN
                    </span>
                  </motion.div>
                ) : (
                  <motion.button
                    key="btn"
                    type="submit"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 0 25px rgba(0,255,65,0.35)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl font-bold"
                    style={{
                      background: C.green,
                      color: '#000900',
                      fontFamily: C.mono,
                      fontSize: 13,
                      letterSpacing: '0.1em',
                    }}
                  >
                    [ SEND_ENCRYPTED_MESSAGE ]
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── CYBER FOOTER ─────────────────────────────────────────────────────────────
function CyberFooter() {
  return (
    <footer
      className="relative py-12 overflow-hidden"
      style={{
        background: '#000900',
        borderTop: '1px solid rgba(0,255,65,0.1)',
      }}
    >
      <AnimatedGrid />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center relative z-10">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            color: C.green,
            fontFamily: C.mono,
            fontSize: 11,
            letterSpacing: '0.2em',
            marginBottom: 8,
          }}
        >
          {OWNER.name.toUpperCase().replace(' ', '_')} :: CYBERSECURITY_STUDENT
          :: FULLSTACK_DEV :: AI_BUILDER
        </motion.div>
        <p
          style={{
            color: 'rgba(0,255,65,0.25)',
            fontFamily: C.mono,
            fontSize: 10,
          }}
        >
          © 2025 — Built with 💻 TypeScript — Stay Ethical. Stay Secure.
        </p>
      </div>
    </footer>
  )
}

// ─── CYBER NAV ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'ABOUT', href: '#cyber-about' },
  { label: 'SKILLS', href: '#cyber-skills' },
  { label: 'PROJECTS', href: '#cyber-projects' },
  { label: 'OPS', href: '#cyber-internships' },
  { label: 'EDU', href: '#cyber-education' },
  { label: 'GITHUB', href: '#cyber-github' },
  { label: 'DASH', href: '#cyber-dashboard' },
  { label: 'TERMINAL', href: '#cyber-terminal' },
  { label: 'CONTACT', href: '#cyber-contact' },
]

function CyberNav({ onExitCyber }: { onExitCyber: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 },
    )
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.href.replace('#', ''))
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    document
      .getElementById(href.replace('#', ''))
      ?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? 'rgba(0,9,0,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,255,65,0.1)' : 'none',
          transition: 'background 0.4s, border 0.4s',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 rounded-full border absolute inset-0"
                style={{
                  borderColor: 'rgba(0,255,65,0.4)',
                  borderStyle: 'dashed',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: C.green,
                    boxShadow: '0 0 8px rgba(0,255,65,0.8)',
                  }}
                />
              </div>
            </div>
            <div>
              <p
                style={{
                  color: C.green,
                  fontFamily: C.mono,
                  fontSize: 12,
                  lineHeight: 1,
                }}
              >
                {OWNER.name.toUpperCase().replace(' ', '_')}
              </p>
              <p
                style={{
                  color: 'rgba(0,255,65,0.35)',
                  fontFamily: C.mono,
                  fontSize: 8,
                  letterSpacing: '0.15em',
                }}
              >
                CYBER_MODE_ACTIVE
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '')
              return (
                <motion.button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="px-3 py-1.5 rounded text-xs relative"
                  style={{
                    color: isActive ? C.green : 'rgba(0,255,65,0.45)',
                    fontFamily: C.mono,
                    letterSpacing: '0.05em',
                  }}
                  whileHover={{ color: C.green, scale: 1.05 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navActive"
                      className="absolute inset-0 rounded"
                      style={{
                        background: 'rgba(0,255,65,0.07)',
                        border: '1px solid rgba(0,255,65,0.2)',
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={onExitCyber}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 20px rgba(255,0,64,0.4)',
              }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-1.5 rounded text-xs font-bold"
              style={{
                border: '1px solid rgba(255,0,64,0.4)',
                color: C.red,
                fontFamily: C.mono,
                letterSpacing: '0.05em',
                background: 'rgba(255,0,64,0.05)',
              }}
            >
              [EXIT_CYBER]
            </motion.button>
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: C.green, fontFamily: C.mono, fontSize: 18 }}
            >
              {menuOpen ? '✕' : '≡'}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-5 lg:hidden"
            style={{ background: 'rgba(0,9,0,0.98)' }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(item.href)}
                style={{ color: C.green, fontFamily: C.mono, fontSize: 18 }}
              >
                {item.label}
              </motion.button>
            ))}
            <button
              onClick={onExitCyber}
              style={{
                color: C.red,
                fontFamily: C.mono,
                fontSize: 14,
                marginTop: 20,
              }}
            >
              [EXIT_CYBER_MODE]
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export function CyberMode({ onExit }: { onExit: () => void }) {
  const [booted, setBooted] = useState(false)

  const handleDone = useCallback(() => {
    setBooted(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      })
    })
  }, [])

  useEffect(() => {
    document.body.style.overflow = booted ? '' : 'hidden'
    document.documentElement.style.overflow = booted ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [booted])

  return (
    <div style={{ background: '#000d00', color: C.green, fontFamily: C.mono }}>
      <ScanlineOverlay />
      <FlickerOverlay />

      <AnimatePresence>
        {!booted && <BootScreen onDone={handleDone} />}
      </AnimatePresence>

      {booted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ScrollProgress />
          <CyberNav onExitCyber={onExit} />
          <main>
            <CyberHero />
            <CyberAbout />
            <CyberSkills />
            <CyberProjects />
            <CyberInternships />
            <CyberEducation />
            <CyberAchievements />
            <CyberGitHub />
            <CyberDashboard />
            <CyberTerminalSection onExit={onExit} />
            <CyberContact />
          </main>
          <CyberFooter />
        </motion.div>
      )}
    </div>
  )
}
