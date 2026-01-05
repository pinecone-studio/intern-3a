'use client';

import { ClassLevelsType, ClubPricesType, ScheduledClubTimesByClassLevelsType, TeacherInfoType, TeachersByClassLevelsType, WeekDayType, WeekScheduleType } from '@/lib/utils/types';
import { useAuth } from '@clerk/nextjs';
import { Button, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Input, Label, Textarea, ToggleGroup, ToggleGroupItem } from '@intern-3a/shadcn';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import React, { ChangeEvent, Dispatch, useState } from 'react';
import { toast } from 'sonner';
import MapSelector from './MapSelector';

const recommendedClubCategoryNames = ['ART', 'LANGUAGE', 'MUSIC', 'SCIENCE', 'SPORT'];

const recommendedClubSubCategoryNames: Record<string, string[]> = {
  ART: ['Calligraphy Club', 'Dance Club', 'Design Club', 'Drama / Theater Club', 'Drawing / Painting Club', 'Fine Arts Club', 'Handcraft / DIY Club', 'Photography Club', 'Video / Media Club'],
  LANGUAGE: ['Debate Club', 'English Club', 'English Speaking Club', 'Essay Writing Club', 'Literature Club', 'Mongolian Language Club', 'Public Speaking Club', 'Reading Club'],
  MUSIC: ['Band / Ensemble Club', 'Choir Club', 'Guitar Club', 'Morin Khuur', 'Orchestra Club', 'Piano Club', 'Ukulele Club', 'Vocal Club', 'Yatga Club'],
  SCIENCE: [
    'AI / ML Club',
    'Astronomy Club',
    'Logic & Puzzle Club',
    'Math Club',
    'Mobile App Development Club',
    'Chemistry Club',
    'Coding Club',
    'Environmental / Eco Club',
    'Physics Club',
    'Programming Club',
    'Python Programming Club',
    'Robotics Club',
    'Science Experiment Club',
    'STEM Club',
    'Web Development Club',
    'Young Researchers Club',
  ],
  SPORT: [
    'Athletics Club',
    'Badminton Club',
    'Basketball Club',
    'Boxing Club',
    'Chess Club',
    'Cycling Club',
    'Football Club',
    'Futsal Club',
    'Gymnastics Club',
    'Judo Club',
    'Karate Club',
    'Martial Arts Club',
    'Soccer Club',
    'Swimming Club',
    'Table Tennis',
    'Taekwondo Club',
    'Tennis Club',
    'Track & Field Club',
    'Volleyball Club',
    'Wrestling Club',
  ],
};
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

export const ClubRegisterBtnDialogContent = ({ setOpen }: { setOpen: Dispatch<React.SetStateAction<boolean>> }) => {
  const [clubCategoryName, setClubCategoryName] = useState<string>('');
  const [clubSubCategoryName, setClubSubCategoryName] = useState<string>('');
  const [clubName, setClubName] = useState<string>('');
  const [selectedClassLevelNames, setSelectedClassLevelNames] = useState<ClassLevelsType[]>([]);
  const [clubPrices, setClubPrices] = useState<ClubPricesType>({});
  const [scheduledClubTimes, setScheduledClubTimes] = useState<ScheduledClubTimesByClassLevelsType>({});
  const [teachersInfoByClass, setTeachersInfoByClass] = useState<TeachersByClassLevelsType>({});

  const [clubDescription, setClubDescription] = useState<string>('');
  const [clubImage, setClubImage] = useState<File | undefined>();
  const [clubImagePreview, setClubImagePreview] = useState<string>('');
  const [clubAddress, setClubAddress] = useState<string>('');
  const [clubLat, setClubLat] = useState<number | null>(null);
  const [clubLong, setClubLong] = useState<number | null>(null);
  const { getToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // Regex patterns for validation
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const phoneRegex = /^[0-9]{8}$/;

  const clubImageFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setClubImage(e.target.files[0]);
      setClubImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleLocationSelectOnMap = (lat: number, lng: number) => {
    setClubLat(lat);
    setClubLong(lng);
  };

  const isValidTimeRange = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return true;
    return startTime < endTime;
  };

  const handleTeacherImageFileChange = (level: ClassLevelsType) => (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files && !e.target.files?.[0]) return;

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
    if (
      !clubCategoryName ||
      !clubSubCategoryName ||
      !clubName ||
      selectedClassLevelNames.length === 0 ||
      Object.keys(clubPrices).length === 0 ||
      Object.keys(scheduledClubTimes).length === 0 ||
      Object.keys(teachersInfoByClass).length === 0 ||
      !clubDescription ||
      !clubImage ||
      !clubAddress ||
      clubLat === null ||
      clubLong === null ||
      !token
    ) {
      toast.warning('Бүх талбаруудыг бөглөнө үү!');
      return;
    }

    // Validate email format
    // if (!emailRegex.test(teacherEmail)) {
    //   toast.error('Имэйл хаяг буруу байна!');
    //   return;
    // }

    // Validate phone number format
    // if (!phoneRegex.test(teacherPhone)) {
    //   toast.error('Утасны дугаар буруу байна! (8 оронтой тоо оруулна уу)');
    //   return;
    // }

    // Validate category is one of the recommended ones

    setLoading(true);

    try {
      const newForm = new FormData();

      newForm.append('clubCategoryName', clubCategoryName);
      newForm.append('clubSubCategoryName', clubSubCategoryName);
      newForm.append('clubName', clubName);
      newForm.append('selectedClassLevelNames', JSON.stringify(selectedClassLevelNames));
      newForm.append('clubPrices', JSON.stringify(clubPrices));
      newForm.append('scheduledClubTimes', JSON.stringify(scheduledClubTimes));
      newForm.append('teachersInfoByClass', JSON.stringify(teachersInfoByClass));
      selectedClassLevelNames.forEach((level) => {
        const teacher = teachersInfoByClass[level];
        if (teacher?.teacherImage) {
          newForm.append(`teacherImage_${level}`, teacher.teacherImage as File);
        }
      });

      newForm.append('clubDescription', clubDescription);
      newForm.append('clubImage', clubImage as File);
      newForm.append('clubAddress', clubAddress);
      newForm.append('clubLat', String(clubLat));
      newForm.append('clubLong', String(clubLong));

      const res = await fetch('/api/create-club', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: newForm,
      });

      if (!res.ok) {
        toast.error('Дугуйлан мэдээлэл хадгалахад алдаа гарлаа!');
        setLoading(false);
        return;
      }
      toast.success('Амжилттай хадгалагдлаа!');

      setClubCategoryName('');
      setClubSubCategoryName('');
      setClubName('');
      setSelectedClassLevelNames([]);
      setClubPrices({});
      setScheduledClubTimes({});
      setTeachersInfoByClass({});

      setClubDescription('');
      setClubImage(undefined);
      setClubImagePreview('');
      setClubAddress('');
      setClubLat(null);
      setClubLong(null);

      setOpen(false);
    } catch (error) {
      console.error('');
    } finally {
      setLoading(false);
    }
  };

  console.log({ clubCategoryName });
  console.log({ clubSubCategoryName });
  console.log({ clubName });

  console.log({ selectedClassLevelNames });
  console.log({ clubPrices });
  console.log({ scheduledClubTimes });
  console.log({ teachersInfoByClass });

  console.log({ clubDescription });
  console.log({ clubImage });
  console.log({ clubImagePreview });
  console.log({ clubAddress });
  console.log({ clubLat });
  console.log({ clubLong });

  return (
    <DialogContent className="sm:max-w-[95vw] max-h-[90vh] gap-10 overflow-y-auto overflow-x-auto">
      <DialogHeader>
        <DialogTitle className="font-bold">Мэдээлэл оруулах хэсэг:</DialogTitle>
        <DialogDescription hidden />
      </DialogHeader>

      <div className="w-full flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="w-1/4 flex flex-col gap-1.5">
            <Label htmlFor="clubCategoryName">Ангилал:</Label>
            <Input id="clubCategoryName" list="recommendedClubCategoryNames" value={clubCategoryName} onChange={(e) => setClubCategoryName(e.target.value)} placeholder="Ангилал сонгох / оруулах" />
            <datalist id="recommendedClubCategoryNames">
              {recommendedClubCategoryNames.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </div>

          <div className="w-1/4 flex flex-col gap-1.5">
            <Label htmlFor="clubSubCategoryName">Төрөл:</Label>
            <Input
              id="clubSubCategoryName"
              list="recommendedClubSubCategoryNames"
              value={clubSubCategoryName}
              onChange={(e) => setClubSubCategoryName(e.target.value)}
              placeholder="Төрөл сонгох / оруулах"
            />
            <datalist id="recommendedClubSubCategoryNames">{clubCategoryName && recommendedClubSubCategoryNames[clubCategoryName]?.map((name) => <option key={name} value={name} />)}</datalist>
          </div>

          <div className="w-1/4 flex flex-col gap-1.5">
            <Label htmlFor="clubName">Нэр:</Label>
            <Input id="clubName" value={clubName} onChange={(e) => setClubName(e.target.value)} placeholder="Дугуйлангийн нэр оруулах" />
          </div>
        </div>

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
              <div className="flex flex-col gap-3">
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
                    {teacher.teacherImage ? (
                      <div className="w-full h-90 rounded-md border border-border border-dashed relative overflow-hidden">
                        <Image src={teacher.teacherImagePreview as string} alt={'teacher image preview'} width={80} height={360} className="object-cover w-full h-full" unoptimized />
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

        <div className="flex justify-between">
          <div className="w-3/10 flex flex-col gap-1.5">
            <Label htmlFor="clubDescription">Танилцуулга:</Label>
            <Textarea id="clubDescription" value={clubDescription} onChange={(e) => setClubDescription(e.target.value)} placeholder="Товч танилцуулга оруулах" className="h-65" />
          </div>

          <div className="w-2/3 flex flex-col gap-1.5">
            <Label htmlFor="clubImage">Дугуйлангийн зураг:</Label>
            {clubImage ? (
              <div className="w-full h-65 rounded-md border border-border border-dashed relative overflow-hidden">
                <Image src={clubImagePreview} alt={'image preview'} width={440} height={260} className="object-cover w-full h-full" unoptimized />
                <Button type="button" variant={'secondary'} onClick={() => setClubImage(undefined)} className="absolute w-9 h-9 rounded-full right-1 top-1">
                  <X />
                </Button>
              </div>
            ) : (
              <div className="w-full h-65 bg-gray-800/5 flex justify-center items-center p-4 rounded-md border border-border border-dashed relative">
                <input id="clubImage" type="file" onChange={clubImageFileChangeHandler} className="absolute inset-0 opacity-0 cursor-pointer border" />
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-background flex justify-center items-center">
                    <Upload className="text-muted-foreground" />
                  </div>
                  <Label className="text-muted-foreground">Choose a file or drag & drop it here</Label>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="w-3/10 flex flex-col gap-1.5">
            <Label>Хаяг:</Label>
            <Textarea value={clubAddress} onChange={(e) => setClubAddress(e.target.value)} placeholder="Хаяг оруулах" />
          </div>

          <div className="w-2/3 flex flex-col gap-1.5">
            <Label>
              Байршил: <span className="text-xs text-muted-foreground">/газрын зурагнаас сонгох/</span>
            </Label>
            <div className="flex gap-1.5">
              <Input type="number" name="clubLat" placeholder="Өргөрөг" value={clubLat || ''} onChange={(e) => setClubLat(Number(e.target.value))} />
              <Input type="number" name="clubLong" placeholder="Уртраг" value={clubLong || ''} onChange={(e) => setClubLong(Number(e.target.value))} />
            </div>
            <MapSelector lat={clubLat || 47.9215} lng={clubLong || 106.9186} setLat={setClubLat} setLng={setClubLong} onLocationSelect={handleLocationSelectOnMap} />
          </div>
        </div>

        {/* <div className="flex flex-col gap-1.5">
          <Label htmlFor="teacherPhone">Утас:</Label>
          <Input
            id="teacherPhone"
            value={teacherPhone}
            onChange={(e) => setTeacherPhone(e.target.value)}
            placeholder="Багшийн холбоо барих утсыг оруулна уу..."
            className={teacherPhone && !phoneRegex.test(teacherPhone) ? 'border-red-500' : ''}
          />
          {teacherPhone && !phoneRegex.test(teacherPhone) && <span className="text-xs text-red-500">8 оронтой тоо оруулна уу</span>}
        </div> */}

        {/* <div className="flex flex-col gap-1.5">
          <Label htmlFor="teacherEmail">Имэйл:</Label>
          <Input
            id="teacherEmail"
            value={teacherEmail}
            onChange={(e) => setTeacherEmail(e.target.value)}
            placeholder="Багшийн имэйл хаягийг оруулна уу..."
            className={teacherEmail && !emailRegex.test(teacherEmail) ? 'border-red-500' : ''}
          />
          {teacherEmail && !emailRegex.test(teacherEmail) && <span className="text-xs text-red-500">Зөв имэйл хаяг оруулна уу</span>}
        </div> */}
      </div>
      <DialogFooter>
        <Button disabled={loading} onClick={handleSaveClubInfo} className="cursor-pointer">
          Мэдээлэл хадгалах
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
