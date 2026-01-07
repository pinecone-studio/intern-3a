'use client';

import { ProjectCard } from './ProjectCard';

interface ClubProjectsSectionProps {
  projects: any[];
  loading: boolean;
  selectedLevelName: string; // Сонгосон түвшний нэрийг дамжуулж өгнө (Жишээ нь: "Ахлах анги")
}

export const ClubProjectsSection = ({ projects, loading, selectedLevelName }: ClubProjectsSectionProps) => {
  if (loading) {
    return (
      <section className="mt-12 space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 bg-slate-100 rounded-3xl" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12 space-y-8">
      {/* Гарчиг хэсэг */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-1">
          <h3 className="text-2xl md:text-3xl font-black text-slate-900">Хэрэгжүүлж буй төслүүд</h3>
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">{selectedLevelName} түвшний сурагчдад зориулсан</p>
        </div>
        <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-2xl text-sm font-black">Нийт {projects.length} төсөл</div>
      </div>

      {/* Төслүүдийн жагсаалт */}
      {projects.length === 0 ? (
        <div className="bg-slate-50 rounded-[2.5rem] py-16 px-6 text-center border-2 border-dashed border-slate-200">
          <div className="max-w-xs mx-auto space-y-3">
            <div className="text-4xl">📂</div>
            <h4 className="text-lg font-black text-slate-900">Төсөл одоогоор байхгүй</h4>
            <p className="text-sm text-slate-400 font-medium">Уучлаарай, {selectedLevelName} түвшинд одоогоор идэвхтэй хөтөлбөр эсвэл төсөл бүртгэгдээгүй байна.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
};
