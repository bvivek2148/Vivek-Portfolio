import { createFileRoute } from '@tanstack/react-router'
import {
  PortfolioThemeProvider,
  usePortfolioTheme,
} from '@/components/portfolio/ThemeContext'
import { Navigation } from '@/components/portfolio/Navigation'
import { Hero } from '@/components/portfolio/Hero'
import { About } from '@/components/portfolio/About'
import { Skills } from '@/components/portfolio/Skills'
import { Projects } from '@/components/portfolio/Projects'
import { Experience } from '@/components/portfolio/Experience'
import { Education } from '@/components/portfolio/Education'
import { Achievements } from '@/components/portfolio/Achievements'
import { Footer } from '@/components/portfolio/Footer'
import { CyberMode } from '@/components/portfolio/CyberMode'
import { motion, AnimatePresence } from 'motion/react'

export const Route = createFileRoute('/_public/')({
  component: Index,
})

function PortfolioInner() {
  const { mode, setMode, T } = usePortfolioTheme()
  const isCyber = mode === 'cyber'

  return (
    <AnimatePresence mode="wait">
      {isCyber ? (
        <CyberMode key="cyber" onExit={() => setMode('dark')} />
      ) : (
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="min-h-screen overflow-x-hidden"
          style={{
            background: T.bg,
            scrollBehavior: 'smooth',
            fontFamily: T.fontBody,
            color: T.text,
            transition: 'background 0.45s ease, color 0.45s ease',
          }}
        >
          <Navigation />
          <main className="relative">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Achievements />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Index() {
  return (
    <PortfolioThemeProvider>
      <PortfolioInner />
    </PortfolioThemeProvider>
  )
}
