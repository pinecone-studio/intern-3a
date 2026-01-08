'use client';

import { ClassLevelsType, ClubProjectType, DaytimeType, WeekDayType } from '@/lib/utils/types';
import { Calendar, Coins, LayoutGrid } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { IoMdTime } from 'react-icons/io';
import { LuGraduationCap } from 'react-icons/lu';
import { MdOutlineClass, MdOutlineDescription } from 'react-icons/md';
import { PiPersonArmsSpread } from 'react-icons/pi';

const WEEK_DAY_LABEL_MN = {
  MON: 'Да',
  TUE: 'Мя',
  WED: 'Лх',
  THU: 'Пү',
  FRI: 'Ба',
  SAT: 'Бя',
  SUN: 'Ня',
} as const;

const levels = ['Beginner', 'Intermediate', 'Pro'] as const;
type DifficultyLevel = (typeof levels)[number];

const DIFFICULTY_LEVEL_LABEL_MN: Record<DifficultyLevel, string> = {
  Beginner: 'Анхан',
  Intermediate: 'Дунд',
  Pro: 'Ахисан',
};

const CLASS_LEVEL_LABEL_MN: Record<ClassLevelsType, string> = {
  Elementary: 'Бага',
  Middle: 'Дунд',
  High: 'Ахлах',
};

type Props = {
  curriculum: ClubProjectType[];
  selectedClass: ClassLevelsType | null;
  schedule: Partial<Record<WeekDayType, DaytimeType>> | null | undefined;
  price: number | null | undefined;
  //   selectedClub: NewClubType;
};

export const MyClubCurriculum = ({ curriculum, schedule, price }: Props) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null);

  const filteredCurriculum = selectedDifficulty ? curriculum.filter((item) => item.difficultyLevel.includes(selectedDifficulty)) : [];

  const availableDifficulties = levels.filter((level) => curriculum.some((item) => item.difficultyLevel.includes(level)));

  useEffect(() => {
    if (!selectedDifficulty && availableDifficulties.length > 0) {
      setSelectedDifficulty(availableDifficulties[0]);
    }
  }, [availableDifficulties, selectedDifficulty]);

  return (
    <div className="flex flex-col w-full max-w-full lg:max-w-450 h-fit justify-between rounded-lg">
      <div className="flex flex-col gap-5">
        <div>
          <h4 className="text-lg md:text-xl font-bold text-[#0A427A]">Хичээлийн хөтөлбөр</h4>
        </div>

        <div>
          <div className="flex gap-2">
            {availableDifficulties.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedDifficulty(level)}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium transition-all
                  ${selectedDifficulty === level ? 'bg-[#FCB027] text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                `}
              >
                {DIFFICULTY_LEVEL_LABEL_MN[level]}
              </button>
            ))}
          </div>
        </div>

        {selectedDifficulty && filteredCurriculum.length > 0 && (
          <div className="flex flex-col gap-6 rounded-lg bg-gray-50 p-5" key={selectedDifficulty}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#0A427A]">
                Түвшин: {DIFFICULTY_LEVEL_LABEL_MN[selectedDifficulty]} / {selectedDifficulty}
              </h3>
            </div>

            {filteredCurriculum.map((project) => (
              <div key={project._id} className="flex gap-5 justify-between">
                <div className="flex flex-col gap-4 w-220">
                  <div className="flex gap-3 items-center">
                    <LuGraduationCap className="w-5 h-5 shrink-0" style={{ color: '#FCB027' }} />
                    <p className="text-md">
                      <span className="font-semibold mr-3">Анги:</span>
                      {(Array.isArray(project.classLevel) ? project.classLevel : [project.classLevel]).map((level) => CLASS_LEVEL_LABEL_MN[level]).join(', ')}
                    </p>
                  </div>

                  <div className="flex gap-3 items-center">
                    <LayoutGrid className="w-5 h-5 shrink-0" style={{ color: '#FCB027' }} />
                    <p className="text-md">
                      <span className="font-semibold mr-3">Түвшин:</span>
                      {DIFFICULTY_LEVEL_LABEL_MN[selectedDifficulty]} / {selectedDifficulty}
                    </p>
                  </div>

                  <div className="flex gap-3 items-center">
                    <MdOutlineClass className="w-5 h-5 shrink-0" style={{ color: '#FCB027' }} />
                    <p className="text-md">
                      <span className="font-semibold mr-3">Хөтөлбөрийн нэр:</span>
                      {project.title}
                    </p>
                  </div>

                  <div className="flex gap-3 items-center">
                    <MdOutlineDescription className="w-5 h-5 shrink-0" style={{ color: '#FCB027' }} />
                    <p className="text-md truncate">
                      <span className="font-semibold mr-3">Тайлбар:</span>
                      {project.description}
                    </p>
                  </div>

                  {price && (
                    <div className="flex gap-3 items-start">
                      <Coins style={{ color: '#FCB027' }} />
                      <p className="text-md">
                        <span className="font-semibold mr-3">Төлбөр:</span> {price} ₮ / сар
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 items-center">
                    <PiPersonArmsSpread className="w-5 h-5 shrink-0" style={{ color: '#FCB027' }} />
                    <p className="text-md">
                      <span className="font-semibold mr-3">Хүүхдийн тоо:</span>
                      {project.childrenCount}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3 items-start">
                      <IoMdTime className="w-5 h-5" style={{ color: '#FCB027' }} />
                      <h4 className="font-semibold">Хичээлийн хуваарь</h4>
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
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                      <Calendar className="w-5 h-5 shrink-0" style={{ color: '#FCB027' }} />
                      <p className="font-semibold mr-3">Хичээлэх хугацаа:</p>
                    </div>

                    <div className="flex flex-col gap-1 pl-10">
                      <p className="text-md">
                        <span className="mr-3">Эхлэх огноо:</span>
                        {new Date(project.startDate).toLocaleDateString()}
                      </p>
                      <p className="text-md">
                        <span className="mr-3">Дуусах огноо:</span>
                        {new Date(project.finishDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
