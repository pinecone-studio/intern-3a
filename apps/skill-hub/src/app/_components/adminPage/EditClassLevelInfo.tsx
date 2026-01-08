'use client';

import { ClassLevelsType, ClubPricesType, NewClubType, ScheduledClubTimesByClassLevelsType, TeacherInfoType, TeachersByClassLevelsType, WeekDayType, WeekScheduleType } from '@/lib/utils/types';
import { useAuth } from '@clerk/nextjs';
import { Button, DialogContent, DialogFooter, DialogTitle, Input, Label, Textarea, ToggleGroup, ToggleGroupItem } from '@intern-3a/shadcn';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

const classLevels: ClassLevelsType[] = ['Elementary', 'Middle', 'High'];

const weekDays: { label: string; value: WeekDayType }[] = [
  { label: 'Да', value: 'MON' },
  { label: 'Мя', value: 'TUE' },
  { label: 'Лх', value: 'WED' },
  { label: 'Пү', value: 'THU' },
  { label: 'Ба', value: 'FRI' },
  { label: 'Бя', value: 'SAT' },
  { label: 'Ня', value: 'SUN' },
];

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  club: NewClubType;
};

export const EditClassLevelInfo = ({ setOpen, club }: Props) => {
  const { getToken } = useAuth();
  const [clubCategoryName, setClubCategoryName] = useState('');
  const [selectedClassLevelNames, setSelectedClassLevelNames] = useState<ClassLevelsType[]>([]);
  const [clubPrices, setClubPrices] = useState<ClubPricesType>({});
  const [scheduledClubTimes, setScheduledClubTimes] = useState<ScheduledClubTimesByClassLevelsType>({});
  const [teachersInfoByClass, setTeachersInfoByClass] = useState<TeachersByClassLevelsType>({});
  //   const [editedImagePreview, setEditedImagePreview] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    if (!club) return;

    setClubCategoryName(club.clubCategoryName ?? '');
    setSelectedClassLevelNames(club.selectedClassLevelNames ?? []);
    setClubPrices(club.clubPrices ?? {});
    setScheduledClubTimes(club.scheduledClubTimes ?? {});
    setTeachersInfoByClass(club.teachersInfoByClass ?? {});
    // setEditedImagePreview(club.teachersInfoByClass.teacherImagePreview)

    if (club.teachersInfoByClass) {
      const withPreviews = Object.fromEntries(
        Object.entries(club.teachersInfoByClass).map(([level, teacher]) => [
          level,
          {
            ...teacher,
            teacherImage: undefined,
            teacherImagePreview: teacher.teacherImagePreview || teacher.teacherImage || '',
          },
        ]),
      );

      setTeachersInfoByClass(withPreviews);
    }
  }, [club]);

  const isValidTimeRange = (start: string, end: string) => !start || !end || start < end;

  const handleTeacherImageFileChange = (level: ClassLevelsType) => (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setTeachersInfoByClass((prev) => ({
      ...prev,
      [level]: {
        ...(prev[level] || {}),
        teacherImage: file,
        teacherImagePreview: URL.createObjectURL(file),
      },
    }));
  };

  const handleSaveClubInfo = async () => {
    const token = await getToken();
    if (!token) return;

    const form = new FormData();

    form.append('clubCategoryName', clubCategoryName);
    form.append('selectedClassLevelNames', JSON.stringify(selectedClassLevelNames));
    form.append('clubPrices', JSON.stringify(clubPrices));
    form.append('scheduledClubTimes', JSON.stringify(scheduledClubTimes));

    const teachersData: TeachersByClassLevelsType = {};
    selectedClassLevelNames.forEach((level) => {
      const teacher = teachersInfoByClass[level];
      if (!teacher) return;

      teachersData[level] = {
        ...teacher,
        teacherImage: typeof teacher.teacherImage === 'string' ? teacher.teacherImage : undefined,
      };

      if (teacher.teacherImage instanceof File) {
        form.append(`teacherImage_${level}`, teacher.teacherImage);
      }
    });

    form.append('teachersInfoByClass', JSON.stringify(teachersData));

    setLoading(true);

    const res = await fetch(`/api/edit-class-level/${club._id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    setLoading(false);

    if (!res.ok) {
      toast.error('Засварлахад алдаа гарлаа');
      return;
    }

    const data = await res.json();

    if (data?.data) {
      setTeachersInfoByClass(data.data.teachersInfoByClass);
    }
    toast.success('Амжилттай засварлагдлаа');
    setOpen(false);
  };

  return (
    <div>
      <DialogContent className="sm:max-w-[95vw] max-h-[90vh] overflow-y-auto">
        <VisuallyHidden>
          <DialogTitle>Дугуйлангийн мэдээлэл засах</DialogTitle>
        </VisuallyHidden>
        <div className="w-full flex flex-col gap-6">
          <div className="flex justify-between">
            <div>
              <Label htmlFor="selectedClassLevelName">Анги:</Label>
              <ToggleGroup
                id="selectedClassLevelName"
                type="multiple"
                value={selectedClassLevelNames}
                onValueChange={(values) => {
                  const typedValues = values as ClassLevelsType[];
                  setSelectedClassLevelNames(typedValues);

                  setClubPrices((prev) => {
                    const updated = { ...prev };
                    Object.keys(updated).forEach((key) => {
                      if (!typedValues.includes(key as ClassLevelsType)) delete updated[key as ClassLevelsType];
                    });
                    return updated;
                  });

                  setScheduledClubTimes((prev) => {
                    const updated = { ...prev };
                    Object.keys(updated).forEach((key) => {
                      if (!typedValues.includes(key as ClassLevelsType)) {
                        delete updated[key as ClassLevelsType];
                      }
                    });
                    return updated;
                  });
                }}
              >
                <ToggleGroup type="multiple">
                  <div className="flex gap-1.5">
                    {classLevels.map((level) => (
                      <ToggleGroupItem
                        key={level}
                        value={level}
                        className="cursor-pointer w-fit px-4 py-2 rounded-full bg-muted data-[state=on]:bg-[#0A427A] hover:data-[state=on]:bg-[#083563] data-[state=on]:text-white"
                      >
                        {level}
                      </ToggleGroupItem>
                    ))}
                  </div>
                </ToggleGroup>
              </ToggleGroup>
            </div>
          </div>
          <Label className="mt-5">Дугуйлан хичээллэх хуваарь:</Label>
          <div className="w-fit flex gap-68">
            {selectedClassLevelNames.map((level) => (
              <div key={level} className="flex flex-col gap-1.5">
                <Label>{level} анги</Label>
                <ToggleGroup
                  type="multiple"
                  value={Object.keys(scheduledClubTimes[level] || {}) as WeekDayType[]}
                  onValueChange={(days) => {
                    const typedDays = days as WeekDayType[];
                    {
                      scheduledClubTimes && typedDays.length > 0 ? setIsClicked(true) : setIsClicked(false);
                    }
                    setScheduledClubTimes((prev) => {
                      const updated: WeekScheduleType = { ...(prev[level] || {}) };

                      typedDays.forEach((day) => {
                        if (!updated[day]) {
                          updated[day] = { startTime: '', endTime: '' };
                        }
                      });

                      Object.keys(updated).forEach((d) => {
                        if (!typedDays.includes(d as WeekDayType)) {
                          delete updated[d as WeekDayType];
                        }
                      });

                      return { ...prev, [level]: updated };
                    });
                  }}
                >
                  <div className="flex gap-1.5">
                    {weekDays.map((day) => (
                      <ToggleGroupItem
                        key={day.value}
                        value={day.value}
                        className="cursor-pointer w-fit px-4 py-2 rounded-full bg-muted data-[state=on]:bg-[#0A427A] hover:data-[state=on]:bg-[#083563] data-[state=on]:text-white"
                      >
                        {day.label}
                      </ToggleGroupItem>
                    ))}
                  </div>
                </ToggleGroup>
                <div className="flex flex-col gap-1.5">
                  <div>
                    {isClicked ? (
                      <div className="flex gap-29 ml-7">
                        <div>Эхлэх цаг</div>
                        <div>Дуусах цаг</div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  {Object.entries(scheduledClubTimes[level] || {}).map(([day, time]) => {
                    const typedDay = day as WeekDayType;

                    return (
                      <div key={typedDay} className="flex gap-1.5">
                        <Label>{weekDays.find((d) => d.value === day)?.label}</Label>

                        <Input
                          type="time"
                          value={time.startTime}
                          onChange={(e) => {
                            const newStart = e.target.value;

                            if (!time.endTime && !isValidTimeRange(newStart, time.endTime)) {
                              toast.error('Эхлэх цаг дуусах цагаас өмнө байх ёстой!');
                              return;
                            }

                            setScheduledClubTimes((prev) => ({
                              ...prev,
                              [level]: {
                                ...prev[level],
                                [typedDay]: { ...time, startTime: newStart },
                              },
                            }));
                          }}
                          className={time.startTime && time.endTime && !isValidTimeRange(time.startTime, time.endTime) ? 'border-red-500' : ''}
                        />
                        <span>-</span>
                        <Input
                          type="time"
                          value={time.endTime}
                          onChange={(e) => {
                            const newEnd = e.target.value;

                            if (time.startTime && !isValidTimeRange(time.startTime, newEnd)) {
                              toast.error('Дуусах цаг эхлэх цагаас хойш байх ёстой!');
                              return;
                            }

                            setScheduledClubTimes((prev) => ({
                              ...prev,
                              [level]: { ...prev[level], [typedDay]: { ...time, endTime: newEnd } },
                            }));
                          }}
                          className={time.startTime && time.endTime && !isValidTimeRange(time.startTime, time.endTime) ? 'border-red-500' : ''}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="w-fit flex flex-col gap-1.5 mt-5">
            <Label>Үнэ:</Label>
            {selectedClassLevelNames.length > 0 && (
              <div className="flex gap-123">
                {selectedClassLevelNames.map((level) => (
                  <div key={level} className="flex gap-1.5">
                    <Label>{level}:</Label>
                    <Input
                      type="number"
                      placeholder="Үнэ (₮)"
                      value={clubPrices[level] || ''}
                      onChange={(e) =>
                        setClubPrices((prev) => ({
                          ...prev,
                          [level]: Number(e.target.value),
                        }))
                      }
                      className="w-23"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <Label className="text-base font-semibold tracking-wide text-gray-900 mt-5">Багшийн мэдээлэл:</Label>

          <div className="flex gap-30">
            {selectedClassLevelNames.map((level) => {
              const teacher: TeacherInfoType = teachersInfoByClass[level] || {
                teacherImage: undefined,
                teacherImagePreview: '',
                teacherName: '',
                teacherPhone: '',
                teacherEmail: '',
                teacherProfession: '',
                teacherExperience: '',
                teacherAchievement: '',
              };

              return (
                <div className="flex flex-col gap-3" key={level}>
                  <Label>{level} анги</Label>
                  <div className="flex gap-10">
                    <div className="flex gap-4 flex-col">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="teacherName">Нэр:</Label>
                        <Input
                          id="teacherName"
                          value={teacher.teacherName}
                          onChange={(e) =>
                            setTeachersInfoByClass((prev) => ({
                              ...prev,
                              [level]: { ...teacher, teacherName: e.target.value },
                            }))
                          }
                          placeholder="Нэр оруулах"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="teacherPhone">Утас:</Label>
                        <Input
                          id="teacherPhone"
                          value={teacher.teacherPhone}
                          onChange={(e) =>
                            setTeachersInfoByClass((prev) => ({
                              ...prev,
                              [level]: { ...teacher, teacherPhone: e.target.value },
                            }))
                          }
                          placeholder="Утасны дугаар оруулах"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="teacherEmail">Имэйл:</Label>
                        <Input
                          id="teacherEmail"
                          value={teacher.teacherEmail}
                          onChange={(e) =>
                            setTeachersInfoByClass((prev) => ({
                              ...prev,
                              [level]: { ...teacher, teacherEmail: e.target.value },
                            }))
                          }
                          placeholder="Имэйл хаяг оруулах"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="teacherProfession">Мэргэжил:</Label>
                        <Input
                          id="teacherProfession"
                          value={teacher.teacherProfession}
                          onChange={(e) =>
                            setTeachersInfoByClass((prev) => ({
                              ...prev,
                              [level]: { ...teacher, teacherProfession: e.target.value },
                            }))
                          }
                          placeholder="Мэргэжил оруулах"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="teacherExperience">Туршлага:</Label>
                        <Textarea
                          id="teacherExperience"
                          value={teacher.teacherExperience}
                          onChange={(e) =>
                            setTeachersInfoByClass((prev) => ({
                              ...prev,
                              [level]: { ...teacher, teacherExperience: e.target.value },
                            }))
                          }
                          placeholder="Туршлага оруулах"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="teacherAchievement">Амжилт:</Label>
                        <Textarea
                          id="teacherAchievement"
                          value={teacher.teacherAchievement}
                          onChange={(e) =>
                            setTeachersInfoByClass((prev) => ({
                              ...prev,
                              [level]: { ...teacher, teacherAchievement: e.target.value },
                            }))
                          }
                          placeholder="Амжилт оруулах"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="teacherImage">Багш зураг:</Label>
                      {teacher.teacherImage || teacher.teacherImagePreview ? (
                        <div className="w-full h-90 rounded-md border border-border border-dashed relative overflow-hidden">
                          <Image src={teacher.teacherImagePreview as string} alt="teacher image preview" width={80} height={360} className="object-cover w-full h-full" unoptimized />
                          {/* <Image src={teacher.teacherImagePreview || teacher.teacherImage!} alt="teacher image preview" width={80} height={360} className="object-cover w-full h-full" unoptimized /> */}

                          <Button
                            type="button"
                            variant={'secondary'}
                            onClick={() =>
                              setTeachersInfoByClass((prev) => ({
                                ...prev,
                                [level]: { ...teacher, teacherImage: undefined, teacherImagePreview: '' },
                              }))
                            }
                            className="absolute w-9 h-9 rounded-full right-1 top-1"
                          >
                            <X />
                          </Button>
                        </div>
                      ) : (
                        <div className="w-full h-90 bg-gray-800/5 flex justify-center items-center p-4 rounded-md border border-border border-dashed relative">
                          <input id="teacherImage" type="file" onChange={handleTeacherImageFileChange(level)} className="absolute inset-0 opacity-0 cursor-pointer border" />
                          <div className="flex flex-col justify-center items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-background flex justify-center items-center">
                              <Upload className="text-muted-foreground" />
                            </div>
                            <Label className="text-muted-foreground">Файлыг сонгох эсвэл энд чирж оруулах</Label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <DialogFooter>
          <Button disabled={loading} onClick={handleSaveClubInfo} className="cursor-pointer">
            Мэдээлэл хадгалах
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};
