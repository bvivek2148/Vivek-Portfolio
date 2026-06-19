'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { usePortfolioTheme } from './ThemeContext'
import { OWNER } from './data'

interface ResumeModalProps {
  open: boolean
  onClose: () => void
}

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  const { isDark, T } = usePortfolioTheme()
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const resumeSrc = OWNER.resumeSrc
  const hasResume = Boolean(resumeSrc)

  const handleDownload = () => {
    if (!resumeSrc) return
    const a = document.createElement('a')
    a.href = resumeSrc
    a.download = `${OWNER.firstName}_${OWNER.lastName}_Resume.pdf`
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.click()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          key="resume-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose()
          }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          style={{
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <motion.div
            key="resume-panel"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col w-full max-w-4xl"
            style={{
              height: 'min(90vh, 780px)',
              background: isDark ? '#0c0c18' : '#ffffff',
              border: `1px solid ${T.border}`,
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: `0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px ${T.violet}20`,
            }}
          >
            {/* Header bar */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: `1px solid ${T.border}`,
                background: isDark ? '#080810' : '#f8f7f4',
              }}
            >
              {/* Title */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${T.violet}25, ${T.cyan}15)`,
                    border: `1px solid ${T.violet}30`,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={T.violet}
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
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: T.fontDisplay,
                      fontWeight: 600,
                      fontSize: 15,
                      color: T.text,
                      lineHeight: 1,
                    }}
                  >
                    {OWNER.firstName} {OWNER.lastName}
                  </p>
                  <p
                    style={{
                      fontFamily: T.fontMono,
                      fontSize: 10,
                      color: T.violet,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      opacity: 0.8,
                    }}
                  >
                    Resume / CV
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {hasResume && (
                  <>
                    {/* Open in new tab */}
                    <motion.a
                      href={resumeSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                      style={{
                        border: `1px solid ${T.border}`,
                        color: T.muted,
                        fontFamily: T.fontBody,
                        background: 'transparent',
                        textDecoration: 'none',
                      }}
                    >
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
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15,3 21,3 21,9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Open
                    </motion.a>

                    {/* Download */}
                    <motion.button
                      onClick={handleDownload}
                      whileHover={{
                        scale: 1.04,
                        boxShadow: `0 8px 24px ${T.violet}50`,
                      }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                      style={{
                        background: `linear-gradient(135deg, ${T.violet}, ${T.violetLight})`,
                        color: '#fff',
                        fontFamily: T.fontBody,
                        boxShadow: `0 4px 16px ${T.violet}35`,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7,10 12,15 17,10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download
                    </motion.button>
                  </>
                )}

                {/* Close */}
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 flex items-center justify-center rounded-lg ml-1"
                  style={{
                    background: isDark
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(0,0,0,0.06)',
                    color: T.muted,
                    border: `1px solid ${T.border}`,
                    cursor: 'pointer',
                  }}
                  aria-label="Close resume"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* PDF viewer / placeholder */}
            <div className="flex-1 relative overflow-hidden">
              {hasResume ? (
                <iframe
                  src={`${resumeSrc}#toolbar=0&navpanes=0&scrollbar=1`}
                  className="w-full h-full"
                  style={{ border: 'none' }}
                  title="Resume PDF"
                />
              ) : (
                /* No resume uploaded yet */
                <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
                  {/* Decorative document icon */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="flex items-center justify-center w-24 h-24 rounded-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${T.violet}15, ${T.cyan}10)`,
                      border: `1.5px dashed ${T.violet}40`,
                    }}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={T.violet}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.7"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <line x1="10" y1="9" x2="8" y2="9" />
                    </svg>
                  </motion.div>

                  <div>
                    <h3
                      style={{
                        fontFamily: T.fontSerif,
                        fontSize: 28,
                        fontWeight: 600,
                        color: T.text,
                        marginBottom: 8,
                      }}
                    >
                      Resume Coming Soon
                    </h3>
                    <p
                      style={{
                        fontFamily: T.fontBody,
                        fontSize: 15,
                        color: T.muted,
                        maxWidth: 360,
                        lineHeight: 1.6,
                      }}
                    >
                      Set{' '}
                      <code
                        style={{
                          color: T.violet,
                          fontFamily: T.fontMono,
                          fontSize: 13,
                        }}
                      >
                        resumeSrc
                      </code>{' '}
                      in{' '}
                      <code
                        style={{
                          color: T.cyan,
                          fontFamily: T.fontMono,
                          fontSize: 13,
                        }}
                      >
                        data.ts
                      </code>{' '}
                      to point to your PDF and it will appear here.
                    </p>
                  </div>

                  {/* Decorative grid */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-5"
                    style={{
                      backgroundImage: `linear-gradient(${T.violet} 1px, transparent 1px), linear-gradient(90deg, ${T.violet} 1px, transparent 1px)`,
                      backgroundSize: '40px 40px',
                    }}
                  />
                </div>
              )}
            </div>

            {/* Accent glow corners */}
            <div
              className="absolute top-0 left-0 pointer-events-none"
              style={{
                width: 200,
                height: 200,
                background: `radial-gradient(circle, ${T.violet}08 0%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 right-0 pointer-events-none"
              style={{
                width: 200,
                height: 200,
                background: `radial-gradient(circle, ${T.cyan}06 0%, transparent 70%)`,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
