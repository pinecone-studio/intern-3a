'use client';

import { Button } from '@intern-3a/shadcn';
import { useApp } from '../../context/app-context';

export default function ResultPage() {
  const { clearFocus } = useApp();
  const result = JSON.parse(localStorage.getItem('exam-result') || '{}');

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-xl font-semibold">Result</h2>
      <p>Score: {result.score}</p>

      {result.recommendation === 'REPLAN' ? (
        <Button onClick={() => (window.location.href = '/planner')}>Replan</Button>
      ) : (
        <Button
          onClick={() => {
            clearFocus();
            window.location.href = '/';
          }}
        >
          Next Focus
        </Button>
      )}
    </div>
  );
}
