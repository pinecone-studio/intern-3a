'use client';

import { Button } from '@intern-3a/shadcn';
import { useState } from 'react';
import { useApp } from '../../context/app-context';

interface Task {
  topic: string;
  duration: number;
}

export default function PlannerPage() {
  // ✅ Hook calls FIRST
  const { focus } = useApp();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Conditional render AFTER hooks
  if (!focus) {
    return <div className="p-8">Select a study focus first.</div>;
  }

  const activeFocus = focus;

  async function generatePlan() {
    setLoading(true);

    const res = await fetch('/api/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        focusAreaId: activeFocus._id,
        focusTitle: activeFocus.title,
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

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-xl font-semibold">Study Plan</h2>
      <p className="text-gray-500">{activeFocus.title}</p>

      {tasks.length === 0 && (
        <Button onClick={generatePlan} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Plan'}
        </Button>
      )}

      {tasks.map((t, i) => (
        <div key={i} className="p-3 bg-white border rounded">
          {t.topic} — {t.duration} min
        </div>
      ))}

      {tasks.length > 0 && <Button onClick={() => (window.location.href = '/exercise')}>Start Exercise</Button>}
    </div>
  );
}
