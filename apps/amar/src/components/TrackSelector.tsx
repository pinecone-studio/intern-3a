'use client';

import { Button } from '@intern-3a/shadcn';
import { useActiveTrack } from '../context/track-context';
import { LearningTrack } from '../types';

const DEMO_TRACKS: LearningTrack[] = [
  {
    id: 'en',
    title: 'Learn English',
    subject: 'English',
    level: 'Beginner',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'jp',
    title: 'Learn Japanese',
    subject: 'Japanese',
    level: 'Beginner',
    createdAt: new Date().toISOString(),
  },
];

export function TrackSelector() {
  const { activeTrack, setActiveTrack } = useActiveTrack();

  return (
    <div className="flex gap-2 mb-4">
      {DEMO_TRACKS.map((t) => (
        <Button key={t.id} variant={activeTrack?.id === t.id ? 'default' : 'outline'} onClick={() => setActiveTrack(t)}>
          {t.title}
        </Button>
      ))}
    </div>
  );
}
