'use client';

import { Button, Textarea } from '@intern-3a/shadcn';
import { useState } from 'react';

import { HomeworkHintRequest, HomeworkHintResponse } from '../../types';

export default function HomeworkPage() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<HomeworkHintResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(): Promise<void> {
    setLoading(true);
    setResult(null);

    const payload: HomeworkHintRequest = { question };

    try {
      const res = await fetch('/api/homework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      const data: HomeworkHintResponse = await res.json();
      setResult(data);
    } catch {
      alert('Failed to get hints');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-xl font-semibold">Homework Helper</h1>

      <Textarea placeholder="Paste your homework question here..." value={question} onChange={(e) => setQuestion(e.target.value)} />

      <Button disabled={loading} onClick={submit}>
        {loading ? 'Thinking...' : 'Get Hints'}
      </Button>

      {result && (
        <div className="space-y-3">
          {result.steps.map((s) => (
            <div key={s.step} className="p-4 bg-white border rounded-lg">
              <div className="font-medium">Step {s.step}</div>
              <div className="text-gray-600">{s.hint}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
