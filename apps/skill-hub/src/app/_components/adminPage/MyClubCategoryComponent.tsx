'use client';

import { useProjects } from '@/app/hook/use-projects';
import { ClassLevelsType, NewClubType } from '@/lib/utils/types';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@intern-3a/shadcn';
import { Mail, Phone } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { toast } from 'sonner';
import { EditClassLevelInfoTrigger } from './EditClassLevelInfoTrigger';
import { MyClubCurriculum } from './MyClubCurriculum';

const CLASS_LEVEL_LABEL_MN: Record<ClassLevelsType, string> = {
  Elementary: 'Бага',
  Middle: 'Дунд',
  High: 'Ахлах',
};

type Props = {
  selectedClub: NewClubType;
};

export const MyClubCategoryComponent = ({ selectedClub }: Props) => {
  const [selectedClass, setSelectedClass] = useState<ClassLevelsType | null>(null);
  const { getToken } = useAuth();
  const { projects } = useProjects(selectedClub._id);

  const teacher = selectedClass && selectedClub.teachersInfoByClass?.[selectedClass];
  const curriculum = selectedClass ? projects.filter((project) => project.classLevel.includes(selectedClass)) : [];
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
      <div className="w-full bg-gray-50 rounded-lg p-4 flex justify-between items-center">
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

        <div>
          {selectedClass && (
            <div className="flex justify-between gap-3">
              <Button onClick={() => handleDeleteClassLevel(selectedClass)} className="bg-red-500 hover:bg-red-700 text-sm rounded-lg">
                <FaTrashCan />
              </Button>
              <EditClassLevelInfoTrigger club={selectedClub} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        {teacher ? (
          <div className="flex gap-20">
            <div className="border rounded-xl p-7 bg-white shadow-sm w-120 h-fit">
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

            <div className="w-full">
              <MyClubCurriculum curriculum={curriculum} selectedClass={selectedClass} schedule={schedule} price={price} />
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Анги сонговол багш, хуваарь харагдана</p>
        )}
      </div>
    </div>
  );
};
