'use client';
import { ClassLevelsType, NewClubType, TimeSlotValueType, WeekDayType } from '@/lib/utils/types';
import { Backpack, Calendar, Clock } from 'lucide-react';
import { useMemo, useState } from 'react';
import FilteredResult from './FilteredResult';

export const FilteredClubsForUser = ({ allClubs }: { allClubs: NewClubType[] }) => {
  const [selectedClass, setSelectedClass] = useState<ClassLevelsType | ''>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  console.log({ selectedClass });
  console.log({ selectedDate });
  console.log({ allClubs });
  const resetFilters = () => {
    setSelectedClass('');
    setSelectedDate('');
    setSelectedTime('');
    setSelectedSport('');
    setSelectedGenre('');
  };

  const classes = [
    { label: 'Бага анги', value: 'Elementary' },
    { label: 'Дунд анги', value: 'Middle' },
    { label: 'Ахлах анги', value: 'High' },
  ];

  const availableDays: { day: WeekDayType; label: string }[] = [
    { day: 'MON', label: 'Даваа' },
    { day: 'TUE', label: 'Мягмар' },
    { day: 'WED', label: 'Лхагва' },
    { day: 'THU', label: 'Пүрэв' },
    { day: 'FRI', label: 'Баасан' },
    { day: 'SAT', label: 'Бямба' },
    { day: 'SUN', label: 'Ням' },
  ];

  const genreTypeMap: Record<string, string> = {
    sports: 'SPORTS',
    arts: 'ARTS',
    education: 'EDUCATION',
    entertainment: 'FUN',
  };

  const timeSlots: { label: string; value: TimeSlotValueType; range: [number, number] }[] = [
    { label: 'Үдээс өмнө', value: 'morning', range: [8, 12] },
    { label: 'Үдээс хойш', value: 'afternoon', range: [12, 18] },
    { label: 'Орой', value: 'evening', range: [18, 22] },
  ];

  const courseNameMap: Record<string, string[]> = {
    Бөх: ['Wrestling Club'],
    Хөлбөмбөг: ['Football Club', 'Soccer Club'],
    'Сагсан бөмбөг': ['Basketball Club'],
    'Тулаан спорт': ['Martial Arts Club', 'Karate Club'],
    Теннис: ['Tennis Club'],
    Волейбол: ['Volleyball Club'],
    Бадминтон: ['Badminton Club'],
    Бокс: ['Boxing Club'],
    Гимнастик: ['Gymnastics Club'],
    'Хөнгөн атлетик': ['Athletics Club', 'Track Club'],
    'Дугуйн спорт': ['Cycling Club'],
    'Усан сэлэлт': ['Swimming Club'],
    'Хөлөг онгоц': ['Rowing Club'],
    'Уран бүжиг': ['Dance Club'],
    Хөгжим: ['Music Club'],
    'Дуу хөгжим': ['Singing Club', 'Music Club'],
    Зураг: ['Art Club', 'Drawing Club', 'Photography Club'],
    'Гар урлал': ['Craft Club', 'Art Club'],
    'Англи хэл': ['English Speaking Club', 'English Club'],
    Математик: ['Math Club'],
    Програмчлал: ['Coding Club', 'Programming Club'],
    Робот: ['Robotics Club', 'Robot Club'],
    Шатар: ['Chess Club'],
    'Хүүхдийн тоглоом': ['Gaming Club', 'Fun Club', 'Cooking Club'],
  };

  const filteredClubs = useMemo(() => {
    let filtered = [...allClubs];

    // Filter by class level
    if (selectedClass) {
      filtered = filtered.filter((club) => club.selectedClassLevelNames?.includes(selectedClass));
    }

    // Filter by working days
    if (selectedDate) {
      filtered = filtered.filter((club) => {
        if (!club.scheduledClubTimes || !selectedClass) return false;
        const classSchedule = club.scheduledClubTimes[selectedClass];
        if (!classSchedule) return false;

        return selectedDate in classSchedule;
      });
    }

    // Filter by time slot
    if (selectedTime && selectedClass) {
      const timeSlot = timeSlots.find((slot) => slot.value === selectedTime);
      if (timeSlot) {
        const [startHour, endHour] = timeSlot.range;

        filtered = filtered.filter((club) => {
          const classSchedule = club?.scheduledClubTimes?.[selectedClass];
          if (!classSchedule) return false;

          return Object.values(classSchedule).some((dayTime) => {
            if (!dayTime?.startTime) return false;

            const clubHour = Number(dayTime.startTime.split(':')[0]);
            return clubHour >= startHour && clubHour < endHour;
          });
        });
      }
    }

    // Filter by genre/category
    const genreType = genreTypeMap[selectedGenre];
    if (genreType) {
      filtered = filtered.filter((club) => {
        const categoryName = club.clubCategoryName?.toUpperCase();
        // Map the genre type to category patterns
        if (genreType === 'SPORTS') {
          return ['SPORT', 'WRESTLING', 'FOOTBALL', 'BASKETBALL', 'MARTIAL', 'TENNIS', 'VOLLEYBALL', 'BADMINTON', 'BOXING', 'GYMNASTICS', 'ATHLETICS', 'CYCLING', 'SWIMMING', 'ROWING'].some(
            (pattern) => categoryName?.includes(pattern),
          );
        } else if (genreType === 'ARTS') {
          return ['ART', 'DANCE', 'MUSIC', 'SINGING', 'DRAWING', 'PHOTOGRAPHY', 'CRAFT'].some((pattern) => categoryName?.includes(pattern));
        } else if (genreType === 'EDUCATION') {
          return ['ENGLISH', 'MATH', 'PROGRAMMING', 'CODING', 'ROBOTICS', 'CHESS', 'EDUCATION'].some((pattern) => categoryName?.includes(pattern));
        } else if (genreType === 'FUN') {
          return ['GAME', 'GAMING', 'FUN', 'COOKING', 'ENTERTAINMENT'].some((pattern) => categoryName?.includes(pattern));
        }
        return false;
      });
    }

    // Filter by specific sport/course
    if (selectedSport) {
      const possibleNames = courseNameMap[selectedSport] || [selectedSport];
      filtered = filtered.filter((club) =>
        possibleNames.some((name) => club.clubCategoryName.toLowerCase().includes(name.toLowerCase()) || club.clubName.toLowerCase().includes(selectedSport.toLowerCase())),
      );
    }

    return filtered;
  }, [allClubs, selectedClass, selectedDate, selectedTime, selectedGenre, selectedSport]);
  console.log({ filteredClubs });

  const coursesByGenre = {
    sports: [
      { name: 'Бөх', icon: '🤼' },
      { name: 'Хөлбөмбөг', icon: '⚽' },
      { name: 'Сагсан бөмбөг', icon: '🏀' },
      { name: 'Тулаан спорт', icon: '🥋' },
      { name: 'Теннис', icon: '🎾' },
      { name: 'Волейбол', icon: '🏐' },
      { name: 'Бадминтон', icon: '🏸' },
      { name: 'Бокс', icon: '🥊' },
      { name: 'Гимнастик', icon: '🤸' },
      { name: 'Хөнгөн атлетик', icon: '🏃' },
      { name: 'Дугуйн спорт', icon: '🚴' },
      { name: 'Усан сэлэлт', icon: '🏊' },
      { name: 'Хөлөг онгоц', icon: '🚣' },
    ],
    arts: [
      { name: 'Уран бүжиг', icon: '💃' },
      { name: 'Хөгжим', icon: '🎵' },
      { name: 'Дуу хөгжим', icon: '🎤' },
      { name: 'Зураг', icon: '🎨' },
      { name: 'Гар урлал', icon: '✂️' },
    ],
    education: [
      { name: 'Англи хэл', icon: '🇬🇧' },
      { name: 'Математик', icon: '🔢' },
      { name: 'Програмчлал', icon: '💻' },
      { name: 'Робот', icon: '🤖' },
      { name: 'Шатар', icon: '♟️' },
    ],
    entertainment: [{ name: 'Хүүхдийн тоглоом', icon: '🎯' }],
  };

  const genres = [
    { id: 'sports', label: 'Спорт', icon: '⚽' },
    { id: 'arts', label: 'Урлаг', icon: '🎨' },
    { id: 'education', label: 'Боловсрол', icon: '📚' },
    { id: 'entertainment', label: 'Зугаа цэнгэл', icon: '🎮' },
  ];

  const isFiltered = Boolean(selectedClass || selectedDate || selectedTime || selectedGenre || selectedSport);

  return (
    <div className="relative">
      {/* filters */}
      <section id="sports" className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8" data-scroll-point="search-title">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">ӨӨРТ ОЙР ДУГУЙЛАН ХАЙХ</h2>
          </div>

          <div className="mb-16 max-w-4xl mx-auto" data-scroll-point="date-time">
            <div className="bg-white/50 rounded-2xl p-8 border-2 border-slate-200 shadow-lg flex flex-col gap-8">
              {/* Class Selector */}
              <div data-scroll-point="class-selector">
                <div className="flex items-center gap-2 mb-4">
                  <Backpack className="w-5 h-5 text-orange-600" />
                  <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Анги сонгох</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {classes.map((classItem) => (
                    <button
                      key={classItem.value}
                      onClick={() => setSelectedClass((prev) => (prev === classItem.value ? '' : (classItem.value as ClassLevelsType)))}
                      className={`px-6 py-4 rounded-xl border-2 font-bold transition-all duration-200 cursor-pointer ${
                        selectedClass === classItem.value
                          ? 'bg-[#0A427A] hover:border-[#0A427A] border-[#0A427A] text-white shadow-lg'
                          : 'border-slate-200 hover:border-orange-600 text-slate-700 hover:bg-slate-100 '
                      }`}
                    >
                      {classItem.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selector */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Өдөр сонгох</p>
                </div>

                <div className="grid grid-cols-7 gap-3">
                  {availableDays.map((d) => (
                    <button
                      key={d.day}
                      onClick={() => setSelectedDate((prev) => (prev === d.day ? '' : d.day))}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        selectedDate === d.day ? 'bg-orange-600 border-orange-600 text-white shadow-lg scale-105' : 'border-slate-200 hover:border-orange-600 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-sm font-bold text-center">{d.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selector */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Цаг сонгох</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((timeSlot) => (
                    <button
                      key={timeSlot.value}
                      onClick={() => setSelectedTime((prev) => (prev === timeSlot.value ? '' : timeSlot.value))}
                      className={`py-4 px-6 rounded-xl border-2 font-bold transition-all duration-200 cursor-pointer ${
                        selectedTime === timeSlot.value
                          ? 'bg-[#0A427A] hover:bg-[#083563] border-[#0A427A] text-white shadow-lg'
                          : 'border-slate-200 hover:border-orange-600 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-center">
                        <div className="mb-1">{timeSlot.label}</div>
                        <div className="text-xs opacity-70">
                          {timeSlot.range[0]}:00 - {timeSlot.range[1]}:00
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Genre Tabs */}
              <div data-scroll-point="genre">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Цаг сонгох</p>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      onClick={() => setSelectedGenre(genre.id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all duration-200 ${
                        selectedGenre === genre.id ? 'bg-orange-600 text-white shadow-lg' : 'bg-white/50 text-slate-700 border-2 border-slate-200 hover:border-orange-400'
                      }`}
                    >
                      <span className="text-xl">{genre.icon}</span>
                      <span>{genre.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Courses List - Scrollable */}
              {selectedGenre && (
                <div className="max-w-6xl mx-auto mb-16">
                  <div className="bg-white/50 rounded-2xl p-6 border-2 border-slate-200 shadow-lg">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{genres.find((g) => g.id === selectedGenre)?.label}</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-slate-100">
                      {coursesByGenre[selectedGenre as keyof typeof coursesByGenre].map((item) => (
                        <button
                          key={item.name}
                          onClick={() => setSelectedSport(item.name)}
                          className={`shrink-0 w-32 p-5 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                            selectedSport === item.name ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-slate-200 /50 hover:border-orange-300'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className={`text-4xl transition-transform duration-300 ${selectedSport === item.name ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</div>
                            <span className={`font-semibold text-xs text-center transition-colors ${selectedSport === item.name ? 'text-orange-600' : 'text-slate-700'}`}>{item.name}</span>
                          </div>
                          {selectedSport === item.name && <div className="mt-2 w-full h-1 bg-orange-500 rounded-full"></div>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <FilteredResult filteredClubs={filteredClubs} isFiltered={isFiltered} resetFilters={resetFilters} />
        </div>
      </section>
    </div>
  );
};
