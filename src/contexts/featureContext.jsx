import React, { createContext, useContext } from 'react'
import { featureFlags } from './ff'

const FeatureFlagContext = createContext(featureFlags)

export const FeatureFlagProvider = ({ flags = featureFlags, children }) => {
  return (
    <FeatureFlagContext.Provider value={flags}>
      {children}
    </FeatureFlagContext.Provider>
  )
}

export const useFeatureFlags = () => useContext(FeatureFlagContext)

export const useFeatureFlag = (flagName) => {
  const flags = useFeatureFlags()
  return flags[flagName] ?? false
}
