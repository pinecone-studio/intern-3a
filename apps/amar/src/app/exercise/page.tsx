'use client';

import { Button } from '@intern-3a/shadcn';
import { useEffect, useState } from 'react';
import { useApp } from '../../context/app-context';

interface Question {
  _id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function ExercisePage() {
  const { focus } = useApp();
  const [queue, setQueue] = useState<Question[]>([]);
  const [failed, setFailed] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!focus) return;

    fetch('/api/exercise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        focusAreaId: focus._id,
        focusTitle: focus.title,
      }),
    })
      .then((r) => r.json())
      .then(setQueue);
  }, [focus]);

  function answer(idx: number) {
    const q = queue[current];
    if (idx === q.correctIndex) {
      next();
    } else {
      setFeedback(q.explanation);
      setFailed((f) => [...f, q]);
      setTimeout(next, 1500);
    }
  }

  function next() {
    setFeedback(null);
    if (current + 1 < queue.length) {
      setCurrent(current + 1);
    } else if (failed.length > 0) {
      setQueue(failed);
      setFailed([]);
      setCurrent(0);
    } else {
      window.location.href = '/exam';
    }
  }

  if (!queue.length) return <div className="p-8">Loading…</div>;

  const q = queue[current];

  return (
    <div className="p-8 space-y-4">
      <h3>{q.prompt}</h3>

      {q.options.map((opt, i) => (
        <Button key={i} onClick={() => answer(i)} className="block w-full">
          {opt}
        </Button>
      ))}

      {feedback && <div className="text-red-600">{feedback}</div>}
    </div>
  );
}
