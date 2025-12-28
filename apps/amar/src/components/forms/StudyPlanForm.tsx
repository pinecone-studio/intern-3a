/* eslint-disable @nx/enforce-module-boundaries */
'use client';

import { Button, Input } from '@intern-3a/shadcn';
import { useState } from 'react';
import { GenerateStudyPlanRequest } from '../../types';

interface StudyPlanFormProps {
  onGenerate: (payload: GenerateStudyPlanRequest) => void;
  loading: boolean;
}

export function StudyPlanForm({ onGenerate, loading }: StudyPlanFormProps) {
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [hours, setHours] = useState<number | ''>('');
  const [level, setLevel] = useState<GenerateStudyPlanRequest['level']>('Beginner');

  function submit() {
    if (!subject || !deadline || hours === '') return;

    onGenerate({
      subject,
      deadline,
      dailyHours: Number(hours),
      level,
    });
  }

  return (
    <div className="p-6 space-y-4 bg-white border rounded-xl">
      <h2 className="text-lg font-semibold">Generate Your Plan</h2>

      <Input placeholder="Subject Name (e.g. Data Structures)" value={subject} onChange={(e) => setSubject(e.target.value)} />

      <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />

      <Input type="number" placeholder="Daily Available Hours" value={hours} onChange={(e) => setHours(Number(e.target.value))} />

      <select className="w-full p-2 border rounded-md" value={level} onChange={(e) => setLevel(e.target.value as GenerateStudyPlanRequest['level'])}>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <Button className="w-full" disabled={loading} onClick={submit}>
        {loading ? 'Generating...' : 'Generate Study Plan'}
      </Button>
    </div>
  );
}
