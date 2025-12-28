import { CalendarDays, Clock } from 'lucide-react';

interface Props {
  availableWeekdays: string[]; // ['TUE', 'THU', 'SAT']
  scheduledTimes: Record<string, { startTime: string; endTime: string }>;
}

export default function ClubNextClasses({ availableWeekdays, scheduledTimes }: Props) {
  // Өнөөдрөөс хойшхи ойрын өдрүүдийг олох функц
  const getNextDates = () => {
    const dates = [];
    const today = new Date();

    // Ойрын 14 хоногийг шалгана
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();

      if (availableWeekdays.includes(dayName)) {
        dates.push({
          date: date,
          dayName: dayName,
          formattedDate: date.toLocaleDateString('mn-MN', {
            month: 'long',
            day: 'numeric',
            weekday: 'short',
          }),
        });
      }
      // Зөвхөн хамгийн ойрын 4 өдрийг харуулъя
      if (dates.length >= 4) break;
    }
    return dates;
  };

  const nextClasses = getNextDates();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
        <CalendarDays className="w-5 h-5 text-orange-600" />
        Удахгүй орох хичээлүүд
      </h3>

      <div className="grid grid-cols-1 gap-3">
        {nextClasses.map((item, index) => {
          const time = scheduledTimes[item.dayName];
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                index === 0 ? 'bg-orange-50 border-orange-200 ring-1 ring-orange-200' : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex flex-col">
                <span className={`text-xs font-bold uppercase ${index === 0 ? 'text-orange-600' : 'text-slate-400'}`}>{index === 0 ? 'Өнөөдөр / Хамгийн ойрын' : 'Дараагийн хичээл'}</span>
                <span className="font-bold text-slate-800 text-lg">{item.formattedDate}</span>
              </div>

              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border shadow-sm">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="font-semibold text-slate-700">
                  {time?.startTime} - {time?.endTime}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
