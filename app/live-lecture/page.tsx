'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTrial } from '@/providers/TrialProvider';
import LiveLectureRecorder from '@/components/LiveLectureRecorder';

export default function LiveLecturePage() {
  const { user, loading } = useAuth();
  const { trackFeatureUsage } = useTrial();

  useEffect(() => {
    trackFeatureUsage();
  }, [trackFeatureUsage]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <LiveLectureRecorder />
    </div>
  );
}
