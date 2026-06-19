'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { usePortfolioTheme } from './ThemeContext'
import { OWNER, ABOUT_STATS, ABOUT_TRAITS } from './data'

/* ── Photo Frame Component ── */
function PhotoFrame({
  isDark,
  T,
}: {
  isDark: boolean
  T: ReturnType<typeof usePortfolioTheme>['T']
}) {
  const hasPhoto = Boolean(OWNER.photoSrc)

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: '100%', maxWidth: 380, margin: '0 auto' }}
    >
      {/* Outer decorative ring with gradient animation */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 340,
          height: 340,
          background: `conic-gradient(from 0deg, ${T.violet}60, ${T.cyan}40, ${T.emerald}30, transparent 60%, ${T.violet}60)`,
          borderRadius: '50%',
          filter: 'blur(1px)',
        }}
      />

      {/* Second static glow ring */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 330,
          height: 330,
          border: `1px solid ${T.violet}30`,
          borderRadius: '50%',
          boxShadow: `0 0 60px ${T.violet}20, inset 0 0 40px ${T.violet}08`,
        }}
      />

      {/* Decorative corner accents */}
      {[
        { top: -8, left: -8 },
        { top: -8, right: -8 },
        { bottom: -8, left: -8 },
        { bottom: -8, right: -8 },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 pointer-events-none"
          style={{
            ...pos,
            borderTop: i < 2 ? `2px solid ${T.violet}` : 'none',
            borderBottom: i >= 2 ? `2px solid ${T.violet}` : 'none',
            borderLeft: i % 2 === 0 ? `2px solid ${T.violet}` : 'none',
            borderRight: i % 2 === 1 ? `2px solid ${T.violet}` : 'none',
            opacity: 0.7,
          }}
        />
      ))}

      {/* Main photo container */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 300,
          height: 370,
          borderRadius: 24,
          border: `1px solid ${T.border}`,
          background: isDark
            ? `linear-gradient(160deg, rgba(20,18,40,0.95), rgba(10,10,22,0.98))`
            : `linear-gradient(160deg, #f5f3ff, #ede9fe)`,
          boxShadow: isDark
            ? `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px ${T.violet}15, inset 0 1px 0 rgba(255,255,255,0.06)`
            : `0 40px 80px rgba(109,68,248,0.12), 0 0 0 1px ${T.violet}20`,
          overflow: 'hidden',
        }}
      >
        {hasPhoto ? (
          <img
            src={OWNER.photoSrc}
            alt="Profile"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        ) : (
          /* Beautiful placeholder when no photo provided */
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            {/* Gradient background fill */}
            <div
              className="absolute inset-0"
              style={{
                background: isDark
                  ? `radial-gradient(ellipse at 50% 40%, ${T.violet}20 0%, ${T.cyan}08 50%, transparent 80%)`
                  : `radial-gradient(ellipse at 50% 40%, ${T.violet}15 0%, ${T.cyan}08 50%, transparent 80%)`,
              }}
            />

            {/* Silhouette / avatar */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${T.violet}40, ${T.cyan}25)`,
                  border: `2px solid ${T.violet}50`,
                  boxShadow: `0 0 40px ${T.violet}30`,
                }}
              >
                <svg viewBox="0 0 60 60" width="60" height="60" fill="none">
                  <circle cx="30" cy="22" r="12" fill={`${T.violet}80`} />
                  <ellipse
                    cx="30"
                    cy="48"
                    rx="18"
                    ry="12"
                    fill={`${T.violet}60`}
                  />
                </svg>
              </div>

              <div className="text-center px-6">
                <p
                  style={{
                    color: T.violetLight,
                    fontFamily: T.fontMono,
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase' as const,
                    marginBottom: 6,
                    opacity: 0.8,
                  }}
                >
                  Your Photo Here
                </p>
                <p
                  style={{
                    color: T.dimmed,
                    fontFamily: T.fontMono,
                    fontSize: 9,
                    letterSpacing: '0.1em',
                    opacity: 0.5,
                  }}
                >
                  Set photoSrc in data.ts
                </p>
              </div>
            </div>

            {/* Decorative grid lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: `linear-gradient(${T.violet}40 1px, transparent 1px), linear-gradient(90deg, ${T.violet}40 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
              }}
            />

            {/* Bottom gradient fade */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
              style={{
                background: isDark
                  ? `linear-gradient(to top, rgba(10,10,22,0.9), transparent)`
                  : `linear-gradient(to top, rgba(237,233,254,0.9), transparent)`,
              }}
            />
          </div>
        )}

        {/* Overlay gradient at bottom of photo */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
          style={{
            background: isDark
              ? `linear-gradient(to top, rgba(8,8,18,0.85), transparent)`
              : `linear-gradient(to top, rgba(237,233,254,0.7), transparent)`,
          }}
        />

        {/* Name tag at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-4"
          style={{ zIndex: 10 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                style={{
                  fontFamily: T.fontSerif,
                  fontWeight: 600,
                  fontSize: 16,
                  color: isDark ? '#f0eff8' : T.text,
                  letterSpacing: '-0.01em',
                }}
              >
                {OWNER.name}
              </p>
              <p
                style={{
                  fontFamily: T.fontMono,
                  fontSize: 9,
                  color: T.violetLight,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase' as const,
                  opacity: 0.85,
                }}
              >
                Developer · Security
              </p>
            </div>
            {/* Available badge */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{
                background: `${T.emerald}15`,
                border: `1px solid ${T.emerald}30`,
              }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full block"
                style={{ background: T.emerald }}
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                style={{
                  color: T.emerald,
                  fontSize: 9,
                  fontFamily: T.fontMono,
                  letterSpacing: '0.1em',
                }}
              >
                Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating stat bubbles around the photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.06, y: -4 }}
        className="absolute px-4 py-3 rounded-2xl cursor-default"
        style={{
          right: -20,
          top: 60,
          background: isDark
            ? `linear-gradient(135deg, rgba(20,18,40,0.95), rgba(15,14,28,0.98))`
            : `linear-gradient(135deg, #ffffff, #faf8fe)`,
          border: `1px solid ${T.violet}30`,
          boxShadow: `0 16px 40px ${T.violet}20`,
          backdropFilter: 'blur(20px)',
        }}
      >
        <div
          className="text-xl font-bold"
          style={{ fontFamily: T.fontSerif, color: T.violet }}
        >
          3+
        </div>
        <div style={{ color: T.dimmed, fontSize: 9, fontFamily: T.fontMono }}>
          Yrs Building
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.7, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1.0, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.06, y: -4 }}
        className="absolute px-4 py-3 rounded-2xl cursor-default"
        style={{
          left: -20,
          bottom: 80,
          background: isDark
            ? `linear-gradient(135deg, rgba(20,18,40,0.95), rgba(15,14,28,0.98))`
            : `linear-gradient(135deg, #ffffff, #faf8fe)`,
          border: `1px solid ${T.cyan}30`,
          boxShadow: `0 16px 40px ${T.cyan}20`,
          backdropFilter: 'blur(20px)',
        }}
      >
        <div
          className="text-xl font-bold"
          style={{ fontFamily: T.fontSerif, color: T.cyan }}
        >
          15+
        </div>
        <div style={{ color: T.dimmed, fontSize: 9, fontFamily: T.fontMono }}>
          Projects
        </div>
      </motion.div>
    </div>
  )
}

export function About() {
  const { isDark, T } = usePortfolioTheme()
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const cardY = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden"
      style={{ background: T.bgAlt, transition: 'background 0.45s ease' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${T.violet}30, transparent)`,
        }}
      />

      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          style={{
            position: 'absolute',
            left: '-5%',
            top: '5%',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${T.violet}${isDark ? '08' : '06'} 0%, transparent 65%)`,
            filter: 'blur(40px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '-10%',
            bottom: '0%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${T.cyan}${isDark ? '06' : '04'} 0%, transparent 70%)`,
            filter: 'blur(30px)',
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          {/* LEFT: Text content */}
          <div className="order-1">
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
                01
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
                About Me
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="mb-8 leading-tight"
              style={{
                fontFamily: T.fontSerif,
                fontSize: 'clamp(36px, 5.5vw, 62px)',
                fontWeight: 600,
                color: T.text,
                letterSpacing: '-0.02em',
                transition: 'color 0.45s ease',
              }}
            >
              Building at the edge of{' '}
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
                security & craft
              </em>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-5 mb-10"
            >
              {[
                <>
                  I'm a cybersecurity student at{' '}
                  <span style={{ color: T.violetLight, fontWeight: 500 }}>
                    State University of Technology
                  </span>
                  , double-majoring in Computer Science and Information
                  Security. I combine a hacker's mindset with a builder's hands.
                </>,
                <>
                  My work lives at the intersection of{' '}
                  <span style={{ color: T.text, fontWeight: 500 }}>
                    offensive security
                  </span>
                  ,{' '}
                  <span style={{ color: T.text, fontWeight: 500 }}>
                    full-stack architecture
                  </span>
                  , and{' '}
                  <span style={{ color: T.text, fontWeight: 500 }}>
                    AI automation
                  </span>{' '}
                  — building tools that solve real problems while keeping
                  systems resilient.
                </>,
                <>
                  When I'm not contributing to open-source or competing in CTF
                  challenges, I'm mentoring peers and pushing boundaries with
                  AI-driven agentic coding systems.
                </>,
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
                  className="leading-relaxed"
                  style={{
                    color: T.muted,
                    fontSize: 15,
                    fontWeight: 300,
                    transition: 'color 0.45s ease',
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-4 gap-4 pt-8"
              style={{ borderTop: `1px solid ${T.border}` }}
            >
              {ABOUT_STATS.map((stat, i) => {
                const color = T[stat.colorKey]
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.07, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="cursor-default"
                  >
                    <div
                      className="text-2xl md:text-3xl font-bold mb-1"
                      style={{ fontFamily: T.fontSerif, color }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        color: T.dimmed,
                        fontSize: 10,
                        fontFamily: T.fontMono,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* RIGHT: Photo + traits card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2"
          >
            <motion.div
              style={{ y: cardY }}
              className="flex flex-col items-center gap-8"
            >
              {/* Photo Frame */}
              <PhotoFrame isDark={isDark} T={T} />

              {/* Trait pills below photo */}
              <div className="w-full space-y-2.5 max-w-sm mx-auto">
                {ABOUT_TRAITS.map((trait, i) => {
                  const color = T[trait.colorKey]
                  return (
                    <motion.div
                      key={trait.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      whileHover={{ x: -5, scale: 1.01 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-default"
                      style={{
                        background: `${color}${isDark ? '08' : '10'}`,
                        border: `1px solid ${color}${isDark ? '18' : '22'}`,
                        transition: 'background 0.3s, border 0.3s',
                      }}
                    >
                      <span style={{ color, fontSize: 8 }}>◆</span>
                      <span
                        style={{
                          color: isDark
                            ? 'rgba(240,239,248,0.7)'
                            : 'rgba(15,14,26,0.75)',
                          fontSize: 13,
                          fontFamily: T.fontBody,
                          fontWeight: 400,
                        }}
                      >
                        {trait.label}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
