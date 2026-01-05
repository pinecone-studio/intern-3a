'use client';

import { ClassLevelsType, NewClubType, WeekDayType } from '@/lib/utils/types';
import { Card, CardContent } from '@intern-3a/shadcn';
import { Calendar, Mail, MapPin, Phone, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

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

  const levelLabel = useMemo(() => club.selectedClassLevelNames?.map((l) => CLASS_LEVEL_LABEL_MN[l]).join(' · ') || '—', [club.selectedClassLevelNames]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
    }
  };
  const [selectedClass, setSelectedClass] = useState<ClassLevelsType | null>(null);
  // const [selectedDay, setSelectedDay] = useState<WeekDayType | null>(null);

  const classLevels: ClassLevelsType[] = ['Elementary', 'Middle', 'High'];

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

  return (
    <div className="max-w-lg mx-auto relative">
      <Card
        className="group overflow-hidden rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="relative">
          <img src={club.clubImage as string} alt={club.clubName} className="w-full h-56 object-cover" />

          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" aria-hidden />

          <div className="absolute left-4 bottom-4 text-white">
            <h2 className="text-2xl font-bold drop-shadow">{club.clubName}</h2>
          </div>

          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FCB027] text-white text-xs font-medium">{levelLabel}</span>
          </div>
        </div>

        <CardContent className="space-y-4 bg-white">
          <div>
            <div className="items-center gap-2 inline-flex">
              <h4 className="font-semibold text-black">
                <span className="inline-flex items-center">
                  <Calendar className="w-5 h-5" style={{ color: '#FCB027' }} aria-hidden />
                </span>
              </h4>
              <div className="flex gap-5">
                {Object.entries(club.scheduledClubTimes || {}).length === 0 ? (
                  <p>Хуваарь оруулаагүй</p>
                ) : (
                  Object.entries(club.scheduledClubTimes || {}).map(([day, t]) => (
                    <div key={day} className="flex ">
                      <span className="font-medium">{WEEK_DAY_LABEL_MN[day as WeekDayType]}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="mt-3 flex gap-4">
              <div className="inline-flex items-center gap-2">
                <MapPin className="w-5 h-5" style={{ color: '#FCB027' }} aria-hidden />
                <span className="sr-only">Хаяг</span>
              </div>
              <p className="font-medium mt-1">{club.clubAddress}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden />

          <div className="relative bg-white rounded-2xl p-6 w-11/12 max-w-2xl mx-auto shadow-2xl max-h-[90vh] overflow-auto" role="dialog" aria-modal="true">
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" aria-label="Close details">
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img className="w-70" src={clubImageSrc} alt={club.clubName} />
                <div className="font-semibold mb-2">Багш</div>

                {club.teachersInfoByClass && Object.entries(club.teachersInfoByClass).length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {Object.entries(club.teachersInfoByClass).map(([classLevel, teacher]) => (
                      <div key={classLevel} className="flex items-center gap-3 flex-col border p-3 rounded-lg bg-gray-50">
                        <div className="text-center">
                          <p className="font-medium">{teacher.teacherName || '—'}</p>
                          <img src={getImageSrc(teacher.teacherImage)} alt={teacher.teacherName} className="w-16 h-16 rounded-full object-cover mx-auto my-2" />
                          <div className="text-sm text-gray-600 mt-1 flex">
                            <div>
                              <span className="font-semibold">Анги:</span> {CLASS_LEVEL_LABEL_MN[classLevel as ClassLevelsType]}
                            </div>
                            <div>
                              <span className="font-semibold">Мэргэжил:</span> {teacher.teacherProfession || '—'}
                            </div>
                            <div>
                              <span className="font-semibold">Туршлага:</span> {teacher.teacherExperience || '—'}
                            </div>
                            <div>
                              <span className="font-semibold">Амжилт:</span> {teacher.teacherAchievement || '—'}
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-700">
                            <div className="flex items-center gap-2 justify-center">
                              <Phone className="w-4 h-4 text-gray-500" /> <span>{teacher.teacherPhone || '—'}</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center mt-1">
                              <Mail className="w-4 h-4 text-gray-500" /> <span>{teacher.teacherEmail || '—'}</span>
                            </div>
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
                <div>
                  <p
                    className="text-sm text-black/90"
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
                    {modalDescExpanded ? '⇧' : '⇩'}
                  </button>
                </div>
                <div className="mt-3 flex gap-4">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-[#FCB027]">Категори</span>:
                  </div>
                  <p className="font-medium mt-1">{CLASS_LEVEL_LABEL_MN[club.clubCategoryName as ClassLevelsType] || club.clubCategoryName}</p>
                </div>

                <div className="flex gap-4">
                  <div className="inline-flex items-center gap-2">
                    <Calendar className="w-5 h-5" style={{ color: '#FCB027' }} aria-hidden />
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
                        <div className="flex gap-2 mb-3">
                          {classLevels.map((level) => (
                            <button
                              key={level}
                              className={`px-3 py-1 rounded ${selectedClass === level ? 'bg-[#FCB027] text-white' : 'bg-gray-200 text-gray-800'}`}
                              onClick={() => setSelectedClass(level)}
                            >
                              {CLASS_LEVEL_LABEL_MN[level]}
                            </button>
                          ))}
                        </div>

                        {selectedClass && club.scheduledClubTimes?.[selectedClass] && (
                          <div className="flex flex-col gap-2">
                            {Object.entries(club.scheduledClubTimes?.[selectedClass]).map(([day, schedule]) => (
                              <div key={day} className=" flex gap-3">
                                <span className="font-semibold">{WEEK_DAY_LABEL_MN[day as WeekDayType]}:</span>
                                <span>
                                  Эхлэх: {schedule.startTime} - Дуусах: {schedule.endTime}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <p className=" text-[#FCB027]">Төлбөр сараар</p>
                  <div className="mt-2 flex flex-wrap gap-2 ml-8">
                    {club.clubPrices ? (
                      Object.entries(club.clubPrices).map(([k, v]) => (
                        <span key={k} className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                          {PRICE_LABEL_MN[k as ClassLevelsType]}: {v ? `${v.toLocaleString()}₮/сар` : '—'}
                        </span>
                      ))
                    ) : (
                      <span>—</span>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex gap-4">
                  <div className="inline-flex items-center gap-2">
                    <MapPin className="w-5 h-5" style={{ color: '#FCB027' }} aria-hidden />
                    <span className="sr-only">Хаяг</span>
                  </div>
                  <p className="font-medium mt-1">{club.clubAddress}</p>
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
