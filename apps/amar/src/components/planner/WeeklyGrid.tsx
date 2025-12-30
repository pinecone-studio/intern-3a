import { WeeklyStudyPlan } from '../../types';
import { StudyCard } from '../cards/StudyCard';

interface WeeklyGridProps {
  plan: WeeklyStudyPlan;
}

export function WeeklyGrid({ plan }: WeeklyGridProps) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {plan.days.map((day) => (
        <div key={day.date} className="p-4 bg-white border rounded-xl">
          <h3 className="mb-3 font-semibold">
            {new Date(day.date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </h3>

          <div className="space-y-2">
            {day.tasks.map((task) => (
              <StudyCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
