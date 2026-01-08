'use client';

import { Button, Textarea } from '@intern-3a/shadcn';
import { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';

interface Hint {
  hint: string;
}

export default function HelperPage() {
  const [problem, setProblem] = useState('');
  const [steps, setSteps] = useState<Hint[]>([]);

  async function getHints() {
    const res = await fetch('/api/helper', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problem }),
    });

    const data = await res.json();
    setSteps(data.steps);
  }

  return (
    <div className="p-8 space-y-4">
      <Sidebar></Sidebar>
      <Textarea placeholder="Describe where you're stuck" value={problem} onChange={(e) => setProblem(e.target.value)} />

      <Button onClick={getHints}>Get Hints</Button>

      {steps.map((s, i) => (
        <div key={i} className="p-3 bg-white border rounded">
          {s.hint}
        </div>
      ))}
    </div>
  );
}
