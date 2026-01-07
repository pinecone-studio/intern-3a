'use client';

const levelLabels: Record<string, string> = {
  High: 'Ахлах анги',
  Middle: 'Дунд анги',
  Elementary: 'Бага анги',
  Beginner: 'Анхан шат',
  Intermediate: 'Дунд шат',
  Advanced: 'Ахисан шат',
};

export const ProjectCard = ({ project }: { project: any }) => {
  return (
    <div className="group bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300">
      <div className="space-y-4">
        {/* Толгой хэсэг */}
        <div className="space-y-2">
          <h4 className="font-black text-lg md:text-xl text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">{project.title}</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
              {levelLabels[project.difficultyLevel] || project.difficultyLevel}
            </span>
            <span className="px-2.5 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-wider">{project.childrenCount} хүүхэд</span>
          </div>
        </div>

        {/* Тайлбар */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 font-medium">{project.description}</p>

        {/* Хугацаа ба Доод хэсэг */}
        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Хэрэгжих хугацаа</p>
            <p className="text-[12px] font-black text-slate-700">
              {new Date(project.startDate).toLocaleDateString('en-CA')} - {new Date(project.finishDate).toLocaleDateString('en-CA')}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
            <span className="text-lg">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};
