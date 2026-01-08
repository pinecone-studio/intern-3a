'use client';

import { Button, Input } from '@intern-3a/shadcn';
import { useState } from 'react';
import { Track, useApp } from '../../context/app-context';

interface Task {
  topic: string;
  duration: number;
  status?: 'Pending' | 'Completed' | 'Missed';
  day?: string; // Mon, Tue...
}

export default function PlannerPage() {
  const { track, setTrack, focus, setFocus, clearFocus } = useApp();

  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  async function createFocus() {
    if (!track || !title.trim()) return;

    const res = await fetch('/api/focus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ track, title }),
    });

    if (!res.ok) return;

    const focus = await res.json();
    setFocus(focus);
  }

  async function generatePlan() {
    if (!focus) return;

    setLoading(true);

    const res = await fetch('/api/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        focusAreaId: focus._id,
        focusTitle: focus.title,
      }),
    });

    if (!res.ok) {
      setLoading(false);
      return;
    }

    const plan = await res.json();
    setTasks(plan.tasks);
    setLoading(false);
  }

  /* ================= NO FOCUS ================= */
  if (!focus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border p-8 space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">Create Study Focus</h1>

          {/* Track selector */}
          <div className="flex flex-wrap gap-2 justify-center">
            {(['Math', 'English', 'Japanese', 'Chinese', 'Physics'] as Track[]).map((t) => (
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
          <Input placeholder="What topic are you struggling with?" value={title} onChange={(e) => setTitle(e.target.value)} />

          <Button className="w-full" disabled={!track || !title.trim()} onClick={createFocus}>
            Create Study Focus
          </Button>
        </div>
      </div>
    );
  }

  /* ================= PLANNER ================= */
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800">Your Weekly Study Plan</h2>
          <p className="text-gray-500 mt-1">
            {track} · {focus.title}
          </p>
        </div>

        {/* Generate */}
        {tasks.length === 0 && (
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <Button onClick={generatePlan} disabled={loading}>
              {loading ? 'Generating plan...' : 'Generate Study Plan'}
            </Button>
          </div>
        )}

        {/* WEEK GRID */}
        {tasks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-5  gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, dayIndex) => (
              <div key={day} className="space-y-3">
                {/* Day header */}
                <div className="text-sm font-semibold text-gray-600 px-1">{day}</div>

                {/* Tasks */}
                {tasks
                  .filter((_, i) => i % 5 === dayIndex) // түр хуваарилалт
                  .map((t, i) => (
                    <div key={i} className="bg-[#F2F2FD] border  rounded-xl p-4 shadow-sm hover:shadow transition">
                      <div className="font-medium text-gray-800">{t.topic}</div>
                      <div className="text-sm text-gray-500 mt-1">⏱ {t.duration} min</div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {tasks.length > 0 && (
          <div className="flex justify-end">
            <Button onClick={() => (window.location.href = '/exercise')}>Start Exercise →</Button>
          </div>
        )}
      </div>
    </div>
  );
}
