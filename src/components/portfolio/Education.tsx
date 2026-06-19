'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { usePortfolioTheme } from './ThemeContext'

interface EducationLevel {
  id: string
  level: string
  institution: string
  board: string
  period: string
  grade: string
  gradeLabel: string
  description: string
  highlights: string[]
  accentKey: 'violet' | 'emerald' | 'cyan' | 'amber' | 'rose'
  icon: string
  status: 'completed' | 'current'
}

const educationTimeline: EducationLevel[] = [
  {
    id: 'school',
    level: 'Secondary Education',
    institution: 'Your School Name',
    board: 'CBSE / State Board · Class 1 – 10',
    period: '2011 – 2021',
    grade: '92%',
    gradeLabel: 'Overall Score',
    description:
      'Built a strong foundation in Mathematics, Science, and Computer Science. Developed early interest in programming and logical reasoning through school-level competitions.',
    highlights: [
      'Math Olympiad Participant',
      'Science Fair Winner',
      'Class Representative',
      'Computer Club Lead',
    ],
    accentKey: 'emerald',
    icon: '📚',
    status: 'completed',
  },
  {
    id: 'intermediate',
    level: 'Higher Secondary',
    institution: 'Your College / School Name',
    board: 'CBSE / State Board · Class 11 – 12 · PCM + CS',
    period: '2021 – 2023',
    grade: '88%',
    gradeLabel: 'Board Score',
    description:
      'Specialized in Physics, Chemistry, Mathematics, and Computer Science. Deepened programming skills and explored cybersecurity concepts independently alongside academics.',
    highlights: [
      'JEE / State Entrance Prepared',
      'CS Topper',
      'Coding Club Founder',
      'Hackathon Finalist',
    ],
    accentKey: 'cyan',
    icon: '🏫',
    status: 'completed',
  },
  {
    id: 'btech',
    level: 'Bachelor of Technology',
    institution: 'Your University Name',
    board: 'B.Tech — Computer Science & Engineering',
    period: '2023 – 2027 (Expected)',
    grade: '8.7',
    gradeLabel: 'CGPA / 10',
    description:
      'Currently pursuing B.Tech in CSE with a strong focus on Cybersecurity, Full-Stack Development, and AI-driven systems. Actively building real-world projects and participating in CTFs.',
    highlights: [
      'Cybersecurity Specialization',
      'Full-Stack Projects',
      'AI & Agents Research',
      'CTF Competitor',
    ],
    accentKey: 'violet',
    icon: '🎓',
    status: 'current',
  },
]

interface Certification {
  name: string
  issuer: string
  year: string
  status: 'active' | 'in-progress' | 'planned'
  accentKey: 'amber' | 'rose' | 'cyan' | 'emerald' | 'violet'
  emoji: string
}

const certifications: Certification[] = [
  {
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    year: '2024',
    status: 'active',
    accentKey: 'amber',
    emoji: '🏅',
  },
  {
    name: 'Certified Ethical Hacker',
    issuer: 'EC-Council',
    year: '2024',
    status: 'active',
    accentKey: 'rose',
    emoji: '⚔️',
  },
  {
    name: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    year: '2023',
    status: 'active',
    accentKey: 'cyan',
    emoji: '☁️',
  },
  {
    name: 'OSCP',
    issuer: 'Offensive Security',
    year: '2025',
    status: 'in-progress',
    accentKey: 'violet',
    emoji: '🎯',
  },
  {
    name: 'Google Cybersecurity Certificate',
    issuer: 'Google',
    year: '2023',
    status: 'active',
    accentKey: 'emerald',
    emoji: '🔒',
  },
  {
    name: 'CISSP',
    issuer: 'ISC²',
    year: '2026',
    status: 'planned',
    accentKey: 'violet',
    emoji: '📋',
  },
]

function EducationCard({
  edu,
  index,
  isLast,
}: {
  edu: EducationLevel
  index: number
  isLast: boolean
}) {
  const { isDark, T } = usePortfolioTheme()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const accent = T[edu.accentKey]
  const isCurrent = edu.status === 'current'

  return (
    <div className="relative flex gap-6 md:gap-10">
      {/* Timeline spine */}
      <div
        className="flex flex-col items-center flex-shrink-0"
        style={{ width: 40 }}
      >
        {/* Node */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            delay: index * 0.15 + 0.2,
            duration: 0.5,
            type: 'spring',
            stiffness: 300,
          }}
          className="relative flex items-center justify-center rounded-full z-10"
          style={{
            width: 40,
            height: 40,
            background: isDark
              ? `linear-gradient(135deg, ${accent}20, ${accent}08)`
              : `linear-gradient(135deg, ${accent}18, ${accent}06)`,
            border: `2px solid ${accent}${isCurrent ? '60' : '35'}`,
            boxShadow: isCurrent
              ? `0 0 20px ${accent}35, 0 0 40px ${accent}15`
              : `0 0 10px ${accent}15`,
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          {edu.icon}
          {isCurrent && (
            <motion.div
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-full"
              style={{
                background: `${accent}20`,
                border: `1px solid ${accent}40`,
              }}
            />
          )}
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={inView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{
              delay: index * 0.15 + 0.5,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex-1 w-px mt-2"
            style={{
              minHeight: 40,
              background: `linear-gradient(180deg, ${accent}40, ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'})`,
              transformOrigin: 'top',
            }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{
          delay: index * 0.15 + 0.1,
          duration: 0.75,
          ease: [0.16, 1, 0.3, 1],
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex-1 rounded-3xl overflow-hidden mb-8 cursor-default"
        style={{
          background: isDark
            ? `linear-gradient(145deg, rgba(18,16,32,0.9), rgba(10,10,20,0.95))`
            : 'linear-gradient(145deg, #ffffff, #f9f7f4)',
          border: `1px solid ${hovered ? accent + '30' : T.border}`,
          boxShadow: hovered
            ? isDark
              ? `0 32px 80px ${accent}12, 0 0 0 1px ${accent}08`
              : `0 20px 60px ${accent}10, 0 0 0 1px ${accent}08`
            : isDark
              ? '0 4px 24px rgba(0,0,0,0.3)'
              : '0 4px 24px rgba(0,0,0,0.06)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Top accent line */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
          className="h-0.5"
          style={{
            background: `linear-gradient(90deg, ${accent}, ${accent}40, transparent)`,
          }}
        />

        {/* Corner glow */}
        <div
          className="absolute top-0 right-0 w-56 h-56 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top right, ${accent}${hovered ? '10' : '06'} 0%, transparent 70%)`,
            transition: 'all 0.4s',
          }}
        />

        <div className="p-7 relative z-10">
          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              {/* Status badge */}
              <div className="flex items-center gap-2 mb-3">
                {isCurrent && (
                  <motion.span
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                    style={{
                      background: `${accent}15`,
                      border: `1px solid ${accent}30`,
                      color: accent,
                      fontFamily: T.fontMono,
                      fontSize: 10,
                      letterSpacing: '0.08em',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: accent }}
                    />
                    CURRENTLY ENROLLED
                  </motion.span>
                )}
                {!isCurrent && (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                    style={{
                      background: isDark
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(0,0,0,0.05)',
                      border: `1px solid ${T.border}`,
                      color: T.dimmed,
                      fontFamily: T.fontMono,
                      fontSize: 10,
                      letterSpacing: '0.08em',
                    }}
                  >
                    ✓ COMPLETED
                  </span>
                )}
                <span
                  style={{
                    color: T.dimmed,
                    fontSize: 10,
                    fontFamily: T.fontMono,
                    letterSpacing: '0.1em',
                  }}
                >
                  {edu.period}
                </span>
              </div>

              <p
                style={{
                  color: accent,
                  fontSize: 11,
                  fontFamily: T.fontMono,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}
              >
                {edu.level}
              </p>
              <h3
                style={{
                  fontFamily: T.fontSerif,
                  fontSize: 'clamp(18px, 2.5vw, 22px)',
                  fontWeight: 600,
                  color: T.text,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  marginBottom: 4,
                }}
              >
                {edu.institution}
              </h3>
              <p
                style={{
                  color: T.dimmed,
                  fontSize: 12,
                  fontFamily: T.fontMono,
                  letterSpacing: '0.04em',
                }}
              >
                {edu.board}
              </p>
            </div>

            {/* Grade badge */}
            <motion.div
              whileHover={{ scale: 1.06, rotate: -2 }}
              className="flex-shrink-0 flex flex-col items-center justify-center rounded-2xl px-5 py-3"
              style={{
                background: isDark
                  ? `linear-gradient(135deg, ${accent}18, ${accent}08)`
                  : `linear-gradient(135deg, ${accent}12, ${accent}04)`,
                border: `1px solid ${accent}30`,
                minWidth: 72,
              }}
            >
              <span
                style={{
                  fontFamily: T.fontMono,
                  fontSize: 24,
                  fontWeight: 700,
                  color: accent,
                  lineHeight: 1,
                }}
              >
                {edu.grade}
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontFamily: T.fontMono,
                  color: T.dimmed,
                  marginTop: 4,
                  letterSpacing: '0.08em',
                  textAlign: 'center',
                }}
              >
                {edu.gradeLabel}
              </span>
            </motion.div>
          </div>

          {/* Description */}
          <p
            style={{
              color: T.muted,
              fontSize: 13,
              fontFamily: T.fontBody,
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            {edu.description}
          </p>

          {/* Highlight chips */}
          <div className="flex flex-wrap gap-2">
            {edu.highlights.map((h, i) => (
              <motion.span
                key={h}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.15 + i * 0.05 + 0.4 }}
                whileHover={{ scale: 1.06, y: -2 }}
                className="px-3 py-1.5 rounded-full text-xs cursor-default"
                style={{
                  background: `${accent}10`,
                  border: `1px solid ${accent}22`,
                  color: accent,
                  fontFamily: T.fontBody,
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                }}
              >
                {h}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function CertGrid() {
  const { isDark, T } = usePortfolioTheme()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const getStatusConfig = (status: Certification['status']) =>
    ({
      active: {
        label: 'Active',
        color: T.emerald,
        bg: `${T.emerald}12`,
        border: `${T.emerald}25`,
      },
      'in-progress': {
        label: 'In Progress',
        color: T.amber,
        bg: `${T.amber}12`,
        border: `${T.amber}25`,
      },
      planned: {
        label: 'Planned',
        color: T.dimmed,
        bg: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        border: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      },
    })[status]

  return (
    <div ref={ref}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="mb-6"
        style={{
          color: T.dimmed,
          fontSize: 10,
          fontFamily: T.fontMono,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        Certifications & Credentials
      </motion.p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {certifications.map((cert, i) => {
          const accent = T[cert.accentKey]
          const statusConf = getStatusConfig(cert.status)
          return (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                delay: i * 0.07 + 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -5,
                boxShadow: isDark
                  ? `0 20px 50px ${accent}12`
                  : `0 12px 30px ${accent}10`,
              }}
              className="group relative rounded-2xl p-5 cursor-default overflow-hidden"
              style={{
                background: isDark ? 'rgba(18,16,32,0.8)' : '#ffffff',
                border: `1px solid ${T.border}`,
                transition: 'all 0.35s ease',
              }}
            >
              {/* Hover top line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, ${accent}, ${accent}40, transparent)`,
                }}
              />
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: `${accent}12`,
                    border: `1px solid ${accent}22`,
                  }}
                >
                  {cert.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold mb-0.5 truncate"
                    style={{
                      fontSize: 13,
                      fontFamily: T.fontBody,
                      color: T.text,
                    }}
                  >
                    {cert.name}
                  </p>
                  <p
                    style={{
                      color: T.dimmed,
                      fontSize: 11,
                      fontFamily: T.fontMono,
                    }}
                  >
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: statusConf.bg,
                    color: statusConf.color,
                    border: `1px solid ${statusConf.border}`,
                    fontFamily: T.fontMono,
                  }}
                >
                  {statusConf.label}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export function Education() {
  const { T } = usePortfolioTheme()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="education"
      className="relative py-32 md:py-44 overflow-hidden"
      style={{ background: T.bgAlt, transition: 'background 0.45s ease' }}
    >
      {/* Divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${T.emerald}30, transparent)`,
        }}
      />

      {/* Ambient blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '-6%',
          bottom: '5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${T.violet}06 0%, transparent 70%)`,
          filter: 'blur(35px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          right: '-4%',
          top: '15%',
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${T.cyan}05 0%, transparent 70%)`,
          filter: 'blur(28px)',
        }}
      />

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
              05
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
              Education & Certifications
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
              Academic{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 300,
                  background: `linear-gradient(135deg, ${T.amber}, ${T.emerald})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                journey
              </em>{' '}
              & credentials
            </motion.h2>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex gap-6 flex-shrink-0"
            >
              {[
                { val: '3', label: 'Institutions' },
                { val: '6', label: 'Certifications' },
                { val: '16+', label: 'Years of Study' },
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

        {/* Two column layout */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">
          {/* Left: Timeline */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-8"
              style={{
                color: T.dimmed,
                fontSize: 10,
                fontFamily: T.fontMono,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Academic Timeline
            </motion.p>

            <div>
              {educationTimeline.map((edu, i) => (
                <EducationCard
                  key={edu.id}
                  edu={edu}
                  index={i}
                  isLast={i === educationTimeline.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Right: Certifications */}
          <div className="lg:pt-10">
            <CertGrid />
          </div>
        </div>
      </div>
    </section>
  )
}
