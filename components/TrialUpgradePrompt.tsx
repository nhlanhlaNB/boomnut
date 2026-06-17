'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Sparkles, Lock, BarChart3, Zap } from 'lucide-react';
import { useTrial } from '@/providers/TrialProvider';
import { useAuth } from '@/hooks/useAuth';

export default function TrialUpgradePrompt() {
  const { shouldShowSignupPrompt, dismissSignupPrompt, featureUsageCount } = useTrial();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (shouldShowSignupPrompt) {
      // Delay showing the prompt slightly for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [shouldShowSignupPrompt]);

  const handleDismiss = () => {
    dismissSignupPrompt();
    setIsVisible(false);
  };

  if (!isVisible || user) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        onClick={handleDismiss}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 px-6 py-8 relative">
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/20 transition"
              title="Close signup prompt"
              aria-label="Close signup prompt"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold text-white">Unlock Your Potential</h2>
            </div>
            <p className="text-white/90 text-sm">You're doing great! Sign up to save your progress and unlock more.</p>
          </div>

          {/* Body */}
          <div className="px-6 py-8">
            {/* Usage info */}
            <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-900">
                You've tried <strong>{featureUsageCount} features</strong> already. Imagine what you can achieve as a member!
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              <div className="flex gap-3">
                <BarChart3 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Save Your Progress</p>
                  <p className="text-gray-600 text-xs">All your study sessions and notes in one place</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Zap className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Unlock Premium Features</p>
                  <p className="text-gray-600 text-xs">Voice tutor, live lectures, essay grading & more</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Lock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Personalized Learning</p>
                  <p className="text-gray-600 text-xs">AI learns your style and adapts to help you succeed</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Link
                href="/signup"
                className="block w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition text-center"
              >
                Create Free Account
              </Link>
              <button
                onClick={handleDismiss}
                className="w-full bg-gray-100 text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-200 transition"
              >
                Keep Exploring (Still Free!)
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-500 mt-4">
              No credit card required. Join thousands of students!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
