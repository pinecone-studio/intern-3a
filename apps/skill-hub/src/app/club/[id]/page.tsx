'use client';

import { ClubDetailPageSkeleton } from '@/app/_components/ClubDetailPageSkeleton';
import ClubNextClasses from '@/app/_components/ClubNextClasses';
import MapView from '@/app/_components/MapView';
import { useClubById } from '@/app/hook/use-club-by-id';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@intern-3a/shadcn';
import { ArrowLeft, Calendar, Clock, Mail, MapPin, Phone, User } from 'lucide-react';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { use, useMemo, useState } from 'react';
import { RegisterLoginAlertDialog } from '../_components';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ClubDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { club, loading } = useClubById(id);

  // Сонгогдсон түвшинг хадгалах state
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [showContact, setShowContact] = useState<boolean>(false);
  const [showSchedule, setShowSchedule] = useState<boolean>(true); // Хуваарийг шууд харуулбал зүгээр
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);

  // Өгөгдөл ачаалсны дараа default түвшинг тохируулах
  useMemo(() => {
    if (club?.selectedClassLevelNames?.length > 0 && !selectedLevel) {
      setSelectedLevel(club.selectedClassLevelNames[0]);
    }
  }, [club, selectedLevel]);

  if (loading) return <ClubDetailPageSkeleton />;
  if (!club) return notFound();

  // Сонгогдсон түвшний өгөгдлүүдийг салгаж авах
  const currentTeacher = club.teachersInfoByClass?.[selectedLevel];
  const currentPrice = club.clubPrices?.[selectedLevel];
  const currentSchedule = club.scheduledClubTimes?.[selectedLevel] || {};
  const availableWeekdays = Object.keys(currentSchedule);

  const levelLabels: Record<string, string> = {
    Elementary: 'Бага анги',
    Middle: 'Дунд анги',
    High: 'Ахлах анги',
  };

  const handleRegister = () => {
    // router.push(`/register?clubId=${id}&level=${selectedLevel}`);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* ЗҮҮН ТАЛ */}
          <div className="w-full lg:w-[40%] space-y-6 lg:sticky lg:top-8">
            <div>
              <Button variant={'ghost'} className="rounded-lg hover:bg-slate-100 border border-slate-200 cursor-pointer" onClick={() => router.push(`/`)}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Буцах
              </Button>
            </div>

            <div className="bg-white rounded-4xl border border-slate-100 shadow-xl shadow-slate-100/50 p-6 md:p-8 space-y-6">
              <div className="space-y-4">
                <span className="bg-orange-100 text-orange-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{club.clubCategoryName}</span>
                <h1 className="text-3xl font-black text-slate-900 leading-tight">{club.clubName}</h1>

                {/* ТҮВШИН СОНГОХ ХЭСЭГ */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Суралцах түвшин сонгох:</p>
                  <div className="flex flex-wrap gap-2 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                    {club.selectedClassLevelNames?.map((level: string) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                          selectedLevel === level ? 'bg-white text-orange-600 shadow-md ring-1 ring-slate-100' : 'text-slate-500 hover:bg-white/50'
                        }`}
                      >
                        {levelLabels[level] || level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ГАЗРЫН ЗУРАГ НЭЭХ ХЭСЭГ */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full flex items-start gap-2 text-slate-500 bg-slate-50 p-4 rounded-xl hover:bg-orange-50 transition-colors border border-transparent hover:border-orange-200 group cursor-pointer">
                      <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <span className="text-sm font-medium block">{club.clubAddress}</span>
                        <span className="text-[10px] text-orange-600 font-bold uppercase tracking-tight">Газрын зураг харах</span>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-175 p-0 overflow-hidden rounded-2xl">
                    <DialogHeader className="p-4 absolute z-10 top-0 left-0 w-full bg-white/80 backdrop-blur-md">
                      <DialogTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-orange-600" />
                        {club.clubName} байршил
                      </DialogTitle>
                    </DialogHeader>
                    <div className="w-full h-125">
                      <MapView lat={club.clubLat} lng={club.clubLong} />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <span className="font-bold text-slate-700">Сонгосон түвшний үнэ:</span>
                <span className="text-2xl font-black text-orange-600">{currentPrice?.toLocaleString()}₮</span>
              </div>

              <SignedOut>
                <Button
                  onClick={() => setShowLoginAlert(true)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-7 text-lg rounded-2xl shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                >
                  Одоо бүртгүүлэх
                </Button>
              </SignedOut>

              <SignedIn>
                <Button
                  onClick={handleRegister}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-7 text-lg rounded-2xl shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                >
                  Одоо бүртгүүлэх
                </Button>
              </SignedIn>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowContact(!showContact)}
                  className={`h-12 gap-2 text-xs font-bold rounded-xl border-2 transition-all cursor-pointer ${showContact ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-100 text-slate-600'}`}
                >
                  <Phone className="w-4 h-4" /> Холбоо барих
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setShowSchedule(!showSchedule)}
                  className={`h-12 gap-2 text-xs font-bold rounded-xl border-2 transition-all cursor-pointer ${showSchedule ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-100 text-slate-600'}`}
                >
                  <Calendar className="w-4 h-4" /> Хуваарь харах
                </Button>
              </div>

              {showContact && currentTeacher && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <Phone className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-bold text-slate-800">{currentTeacher.teacherPhone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <Mail className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-bold text-slate-800">{currentTeacher.teacherEmail}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Багшийн мэдээлэл - Сонгосон түвшнээр солигдоно */}
            {currentTeacher && (
              <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6 space-y-4 animate-in fade-in">
                <h3 className="font-bold text-sm flex items-center gap-2 text-slate-400 uppercase tracking-widest">
                  <User className="w-4 h-4" /> {levelLabels[selectedLevel]} багш
                </h3>

                <div className="flex gap-4 items-center">
                  <img src={currentTeacher.teacherImage} alt={currentTeacher.teacherName} className="w-16 h-16 rounded-xl object-cover ring-2 ring-slate-50" />
                  <div>
                    <p className="font-black text-slate-900">{currentTeacher.teacherName}</p>
                    <p className="text-orange-600 text-xs font-bold">{currentTeacher.teacherProfession}</p>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-2 bg-slate-50 p-4 rounded-xl leading-relaxed">
                  <p>
                    <span className="font-bold text-slate-800">Туршлага:</span> {currentTeacher.teacherExperience}
                  </p>
                  <p>
                    <span className="font-bold text-slate-800">Амжилт:</span> {currentTeacher.teacherAchievement}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* БАРУУН ТАЛ */}

          <div className="w-full lg:w-[60%] space-y-8">
            {showSchedule && (
              <div className="bg-white rounded-[2.5rem] border-2 border-orange-100 p-6 md:p-8 animate-in zoom-in-95 duration-300">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-slate-900">
                  <Clock className="w-6 h-6 text-orange-600" />
                  {levelLabels[selectedLevel]} хичээлийн хуваарь
                </h3>
                <ClubNextClasses availableWeekdays={availableWeekdays} scheduledTimes={currentSchedule} />
              </div>
            )}

            <div className="w-full h-75 md:h-125 relative">
              <Image src={club.clubImage} alt={club.clubName} fill className="object-cover rounded-[3rem] shadow-2xl shadow-slate-200" />
            </div>

            <div className="bg-white p-2 md:p-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1.5 bg-orange-600 rounded-full"></div>
                <h3 className="text-3xl font-black text-slate-900">Дугуйлангийн тухай</h3>
              </div>
              <p className="text-slate-600 leading-[1.9] text-lg whitespace-pre-line font-medium">{club.clubDescription}</p>
            </div>
          </div>
        </div>
      </div>

      <RegisterLoginAlertDialog showLoginAlert={showLoginAlert} setShowLoginAlert={setShowLoginAlert} id={id} />
    </div>
  );
}
