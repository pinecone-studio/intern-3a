'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Track = 'Math' | 'English' | 'Japanese';

export interface FocusArea {
  _id: string;
  track: Track;
  title: string;
  status: 'active' | 'completed';
}

interface AppContextValue {
  track: Track | null;
  focus: FocusArea | null;
  setTrack: (t: Track) => void;
  setFocus: (f: FocusArea) => void;
  clearFocus: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [track, setTrackState] = useState<Track | null>(null);
  const [focus, setFocusState] = useState<FocusArea | null>(null);

  useEffect(() => {
    const t = localStorage.getItem('track');
    const f = localStorage.getItem('focus');
    if (t) setTrackState(t as Track);
    if (f) setFocusState(JSON.parse(f));
  }, []);

  function setTrack(t: Track) {
    localStorage.setItem('track', t);
    localStorage.removeItem('focus');
    setTrackState(t);
    setFocusState(null);
  }

  function setFocus(f: FocusArea) {
    localStorage.setItem('focus', JSON.stringify(f));
    setFocusState(f);
  }

  function clearFocus() {
    localStorage.removeItem('focus');
    setFocusState(null);
  }

  return <AppContext.Provider value={{ track, focus, setTrack, setFocus, clearFocus }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
