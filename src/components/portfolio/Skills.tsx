'use client'

import { useRef, useState } from 'react'
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'motion/react'
import { usePortfolioTheme } from './ThemeContext'

interface Skill {
  name: string
  level: number
  tag?: string
}
interface SkillCategory {
  id: string
  title: string
  subtitle: string
  skills: Skill[]
  accentKey: 'rose' | 'violet' | 'emerald' | 'cyan' | 'amber'
  icon: string
  description: string
}

const skillCategories: SkillCategory[] = [
  {
    id: 'cybersec',
    title: 'Cybersecurity',
    subtitle: 'Offense & Defense',
    accentKey: 'rose',
    icon: '🛡️',
    description:
      'From penetration testing to malware analysis, building security-first instincts.',
    skills: [
      { name: 'Penetration Testing', level: 85, tag: 'Core' },
      { name: 'Network Security', level: 80, tag: 'Core' },
      { name: 'OSINT & Recon', level: 82 },
      { name: 'Vulnerability Assessment', level: 78 },
      { name: 'CTF Challenges', level: 88, tag: 'Competitive' },
      { name: 'Malware Analysis', level: 65 },
      { name: 'Cryptography', level: 74 },
      { name: 'Incident Response', level: 70 },
    ],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack',
    subtitle: 'Web & App Dev',
    accentKey: 'violet',
    icon: '⚡',
    description:
      'Crafting end-to-end digital products with modern frameworks and clean architecture.',
    skills: [
      { name: 'React / Next.js', level: 90, tag: 'Expert' },
      { name: 'TypeScript', level: 88, tag: 'Expert' },
      { name: 'Node.js / Express', level: 85, tag: 'Core' },
      { name: 'Python', level: 87, tag: 'Core' },
      { name: 'PostgreSQL / MongoDB', level: 80 },
      { name: 'Docker / K8s', level: 72 },
      { name: 'Tailwind CSS', level: 93, tag: 'Expert' },
      { name: 'GraphQL', level: 68 },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Agents',
    subtitle: 'Automation & Intelligence',
    accentKey: 'emerald',
    icon: '🤖',
    description:
      'Building agentic systems, RAG pipelines, and LLM-powered tools that actually ship.',
    skills: [
      { name: 'LLM Integration', level: 85, tag: 'Core' },
      { name: 'Agentic Coding', level: 83, tag: 'Speciality' },
      { name: 'Prompt Engineering', level: 90, tag: 'Expert' },
      { name: 'LangChain / LlamaIndex', level: 78 },
      { name: 'RAG Systems', level: 75 },
      { name: 'ML / PyTorch', level: 65 },
      { name: 'Vector Databases', level: 72 },
      { name: 'OpenAI / Anthropic APIs', level: 88 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Infra',
    subtitle: 'Platforms & Cloud',
    accentKey: 'cyan',
    icon: '🔧',
    description:
      'The toolchain behind reliable, scalable deployments across cloud and local envs.',
    skills: [
      { name: 'Git / GitHub Actions', level: 92, tag: 'Daily' },
      { name: 'AWS / GCP', level: 74 },
      { name: 'Burp Suite', level: 82, tag: 'Core' },
      { name: 'Kali Linux', level: 88 },
      { name: 'Metasploit', level: 78 },
      { name: 'Wireshark / Nmap', level: 85, tag: 'Core' },
      { name: 'Linux Administration', level: 83 },
      { name: 'Terraform', level: 62 },
    ],
  },
]

// Radial SVG ring for individual skill
function RadialRing({
  level,
  size = 76,
  stroke = 4,
  accent,
  inView,
  delay = 0,
  isDark,
}: {
  level: number
  size?: number
  stroke?: number
  accent: string
  inView: boolean
  delay?: number
  isDark: boolean
}) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const cx = size / 2
  const cy = size / 2

  return (
    <svg
      width={size}
      height={size}
      className="absolute inset-0"
      style={{ transform: 'rotate(-90deg)' }}
    >
      {/* Track */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}
        strokeWidth={stroke}
      />
      {/* Fill */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={accent}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={
          inView
            ? { strokeDashoffset: circ - (level / 100) * circ }
            : { strokeDashoffset: circ }
        }
        transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ filter: `drop-shadow(0 0 4px ${accent}80)` }}
      />
    </svg>
  )
}

// Single skill pill card with radial ring
function SkillPill({
  skill,
  accent,
  inView,
  index,
  isDark,
  T,
}: {
  skill: Skill
  accent: string
  inView: boolean
  index: number
  isDark: boolean
  T: Record<string, string>
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: index * 0.065 + 0.2,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center gap-4 p-3.5 rounded-2xl cursor-default group"
      style={{
        background: hovered
          ? isDark
            ? `linear-gradient(135deg, ${accent}10, ${accent}04)`
            : `linear-gradient(135deg, ${accent}08, ${accent}02)`
          : isDark
            ? 'rgba(255,255,255,0.03)'
            : 'rgba(0,0,0,0.03)',
        border: `1px solid ${hovered ? accent + '30' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        transition: 'all 0.35s ease',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
      }}
    >
      {/* Ring container */}
      <div className="relative flex-shrink-0" style={{ width: 44, height: 44 }}>
        <RadialRing
          level={skill.level}
          size={44}
          stroke={3}
          accent={accent}
          inView={inView}
          delay={index * 0.065 + 0.3}
          isDark={isDark}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontSize: 9,
            fontFamily: T.fontMono,
            color: hovered ? accent : T.muted,
            fontWeight: 600,
            transition: 'color 0.3s',
          }}
        >
          {skill.level}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p
          style={{
            fontSize: 13,
            fontFamily: T.fontBody,
            color: hovered ? T.text : T.muted,
            fontWeight: hovered ? 500 : 400,
            transition: 'color 0.3s',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {skill.name}
        </p>
        {skill.tag && (
          <span
            style={{
              fontSize: 9,
              fontFamily: T.fontMono,
              color: accent,
              letterSpacing: '0.08em',
              opacity: 0.8,
            }}
          >
            {skill.tag}
          </span>
        )}
      </div>

      {/* Hover accent bar */}
      <motion.div
        className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
        animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ background: accent }}
      />
    </motion.div>
  )
}

// 3D tilt card for active category
function CategoryPanel({
  category,
  isActive,
}: {
  category: SkillCategory
  isActive: boolean
}) {
  const { isDark, T } = usePortfolioTheme()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const accent = T[category.accentKey]

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
    rotateY.set(x * 8)
    rotateX.set(-y * 6)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  // Big radial stat in header
  const avgLevel = Math.round(
    category.skills.reduce((a, s) => a + s.level, 0) / category.skills.length,
  )

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={category.id}
          ref={ref}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.97 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          className="rounded-3xl overflow-hidden"
        >
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: isDark
                ? `linear-gradient(145deg, rgba(18,16,32,0.95), rgba(10,10,20,0.98))`
                : 'linear-gradient(145deg, #ffffff, #f8f6f2)',
              border: `1px solid ${accent}20`,
              boxShadow: isDark
                ? `0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px ${accent}10, inset 0 1px 0 ${accent}08`
                : `0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px ${accent}10`,
            }}
          >
            {/* Card header */}
            <div
              className="relative p-8 pb-6"
              style={{
                background: `linear-gradient(135deg, ${accent}10 0%, transparent 60%)`,
                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              }}
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top right, ${accent}12 0%, transparent 65%)`,
                }}
              />
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: [0, 8, -4, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{
                      background: `${accent}18`,
                      border: `1px solid ${accent}30`,
                    }}
                  >
                    {category.icon}
                  </motion.div>
                  <div>
                    <h3
                      style={{
                        fontFamily: T.fontDisplay,
                        fontSize: 22,
                        fontWeight: 700,
                        color: T.text,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {category.title}
                    </h3>
                    <p
                      style={{
                        color: T.dimmed,
                        fontSize: 11,
                        fontFamily: T.fontMono,
                        letterSpacing: '0.08em',
                      }}
                    >
                      {category.subtitle}
                    </p>
                  </div>
                </div>
                {/* Big ring */}
                <div
                  className="relative flex-shrink-0"
                  style={{ width: 72, height: 72 }}
                >
                  <RadialRing
                    level={avgLevel}
                    size={72}
                    stroke={5}
                    accent={accent}
                    inView={inView}
                    delay={0.1}
                    isDark={isDark}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        fontFamily: T.fontMono,
                        color: accent,
                      }}
                    >
                      {avgLevel}
                    </span>
                    <span
                      style={{
                        fontSize: 7,
                        color: T.dimmed,
                        letterSpacing: '0.1em',
                        fontFamily: T.fontMono,
                      }}
                    >
                      AVG
                    </span>
                  </div>
                </div>
              </div>
              <p
                style={{
                  color: T.muted,
                  fontSize: 13,
                  fontFamily: T.fontBody,
                  marginTop: 16,
                  lineHeight: 1.6,
                }}
              >
                {category.description}
              </p>
            </div>

            {/* Skills grid */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {category.skills.map((skill, i) => (
                <SkillPill
                  key={skill.name}
                  skill={skill}
                  accent={accent}
                  inView={inView}
                  index={i}
                  isDark={isDark}
                  T={T as Record<string, string>}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Skills() {
  const { isDark, T } = usePortfolioTheme()
  const [activeId, setActiveId] = useState('cybersec')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const activeCategory = skillCategories.find((c) => c.id === activeId)!

  // Floating orbs
  const orbs = [
    { size: 400, x: '-5%', y: '10%', color: T.violet, opacity: '06' },
    { size: 350, x: '70%', y: '60%', color: T.emerald, opacity: '05' },
    { size: 280, x: '40%', y: '-5%', color: T.cyan, opacity: '04' },
  ]

  return (
    <section
      id="skills"
      className="relative py-32 md:py-44 overflow-hidden"
      style={{ background: T.bg, transition: 'background 0.45s ease' }}
    >
      {/* Divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${T.violet}30, transparent)`,
        }}
      />

      {/* Background orbs */}
      {orbs.map((o, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: o.x,
            top: o.y,
            width: o.size,
            height: o.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${o.color}${o.opacity} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-16" ref={ref}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span
              style={{
                color: T.violet,
                fontFamily: T.fontMono,
                fontSize: 11,
                letterSpacing: '0.15em',
              }}
            >
              02
            </span>
            <div
              className="h-px w-12"
              style={{
                background: `linear-gradient(90deg, ${T.violet}70, transparent)`,
              }}
            />
            <span
              style={{
                color: T.dimmed,
                fontFamily: T.fontMono,
                fontSize: 10,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
              }}
            >
              Skills & Expertise
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontFamily: T.fontSerif,
                fontSize: 'clamp(34px, 5vw, 64px)',
                fontWeight: 600,
                color: T.text,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                maxWidth: 540,
              }}
            >
              A{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 300,
                  background: `linear-gradient(135deg, ${T.violet}, ${T.cyan})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                versatile
              </em>{' '}
              stack built for offense & craft
            </motion.h2>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex gap-6 lg:gap-8 flex-shrink-0"
            >
              {[
                { val: '30+', label: 'Skills' },
                { val: '4', label: 'Domains' },
                { val: '85%', label: 'Avg Proficiency' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    style={{
                      fontFamily: T.fontSerif,
                      fontSize: 28,
                      fontWeight: 700,
                      color: T.text,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.val}
                  </p>
                  <p
                    style={{
                      color: T.dimmed,
                      fontSize: 10,
                      fontFamily: T.fontMono,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {skillCategories.map((cat) => {
            const isActive = cat.id === activeId
            const accent = T[cat.accentKey]
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-medium transition-all"
                style={{
                  fontFamily: T.fontBody,
                  background: isActive
                    ? isDark
                      ? `${accent}18`
                      : `${accent}12`
                    : isDark
                      ? 'rgba(255,255,255,0.04)'
                      : 'rgba(0,0,0,0.04)',
                  border: `1px solid ${isActive ? accent + '35' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  color: isActive ? accent : T.muted,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? `0 4px 20px ${accent}15` : 'none',
                }}
              >
                <span style={{ fontSize: 16 }}>{cat.icon}</span>
                <span>{cat.title}</span>
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ border: `1px solid ${accent}25` }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Active panel */}
        <div>
          <CategoryPanel category={activeCategory} isActive={true} />
        </div>

        {/* Bottom decorative row — all category accent dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center justify-center gap-6 mt-14 flex-wrap"
        >
          {skillCategories.map((cat) => {
            const accent = T[cat.accentKey]
            const isActive = cat.id === activeId
            return (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className="flex items-center gap-2 cursor-pointer group"
                style={{ border: 'none', background: 'none', padding: 0 }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.4 : 1,
                    opacity: isActive ? 1 : 0.45,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: accent }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: T.fontMono,
                    color: isActive ? accent : T.dimmed,
                    letterSpacing: '0.06em',
                    transition: 'color 0.3s',
                  }}
                >
                  {cat.title}
                </span>
              </button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
