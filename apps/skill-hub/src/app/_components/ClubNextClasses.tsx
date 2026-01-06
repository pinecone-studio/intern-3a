'use client';

import { Button } from '@intern-3a/shadcn';
import { CalendarDays, ChevronRight, Clock } from 'lucide-react';
import { useMemo } from 'react';

interface Props {
  availableWeekdays: string[];
  scheduledTimes: Record<string, { startTime: string; endTime: string }>;
  onRegister: () => void;
}

const WEEKDAY_MN: Record<string, string> = {
  MON: 'Даваа',
  TUE: 'Мягмар',
  WED: 'Лхагва',
  THU: 'Пүрэв',
  FRI: 'Баасан',
  SAT: 'Бямба',
  SUN: 'Ням',
};

export default function ClubNextClasses({ availableWeekdays, scheduledTimes, onRegister }: Props) {
  const nextClasses = useMemo(() => {
    const dates: {
      date: Date;
      dayKey: string;
      formattedDate: string;
      weekdayMn: string;
    }[] = [];

    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      const dayKey = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();

      if (availableWeekdays.includes(dayKey) && scheduledTimes[dayKey]) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');

        dates.push({
          date,
          dayKey,
          weekdayMn: WEEKDAY_MN[dayKey],
          formattedDate: `${yyyy}/${mm}/${dd}`,
        });
      }

      if (dates.length >= 5) break;
    }

    return dates;
  }, [availableWeekdays, scheduledTimes]);

  if (nextClasses.length === 0) {
    return <div className="p-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-slate-400 font-medium text-sm">Хуваарь одоогоор ороогүй байна.</div>;
  }

  return (
    <div className="space-y-4 md:space-y-5 animate-in fade-in duration-500">
      {/* HEADER */}
      <h3 className="text-base md:text-lg font-black flex items-center gap-2 text-slate-800 uppercase tracking-tight px-1">
        <CalendarDays className="w-5 h-5 text-orange-600" />
        Ойрын хичээлийн хуваарь
      </h3>

      {/* LIST */}
      <div className="space-y-3">
        {nextClasses.map((item, index) => {
          const time = scheduledTimes[item.dayKey];

          return (
            <div
              key={`${item.dayKey}-${index}`}
              className={`group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-5 rounded-2xl border transition-all active:scale-[0.99]
                ${index === 0 ? 'bg-orange-50 border-orange-200  shadow-md shadow-orange-100' : 'bg-white border-slate-100 hover:border-orange-200'}`}
            >
              {/* LEFT INFO */}
              <div className="flex flex-col gap-1.5 min-w-0">
                <span
                  className={`text-[10px] font-black uppercase tracking-widest
                    ${index === 0 ? 'text-orange-600' : 'text-slate-400'}`}
                >
                  {index === 0 ? 'Хамгийн ойрын' : 'Дараагийн хичээл'}
                </span>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  {/* DATE + WEEKDAY */}
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm md:text-base">{item.formattedDate}</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[11px] font-bold">{item.weekdayMn}</span>
                  </div>

                  {/* TIME */}
                  <div className="flex items-center gap-1.5 text-slate-700 bg-white/50 px-2 py-1 rounded-lg">
                    <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                    <span className="text-xs md:text-sm font-bold">
                      {time?.startTime} – {time?.endTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA BUTTON */}
              <Button
                onClick={onRegister}
                size="sm"
                className={`w-full sm:w-auto rounded-xl font-bold text-xs h-11 sm:h-10 px-6 transition-all cursor-pointer
                  ${index === 0 ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200' : 'bg-slate-900 hover:bg-orange-600 text-white'}`}
              >
                Бүртгүүлэх
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
