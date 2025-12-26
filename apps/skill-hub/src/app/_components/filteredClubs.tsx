'use client';
import { mockClubs } from '@/lib/mock-data';
import { Calendar, Clock } from 'lucide-react';
import { useMemo, useState } from 'react';

export const FilteredClubs = () => {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  const resetFilters = () => {
    setSelectedClass('');
    setSelectedDate('');
    setSelectedTime('');
    setSelectedSport('');
    setSelectedGenre('');
  };

  const classes = [
    { label: 'Бага анги', value: 'ELEMENTARY' },
    { label: 'Дунд анги', value: 'MIDDLESCHOOL' },
    { label: 'Ахлах анги', value: 'HIGHSCHOOL' },
  ];

  const genreTypeMap: Record<string, string> = {
    sports: 'SPORTS',
    arts: 'ARTS',
    education: 'EDUCATION',
    entertainment: 'FUN',
  };

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

  const timeSlots = [
    { label: 'Үдээс өмнө', value: 'morning', range: [8, 12] },
    { label: 'Үдээс хойш', value: 'afternoon', range: [12, 18] },
    { label: 'Орой', value: 'evening', range: [18, 22] },
  ];

  const filteredClubs = useMemo(() => {
    let filtered = [...mockClubs];

    if (selectedClass) {
      filtered = filtered.filter((club) => club.classCategoryName === selectedClass);
    }

    if (selectedDate) {
      filtered = filtered.filter((club) => club.clubWorkingDays.includes(selectedDate));
    }

    if (selectedTime) {
      const timeSlot = timeSlots.find((slot) => slot.value === selectedTime);
      if (timeSlot) {
        const [startHour, endHour] = timeSlot.range;
        filtered = filtered.filter((club) => {
          const clubHour = Number.parseInt(club.clubTime.split(':')[0]);
          return clubHour >= startHour && clubHour < endHour;
        });
      }
    }

    const genreType = genreTypeMap[selectedGenre];
    if (genreType) {
      filtered = filtered.filter((club) => club.clubCategoryType === genreType);
    }

    if (selectedSport) {
      const possibleNames = courseNameMap[selectedSport] || [selectedSport];
      filtered = filtered.filter((club) => possibleNames.some((name) => club.clubCategoryName.toLowerCase().includes(name.toLowerCase())));
    }

    return filtered;
  }, [selectedClass, selectedDate, selectedTime, selectedGenre, selectedSport]);

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

  const availableDays = [
    { day: 'Monday', label: 'Даваа' },
    { day: 'Tuesday', label: 'Мягмар' },
    { day: 'Wednesday', label: 'Лхагва' },
    { day: 'Thursday', label: 'Пүрэв' },
    { day: 'Friday', label: 'Баасан' },
    { day: 'Saturday', label: 'Бямба' },
    { day: 'Sunday', label: 'Ням' },
  ];

  const clubs = [
    {
      name: 'Elite Wrestling Academy',
      sport: 'Wrestling',
      location: 'Downtown District',
      rating: 4.9,
      students: 120,
      image: '/wrestling-training-confident-teenagers.jpg',
    },
    {
      name: 'Champions Football Club',
      sport: 'Football',
      location: 'North Stadium',
      rating: 4.8,
      students: 200,
      image: '/football-training-young-athletes.jpg',
    },
    {
      name: 'Warriors Martial Arts',
      sport: 'Martial Arts',
      location: 'Central Gym',
      rating: 5.0,
      students: 85,
      image: '/martial-arts-training-kids-discipline.jpg',
    },
    {
      name: 'Victory Basketball Team',
      sport: 'Basketball',
      location: 'West Arena',
      rating: 4.7,
      students: 150,
      image: '/basketball-training-young-players.jpg',
    },
  ];

  const isFiltered = selectedClass || selectedDate || selectedTime || selectedGenre || selectedSport;

  return (
    <div className="relative">
      {/* Sports Categories */}
      <section id="sports" className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8" data-scroll-point="search-title">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Хичээл хайх</h2>
          </div>
          <div className="flex justify-center mb-8" data-scroll-point="class-selector">
            <div className="inline-flex bg-white/50 rounded-xl p-2 gap-2 border-2 border-slate-200 shadow-sm">
              {classes.map((classItem) => (
                <button
                  key={classItem.value}
                  onClick={() => setSelectedClass(classItem.value)}
                  className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                    selectedClass === classItem.value ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {classItem.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-16 max-w-4xl mx-auto" data-scroll-point="date-time">
            <div className="bg-white/50 rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-orange-600" />
                <h3 className="text-2xl font-black text-navy-900">Огноо ба цаг сонгох</h3>
              </div>

              {/* Date Selector */}
              <div className="mb-8">
                <p className="text-sm font-bold text-slate-600 mb-4 uppercase tracking-wide">Өдөр сонгох</p>
                <div className="grid grid-cols-7 gap-3">
                  {availableDays.map((dayInfo) => (
                    <button
                      key={dayInfo.day}
                      onClick={() => setSelectedDate(dayInfo.day)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedDate === dayInfo.day ? 'bg-orange-600 border-orange-600 text-white shadow-lg scale-105' : 'border-slate-200 hover:border-orange-600 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs font-bold text-center">{dayInfo.label}</span>
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
                      onClick={() => setSelectedTime(timeSlot.value)}
                      className={`py-4 px-6 rounded-xl border-2 font-bold transition-all duration-200 ${
                        selectedTime === timeSlot.value ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'border-slate-200 hover:border-orange-600 text-slate-700 hover:bg-slate-50'
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
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Хичээл сонгох</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Ангилалаас хичээлээ сонгоорой</p>
          </div>

          {/* Genre Tabs */}
          <div className="max-w-4xl mx-auto mb-8 flex justify-center" data-scroll-point="genre">
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
      </section>
    </div>
  );
};
