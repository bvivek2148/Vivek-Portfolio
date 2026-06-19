'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { usePortfolioTheme } from './ThemeContext'

interface Project {
  id: number
  title: string
  tagline: string
  description: string
  tech: string[]
  category: string
  year: string
  highlights: string[]
  github?: string
  live?: string
  accentKey: 'rose' | 'violet' | 'emerald' | 'amber' | 'cyan'
  number: string
  emoji: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'VulnScan AI',
    number: '01',
    emoji: '🛡️',
    tagline: 'Automated vulnerability scanner powered by LLM analysis',
    description:
      'An intelligent vulnerability scanner combining NMAP/Nessus output with GPT-4 analysis to generate human-readable risk reports with prioritized remediation steps. Built for SOC teams, reducing report time by 80%.',
    tech: ['Python', 'FastAPI', 'OpenAI API', 'React', 'PostgreSQL'],
    category: 'Security Tool',
    year: '2024',
    accentKey: 'rose',
    highlights: [
      'Reduced report generation time by 80%',
      'Integrated with 12+ scanning tools',
      'Used by 3 companies in beta testing',
    ],
    github: '#',
    live: '#',
  },
  {
    id: 2,
    title: 'CipherVault',
    number: '02',
    emoji: '🔐',
    tagline: 'End-to-end encrypted password manager — zero knowledge',
    description:
      'A zero-knowledge password manager using AES-256 encryption and Argon2 key derivation. Features browser extension, CLI, and web dashboard with cross-device sync.',
    tech: ['TypeScript', 'Next.js', 'Rust', 'WebCrypto API', 'Supabase'],
    category: 'Web App',
    year: '2024',
    accentKey: 'violet',
    highlights: [
      'Zero-knowledge architecture',
      'Browser extension with autofill',
      '2FA and biometric unlock support',
    ],
    github: '#',
    live: '#',
  },
  {
    id: 3,
    title: 'AgentForge',
    number: '03',
    emoji: '🤖',
    tagline: 'Visual builder for AI agentic workflows',
    description:
      'A drag-and-drop interface for building LLM-powered automation agents. Chain tools, APIs, and logic nodes without code. Supports OpenAI, Anthropic, and local models.',
    tech: ['React', 'TypeScript', 'LangChain', 'Node.js', 'Docker'],
    category: 'AI Platform',
    year: '2024',
    accentKey: 'emerald',
    highlights: [
      'Visual node-based workflow builder',
      'Multi-LLM provider support',
      '50+ pre-built tool integrations',
    ],
    github: '#',
    live: '#',
  },
  {
    id: 4,
    title: 'NetGhost',
    number: '04',
    emoji: '👻',
    tagline: 'Real-time network anomaly detection system',
    description:
      'Real-time packet capture and ML-based anomaly detection. Visualizes traffic patterns, flags suspicious connections, and generates Wireshark-compatible exports.',
    tech: ['Python', 'Scapy', 'scikit-learn', 'React', 'WebSockets'],
    category: 'Security Tool',
    year: '2023',
    accentKey: 'amber',
    highlights: [
      'Real-time anomaly detection',
      'Runs on edge hardware (RPi)',
      'Detected 3 novel attack patterns',
    ],
    github: '#',
  },
  {
    id: 5,
    title: 'CTF Toolkit',
    number: '05',
    emoji: '🏴',
    tagline: 'All-in-one Capture The Flag competition helper',
    description:
      'A comprehensive toolkit for CTF competitions combining exploitation scripts, cryptography helpers, steganography tools, and automated recon pipelines.',
    tech: ['Python', 'Bash', 'Go', 'pwntools', 'Docker'],
    category: 'Security Tool',
    year: '2023',
    accentKey: 'violet',
    highlights: [
      'Used in 20+ CTF competitions',
      'Top 100 team ranking on CTFTime',
      '200+ GitHub stars',
    ],
    github: '#',
  },
  {
    id: 6,
    title: 'SecureAPI',
    number: '06',
    emoji: '🔒',
    tagline: 'Zero-trust API gateway with intelligent threat scoring',
    description:
      'A reverse proxy API gateway implementing zero-trust principles. Features JWT validation, rate limiting, IP reputation scoring, and behavioral anomaly detection.',
    tech: ['Go', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes'],
    category: 'Infrastructure',
    year: '2023',
    accentKey: 'cyan',
    highlights: [
      'Sub-1ms overhead per request',
      'Zero-trust architecture',
      'OWASP Top 10 protection built-in',
    ],
    github: '#',
  },
]

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const { isDark, T } = usePortfolioTheme()
  const accent = T[project.accentKey]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      <div
        className="absolute inset-0"
        style={{
          background: isDark ? 'rgba(4,4,12,0.75)' : 'rgba(15,15,26,0.5)',
          backdropFilter: 'blur(28px)',
        }}
      />
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 240 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl rounded-t-3xl md:rounded-3xl overflow-hidden"
        style={{
          background: isDark
            ? `linear-gradient(145deg, ${T.surface}, #0c0c1a)`
            : '#ffffff',
          border: `1px solid ${T.border}`,
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: isDark
            ? `0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)`
            : `0 40px 80px rgba(0,0,0,0.12)`,
          transition: 'background 0.45s ease',
        }}
      >
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, ${accent}80, ${accent}, ${accent}80)`,
          }}
        />
        <div className="p-8 pb-5">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{
                  background: `${accent}15`,
                  border: `1px solid ${accent}25`,
                }}
              >
                {project.emoji}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      background: `${accent}15`,
                      color: accent,
                      border: `1px solid ${accent}25`,
                      fontFamily: T.fontMono,
                    }}
                  >
                    {project.category}
                  </span>
                  <span
                    style={{
                      color: T.dimmed,
                      fontSize: 12,
                      fontFamily: T.fontMono,
                    }}
                  >
                    {project.year}
                  </span>
                </div>
                <h3
                  className="text-2xl md:text-3xl font-semibold"
                  style={{
                    fontFamily: T.fontSerif,
                    color: T.text,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {project.title}
                </h3>
                <p className="mt-1" style={{ color: T.muted, fontSize: 14 }}>
                  {project.tagline}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg transition-colors"
              style={{
                background: isDark
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(0,0,0,0.06)',
                color: T.muted,
              }}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>
        <div className="mx-8 h-px" style={{ background: T.border }} />
        <div className="p-8 pt-6 space-y-7">
          <p
            style={{
              color: T.muted,
              fontSize: 15,
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            {project.description}
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
              Highlights
            </p>
            <ul className="space-y-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: accent }}
                  />
                  <span
                    style={{
                      color: isDark
                        ? 'rgba(240,239,248,0.7)'
                        : 'rgba(15,14,26,0.7)',
                      fontSize: 14,
                    }}
                  >
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>
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
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
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
          <div className="flex gap-3 pt-1">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: isDark
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(0,0,0,0.06)',
                  border: `1px solid ${T.border}`,
                  color: T.muted,
                  fontFamily: T.fontBody,
                }}
              >
                GitHub ↗
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${accent}cc, ${accent})`,
                  color: '#fff',
                  fontFamily: T.fontBody,
                  boxShadow: `0 6px 20px ${accent}35`,
                }}
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project
  index: number
  onClick: () => void
}) {
  const { isDark, T } = usePortfolioTheme()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const accent = T[project.accentKey]

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: (index % 3) * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="group relative rounded-3xl p-7 cursor-pointer overflow-hidden"
      style={{
        background: hovered
          ? isDark
            ? `linear-gradient(145deg, ${T.surface}, rgba(12,12,24,0.98))`
            : '#ffffff'
          : isDark
            ? 'rgba(15,15,26,0.7)'
            : 'rgba(255,255,255,0.75)',
        border: hovered ? `1px solid ${accent}30` : `1px solid ${T.border}`,
        boxShadow: hovered
          ? `0 32px 80px ${accent}15, 0 0 0 1px ${accent}08`
          : isDark
            ? '0 2px 20px rgba(0,0,0,0.2)'
            : '0 2px 20px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.5s ease',
      }}
    >
      <div
        className="absolute top-0 right-0 w-48 h-48 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at top right, ${accent}${hovered ? '10' : '05'} 0%, transparent 70%)`,
        }}
      />
      <motion.div
        className="absolute top-0 left-6 right-6 h-px"
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.4 }}
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          transformOrigin: 'center',
        }}
      />

      <div className="flex items-center justify-between mb-5">
        <span
          style={{
            color: hovered ? accent : T.dimmed,
            fontFamily: T.fontMono,
            fontSize: 11,
            letterSpacing: '0.1em',
            transition: 'color 0.3s',
          }}
        >
          {project.number}
        </span>
        <span
          className="px-3 py-1 rounded-full text-xs"
          style={{
            background: hovered
              ? `${accent}15`
              : isDark
                ? 'rgba(255,255,255,0.04)'
                : 'rgba(0,0,0,0.04)',
            color: hovered ? accent : T.dimmed,
            border: `1px solid ${hovered ? accent + '30' : T.border}`,
            fontFamily: T.fontMono,
            transition: 'all 0.3s',
          }}
        >
          {project.category}
        </span>
      </div>

      <div className="flex items-start gap-3 mb-3">
        <motion.div
          animate={
            hovered ? { scale: 1.12, rotate: 5 } : { scale: 1, rotate: 0 }
          }
          transition={{ duration: 0.3 }}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: `${accent}12`, border: `1px solid ${accent}22` }}
        >
          {project.emoji}
        </motion.div>
        <h3
          className="text-lg font-semibold leading-tight pt-1"
          style={{
            fontFamily: T.fontSerif,
            color: T.text,
            letterSpacing: '-0.01em',
            fontSize: 20,
          }}
        >
          {project.title}
        </h3>
      </div>

      <p
        className="mb-5 leading-relaxed"
        style={{ color: T.muted, fontSize: 13, fontWeight: 300 }}
      >
        {project.tagline}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech.slice(0, 3).map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 rounded-full text-xs"
            style={{
              background: isDark
                ? 'rgba(255,255,255,0.04)'
                : 'rgba(0,0,0,0.05)',
              border: `1px solid ${T.border}`,
              color: T.dimmed,
              fontFamily: T.fontMono,
            }}
          >
            {t}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span
            style={{
              color: T.dimmed,
              fontSize: 12,
              fontFamily: T.fontMono,
              padding: '4px 6px',
            }}
          >
            +{project.tech.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <motion.span
          animate={{ x: hovered ? 5 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            color: hovered ? accent : T.dimmed,
            fontSize: 13,
            fontFamily: T.fontBody,
            fontWeight: 500,
            transition: 'color 0.3s',
          }}
        >
          View Details →
        </motion.span>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const { T } = usePortfolioTheme()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section
      id="projects"
      className="relative py-32 md:py-44 overflow-hidden"
      style={{ background: T.bgAlt, transition: 'background 0.45s ease' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${T.violet}30, transparent)`,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          right: '-10%',
          top: '20%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${T.violet}06 0%, transparent 70%)`,
          filter: 'blur(30px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-20">
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
              03
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
              Selected Projects
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
              Work that{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 300,
                  background: `linear-gradient(135deg, ${T.violet}, ${T.emerald})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ships
              </em>{' '}
              and solves real problems
            </h2>
            <p
              style={{
                color: T.dimmed,
                fontSize: 14,
                maxWidth: 260,
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Click any project card to explore the full story, tech stack, and
              links.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
