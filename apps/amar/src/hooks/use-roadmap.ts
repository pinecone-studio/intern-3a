import { useEffect, useState } from 'react';
import { LearningRoadmap } from '../types';

export function useRoadmap(trackId?: string) {
  const [roadmap, setRoadmap] = useState<LearningRoadmap | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!trackId) {
      setRoadmap(null);
      return;
    }

    setLoading(true);

    fetch(`/api/roadmap?trackId=${trackId}`)
      .then((res) => res.json())
      .then(setRoadmap)
      .finally(() => setLoading(false));
  }, [trackId]);

  return { roadmap, loading };
}
