'use client';

import { ClassLevelsType, NewClubType, WeekDayType } from '@/lib/utils/types';
import { Button } from '@intern-3a/shadcn';
import { Calendar, ChevronDown, ChevronUp, Layers, MapPin, Phone, Wallet, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { IoIosMail } from 'react-icons/io';

const CLASS_LEVEL_LABEL_MN: { [K in ClassLevelsType]: string } = {
  Elementary: 'Бага',
  Middle: 'Дунд',
  High: 'Ахлах',
};

const WEEK_DAY_LABEL_MN: { [K in WeekDayType]: string } = {
  MON: 'Да',
  TUE: 'Мя',
  WED: 'Лх',
  THU: 'Пү',
  FRI: 'Ба',
  SAT: 'Бя',
  SUN: 'Ня',
};

const PRICE_LABEL_MN: { [K in ClassLevelsType]: string } = {
  Elementary: 'Бага /I-V анги/',
  Middle: 'Дунд /V-IX анги/',
  High: 'Ахлах /IX-XII анги/',
};

export const ClubCard = ({ club }: { club: NewClubType }) => {
  const [open, setOpen] = useState(false);
  const [modalDescExpanded, setModalDescExpanded] = useState(false);

  const [expandedClass, setExpandedClass] = useState<ClassLevelsType | null>(null);
  const router = useRouter();

  const levelLabel = useMemo(() => club.selectedClassLevelNames?.map((l) => CLASS_LEVEL_LABEL_MN[l]).join(' · ') || '—', [club.selectedClassLevelNames]);
  const CLASS_PRIORITY: ClassLevelsType[] = ['Elementary', 'Middle', 'High'];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
    }
  };

  const [selectedClass, setSelectedClass] = useState<ClassLevelsType | null>(null);
  // const [selectedDay, setSelectedDay] = useState<WeekDayType | null>(null);

  const classLevels: ClassLevelsType[] = ['Elementary', 'Middle', 'High'];

  const toggleClassDetails = (level: ClassLevelsType) => {
    setExpandedClass(expandedClass === level ? null : level);
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

  const clubImageSrc = useMemo(() => {
    if (!club.clubImage) return '/default-avatar.png';

    if (club.clubImage instanceof File) {
      return URL.createObjectURL(club.clubImage);
    }

    return club.clubImage; // string URL
  }, [club.clubImage]);

  useEffect(() => {
    return () => {
      if (club.clubImage instanceof File) {
        URL.revokeObjectURL(clubImageSrc);
      }
    };
  }, [club.clubImage, clubImageSrc]);

  const getImageSrc = (image?: string | File) => {
    if (!image) return '/default-avatar.png';

    if (image instanceof File) {
      return URL.createObjectURL(image);
    }

    return image;
  };
  useEffect(() => {
    if (!open) return;

    if (!club.selectedClassLevelNames || club.selectedClassLevelNames.length === 0) {
      setSelectedClass(null);
      return;
    }

    const defaultClass = CLASS_PRIORITY.find((level) => club.selectedClassLevelNames?.includes(level));

    setSelectedClass(defaultClass ?? null);
  }, [open, club.selectedClassLevelNames]);

  return (
    <div className="w-80 relative">
      <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
        <div className="aspect-video relative overflow-hidden bg-slate-100 w-full">
          {club.clubImage && <img src={typeof club.clubImage === 'string' ? club.clubImage : ''} alt={club.clubName} className="w-full h-full object-cover" />}
        </div>

        <div className="p-6 flex flex-col flex-grow">
          {/* Club Name - дээд талд */}
          <h4 className="text-xl font-bold text-[#0A427A] mb-2 line-clamp-1">{club.clubName}</h4>

          {/* Description - дунд хэсэг, line-clamp-2 хэвээр */}
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">{club.clubDescription}</p>

          {/* Class Levels */}
          <div className="mb-3">
            <div className="flex gap-2 flex-wrap">
              {club.selectedClassLevelNames?.map((level) => (
                <div key={level} className="relative">
                  <button
                    onClick={() => toggleClassDetails(level)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-full flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {/* {level} */}
                    {CLASS_LEVEL_LABEL_MN[level as ClassLevelsType]}
                    <ChevronDown className={`w-3 h-3 transition-transform ${expandedClass === level ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              ))}
            </div>

            {club.selectedClassLevelNames?.map(
              (level) =>
                expandedClass === level && (
                  <div key={`${level}-dropdown`} className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
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
                    <div className="mb-2">
                      <strong className="text-slate-700">Үнэ:</strong>{' '}
                      <span className="text-slate-600">{club.clubPrices?.[level] ? `${club.clubPrices[level].toLocaleString()}₮` : 'Мэдээлэл байхгүй'}</span>
                    </div>
                  </div>
                ),
            )}
          </div>

          {/* Teachers */}
          <div className="mb-4">
            {club.teachersInfoByClass && Object.keys(club.teachersInfoByClass).length > 0 ? (
              <div>
                <p className="text-xs font-semibold text-slate-700 mb-2">Багш:</p>
                <div className="flex flex-col gap-2">
                  {Object.entries(club.teachersInfoByClass)
                    .filter(([_, teacher]) => teacher?.teacherName)
                    .map(([level, teacher]) => (
                      <div key={level} className="flex items-center gap-2 group">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200 border-2 border-slate-300 group-hover:border-orange-500 transition-colors">
                          {teacher?.teacherImage ? (
                            <img src={typeof teacher.teacherImage === 'string' ? teacher.teacherImage : ''} alt={teacher?.teacherName || 'Teacher'} className="w-full h-full object-cover" />
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

          {/* Button at the bottom */}
          <div className="mt-auto flex justify-center">
            <Button onClick={() => setOpen(true)} className="bg-[#FCB027] hover:bg-[#e69f1c] text-white rounded-full px-5 cursor-pointer w-full">
              Дэлгэрэнгүй
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden />

          <div className="relative bg-white rounded-2xl p-6 w-11/12 max-w-2xl mx-auto shadow-2xl max-h-[90vh] overflow-auto" role="dialog" aria-modal="true">
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" aria-label="Close details">
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img className="w-80 rounded-2xl" src={clubImageSrc} alt={club.clubName} />
                <div className="font-semibold mb-2 mt-5">Багш</div>

                {club.teachersInfoByClass && Object.entries(club.teachersInfoByClass).length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {Object.entries(club.teachersInfoByClass)
                      .filter(([classLevel]) => classLevel === selectedClass)
                      .map(([classLevel, teacher]) => (
                        <div key={classLevel} className="border rounded-xl p-5 bg-white shadow-sm text-center">
                          <img src={getImageSrc(teacher.teacherImage)} alt={teacher.teacherName} className="w-20 h-20 rounded-full object-cover mx-auto" />

                          <h3 className="mt-2 font-semibold text-lg">{teacher.teacherName || '—'}</h3>

                          <p className="text-sm text-gray-500 mb-3">{CLASS_LEVEL_LABEL_MN[classLevel as ClassLevelsType]} анги</p>

                          <div className="text-sm text-gray-700 space-y-1">
                            <div>
                              <b>Мэргэжил:</b> {teacher.teacherProfession || '—'}
                            </div>
                            <div>
                              <b>Туршлага:</b> {teacher.teacherExperience || '—'}
                            </div>
                            <div>
                              <b>Амжилт:</b> {teacher.teacherAchievement || '—'}
                            </div>
                          </div>

                          <div className="mt-3 text-sm text-gray-600 space-y-1">
                            <div className="flex justify-center items-center gap-2">
                              <Phone className="w-4 h-4 text-black fill-black" />
                              {teacher.teacherPhone || '—'}
                            </div>
                            <div className="flex justify-center items-center gap-2">
                              <IoIosMail className="w-5 h-5 stroke-white fill-black" strokeWidth={2} />
                              {teacher.teacherEmail || '—'}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <span>Багшийн мэдээлэл алга</span>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#FCB027] mb-2 line-clamp-1">{club.clubName}</h4>
                <div>
                  <p
                    className="text-ls text-black/90"
                    style={modalDescExpanded ? ({} as React.CSSProperties) : ({ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties)}
                  >
                    {club.clubDescription}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalDescExpanded((s) => !s);
                    }}
                    aria-expanded={modalDescExpanded}
                    className="mt-2 text-sm text-blue-600 underline"
                    type="button"
                  >
                    {modalDescExpanded ? <ChevronUp className="w-5 h-5 text-black" /> : <ChevronDown className="w-5 h-5 text-black" />}
                  </button>
                </div>
                <div className="mt-3 flex gap-4 items-center">
                  <div className="inline-flex items-center gap-2">
                    <div className="relative group inline-flex items-center">
                      <Layers className="w-5 h-5 text-orange-600" />

                      <span
                        className="
                         absolute -top-8 left-1/2 -translate-x-1/2
                         whitespace-nowrap
                         rounded-md bg-black px-2 py-1
                         text-xs text-white
                         opacity-0 group-hover:opacity-100
                         transition
                       "
                      >
                        Категори
                      </span>
                    </div>
                  </div>
                  <p className="font-medium mt-1">{CLASS_LEVEL_LABEL_MN[club.clubCategoryName as ClassLevelsType] || club.clubCategoryName}</p>
                </div>

                <div className="">
                  <div className="inline-flex items-center gap-2">
                    <div className="relative group inline-flex items-center">
                      {/* <Calendar className="w-5 h-5 text-orange-600" /> */}

                      <span
                        className="
                         absolute -top-8 left-1/2 -translate-x-1/2
                         whitespace-nowrap
                         rounded-md bg-black px-2 py-1
                         text-xs text-white
                         opacity-0 group-hover:opacity-100
                         transition
                       "
                      >
                        Хичээлийн цаг
                      </span>
                    </div>
                    <span className="sr-only">Хичээлийн хуваарь</span>
                    {club.scheduledClubTimes && Object.entries(club.scheduledClubTimes).length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-3"></div>
                    ) : (
                      <span className="font-medium mt-1">Хуваарь оруулаагүй</span>
                    )}
                  </div>
                  <div>
                    {open && (
                      <div className="">
                        <div className="flex gap-2 mb-4 ">
                          {club.selectedClassLevelNames?.map((level) => (
                            <button
                              key={level}
                              onClick={() => setSelectedClass(level)}
                              className={`
                                 px-4 py-1.5 rounded-full text-sm font-medium transition-all
                                 ${selectedClass === level ? 'bg-[#FCB027] text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                               `}
                            >
                              {CLASS_LEVEL_LABEL_MN[level]}
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-4 items-center ">
                          <Calendar className="w-5 h-5 text-orange-600" />
                          <div className="">
                            {selectedClass && club.scheduledClubTimes?.[selectedClass] && (
                              <div className="flex flex-col gap-2">
                                {Object.entries(club.scheduledClubTimes?.[selectedClass]).map(([day, schedule]) => (
                                  <div key={day} className=" flex gap-3">
                                    <span className="font-semibold">{WEEK_DAY_LABEL_MN[day as WeekDayType]}:</span>
                                    <span className="text-sl">
                                      Эхлэх: {schedule.startTime} - Дуусах: {schedule.endTime}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative group inline-flex items-center">
                    <Wallet className="w-5 h-5 text-orange-600" />

                    <span
                      className="
                         absolute -top-8 left-1/2 -translate-x-1/2
                         whitespace-nowrap
                         rounded-md bg-black px-2 py-1
                         text-xs text-white
                         opacity-0 group-hover:opacity-100
                         transition
                       "
                    >
                      Төлбөр
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 ">
                    {club.clubPrices ? (
                      Object.entries(club.clubPrices).map(([k, v]) => (
                        <span key={k} className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                          {PRICE_LABEL_MN[k as ClassLevelsType]}:{' '}
                          {v ? (
                            <>
                              <span className="text-black font-semibold">{v.toLocaleString()}</span>
                              ₮/сар
                            </>
                          ) : (
                            '—'
                          )}
                        </span>
                      ))
                    ) : (
                      <span>—</span>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex gap-4">
                  <div className="inline-flex items-center gap-2">
                    <div className="relative group inline-flex items-center">
                      <MapPin className="w-5 h-5 text-orange-600" />

                      <span
                        className="
                         absolute -top-8 left-1/2 -translate-x-1/2
                         whitespace-nowrap
                         rounded-md bg-black px-2 py-1
                         text-xs text-white
                         opacity-0 group-hover:opacity-100
                         transition
                       "
                      >
                        Хаяг
                      </span>
                    </div>
                    <span className="sr-only">Хаяг</span>
                  </div>
                  <p className="font-medium mt-1 text-lx text-gray-800">{club.clubAddress}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-md border text-sm">
                Хаах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
