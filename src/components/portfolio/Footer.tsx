import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { usePortfolioTheme } from './ThemeContext'

const socialLinks = [
  { label: 'GitHub', href: '#', emoji: '🐙', accentKey: 'muted' as const },
  { label: 'LinkedIn', href: '#', emoji: '💼', accentKey: 'cyan' as const },
  {
    label: 'HackTheBox',
    href: '#',
    emoji: '🖥️',
    accentKey: 'emerald' as const,
  },
  {
    label: 'Email',
    href: 'mailto:vivek@example.com',
    emoji: '✉️',
    accentKey: 'violet' as const,
  },
]

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
]

const stats = [
  { value: '15+', label: 'Projects', colorKey: 'violet' as const },
  { value: '2', label: 'Internships', colorKey: 'emerald' as const },
  { value: '5+', label: 'Certifications', colorKey: 'amber' as const },
  { value: '3.87', label: 'GPA', colorKey: 'rose' as const },
]

export function Footer() {
  const { isDark, T } = usePortfolioTheme()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const footerBg = isDark ? '#050508' : '#e8e4dc'

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: footerBg, transition: 'background 0.45s ease' }}
    >
      {/* Top transition */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${T.bg}, ${footerBg})`,
          transition: 'background 0.45s ease',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${T.violet}${isDark ? '12' : '08'} 0%, transparent 65%)`,
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%',
          left: '20%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${T.cyan}${isDark ? '06' : '04'} 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-12 relative z-10">
        {/* Big CTA */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: `${T.emerald}10`,
              border: `1px solid ${T.emerald}25`,
            }}
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: T.emerald }}
              animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span
              style={{
                color: T.emerald,
                fontSize: 11,
                fontFamily: T.fontMono,
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
              }}
            >
              Open to work
            </span>
          </div>

          <h2
            style={{
              fontFamily: T.fontSerif,
              fontSize: 'clamp(40px, 7vw, 88px)',
              fontWeight: 600,
              color: T.text,
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              marginBottom: 24,
              transition: 'color 0.45s ease',
            }}
          >
            Let’s build something{' '}
            <em
              style={{
                fontStyle: 'italic',
                fontWeight: 300,
                background: `linear-gradient(135deg, ${T.violet} 0%, ${T.violetLight} 35%, ${T.cyan} 70%, ${T.emerald} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              extraordinary
            </em>
          </h2>

          <p
            style={{
              color: T.muted,
              fontSize: 16,
              fontWeight: 300,
              maxWidth: 440,
              margin: '0 auto 36px',
              lineHeight: 1.8,
              transition: 'color 0.45s ease',
            }}
          >
            Available for internships, full-time roles, and freelance projects
            in cybersecurity, full-stack, and AI systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="mailto:vivek@example.com"
              whileHover={{
                scale: 1.05,
                boxShadow: `0 24px 56px ${T.violet}50`,
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-semibold"
              style={{
                background: `linear-gradient(135deg, ${T.violet}, ${T.violetLight})`,
                color: '#fff',
                fontFamily: T.fontDisplay,
                boxShadow: `0 8px 32px ${T.violet}40`,
              }}
            >
              <span>Get in Touch</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ fontSize: 16 }}
              >
                →
              </motion.span>
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium"
              style={{
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)'}`,
                color: T.muted,
                background: isDark
                  ? 'rgba(255,255,255,0.03)'
                  : 'rgba(0,0,0,0.03)',
                fontFamily: T.fontBody,
                transition: 'all 0.3s',
              }}
            >
              Download CV ↓
            </motion.a>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 p-8 rounded-3xl"
          style={{
            background: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.04)',
            border: `1px solid ${T.border}`,
          }}
        >
          {stats.map((stat) => {
            const color = T[stat.colorKey]
            return (
              <div key={stat.label} className="text-center">
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ fontFamily: T.fontSerif, color }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    color: T.dimmed,
                    fontSize: 11,
                    fontFamily: T.fontMono,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Links grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${T.violet}40, ${T.cyan}20)`,
                  border: `1px solid ${T.violet}40`,
                }}
              >
                <span
                  className="font-bold text-sm relative z-10"
                  style={{ fontFamily: T.fontDisplay, color: T.violetLight }}
                >
                  V
                </span>
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    background: `conic-gradient(from 0deg, transparent 75%, ${T.violet}35 100%)`,
                  }}
                />
              </div>
              <span
                className="font-bold"
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: 18,
                  color: T.text,
                }}
              >
                Vivek Bukka
              </span>
            </div>
            <p
              style={{
                color: T.dimmed,
                fontSize: 13,
                fontWeight: 300,
                maxWidth: 220,
                lineHeight: 1.8,
              }}
            >
              Building secure, intelligent systems at the intersection of
              cybersecurity and software craft.
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <p
              className="mb-5"
              style={{
                color: T.dimmed,
                fontSize: 10,
                fontFamily: T.fontMono,
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
              }}
            >
              Navigate
            </p>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm transition-all duration-200 hover:text-violet-400"
                    style={{ color: T.muted, fontFamily: T.fontBody }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <p
              className="mb-5"
              style={{
                color: T.dimmed,
                fontSize: 10,
                fontFamily: T.fontMono,
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
              }}
            >
              Connect
            </p>
            <ul className="space-y-3">
              {socialLinks.map((link) => {
                const accent =
                  link.accentKey === 'muted' ? T.muted : T[link.accentKey]
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith('mailto') ? undefined : '_blank'
                      }
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm group"
                      style={{
                        color: T.muted,
                        fontFamily: T.fontBody,
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = accent)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = T.muted)
                      }
                    >
                      <span className="text-base w-5">{link.emoji}</span>
                      <span>{link.label}</span>
                      <span
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ fontSize: 12, color: accent }}
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: `1px solid ${T.border}` }}
        >
          <span
            style={{ color: T.dimmed, fontSize: 12, fontFamily: T.fontMono }}
          >
            © 2025 Vivek Bukka · Built with ❤️ & TypeScript
          </span>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: T.emerald }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span
              style={{
                color: T.dimmed,
                fontSize: 11,
                fontFamily: T.fontMono,
                letterSpacing: '0.1em',
              }}
            >
              Open to opportunities
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
