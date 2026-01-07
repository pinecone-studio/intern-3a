'use client';
import { ArrowRight, Calendar, GraduationCap, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Button } from '../components/ui/button';

export function ProgramCard({ program, viewMode }: any) {
  const router = useRouter();

  // 1. Хамгийн бага босго оноог тооцоолох
  const minScore = useMemo(() => {
    if (!program.majors || program.majors.length === 0) return 400;

    const scores: number[] = [];
    program.majors.forEach((major: any) => {
      major.major_requirements?.forEach((req: any) => {
        if (req.min_score) {
          scores.push(req.min_score);
        }
      });
    });

    return scores.length > 0 ? Math.min(...scores) : 400;
  }, [program]);

  // 2. Хугацаа форматлах
  const endDate = useMemo(() => {
    if (!program.burtgelduusah_end_date) return '08.15';
    const date = new Date(program.burtgelduusah_end_date);
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
  }, [program.burtgelduusah_end_date]);

  return (
    <div
      className={`group bg-white rounded-2xl border border-gray-100 dark:border-neutral-800 dark:bg-gray-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}
    >
      <div className={`relative ${viewMode === 'list' ? 'w-64' : 'h-40'}`}>
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10 group-hover:scale-110 transition-transform duration-500" />
        <img src={program.image || '/university-logo-arts.jpg'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={program.name} />
        <div className="absolute bottom-3 left-3 z-20">
          <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">Элсэлт нээлттэй</span>
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 text-gray-400 text-[11px] font-bold uppercase mb-2">
            <MapPin className="w-3 h-3 text-red-400" />
            {program.city || 'Улаанбаатар'}
          </div>
          <h3 className="font-bold text-gray-900 group-hover:text-sky-600 dark:text-white transition-colors line-clamp-1 mb-3">{program.name}</h3>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="space-y-1">
              <p className="text-[10px] text-gray-400 uppercase font-bold">Босго оноо</p>
              <div className="flex items-center gap-1.5 font-bold text-gray-700 text-sm dark:text-neutral-200">
                <GraduationCap className="w-4 h-4 text-sky-500" /> {minScore}+
              </div>
            </div>

            <div className="space-y-1 text-right">
              <p className="text-[10px] text-gray-400 uppercase font-bold dark:text-gray-200">Дуусах хугацаа</p>
              <div className="flex items-center justify-end gap-1.5 font-bold dark:text-gray-200 text-gray-700 text-sm">
                <Calendar className="w-4 h-4 text-orange-500" />
                {endDate}
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={() => router.push(`/detail/${program.id}`)}
          className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-sky-500 hover:bg-sky-500 text-gray-900 hover:text-white border-none shadow-none rounded-xl group/btn"
        >
          Дэлгэрэнгүй
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
