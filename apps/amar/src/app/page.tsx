'use client';

import { Button, Input } from '@intern-3a/shadcn';

import { useState } from 'react';
import { Track, useApp } from '../context/app-context';

export default function LandingPage() {
  const { track, setTrack, setFocus, clearFocus } = useApp();
  const [title, setTitle] = useState('');

  async function createFocus() {
    if (!track || !title.trim()) return;

    const res = await fetch('/api/focus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ track, title }),
    });

    const focus = await res.json();
    setFocus(focus);
    window.location.href = '/planner';
  }

  return (
    <div className="max-w-xl p-8 mx-auto space-y-6">
      <h1 className="text-2xl font-bold">AI Study Planner</h1>

      {/* Track selector — ALWAYS visible */}
      <div className="flex gap-2">
        {(['Math', 'English', 'Japanese'] as Track[]).map((t) => (
          <Button
            key={t}
            variant={track === t ? 'default' : 'outline'}
            onClick={() => {
              setTrack(t);
              clearFocus();
            }}
          >
            {t}
          </Button>
        ))}
      </div>

      {/* Focus input */}
      <div className="space-y-2">
        <Input placeholder="What are you struggling with?" value={title} onChange={(e) => setTitle(e.target.value)} />

        <Button onClick={createFocus} disabled={!track || !title.trim()}>
          Create Study Focus
        </Button>
      </div>
    </div>
  );
}
