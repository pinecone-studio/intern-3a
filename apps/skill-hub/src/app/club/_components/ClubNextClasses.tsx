'use client';

import { CalendarDays, Clock } from 'lucide-react';
import { useMemo } from 'react';

interface Props {
  availableWeekdays: string[]; // ['MON', 'WED']
  scheduledTimes: Record<string, { startTime: string; endTime: string }>;
}

export const ClubNextClasses = ({ availableWeekdays, scheduledTimes }: Props) => {
  // Түвшин солигдоход хуваарийг дахин тооцоолох
  const nextClasses = useMemo(() => {
    const dates: {
      date: Date;
      dayName: string;
      formattedDate: string;
    }[] = [];

    const today = new Date();

    // Ойрын 14 хоногийн хуваарийг шалгах
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();

      if (availableWeekdays.includes(dayName) && scheduledTimes[dayName]) {
        dates.push({
          date,
          dayName,
          formattedDate: date.toLocaleDateString('mn-MN', {
            month: 'long',
            day: 'numeric',
            weekday: 'short',
          }),
        });
      }

      if (dates.length >= 4) break;
    }
    return dates;
  }, [availableWeekdays, scheduledTimes]);

  if (nextClasses.length === 0) {
    return <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400">Хуваарь одоогоор ороогүй байна.</div>;
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
        <CalendarDays className="w-5 h-5 text-orange-600" />
        Удахгүй орох хичээлүүд
      </h3>

      <div className="grid grid-cols-1 gap-3">
        {nextClasses.map((item, index) => {
          const time = scheduledTimes[item.dayName];

          return (
            <div
              key={`${item.dayName}-${index}`}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                index === 0 ? 'bg-orange-50 border-orange-200 ring-1 ring-orange-100' : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex flex-col">
                <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${index === 0 ? 'text-orange-600' : 'text-slate-400'}`}>
                  {index === 0 ? 'Өнөөдөр / Хамгийн ойрын' : 'Дараагийн хичээл'}
                </span>
                <span className="font-bold text-slate-800 text-lg">{item.formattedDate}</span>
              </div>

              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="font-bold text-slate-700">
                  {time?.startTime} - {time?.endTime}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
