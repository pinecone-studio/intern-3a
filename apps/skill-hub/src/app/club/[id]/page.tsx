'use client';

import { ClubDetailPageSkeleton } from '@/app/_components/ClubDetailPageSkeleton';

import ClubNextClasses from '@/app/_components/ClubNextClasses';
import { ClubRating } from '@/app/_components/ClubRating';
import MapView from '@/app/_components/MapView';
import { useClubById } from '@/app/hook/use-club-by-id';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { Badge, Button, Dialog, DialogContent, DialogTitle, DialogTrigger } from '@intern-3a/shadcn';
import { ArrowLeft, Info, Mail, MapPin, Phone } from 'lucide-react';
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
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);

  useMemo(() => {
    if (club?.selectedClassLevelNames?.length > 0 && !selectedLevel) {
      setSelectedLevel(club.selectedClassLevelNames[0]);
    }
  }, [club, selectedLevel]);

  if (loading) return <ClubDetailPageSkeleton />;
  if (!club) return notFound();

  const currentTeacher = club.teachersInfoByClass?.[selectedLevel];
  const currentPrice = club.clubPrices?.[selectedLevel];
  const currentSchedule = club.scheduledClubTimes?.[selectedLevel] || {};
  const availableWeekdays = Object.keys(currentSchedule);

  const levelLabels: Record<string, string> = { Elementary: 'Бага анги', Middle: 'Дунд анги', High: 'Ахлах анги' };

  const handleRegisterClick = () => {
    setShowLoginAlert(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-10">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
        {/* ЗҮҮН ТАЛ: ДУГУЙЛАНГИЙН БҮХ МЭДЭЭЛЭЛ */}
        <div className="w-full lg:w-[45%] space-y-6 md:space-y-8">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="hover:bg-slate-100 -ml-2" onClick={() => router.push('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Буцах
            </Button>
          </div>

          {/* Зураг болон Үндсэн мэдээлэл */}
          <div className="space-y-5 md:space-y-6">
            <div className="relative w-full h-64 sm:h-80 md:h-112">
              <Image src={club.clubImage} alt={club.clubName} fill priority className="object-cover rounded-3xl md:rounded-[2.5rem] shadow-xl shadow-slate-200/50" />
            </div>

            <div className="space-y-3 md:space-y-4">
              <span className="bg-orange-100 text-orange-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest inline-block">{club.clubCategoryName}</span>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">{club.clubName}</h1>

              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex items-start gap-3 p-3 md:p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-white hover:shadow-md transition-all active:scale-[0.98]">
                    <MapPin className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-700 leading-snug">{club.clubAddress}</p>
                      <p className="text-[10px] text-orange-600 font-bold uppercase mt-1">Газрын зураг харах</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="w-[95vw] sm:max-w-2xl p-0 overflow-hidden rounded-3xl border-none">
                  <DialogTitle className="sr-only">Байршил</DialogTitle>
                  <div className="h-[50vh] sm:h-96 w-full">
                    <MapView lat={club.clubLat} lng={club.clubLong} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Тайлбар */}
          <div className="bg-white rounded-3xl">
            <h3 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-orange-600 shrink-0" /> Дугуйлангийн тухай
            </h3>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium whitespace-pre-line">{club.clubDescription}</p>
          </div>

          <div className="pt-2">
            <ClubRating clubId={id} />
          </div>

          <Badge variant={'outline'} className="text-sm/6">
            Нийтлэгдсэн огноо {club?.createdAt && new Date(club.createdAt).toLocaleDateString('en-CA')}
          </Badge>
        </div>

        {/* БАРУУН ТАЛ: ТҮВШИН + ХУВААРЬ + CTA (Sticky on Desktop) */}
        <div className="w-full lg:w-[55%] space-y-6 lg:sticky lg:top-6">
          <div className="bg-white rounded-4xl md:rounded-[2.75rem] border border-slate-100 p-5 md:p-8 shadow-xl shadow-slate-200/40 space-y-8 md:space-y-10">
            {/* ТҮВШИН СОНГОХ */}
            <div>
              <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Суралцах түвшин</p>
              <div className="flex flex-wrap sm:flex-nowrap gap-2 p-1.5 md:p-2 bg-slate-50 rounded-2xl border border-slate-100">
                {club.selectedClassLevelNames?.map((level: string) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`flex-1 py-3 md:py-4 px-3 md:px-5 rounded-xl text-xs md:text-sm font-black transition-all duration-300 active:scale-95
                    ${selectedLevel === level ? 'bg-orange-600 text-white shadow-md shadow-orange-200' : 'bg-transparent text-slate-400 hover:text-slate-700'}`}
                  >
                    {levelLabels[level] || level}
                  </button>
                ))}
              </div>
            </div>

            {/* БАГШИЙН МЭДЭЭЛЭЛ */}
            {currentTeacher && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-25 px-4">
                <div className="flex h-full items-center gap-4">
                  {/* ЗҮҮН ТАЛ — БАГШ */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img src={currentTeacher.teacherImage} alt={currentTeacher.teacherName} className="w-14 h-14 rounded-xl object-cover ring-2 ring-slate-50 shrink-0" />

                    <div className="min-w-0">
                      <p className="font-black text-slate-900 text-sm md:text-base leading-tight truncate">{currentTeacher.teacherName}</p>
                      <p className="text-orange-600 text-[11px] font-bold uppercase tracking-tight truncate">{currentTeacher.teacherProfession}</p>
                    </div>
                  </div>

                  {/*  — ХОЛБОО БАРИХ */}
                  <div className="flex flex-col justify-center gap-2 w-70">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-[13px] font-bold text-slate-700 truncate">{currentTeacher.teacherPhone}</span>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-[13px] font-bold text-slate-700 truncate">{currentTeacher.teacherEmail || 'И-мэйлгүй'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ҮНЭ -  */}
            <div className="bg-orange-50 rounded-2xl p-4 md:p-5 border border-orange-100 flex flex-row items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <p className="text-[10px] font-black text-orange-700/70 uppercase tracking-widest">Сонгосон түвшин</p>
                </div>
                <h2 className="text-lg md:text-xl font-black text-slate-900 truncate pl-3 border-l-2 border-orange-200">{levelLabels[selectedLevel]}</h2>
              </div>

              <div className="text-right shrink-0">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-0.5">Сарын төлбөр</p>
                <p className="text-2xl md:text-3xl font-black text-orange-600 tabular-nums">
                  {currentPrice?.toLocaleString()}
                  <span className="text-sm ml-1 font-bold">₮</span>
                </p>
              </div>
            </div>

            {/* ХУВААРЬ + CTA */}
            <div className="relative pt-2">
              <div className="hidden md:block absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-orange-200" />

              <SignedIn>
                <ClubNextClasses availableWeekdays={availableWeekdays} scheduledTimes={currentSchedule} onRegister={() => router.push(`/register?clubId=${id}&level=${selectedLevel}`)} />
              </SignedIn>

              <SignedOut>
                <ClubNextClasses availableWeekdays={availableWeekdays} scheduledTimes={currentSchedule} onRegister={handleRegisterClick} />
              </SignedOut>
            </div>

            {/* ТАЙЛБАР */}
            <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-50">
              <p className="text-[10px] md:text-[11px] text-slate-400 font-medium leading-relaxed">
                * Та өөрт тохирох хуваарийг сонгон бүртгүүлэх товчийг дарна уу. Манай менежер тантай эргэн холбогдох болно.
              </p>
            </div>
          </div>
        </div>
      </div>

      <RegisterLoginAlertDialog showLoginAlert={showLoginAlert} setShowLoginAlert={setShowLoginAlert} id={id} />
    </div>
  );
}
