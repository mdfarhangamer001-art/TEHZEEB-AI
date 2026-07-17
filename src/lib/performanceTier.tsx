import React, { createContext, useContext, useEffect, useState } from 'react'
import { Preferences } from '@capacitor/preferences'

export type PerformanceTier = 'low' | 'high'

interface PerformanceConfig {
  tier: PerformanceTier
  setTier: (t: PerformanceTier) => void
  /** Derived settings the UI should read instead of hardcoding effects */
  settings: {
    enable3DOrb: boolean
    particleCount: number
    animationDurationMs: number
    enableBlur: boolean
    maxConcurrentAgents: number
  }
}

const TIER_SETTINGS: Record<PerformanceTier, PerformanceConfig['settings']> = {
  low: {
    enable3DOrb: false,
    particleCount: 0,
    animationDurationMs: 120,
    enableBlur: false,
    maxConcurrentAgents: 1
  },
  high: {
    enable3DOrb: true,
    particleCount: 400,
    animationDurationMs: 300,
    enableBlur: true,
    maxConcurrentAgents: 4
  }
}

const STORAGE_KEY = 'novax_performance_tier'

const PerformanceContext = createContext<PerformanceConfig | null>(null)

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [tier, setTierState] = useState<PerformanceTier>('low')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    Preferences.get({ key: STORAGE_KEY }).then(({ value }) => {
      if (value === 'high' || value === 'low') setTierState(value)
      setLoaded(true)
    })
  }, [])

  const setTier = (t: PerformanceTier) => {
    setTierState(t)
    Preferences.set({ key: STORAGE_KEY, value: t })
  }

  if (!loaded) return null // avoid a flash of the wrong tier's effects

  return (
    <PerformanceContext.Provider value={{ tier, setTier, settings: TIER_SETTINGS[tier] }}>
      {children}
    </PerformanceContext.Provider>
  )
}

export function usePerformanceTier() {
  const ctx = useContext(PerformanceContext)
  if (!ctx) throw new Error('usePerformanceTier must be used inside PerformanceProvider')
  return ctx
}
