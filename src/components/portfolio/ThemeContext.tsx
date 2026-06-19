'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { dark, light, cyber, type Theme, type ThemeMode } from './theme'

interface ThemeContextValue {
  mode: ThemeMode
  isDark: boolean
  isCyber: boolean
  setMode: (m: ThemeMode) => void
  T: Theme
}

const ThemeCtx = createContext<ThemeContextValue>({
  mode: 'dark',
  isDark: true,
  isCyber: false,
  setMode: () => {},
  T: dark,
})

function getTheme(mode: ThemeMode): Theme {
  if (mode === 'light') return light
  if (mode === 'cyber') return cyber
  return dark
}

export function PortfolioThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('dark')

  useEffect(() => {
    const saved = localStorage.getItem(
      'portfolio-theme-mode',
    ) as ThemeMode | null
    if (saved === 'light' || saved === 'cyber' || saved === 'dark') {
      setModeState(saved)
    }
  }, [])

  const setMode = (m: ThemeMode) => {
    setModeState(m)
    localStorage.setItem('portfolio-theme-mode', m)
  }

  // legacy toggle support (keeps existing code working)
  const isDark = mode === 'dark'
  const isCyber = mode === 'cyber'

  return (
    <ThemeCtx.Provider
      value={{ mode, isDark, isCyber, setMode, T: getTheme(mode) }}
    >
      {children}
    </ThemeCtx.Provider>
  )
}

export function usePortfolioTheme() {
  return useContext(ThemeCtx)
}
