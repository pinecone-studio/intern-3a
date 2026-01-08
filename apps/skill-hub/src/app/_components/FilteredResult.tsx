'use client';

import { ClassLevelsType, NewClubType } from '@/lib/utils/types';
import { Button } from '@intern-3a/shadcn';
import { ChevronDown, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useClub } from '../hook/use-club';
import Map from './Map';

type FilteredClubsCardProps = {
  filteredClubs: NewClubType[];
  isFiltered: boolean;
  resetFilters: () => void;
};

const FilteredResult = ({ filteredClubs, isFiltered, resetFilters }: FilteredClubsCardProps) => {
  const { isLoading } = useClub();
  const router = useRouter();
  const [expandedClass, setExpandedClass] = useState<{ clubId: string; level: ClassLevelsType } | null>(null);

  const toggleClassDetails = (clubId: string, level: ClassLevelsType) => {
    if (expandedClass?.clubId === clubId && expandedClass?.level === level) {
      setExpandedClass(null);
    } else {
      setExpandedClass({ clubId, level });
    }
  };

  const formatDayName = (day: string) => {
    const dayMap: Record<string, string> = {
      MON: 'Даваа',
      TUE: 'Мягмар',
      WED: 'Лхагва',
      THU: 'Пүрэв',
      FRI: 'Баасан',
      SAT: 'Бямба',
      SUN: 'Ням',
    };
    return dayMap[day] || day;
  };

  return (
    <div>
      <div>
        {isFiltered && (
          <div className="max-w-5xl mx-auto mt-16">
            <div className="mb-8 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-slate-900">Олдсон дугуйлангууд ({filteredClubs.length})</h3>
              <button onClick={resetFilters} className="px-6 py-2 bg-[#0A427A] hover:bg-[#083563] text-white rounded-lg font-bold transition-all">
                Шүүлтүүрийг цэвэрлэх
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-16 bg-white/50 rounded-2xl border-2 border-slate-200">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4">
                  <Loader />
                </div>
                <p className="text-xl text-slate-600">Дугуйлангууды г хайж байна...</p>
              </div>
            ) : filteredClubs.length === 0 ? (
              <div className="text-center py-16 bg-white/50 rounded-2xl border-2 border-slate-200">
                <p className="text-xl text-slate-600">Таны хайлтад тохирох дугуйлан олдсонгүй</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClubs.map((club) => (
                  <div key={club._id} className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                    <div className="aspect-video relative overflow-hidden bg-slate-100">
                      {club.clubImage && <img src={typeof club.clubImage === 'string' ? club.clubImage : ''} alt={club.clubName} className="w-full h-full object-cover" />}
                    </div>
                    <div className="p-6 flex flex-col grow">
                      <h4 className="text-xl font-bold text-[#0A427A] mb-2 line-clamp-1">{club.clubName}</h4>

                      <p className="text-slate-600 text-sm mb-4 line-clamp-2 h-10">{club.clubDescription}</p>

                      <div className="mb-3">
                        <div className="flex flex-wrap gap-2 min-h-\[28px]\">
                          {club.selectedClassLevelNames && club.selectedClassLevelNames.length > 0 ? (
                            club.selectedClassLevelNames.map((level) => (
                              <div key={level} className="relative">
                                <button
                                  onClick={() => toggleClassDetails(club._id || '', level)}
                                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-full flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  {level}
                                  <ChevronDown className={`w-3 h-3 transition-transform ${expandedClass?.clubId === club._id && expandedClass?.level === level ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                            ))
                          ) : (
                            <span className="invisible">placeholder</span>
                          )}
                        </div>

                        {/* Dropdown for selected class */}
                        {club.selectedClassLevelNames?.map(
                          (level) =>
                            expandedClass?.clubId === club._id &&
                            expandedClass?.level === level && (
                              <div key={`${level}-dropdown`} className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                                <div className="mb-2">
                                  <strong className="text-slate-700">Үнэ:</strong>{' '}
                                  <span className="text-slate-600">{club.clubPrices?.[level] ? `${club.clubPrices[level].toLocaleString()}₮` : 'Мэдээлэл байхгүй'}</span>
                                </div>
                                <div>
                                  <strong className="text-slate-700">Хичээлийн цаг:</strong>
                                  <div className="mt-1 space-y-1">
                                    {club.scheduledClubTimes?.[level] && Object.keys(club.scheduledClubTimes[level]).length > 0 ? (
                                      Object.entries(club.scheduledClubTimes[level]).map(([day, time]) => (
                                        <div key={day} className="text-slate-600">
                                          {formatDayName(day)}: {time?.startTime} - {time?.endTime}
                                        </div>
                                      ))
                                    ) : (
                                      <span className="text-slate-600">Мэдээлэл байхгүй</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ),
                        )}
                      </div>

                      <div className="mb-4 min-h-\[60px]\">
                        {club.teachersInfoByClass && Object.keys(club.teachersInfoByClass).length > 0 ? (
                          <div>
                            <p className="text-xs font-semibold text-slate-700 mb-2">Багш:</p>
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(club.teachersInfoByClass)
                                .filter(([_, teacher]) => teacher?.teacherName)
                                .map(([level, teacher]) => (
                                  <div key={level} className="flex items-center gap-2 group">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200 border-2 border-slate-300 group-hover:border-orange-500 transition-colors">
                                      {teacher?.teacherImage ? (
                                        <img
                                          src={typeof teacher.teacherImage === 'string' ? teacher.teacherImage : ''}
                                          alt={teacher?.teacherName || 'Teacher'}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-bold">{teacher?.teacherName?.charAt(0).toUpperCase()}</div>
                                      )}
                                    </div>
                                    <span className="text-xs text-slate-600">{teacher?.teacherName}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ) : (
                          <span className="invisible">placeholder</span>
                        )}
                      </div>

                      <div className="flex justify-between gap-2 mt-auto">
                        <Button onClick={() => router.push(`/club/${club._id}`)} className="bg-[#FCB027] hover:bg-[#e69f1c] text-white rounded-full px-5 cursor-pointer">
                          Дэлгэрэнгүй
                        </Button>

                        <Button className="bg-[#0A427A] hover:bg-[#093662] text-white rounded-full px-5 cursor-pointer" onClick={() => router.push('/register')}>
                          Бүртгүүлэх
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        {isFiltered ? (
          <div className="mt-10" data-scroll-point="map">
            <Map filteredClubs={filteredClubs} />
          </div>
        ) : (
          <div className="m-auto shadow-lg rounded-2xl border-2 border-slate-200  h-50 w-287.5 flex justify-center items-center">
            <p className="text-slate-500 text-lg">Газрын зураг дээр харуулах клуб олдсонгүй</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilteredResult;
