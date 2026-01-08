'use client';
import { CATEGORY_UI_MAP, ClassLevelsType, NewClubType, SUBCATEGORY_ICON_MAP, TimeSlotValueType, WeekDayType } from '@/lib/utils/types';
import { Backpack, Calendar, Clock, LayoutGrid, LayoutList } from 'lucide-react';
import { useMemo, useState } from 'react';
import FilteredResult from './FilteredResult';

export const FilteredClubsForUser = ({ allClubs }: { allClubs: NewClubType[] }) => {
  const [selectedClass, setSelectedClass] = useState<ClassLevelsType | ''>('');
  const [selectedDate, setSelectedDate] = useState<WeekDayType | ''>('');
  const [selectedTime, setSelectedTime] = useState<TimeSlotValueType | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

  const resetFilters = () => {
    setSelectedClass('');
    setSelectedDate('');
    setSelectedTime('');
    setSelectedCategory('');
    setSelectedSubCategory('');
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

  const timeSlots: { label: string; value: TimeSlotValueType; range: [number, number] }[] = [
    { label: 'Үдээс өмнө', value: 'morning', range: [8, 12] },
    { label: 'Үдээс хойш', value: 'afternoon', range: [12, 18] },
    { label: 'Орой', value: 'evening', range: [18, 22] },
  ];

  const categories = useMemo(() => {
    const used = new Set(allClubs.map((club) => club.clubCategoryName));

    return Array.from(used).map((key) => ({
      key,
      label: CATEGORY_UI_MAP[key]?.label ?? key,
      icon: CATEGORY_UI_MAP[key]?.icon ?? '📦',
    }));
  }, [allClubs]);

  const subCategories = useMemo(() => {
    if (!selectedCategory) return [];

    const used = new Set(allClubs.filter((club) => club.clubCategoryName === selectedCategory).map((c) => c.clubSubCategoryName));

    return Array.from(used).map((name) => ({
      name,
      icon: SUBCATEGORY_ICON_MAP[name] ?? '',
    }));
  }, [allClubs, selectedCategory]);

  const filteredClubs = useMemo(() => {
    let filtered = [...allClubs];

    // Filter by class level
    if (selectedClass) {
      filtered = filtered.filter((club) => club.selectedClassLevelNames?.includes(selectedClass));
    }

    // Filter by working days
    if (selectedDate && selectedClass) {
      filtered = filtered.filter((club) => {
        if (!club.scheduledClubTimes || !selectedClass) return false;
        const classSchedule = club.scheduledClubTimes[selectedClass];
        if (!classSchedule) return false;

        return selectedDate in classSchedule;
      });
    }

    // Filter by time slot
    if (selectedTime && selectedDate && selectedClass) {
      const timeSlot = timeSlots.find((slot) => slot.value === selectedTime);
      if (!timeSlot) return filtered;

      const [startHour, endHour] = timeSlot.range;

      filtered = filtered.filter((club) => {
        const classSchedule = club?.scheduledClubTimes?.[selectedClass];
        if (!classSchedule) return false;

        const daySchedule = classSchedule[selectedDate];
        if (!daySchedule?.startTime) return false;

        const clubHour = Number(daySchedule.startTime.split(':')[0]);
        return clubHour >= startHour && clubHour < endHour;
      });
    }

    // Filter by genre/category
    if (selectedCategory) {
      filtered = filtered.filter((club) => club.clubCategoryName === selectedCategory);
    }

    // Filter by specific sport/course
    if (selectedSubCategory) {
      filtered = filtered.filter((club) => club.clubSubCategoryName === selectedSubCategory);
    }

    return filtered;
  }, [allClubs, selectedClass, selectedDate, selectedTime, selectedCategory, selectedSubCategory]);

  const isFiltered = Boolean(selectedClass || selectedDate || selectedTime || selectedCategory || selectedSubCategory);

  return (
    <div className="relative">
      {/* filters */}
      <section id="sports" className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4 flex flex-col gap-12">
          <div className="text-center" data-scroll-point="search-title">
            <h2 className="text-4xl md:text-5xl font-black text-[#FCB027]">ӨӨРТ ОЙР ДУГУЙЛАН ХАЙХ</h2>
          </div>

          <div className="max-w-4xl mx-auto" data-scroll-point="date-time">
            <div className="bg-white/50 rounded-2xl p-8 border-2 border-slate-200 shadow-lg hover:shadow-2xl flex flex-col gap-8">
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

              {/* Category Tabs */}
              <div data-scroll-point="genre">
                <div className="flex items-center gap-2 mb-4">
                  <LayoutGrid className="w-5 h-5 text-orange-600" />
                  <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Категори сонгох</p>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory((prev) => (prev === cat.key ? '' : cat.key))}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all duration-200 cursor-pointer border-2 ${
                        selectedCategory === cat.key ? 'bg-orange-600 border-orange-600 text-white shadow-lg' : 'border-slate-200 hover:border-orange-600 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Courses List - Scrollable */}
              {selectedCategory && (
                <div className="mx-auto mb-16">
                  <div className="flex items-center gap-2 mb-4">
                    <LayoutList className="w-5 h-5 text-orange-600" />
                    <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Төрөл сонгох</p>
                  </div>
                  {/* <div className="bg-white/50 rounded-2xl p-6 border-2 border-slate-200 shadow-lg"> */}
                  {/* <h3 className="text-xl font-bold text-slate-900 mb-4">{CATEGORY_UI_MAP[selectedCategory]?.label ?? selectedCategory}</h3> */}
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-slate-100">
                    {subCategories.map((subCategory) => (
                      <button
                        key={subCategory.name}
                        onClick={() => setSelectedSubCategory(subCategory.name)}
                        className={`shrink-0 w-32 p-5 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                          selectedSubCategory === subCategory.name ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-slate-200 /50 hover:border-orange-300'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className={`text-4xl transition-transform duration-300 ${selectedSubCategory === subCategory.name ? 'scale-110' : 'group-hover:scale-110'}`}>{subCategory.icon}</div>
                          <span className={`font-semibold text-xs text-center transition-colors ${selectedSubCategory === subCategory.name ? 'text-orange-600' : 'text-slate-700'}`}>
                            {subCategory.name}
                          </span>
                        </div>
                        {selectedSubCategory === subCategory.name && <div className="mt-2 w-full h-1 bg-orange-500 rounded-full"></div>}
                      </button>
                    ))}
                  </div>
                  {/* </div> */}
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
