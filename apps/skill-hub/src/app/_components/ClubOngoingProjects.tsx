'use client';

import { Button } from '@intern-3a/shadcn';
import { Calendar, ChevronRight, Flame, FolderKanban, Sparkles, Sprout, Users } from 'lucide-react';

interface Project {
  _id: string;
  projectName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Pro';
  description: string;
  classLevel: string;
  childrenCount: number;
  startDate: Date | string;
  finishDate: Date | string;
}

interface Props {
  projects: Project[];
  onViewProject: (projectId: string) => void;
}

const DIFFICULTY_MN: Record<string, string> = {
  Beginner: 'Анхан',
  Intermediate: 'Дунд',
  Pro: 'Ахисан',
};

const DIFFICULTY_COLOR: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  Beginner: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-600',
    badge: 'bg-green-100 text-green-700',
  },
  Intermediate: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-700',
  },
  Pro: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    badge: 'bg-purple-100 text-purple-700',
  },
};

export default function ClubOngoingProjects({ projects, onViewProject }: Props) {
  if (!projects || projects.length === 0) {
    return <div className="p-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-slate-400 font-medium text-sm">Төсөл одоогоор байхгүй байна.</div>;
  }

  // Show only first 5 projects, similar to ClubNextClasses showing 5 schedules
  const displayProjects = projects.slice(0, 5);

  // Format date helper
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}/${mm}/${dd}`;
  };

  return (
    <div className="space-y-4 md:space-y-5 animate-in fade-in duration-500">
      {/* HEADER */}
      <h3 className="text-base md:text-lg font-black flex items-center gap-2 text-slate-800 uppercase tracking-tight px-1">
        <FolderKanban className="w-5 h-5 text-orange-600" />
        Хэрэгжүүлж буй төслүүд
      </h3>

      {/* LIST */}
      <div className="space-y-3">
        {displayProjects.map((project, index) => {
          const colors = DIFFICULTY_COLOR[project.difficulty] || DIFFICULTY_COLOR.Beginner;

          return (
            <div
              key={project._id}
              className={`group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-5 rounded-2xl border transition-all active:scale-[0.99]
                ${index === 0 ? `${colors.bg} ${colors.border} shadow-md` : 'bg-white border-slate-100 hover:border-orange-200'}`}
            >
              {/* LEFT INFO */}
              <div className="flex flex-col gap-2 min-w-0">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  {/* DIFFICULTY with icon */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Түвшин:</span>
                    <div className="flex items-center gap-2">
                      {project.difficulty === 'Beginner' && <Sprout className="w-4 h-4 shrink-0" style={{ color: '#15803d' }} />}
                      {project.difficulty === 'Intermediate' && <Flame className="w-4 h-4 shrink-0" style={{ color: '#1d4ed8' }} />}
                      {project.difficulty === 'Pro' && <Sparkles className="w-4 h-4 shrink-0" style={{ color: '#7e22ce' }} />}
                      <span className="text-xs font-bold text-slate-700">{DIFFICULTY_MN[project.difficulty]}</span>
                    </div>
                  </div>

                  {/* CHILDREN COUNT with text label */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Суралцагчид:</span>
                    <div className="flex items-center gap-1.5 text-slate-700 bg-orange-50 px-3 py-1 rounded-full">
                      <Users className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span className="text-xs font-bold">{project.childrenCount}</span>
                    </div>
                  </div>
                </div>

                {/* DATES with text label */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Хугацаа:</span>
                  <div className="flex items-center gap-1.5 text-slate-700 bg-slate-50 px-3 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span className="text-xs font-medium">
                      {formatDate(project.startDate)} – {formatDate(project.finishDate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA BUTTON */}
              <Button
                onClick={() => onViewProject(project._id)}
                size="sm"
                className={`w-full sm:w-auto rounded-xl font-bold text-xs h-11 sm:h-10 px-6 transition-all cursor-pointer
                  ${index === 0 ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200' : 'bg-slate-900 hover:bg-orange-600 text-white'}`}
              >
                Дэлгэрэнгүй
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
