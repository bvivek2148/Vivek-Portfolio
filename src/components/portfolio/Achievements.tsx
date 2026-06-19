'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { usePortfolioTheme } from './ThemeContext'

interface Achievement {
  title: string
  description: string
  category: string
  year: string
  metric?: string
  accentKey: 'amber' | 'emerald' | 'cyan' | 'violet' | 'rose'
  icon: string
}

const achievements: Achievement[] = [
  {
    title: 'National CTF Championship',
    accentKey: 'amber',
    icon: '🏆',
    description:
      'Placed Top 50 nationally in the annual CTF competition, solving challenges across web exploitation, reverse engineering, and cryptography.',
    category: 'Competition',
    year: '2024',
    metric: 'Top 50 / 2000+',
  },
  {
    title: 'HackTheBox — Pro Hacker',
    accentKey: 'emerald',
    icon: '🎯',
    description:
      'Achieved Pro Hacker rank by completing 60+ machines spanning beginner to insane difficulty, focusing on Active Directory and Linux privilege escalation.',
    category: 'Platform',
    year: '2024',
    metric: 'Pro Hacker',
  },
  {
    title: 'Published Security Research',
    accentKey: 'cyan',
    icon: '📄',
    description:
      'Authored a paper on AI-assisted vulnerability discovery published in the university research journal, proposing novel automated code auditing approaches.',
    category: 'Research',
    year: '2024',
  },
  {
    title: "Dean's List — 4 Semesters",
    accentKey: 'violet',
    icon: '⭐',
    description:
      'Maintained a GPA above 3.7 for four consecutive semesters while balancing internships, research, and cybersecurity competitions.',
    category: 'Academic',
    year: '2022–2024',
  },
  {
    title: 'Open Source Contributor',
    accentKey: 'violet',
    icon: '💻',
    description:
      'Active contributor to 5+ open-source security projects including a Metasploit module and a privacy browser extension with 200+ combined GitHub stars.',
    category: 'Open Source',
    year: '2023–2024',
    metric: '200+ ⭐',
  },
  {
    title: 'Bug Bounty Hunter',
    accentKey: 'rose',
    icon: '🐛',
    description:
      'Discovered and responsibly disclosed 7 valid vulnerabilities across major bug bounty programs on HackerOne and Bugcrowd, including 2 high-severity findings.',
    category: 'Security',
    year: '2023–2024',
    metric: '7 Valid Reports',
  },
  {
    title: 'Cybersecurity Club President',
    accentKey: 'cyan',
    icon: '👥',
    description:
      "Founded and led the university's Cybersecurity Club with 80+ members — organized weekly workshops, guest speakers, and inter-university CTF events.",
    category: 'Leadership',
    year: '2023–Present',
  },
  {
    title: 'Google Developer Student Club',
    accentKey: 'amber',
    icon: '🚀',
    description:
      'Led technical workshops on web security, OAuth vulnerabilities, and secure coding practices for 100+ students at monthly meetups.',
    category: 'Leadership',
    year: '2023',
  },
]

function AchievementCard({
  achievement,
  index,
}: {
  achievement: Achievement
  index: number
}) {
  const { isDark, T } = usePortfolioTheme()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const accent = T[achievement.accentKey]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: (index % 4) * 0.08 + 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-3xl p-6 cursor-default overflow-hidden"
      style={{
        background: hovered
          ? isDark
            ? `linear-gradient(145deg, ${T.surface}, rgba(12,12,22,0.98))`
            : '#ffffff'
          : isDark
            ? 'rgba(15,15,26,0.7)'
            : 'rgba(255,255,255,0.75)',
        border: hovered ? `1px solid ${accent}28` : `1px solid ${T.border}`,
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 24px 64px ${accent}14`
          : isDark
            ? '0 2px 16px rgba(0,0,0,0.2)'
            : '0 2px 16px rgba(0,0,0,0.06)',
        transition: 'all 0.5s ease',
      }}
    >
      <div
        className="absolute top-0 right-0 w-40 h-40 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at top right, ${accent}${hovered ? '12' : '06'} 0%, transparent 70%)`,
        }}
      />
      <motion.div
        className="absolute top-0 left-4 right-4 h-px rounded"
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.35 }}
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          transformOrigin: 'center',
        }}
      />

      <div className="flex items-start justify-between gap-3 mb-5 relative z-10">
        <motion.div
          animate={
            hovered ? { scale: 1.12, rotate: 6 } : { scale: 1, rotate: 0 }
          }
          transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: `${accent}12`, border: `1px solid ${accent}22` }}
        >
          {achievement.icon}
        </motion.div>
        <span
          style={{
            color: T.dimmed,
            fontSize: 11,
            fontFamily: T.fontMono,
            letterSpacing: '0.04em',
          }}
        >
          {achievement.year}
        </span>
      </div>

      <div className="mb-3 relative z-10">
        <span
          className="px-2.5 py-1 rounded-full text-xs"
          style={{
            background: `${accent}12`,
            color: accent,
            border: `1px solid ${accent}22`,
            fontFamily: T.fontMono,
            fontWeight: 400,
          }}
        >
          {achievement.category}
        </span>
      </div>

      <h3
        className="text-base font-semibold mb-2 relative z-10"
        style={{
          fontFamily: T.fontSerif,
          color: T.text,
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
          fontSize: 17,
          transition: 'color 0.45s ease',
        }}
      >
        {achievement.title}
      </h3>

      <p
        className="leading-relaxed mb-4 relative z-10"
        style={{ color: T.muted, fontSize: 12, fontWeight: 300 }}
      >
        {achievement.description}
      </p>

      {achievement.metric && (
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full relative z-10"
          style={{ background: `${accent}10`, border: `1px solid ${accent}22` }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: accent }}
          />
          <span
            style={{
              color: accent,
              fontSize: 11,
              fontFamily: T.fontMono,
              fontWeight: 700,
            }}
          >
            {achievement.metric}
          </span>
        </div>
      )}
    </motion.div>
  )
}

export function Achievements() {
  const { T } = usePortfolioTheme()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="achievements"
      className="relative py-32 md:py-44 overflow-hidden"
      style={{ background: T.bg, transition: 'background 0.45s ease' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${T.amber}30, transparent)`,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          left: '30%',
          bottom: '-10%',
          width: 600,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${T.violet}05 0%, transparent 70%)`,
          filter: 'blur(30px)',
        }}
      />

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
              06
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
              Achievements & Awards
            </span>
          </motion.div>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end gap-6"
          >
            <h2
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
              Milestones that{' '}
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
                define
              </em>{' '}
              the journey
            </h2>
          </motion.div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, i) => (
            <AchievementCard
              key={achievement.title}
              achievement={achievement}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
