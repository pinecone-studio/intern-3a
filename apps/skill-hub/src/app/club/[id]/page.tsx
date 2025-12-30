'use client';

import { ClubDetailPageSkeleton } from '@/app/_components/ClubDetailPageSkeleton';
import ClubNextClasses from '@/app/_components/ClubNextClasses';
import { useClubById } from '@/app/hook/use-club-by-id';
import { Button } from '@intern-3a/shadcn';
import { Calendar, Clock, Mail, MapPin, Phone, User } from 'lucide-react';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { use, useState } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ClubDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { club, loading } = useClubById(id);

  const [showContact, setShowContact] = useState<boolean>(false);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  const handleRegister = () => {
    router.push(`/register?clubId=${id}`);
  };

  if (loading) {
    return <ClubDetailPageSkeleton />;
  }

  if (!club) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* ЗҮҮН ТАЛ (40%) - Бүх мэдээлэл болон Үйлдэл */}
        <div className="w-full lg:w-[40%] space-y-6 sticky top-8">
          {/* Бүртгүүлэх болон Үндсэн мэдээллийн карт */}
          <div>
            <Button variant={'ghost'} className="rounded-lg hover:bg-slate-100 border border-slate-200 shadow-xl shadow-slate-100/50" onClick={() => router.push(`/`)}>
              <ArrowLeft />
            </Button>
          </div>
          <div className="bg-white rounded-4xl border border-slate-100 shadow-xl shadow-slate-100/50 p-6 md:p-8 space-y-6">
            <div className="space-y-4">
              <span className="bg-orange-100 text-orange-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{club.clubCategoryName}</span>
              <h1 className="text-3xl font-black text-slate-900 leading-tight">{club.clubName}</h1>
              <div className="flex items-start gap-2 text-slate-500 bg-slate-50 p-3 rounded-xl">
                <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{club.clubAddress}</span>
              </div>
            </div>

            <Button
              onClick={handleRegister}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-7 text-lg rounded-2xl shadow-lg shadow-orange-100 transition-all hover:-translate-y-1"
            >
              Одоо бүртгүүлэх
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => setShowContact(!showContact)}
                className={`h-12 gap-2 text-xs font-bold rounded-xl border-2 transition-all ${showContact ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-100 text-slate-600'}`}
              >
                <Phone className="w-4 h-4" /> Холбоо барих
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSchedule(!showSchedule)}
                className={`h-12 gap-2 text-xs font-bold rounded-xl border-2 transition-all ${showSchedule ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-100 text-slate-600'}`}
              >
                <Calendar className="w-4 h-4" /> Хуваарь
              </Button>
            </div>

            {/* Холбоо барих мэдээлэл */}
            {showContact && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <Phone className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-bold text-slate-800">{club.teacherPhone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <Mail className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-bold text-slate-800">{club.teacherEmail}</span>
                </div>
              </div>
            )}
          </div>

          {/* Багшийн мэдээлэл */}
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-sm flex items-center gap-2 text-slate-400 uppercase tracking-widest">
              <User className="w-4 h-4" /> Багшийн мэдээлэл
            </h3>
            <div className="flex gap-4 items-center">
              <img src={club.teacherImage} className="w-16 h-16 rounded-xl object-cover ring-2 ring-slate-50" />
              <div>
                <p className="font-black text-slate-900">{club.teacherName}</p>
                <p className="text-orange-600 text-xs font-bold">{club.teacherProfession}</p>
              </div>
            </div>
            <div className="text-xs text-slate-600 space-y-2 bg-slate-50 p-4 rounded-xl">
              <p>
                <span className="font-bold text-slate-800">Туршлага:</span> {club.teacherExperience}
              </p>
              <p>
                <span className="font-bold text-slate-800">Амжилт:</span> {club.teacherAchievement}
              </p>
            </div>
          </div>

          {/* Үнийн мэдээлэл */}
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-400 uppercase tracking-widest">Үнийн санал</h3>
            <div className="space-y-2">
              {club.selectedClassLevelNames?.map((level: string) => (
                <div key={level} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl text-sm">
                  <span className="text-slate-600 font-medium">{level}</span>
                  <span className="font-black text-orange-600">{club.clubPrices?.[level]?.toLocaleString()}₮</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* БАРУУН ТАЛ (60%) - Зураг болон Танилцуулга */}
        <div className="w-full lg:w-[60%] space-y-8">
          {/* Main Content Area */}
          <div className="space-y-8">
            {/* Хуваарийн хэсэг - Хэрэв нээлттэй бол энд гарна */}
            {showSchedule && (
              <div className="bg-white rounded-[2.5rem] border-2 border-orange-100 p-6 md:p-8 animate-in zoom-in-95 duration-300">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-slate-900">
                  <Clock className="w-6 h-6 text-orange-600" /> Хичээлийн дэлгэрэнгүй хуваарь
                </h3>
                <ClubNextClasses availableWeekdays={club.selectedClubWorkingDays} scheduledTimes={club.scheduledClubTimes} />
              </div>
            )}

            <div className="w-full h-100 md:h-150 relative">
              <Image src={club.clubImage} alt={club.clubName} fill className="w-full h-100 md:h-150 object-cover rounded-[3rem] shadow-2xl shadow-slate-200" />
            </div>

            {/* Дэлгэрэнгүй танилцуулга */}
            <div className="bg-white p-2 md:p-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1.5 bg-orange-600 rounded-full"></div>
                <h3 className="text-3xl font-black text-slate-900">Дугуйлангийн тухай</h3>
              </div>
              <p className="text-slate-600 leading-[1.9] text-lg whitespace-pre-line font-medium">{club.clubDescription}</p>
            </div>

            {/* Доод талын жижиг хуваарь (Сэрэмжлүүлэг маягаар) */}
            <div className="bg-slate-900 text-white rounded-4xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-1">
                <p className="text-orange-400 font-black uppercase tracking-widest text-xs">Хичээллэх өдрүүд</p>
                <p className="text-lg font-bold">{club.selectedClubWorkingDays?.join(', ')}</p>
              </div>
              <div className="h-px w-full md:h-12 md:w-px bg-slate-700"></div>
              <div className="text-center md:text-right">
                <p className="text-slate-400 text-sm mb-2">Асуух зүйл байна уу?</p>
                <Button variant="link" className="text-white p-0 font-bold text-lg hover:text-orange-400 transition-colors">
                  {club.teacherPhone}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
