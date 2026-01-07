'use client';

import { ClassLevelsType, NewClubType } from '@/lib/utils/types';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@intern-3a/shadcn';
import { Calendar, Coins, Mail, Phone } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { EditClassLevelInfoTrigger } from './EditClassLevelInfoTrigger';

const CLASS_LEVEL_LABEL_MN: Record<ClassLevelsType, string> = {
  Elementary: 'Бага',
  Middle: 'Дунд',
  High: 'Ахлах',
};

const WEEK_DAY_LABEL_MN = {
  MON: 'Да',
  TUE: 'Мя',
  WED: 'Лх',
  THU: 'Пү',
  FRI: 'Ба',
  SAT: 'Бя',
  SUN: 'Ня',
} as const;

type Props = {
  selectedClub: NewClubType;
};

export const MyClubCategoryComponent = ({ selectedClub }: Props) => {
  const [selectedClass, setSelectedClass] = useState<ClassLevelsType | null>(null);
  const { getToken } = useAuth();

  const teacher = selectedClass && selectedClub.teachersInfoByClass?.[selectedClass];
  const schedule = selectedClass && selectedClub.scheduledClubTimes?.[selectedClass];
  const price = selectedClass && selectedClub.clubPrices?.[selectedClass];

  const handleDeleteClassLevel = async (level: ClassLevelsType) => {
    const confirmed = confirm(`${CLASS_LEVEL_LABEL_MN[level]} анги устгах уу?`);
    if (!confirmed) return;

    try {
      const token = await getToken();

      const res = await fetch('/api/delete-class-level', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clubId: selectedClub._id,
          classLevel: level,
        }),
      });

      if (!res.ok) {
        toast.error('Анги устгахад алдаа гарлаа');
        return;
      }

      toast.success('Анги амжилттай устгагдлаа');

      // if (selectedClass === level) {
      //   setSelectedClass(null);
      // }

      if (selectedClass === level) {
        const remainingClassLevels = Object.keys(selectedClub.teachersInfoByClass ?? {}).filter((classLevel) => classLevel !== level) as ClassLevelsType[];

        setSelectedClass(remainingClassLevels[0] ?? null);
      }
    } catch (err) {
      toast.error('Алдаа гарлаа');
    }
  };

  useEffect(() => {
    setSelectedClass(null);
  }, [selectedClub._id]);

  useEffect(() => {
    if (!selectedClub || selectedClass) return;

    const classLevel = Object.keys(selectedClub.teachersInfoByClass ?? {}) as ClassLevelsType[];

    if (classLevel.length > 0) {
      setSelectedClass(classLevel[0]);
    }
  }, [selectedClub, selectedClass]);

  return (
    <div>
      <div>
        <p className="font-semibold mb-2">Анги сонгох</p>
        <div className="flex gap-2">
          {(Object.keys(selectedClub.teachersInfoByClass || {}) as ClassLevelsType[]).map((level) => (
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
      </div>

      <div className="mt-4">
        {teacher ? (
          <div className="flex gap-20">
            <div className="border rounded-xl p-7 bg-white shadow-sm w-120">
              <img src={typeof teacher.teacherImage === 'string' ? teacher.teacherImage : '/default-avatar.png'} alt={teacher.teacherName} className="w-20 h-20 rounded-full object-cover mx-auto" />

              <h3 className="mt-2 text-center font-semibold text-lg">{teacher.teacherName}</h3>
              <p className="text-center text-sm text-gray-500 mb-3">{CLASS_LEVEL_LABEL_MN[selectedClass!]} анги</p>

              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <b>Мэргэжил:</b> {teacher.teacherProfession || '—'}
                </p>
                <p>
                  <b>Туршлага:</b> {teacher.teacherExperience || '—'}
                </p>
                <p>
                  <b>Амжилт:</b> {teacher.teacherAchievement || '—'}
                </p>
              </div>

              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {teacher.teacherPhone || '—'}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {teacher.teacherEmail || '—'}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between w-full">
              <div className="flex flex-col gap-4 ">
                <div className="flex gap-3 items-start">
                  <Calendar className="w-5 h-5" style={{ color: '#FCB027' }} aria-hidden />
                  <h4 className="font-semibold mb-3">Хичээлийн хуваарь</h4>
                </div>

                {schedule && Object.keys(schedule).length > 0 ? (
                  <div className="flex flex-col gap-2 text-sm ml-10">
                    {Object.entries(schedule).map(([day, time]) => (
                      <div key={day} className="flex gap-10">
                        <span className="font-medium">{WEEK_DAY_LABEL_MN[day as keyof typeof WEEK_DAY_LABEL_MN]}</span>
                        <span>
                          {time.startTime} – {time.endTime}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Хуваарь оруулаагүй</p>
                )}

                {price && (
                  <div className="flex gap-3 items-start">
                    <Coins style={{ color: '#FCB027' }} />
                    <p className="text-md">
                      <span className="font-semibold mr-3">Төлбөр:</span> {price} ₮ / сар
                    </p>
                  </div>
                )}
              </div>
              <div>
                {selectedClass && (
                  <div className="flex justify-end gap-5">
                    <Button onClick={() => handleDeleteClassLevel(selectedClass)} className="bg-red-500 hover:bg-red-700 text-sm rounded-lg">
                      Анги устгах
                    </Button>
                    <EditClassLevelInfoTrigger club={selectedClub} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Анги сонговол багш, хуваарь харагдана</p>
        )}
      </div>
    </div>
  );
};
