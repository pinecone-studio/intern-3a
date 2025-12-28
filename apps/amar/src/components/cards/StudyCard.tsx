import { StudyTask, StudyTaskStatus } from '../../types';

interface StudyCardProps {
  task: StudyTask;
}

const STATUS_STYLES: Record<StudyTaskStatus, { bg: string; text: string }> = {
  Pending: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
  },
  Completed: {
    bg: 'bg-green-100',
    text: 'text-green-700',
  },
  Missed: {
    bg: 'bg-red-100',
    text: 'text-red-700',
  },
};

export function StudyCard({ task }: StudyCardProps) {
  const statusStyle = STATUS_STYLES[task.status];

  return (
    <div className="p-3 space-y-1 border rounded-lg bg-gray-50">
      {/* Subject */}
      <div className="text-sm font-medium">{task.subject}</div>

      {/* Topic */}
      <div className="text-xs text-gray-500">{task.topic}</div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <span className="text-gray-600">{task.duration} min</span>

        <span className={`px-2 py-0.5 rounded font-medium ${statusStyle.bg} ${statusStyle.text}`}>{task.status}</span>
      </div>
    </div>
  );
}
