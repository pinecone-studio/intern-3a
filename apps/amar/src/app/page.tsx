/* eslint-disable @nx/enforce-module-boundaries */
import { Button } from '@intern-3a/shadcn';

const features = [
  {
    title: 'Study Planner',
    desc: 'Generate personalized study plans based on deadlines and time.',
    href: '/planner',
  },
  {
    title: 'Homework Helper',
    desc: 'Get AI-guided hints without direct answers.',
    href: '/homework',
  },
  {
    title: 'Exam & Analysis',
    desc: 'Generate exams and analyze performance.',
    href: '/exam',
  },
];

export default function LandingPage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">AI Learning Intelligence Platform</h1>
      <p className="mb-6 text-gray-500">Adaptive learning powered by AI</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="p-6 bg-white border rounded-xl">
            <h3 className="mb-2 font-semibold">{f.title}</h3>
            <p className="mb-4 text-sm text-gray-500">{f.desc}</p>
            <Button asChild>
              <a href={f.href}>Open Demo</a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
