'use client';

import { useState } from 'react';

import { StudyPlanForm } from '../../components/forms/StudyPlanForm';
import { WeeklyGrid } from '../../components/planner/WeeklyGrid';
import { GenerateStudyPlanRequest, GenerateStudyPlanResponse, WeeklyStudyPlan } from '../../types';

export default function StudyPlannerPage() {
  const [plan, setPlan] = useState<WeeklyStudyPlan | null>(null);
  const [loading, setLoading] = useState(false);

  async function generatePlan(payload: GenerateStudyPlanRequest): Promise<void> {
    setLoading(true);

    try {
      const res = await fetch('/api/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to generate study plan');
      }

      const data: GenerateStudyPlanResponse = await res.json();
      setPlan(data.plan);
    } catch (error) {
      console.error(error);
      alert('Error generating study plan');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
      <StudyPlanForm onGenerate={generatePlan} loading={loading} />

      {plan ? <WeeklyGrid plan={plan} /> : <div className="flex items-center justify-center text-gray-400 border rounded-xl">Your weekly study plan will appear here</div>}
    </div>
  );
}
