'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

export interface TrialContextType {
  isGuest: boolean;
  featureUsageCount: number;
  shouldShowSignupPrompt: boolean;
  trackFeatureUsage: () => void;
  dismissSignupPrompt: () => void;
  resetTrialState: () => void;
}

const TrialContext = createContext<TrialContextType | undefined>(undefined);

const FEATURE_THRESHOLD = 3; // Show signup prompt after trying 3 features
const STORAGE_KEY = 'boomnut_trial_state';

export function TrialProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [featureUsageCount, setFeatureUsageCount] = useState(0);
  const [dismissedPrompt, setDismissedPrompt] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load trial state from localStorage on mount
  useEffect(() => {
    if (user) {
      // Authenticated users don't need trial tracking
      setFeatureUsageCount(0);
      setDismissedPrompt(false);
      localStorage.removeItem(STORAGE_KEY);
    } else {
      // Load guest trial state
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const { count, dismissed } = JSON.parse(saved);
          setFeatureUsageCount(count || 0);
          setDismissedPrompt(dismissed || false);
        } catch (e) {
          console.error('Failed to load trial state:', e);
        }
      }
    }
    setIsHydrated(true);
  }, [user]);

  // Save trial state to localStorage whenever it changes
  useEffect(() => {
    if (!user && isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        count: featureUsageCount,
        dismissed: dismissedPrompt,
      }));
    }
  }, [featureUsageCount, dismissedPrompt, user, isHydrated]);

  const trackFeatureUsage = () => {
    if (!user) {
      // Only track for guests
      setFeatureUsageCount(prev => prev + 1);
    }
  };

  const dismissSignupPrompt = () => {
    setDismissedPrompt(true);
  };

  const resetTrialState = () => {
    setFeatureUsageCount(0);
    setDismissedPrompt(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isGuest = !user;
  const shouldShowSignupPrompt = 
    isGuest && 
    featureUsageCount >= FEATURE_THRESHOLD && 
    !dismissedPrompt;

  return (
    <TrialContext.Provider
      value={{
        isGuest,
        featureUsageCount,
        shouldShowSignupPrompt,
        trackFeatureUsage,
        dismissSignupPrompt,
        resetTrialState,
      }}
    >
      {children}
    </TrialContext.Provider>
  );
}

export function useTrial() {
  const context = useContext(TrialContext);
  if (context === undefined) {
    throw new Error('useTrial must be used within a TrialProvider');
  }
  return context;
}
