'use client';

import { Button } from '@intern-3a/shadcn';
import { useApp } from '../../context/app-context';

export default function ExamPage() {
  const { focus } = useApp();

  async function submit() {
    const res = await fetch('/api/exam', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        focusAreaId: focus?._id,
        correct: 7,
        total: 10,
      }),
    });

    const result = await res.json();
    localStorage.setItem('exam-result', JSON.stringify(result));
    window.location.href = '/result';
  }

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-xl font-semibold">Final Check</h2>
      <Button onClick={submit}>Submit Exam</Button>
    </div>
  );
}
