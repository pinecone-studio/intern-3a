'use client';

import { NewClubType, ClassLevelsType, WeekDayType } from '@/lib/utils/types';
import { Card, CardContent } from '@intern-3a/shadcn';
import { Mail, Phone, X, Tag, Calendar, MapPin } from 'lucide-react';
import { useState, useMemo } from 'react';

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

export default function ClubCard({ club }: { club: NewClubType }) {
  const [open, setOpen] = useState(false);
  const [modalDescExpanded, setModalDescExpanded] = useState(false);

  const levelLabel = useMemo(() => club.selectedClassLevelNames?.map((l) => CLASS_LEVEL_LABEL_MN[l]).join(' · ') || '—', [club.selectedClassLevelNames]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
    }
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
              <div className="space-y-4">
                <div className="relative">
                  <img src={club.clubImage as string} alt={club.clubName} className="w-full h-48 object-cover rounded-lg" />

                  <div className="absolute top-4 left-4 bg-[#FCB027] text-white rounded-full inline-block px-2 py-1">
                    <h2 className="text-1xl font-bold drop-shadow">{club.clubName}</h2>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="font-semibold mb-2">Багш</div>
                  <div className="flex items-center gap-3 flex-col">
                    <img src={club.teacherImage as string} alt={club.teacherName} className="w-16 h-16 rounded-full object-cover" />
                    <div className="text-center">
                      <p className="font-medium">{club.teacherName}</p>
                      <div className="text-sm text-gray-600 mt-1">
                        <div>
                          <span className="font-semibold">Мэргэжил:</span> {club.teacherProfession}
                        </div>
                        <div>
                          <span className="font-semibold">Туршлага:</span> {club.teacherExperience || '—'}
                        </div>
                        <div>
                          <span className="font-semibold">Амжилт:</span> {club.teacherAchievement || '—'}
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <div className="flex items-center gap-2 justify-center">
                          <Phone className="w-4 h-4 text-gray-500" /> <span>{club.teacherPhone || '—'}</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center mt-1">
                          <Mail className="w-4 h-4 text-gray-500" /> <span>{club.teacherEmail || '—'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                <div className="flex gap-4">
                  <div className="inline-flex items-center gap-2">
                    <Calendar className="w-5 h-5" style={{ color: '#FCB027' }} aria-hidden />
                    <span className="sr-only">Хичээлийн хуваарь</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-700">
                    {Object.entries(club.scheduledClubTimes || {}).length === 0 ? (
                      <p>Хуваарь оруулаагүй</p>
                    ) : (
                      Object.entries(club.scheduledClubTimes || {}).map(([day, t]) => (
                        <div key={day} className="flex gap-4">
                          <span className="font-medium">{WEEK_DAY_LABEL_MN[day as WeekDayType]}</span>
                          <span>
                            {t?.startTime} – {t?.endTime}
                          </span>
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
}
