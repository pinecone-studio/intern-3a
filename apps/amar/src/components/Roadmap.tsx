import { LearningRoadmap } from '../types';

export function Roadmap({ roadmap }: { roadmap: LearningRoadmap }) {
  return (
    <div className="p-4 space-y-2 bg-white border rounded-lg">
      <h2 className="font-semibold">Learning Roadmap</h2>

      {roadmap.stages.map((s) => (
        <div key={s.id} className={`p-2 rounded ${s.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
          {s.order}. {s.title}
        </div>
      ))}
    </div>
  );
}
