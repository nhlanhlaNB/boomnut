'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTrial } from '@/providers/TrialProvider';
import VisualAnalyzer from '@/components/VisualAnalyzer';

export default function VisualAnalysisPage() {
  const { loading } = useAuth();
  const { trackFeatureUsage } = useTrial();

  useEffect(() => {
    trackFeatureUsage();
  }, [trackFeatureUsage]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <VisualAnalyzer />
    </div>
  );
}
