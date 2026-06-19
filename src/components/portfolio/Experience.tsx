'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { usePortfolioTheme } from './ThemeContext'

interface Internship {
  company: string
  role: string
  period: string
  location: string
  type: string
  description: string
  achievements: string[]
  tech: string[]
  accentKey: 'rose' | 'violet' | 'emerald' | 'cyan'
  emoji: string
  index: number
}

const internships: Internship[] = [
  {
    company: 'CyberDefense Corp',
    role: 'Security Engineering Intern',
    period: 'Jun 2024 – Aug 2024',
    location: 'San Francisco, CA',
    type: 'On-site · Full-time',
    accentKey: 'rose',
    emoji: '🛡️',
    index: 0,
    description:
      'Worked with the Red Team on internal penetration testing engagements and vulnerability management. Automated threat intelligence collection pipelines and built tooling for the SOC team.',
    achievements: [
      'Identified 12 critical vulnerabilities across 3 internal systems',
      'Built automated CVE monitoring tool used by entire security team',
      'Reduced threat report generation time by 60% through automation',
      'Wrote comprehensive security runbooks still in production use',
    ],
    tech: ['Python', 'Metasploit', 'Burp Suite', 'Splunk', 'JIRA'],
  },
  {
    company: 'NexaCloud Technologies',
    role: 'Full-Stack Developer Intern',
    period: 'May 2023 – Aug 2023',
    location: 'Remote',
    type: 'Remote · Full-time',
    accentKey: 'violet',
    emoji: '☁️',
    index: 1,
    description:
      'Contributed to a SaaS platform serving 50,000+ users. Built new feature modules, optimized API performance, and implemented security hardening across the authentication layer.',
    achievements: [
      'Shipped 4 major feature releases to production',
      'Reduced API response times by 35% through query optimization',
      'Implemented OAuth 2.0 + MFA across the entire platform',
      'Mentored 2 junior engineers on code review processes',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
  },
]

function InternshipCard({ intern }: { intern: Internship }) {
  const { isDark, T } = usePortfolioTheme()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [expanded, setExpanded] = useState(true)
  const [hovered, setHovered] = useState(false)
  const accent = T[intern.accentKey]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: intern.index * 0.2,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {intern.index < internships.length - 1 && (
        <div
          className="absolute left-9 top-full h-8 w-px"
          style={{
            background: `linear-gradient(to bottom, ${accent}40, transparent)`,
          }}
        />
      )}
      <div
        className="rounded-3xl overflow-hidden transition-all duration-500"
        style={{
          background: hovered
            ? isDark
              ? `linear-gradient(145deg, ${T.surface}, rgba(12,12,22,0.98))`
              : '#ffffff'
            : isDark
              ? 'rgba(15,15,26,0.7)'
              : 'rgba(255,255,255,0.8)',
          border: hovered ? `1px solid ${accent}28` : `1px solid ${T.border}`,
          boxShadow: hovered
            ? `0 28px 64px ${accent}12`
            : isDark
              ? '0 2px 20px rgba(0,0,0,0.2)'
              : '0 2px 20px rgba(0,0,0,0.06)',
          transition: 'all 0.5s ease',
        }}
      >
        <motion.div
          className="h-0.5 w-full"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />

        <button
          className="w-full p-7 text-left"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-start gap-5">
            <motion.div
              animate={
                hovered ? { scale: 1.08, rotate: 4 } : { scale: 1, rotate: 0 }
              }
              transition={{ duration: 0.3 }}
              className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl"
              style={{
                background: `${accent}12`,
                border: `1px solid ${accent}22`,
              }}
            >
              {intern.emoji}
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    background: `${accent}12`,
                    color: accent,
                    border: `1px solid ${accent}22`,
                    fontFamily: T.fontMono,
                    fontWeight: 400,
                  }}
                >
                  {intern.type}
                </span>
              </div>
              <h3
                className="font-semibold mb-0.5"
                style={{
                  fontFamily: T.fontSerif,
                  color: T.text,
                  letterSpacing: '-0.01em',
                  fontSize: 20,
                }}
              >
                {intern.company}
              </h3>
              <p
                style={{
                  color: accent,
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: T.fontBody,
                }}
              >
                {intern.role}
              </p>
            </div>
            <div className="flex-shrink-0 text-right hidden sm:flex flex-col items-end gap-1">
              <p
                style={{ color: T.muted, fontSize: 12, fontFamily: T.fontMono }}
              >
                {intern.period}
              </p>
              <p
                style={{
                  color: T.dimmed,
                  fontSize: 11,
                  fontFamily: T.fontMono,
                }}
              >
                {intern.location}
              </p>
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ color: accent, fontSize: 12, marginTop: 4 }}
              >
                ▾
              </motion.span>
            </div>
          </div>
        </button>

        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="mx-7 h-px mb-5" style={{ background: T.border }} />
          <div className="px-7 pb-7 space-y-5">
            <p
              style={{
                color: T.muted,
                fontSize: 14,
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              {intern.description}
            </p>
            <div>
              <p
                className="mb-3"
                style={{
                  color: T.dimmed,
                  fontSize: 10,
                  fontFamily: T.fontMono,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase' as const,
                }}
              >
                Key Achievements
              </p>
              <ul className="space-y-2.5">
                {intern.achievements.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: accent }}
                    />
                    <span
                      style={{
                        color: isDark
                          ? 'rgba(240,239,248,0.65)'
                          : 'rgba(15,14,26,0.65)',
                        fontSize: 13,
                      }}
                    >
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {intern.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full text-xs"
                  style={{
                    background: isDark
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(0,0,0,0.05)',
                    border: `1px solid ${T.border}`,
                    color: T.muted,
                    fontFamily: T.fontMono,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Experience() {
  const { T } = usePortfolioTheme()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden"
      style={{ background: T.bg, transition: 'background 0.45s ease' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${T.cyan}30, transparent)`,
        }}
      />
      <motion.div
        style={{ y: bgY }}
        className="absolute pointer-events-none"
        aria-hidden
      >
        <div
          style={{
            position: 'absolute',
            right: '-8%',
            top: '10%',
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${T.cyan}06 0%, transparent 70%)`,
            filter: 'blur(25px)',
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
              04
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
                textTransform: 'uppercase' as const,
              }}
            >
              Experience
            </span>
          </motion.div>
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: T.fontSerif,
              fontSize: 'clamp(34px, 5vw, 64px)',
              fontWeight: 600,
              color: T.text,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              maxWidth: 560,
              transition: 'color 0.45s ease',
            }}
          >
            Where I've{' '}
            <em
              style={{
                fontStyle: 'italic',
                fontWeight: 300,
                background: `linear-gradient(135deg, ${T.cyan}, ${T.amber})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              contributed
            </em>{' '}
            and grown
          </motion.h2>
        </div>
        <div className="max-w-3xl space-y-5">
          {internships.map((intern) => (
            <InternshipCard key={intern.company} intern={intern} />
          ))}
        </div>
      </div>
    </section>
  )
}
