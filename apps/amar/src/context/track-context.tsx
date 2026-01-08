'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { LearningTrack } from '../types';

interface TrackContextValue {
  activeTrack: LearningTrack | null;
  setActiveTrack: (track: LearningTrack) => void;
}

const TrackContext = createContext<TrackContextValue | null>(null);

const STORAGE_KEY = 'active-learning-track';

export function TrackProvider({ children }: { children: React.ReactNode }) {
  const [activeTrack, setActiveTrackState] = useState<LearningTrack | null>(null);

  // 🔹 Load from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setActiveTrackState(JSON.parse(stored));
    }
  }, []);

  // 🔹 Save to localStorage when changed
  function setActiveTrack(track: LearningTrack) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(track));
    setActiveTrackState(track);
  }

  return <TrackContext.Provider value={{ activeTrack, setActiveTrack }}>{children}</TrackContext.Provider>;
}

export function useActiveTrack() {
  const ctx = useContext(TrackContext);
  if (!ctx) {
    throw new Error('useActiveTrack must be used inside TrackProvider');
  }
  return ctx;
}
