'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTrial } from '@/providers/TrialProvider';
import ProgressDashboard from '@/components/ProgressDashboard';

export default function ProgressPage() {
  const { loading } = useAuth();
  const { trackFeatureUsage } = useTrial();

  useEffect(() => {
    trackFeatureUsage();
  }, [trackFeatureUsage]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return <ProgressDashboard />;
}
