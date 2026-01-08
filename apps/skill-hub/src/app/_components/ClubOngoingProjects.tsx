'use client';

import { ClubProjectType } from '@/lib/utils/types';
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { Button } from '@intern-3a/shadcn';
import { Award, Calendar, ChevronRight, FolderKanban, Trophy, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { RegisterLoginAlertDialog } from '../club/_components';

interface Props {
  projects: ClubProjectType[];
  onViewProject: (projectId: string) => void;
}

const DIFFICULTY_MN: Record<string, string> = {
  Beginner: 'Анхан',
  Intermediate: 'Дунд',
  Pro: 'Ахисан',
  B: 'Анхан',
  I: 'Дунд',
  P: 'Ахисан',
};

const DIFFICULTY_ICONS: Record<string, React.ReactNode> = {
  Beginner: <Award className="w-3.5 h-3.5 text-green-600" />,
  Intermediate: <Zap className="w-3.5 h-3.5 text-orange-600" />,
  Pro: <Trophy className="w-3.5 h-3.5 text-purple-600" />,
  B: <Award className="w-3.5 h-3.5 text-green-600" />,
  I: <Zap className="w-3.5 h-3.5 text-orange-600" />,
  P: <Trophy className="w-3.5 h-3.5 text-purple-600" />,
};

export default function ClubOngoingProjects({ projects, onViewProject }: Props) {
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);
  const [registrationStatuses, setRegistrationStatuses] = useState<Record<string, string>>({});
  const { getToken } = useAuth();

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

  const handleRegistrationStatusChange = async (projectId: string) => {
    const token = await getToken();

    try {
      const res = await fetch('/api/club-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ projectId }),
      });

      if (!res.ok) {
        console.error('Бүртгэл амжилтгүй');
        toast.error('Дугуйланд бүртгүүлэхэд алдаа гарлаа!');
        return;
      }

      await res.json();

      setRegistrationStatuses((prev) => ({ ...prev, [projectId]: 'PENDING' }));
    } catch (error) {
      console.error('Бүртгэхэд алдаа гарлаа:', error);
    }
  };

  return (
    <div className="space-y-4 md:space-y-5 animate-in fade-in duration-500">
      {/* HEADER */}
      <h3 className="text-base md:text-lg font-black flex items-center gap-2 text-slate-800 uppercase tracking-tight px-1">
        <FolderKanban className="w-5 h-5 text-orange-600" />
        Хэрэгжүүлж буй хөтөлбөрүүд
      </h3>

      {/* LIST */}
      <div className="space-y-3">
        {displayProjects.map((project, index) => {
          const difficulty = project.difficultyLevel[0]; // Get first difficulty level
          return (
            <div
              key={project._id}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-5 rounded-2xl border transition-all active:scale-[0.99] hover:bg-orange-50 bg-white border-slate-100 hover:border-orange-200"
            >
              {/* LEFT INFO */}
              <div className="flex flex-col gap-2 min-w-0">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  {/* DIFFICULTY with icon */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Түвшин:</span>
                    <div className="flex items-center gap-1.5">
                      {difficulty && DIFFICULTY_ICONS[difficulty]}
                      <span className="text-xs font-bold text-slate-900">{difficulty && DIFFICULTY_MN[difficulty] ? DIFFICULTY_MN[difficulty] : difficulty}</span>
                    </div>
                  </div>

                  {/* CHILDREN COUNT with text label */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Хүүхдийн тоо:</span>
                    <div className="flex items-center gap-1.5 text-slate-700 bg-orange-50 px-3 py-1 rounded-full">
                      <Users className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span className="text-xs font-bold">0/{project.childrenCount}</span>
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
              <SignedOut>
                <Button
                  onClick={() => setShowLoginAlert(true)}
                  size="sm"
                  className="w-full sm:w-auto rounded-xl font-bold text-xs h-11 sm:h-10 px-6 transition-all cursor-pointer bg-orange-500 hover:bg-blue-600 text-white"
                >
                  Бүртгүүлэх
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </SignedOut>

              <SignedIn>
                <Button
                  onClick={() => handleRegistrationStatusChange(project._id!)}
                  size="sm"
                  className={`w-full sm:w-auto rounded-xl font-bold text-xs h-11 sm:h-10 px-6 transition-all cursor-pointer 
      ${registrationStatuses[project._id ?? ''] === 'PENDING' ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-blue-600 text-white'}`}
                  disabled={registrationStatuses[project._id ?? ''] === 'PENDING'}
                >
                  {registrationStatuses[project._id ?? ''] === 'PENDING' ? 'Бүртгэл хийгдсэн' : 'Бүртгүүлэх'}
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </SignedIn>
              <RegisterLoginAlertDialog showLoginAlert={showLoginAlert} setShowLoginAlert={setShowLoginAlert} id={project._id!} message={'Дугуйланд бүртгүүлэхийн тулд эхлээд нэвтрэх шаардлагатай.'} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
