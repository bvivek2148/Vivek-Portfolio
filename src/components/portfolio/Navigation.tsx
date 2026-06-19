import { useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'motion/react'
import { usePortfolioTheme } from './ThemeContext'
import { ResumeModal } from './ResumeModal'
import { LogoLoader } from './LogoLoader'
import type { ThemeMode } from './theme'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
]

function SunIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function CyberIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M6 8l3 3-3 3M11 14h6" />
    </svg>
  )
}

function ResumeIcon() {
  return (
    <svg
      width="13"
      height="13"
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
  )
}

/* ─── Logo Mark ─── */
function LogoMark({
  T,
  isDark,
  onLogoClick,
}: {
  T: ReturnType<typeof usePortfolioTheme>['T']
  isDark: boolean
  onLogoClick: () => void
}) {
  return (
    <motion.button
      onClick={onLogoClick}
      whileHover={{ scale: 1.03 }}
      className="flex items-center gap-3 group"
    >
      <div className="relative w-10 h-10">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke={`url(#logoRing)`}
            strokeWidth="1"
            fill="none"
            strokeDasharray="4 2.5"
            opacity="0.6"
          />
          <circle cx="20" cy="20" r="14" fill={`url(#logoBg)`} />
          <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', serif"
            fontWeight="700"
            fontSize="14"
            fill="white"
            letterSpacing="-0.5"
          >
            VB
          </text>
          <circle
            cx="20"
            cy="2.5"
            r="1.5"
            fill={isDark ? '#7c5cfc' : '#6d44f8'}
          />
          <defs>
            <linearGradient
              id="logoBg"
              x1="6"
              y1="6"
              x2="34"
              y2="34"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={isDark ? '#7c5cfc' : '#6d44f8'} />
              <stop offset="60%" stopColor={isDark ? '#a78bfa' : '#8b6ef5'} />
              <stop offset="100%" stopColor={isDark ? '#22d3ee' : '#0891b2'} />
            </linearGradient>
            <linearGradient
              id="logoRing"
              x1="0"
              y1="0"
              x2="40"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor={isDark ? '#7c5cfc' : '#6d44f8'}
                stopOpacity="1"
              />
              <stop
                offset="100%"
                stopColor={isDark ? '#22d3ee' : '#0891b2'}
                stopOpacity="0.4"
              />
            </linearGradient>
          </defs>
        </svg>
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{
            background: `conic-gradient(from 0deg, transparent 70%, ${
              isDark ? 'rgba(124,92,252,0.5)' : 'rgba(109,68,248,0.5)'
            } 100%)`,
            borderRadius: '50%',
          }}
        />
      </div>
      <div className="hidden sm:flex flex-col leading-none">
        <span
          style={{
            fontFamily: T.fontSerif,
            fontWeight: 600,
            fontSize: 15,
            color: T.text,
            letterSpacing: '-0.01em',
            transition: 'color 0.45s ease',
          }}
        >
          Vivek Bukka
        </span>
        <span
          style={{
            fontFamily: T.fontMono,
            fontSize: 9,
            color: T.violet,
            letterSpacing: '0.18em',
            textTransform: 'uppercase' as const,
            opacity: 0.8,
          }}
        >
          Portfolio
        </span>
      </div>
    </motion.button>
  )
}

/* ─── 3-Way Mode Toggle ─── */
function ModeToggle() {
  const { mode, setMode, T, isDark } = usePortfolioTheme()

  const modes: {
    key: ThemeMode
    icon: React.ReactNode
    label: string
    color: string
  }[] = [
    { key: 'light', icon: <SunIcon />, label: 'Light', color: '#d97706' },
    { key: 'dark', icon: <MoonIcon />, label: 'Dark', color: '#7c5cfc' },
    { key: 'cyber', icon: <CyberIcon />, label: 'Cyber', color: '#00ff41' },
  ]

  return (
    <div
      className="flex items-center rounded-xl p-0.5 gap-0.5"
      style={{
        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        border: `1px solid ${T.border}`,
      }}
    >
      {modes.map((m) => {
        const isActive = mode === m.key
        return (
          <motion.button
            key={m.key}
            onClick={() => setMode(m.key)}
            whileTap={{ scale: 0.92 }}
            aria-label={`Switch to ${m.label} mode`}
            title={`${m.label} Mode`}
            className="relative flex items-center justify-center w-8 h-7 rounded-lg"
            style={{
              color: isActive ? m.color : T.dimmed,
              transition: 'color 0.3s',
            }}
          >
            {isActive && (
              <motion.div
                layoutId="mode-active"
                className="absolute inset-0 rounded-lg"
                style={{
                  background: `${m.color}18`,
                  border: `1px solid ${m.color}30`,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{m.icon}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

export function Navigation() {
  const { isDark, T } = usePortfolioTheme()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [resumeOpen, setResumeOpen] = useState(false)
  const [loaderVisible, setLoaderVisible] = useState(false)

  const rawProgress = useMotionValue(0)
  const progress = useSpring(rawProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY
      setScrolled(sy > 60)
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const p = maxScroll > 0 ? sy / maxScroll : 0
      rawProgress.set(p)
      const sections = ['hero', ...navItems.map((i) => i.href.replace('#', ''))]
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section)
        if (el && sy >= el.offsetTop - 140) {
          setActive(section)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [rawProgress])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleLogoClick = () => {
    setLoaderVisible(true)
  }

  const handleLoaderDone = () => {
    setLoaderVisible(false)
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
  }

  const navBg = isDark
    ? scrolled
      ? 'rgba(8,8,16,0.88)'
      : 'transparent'
    : scrolled
      ? 'rgba(244,241,235,0.92)'
      : 'transparent'

  const navBorder = isDark
    ? scrolled
      ? '1px solid rgba(255,255,255,0.06)'
      : 'none'
    : scrolled
      ? '1px solid rgba(0,0,0,0.08)'
      : 'none'

  return (
    <>
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      <LogoLoader visible={loaderVisible} onDone={handleLoaderDone} />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: navBg,
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: navBorder,
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          style={{
            scaleX: progress,
            transformOrigin: 'left',
            width: '100%',
            background: `linear-gradient(90deg, ${T.violet}, ${T.cyan}, ${T.emerald})`,
            opacity: scrolled ? 1 : 0,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <LogoMark T={T} isDark={isDark} onLogoClick={handleLogoClick} />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.href.replace('#', '')
              const isHovered = hoveredItem === item.href
              return (
                <motion.button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative px-4 py-2 text-sm rounded-lg"
                  style={{
                    color: isActive
                      ? T.violetLight
                      : isHovered
                        ? T.text
                        : T.muted,
                    fontFamily: T.fontBody,
                    fontWeight: isActive ? 600 : 400,
                    transition: 'color 0.2s',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `${T.violet}18`,
                        border: `1px solid ${T.violet}35`,
                      }}
                      transition={{
                        type: 'spring',
                        damping: 28,
                        stiffness: 280,
                      }}
                    />
                  )}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        background: isDark
                          ? 'rgba(255,255,255,0.04)'
                          : 'rgba(0,0,0,0.04)',
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              )
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* 3-way mode toggle */}
            <ModeToggle />

            {/* Resume button */}
            <motion.button
              onClick={() => setResumeOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium"
              style={{
                border: `1px solid ${T.cyan}40`,
                color: T.cyan,
                background: isDark ? `${T.cyan}0a` : `${T.cyan}08`,
                fontFamily: T.fontBody,
                backdropFilter: 'blur(8px)',
              }}
            >
              <ResumeIcon />
              Resume
            </motion.button>

            <motion.a
              href={`mailto:${''}`}
              whileHover={{
                scale: 1.04,
                boxShadow: `0 8px 24px ${T.violet}50`,
              }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold"
              style={{
                background: `linear-gradient(135deg, ${T.violet}, ${T.violetLight})`,
                color: '#ffffff',
                fontFamily: T.fontBody,
                boxShadow: `0 4px 16px ${T.violet}35`,
              }}
            >
              Hire Me ↗
            </motion.a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 rounded-full"
                style={{ background: T.text }}
              />
              <motion.span
                animate={
                  menuOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                className="block w-4 h-0.5 rounded-full"
                style={{ background: T.muted }}
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                }
                className="block w-6 h-0.5 rounded-full"
                style={{ background: T.text }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'ellipse(8% 4% at 95% 3%)' }}
            animate={{ opacity: 1, clipPath: 'ellipse(160% 160% at 95% 3%)' }}
            exit={{ opacity: 0, clipPath: 'ellipse(8% 4% at 95% 3%)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden"
            style={{ background: T.bg }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: `linear-gradient(${T.violet}30 1px, transparent 1px), linear-gradient(90deg, ${T.violet}30 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }}
            />
            {navItems.map((item, i) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => scrollTo(item.href)}
                className="relative text-4xl font-bold"
                style={{ fontFamily: T.fontSerif, color: T.text }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-col items-center gap-4"
            >
              <ModeToggle />
              {/* Resume in mobile menu */}
              <motion.button
                onClick={() => {
                  setMenuOpen(false)
                  setResumeOpen(true)
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-3 rounded-2xl text-base font-semibold"
                style={{
                  border: `1px solid ${T.cyan}40`,
                  color: T.cyan,
                  background: `${T.cyan}0a`,
                  fontFamily: T.fontBody,
                }}
              >
                <ResumeIcon />
                View Resume
              </motion.button>
              <a
                href="mailto:vivek@example.com"
                className="px-8 py-3 rounded-2xl text-base font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${T.violet}, ${T.violetLight})`,
                  color: '#fff',
                  fontFamily: T.fontBody,
                }}
              >
                Get In Touch
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
