//app/club/[id]/page.tsx
'use client';
import { useClubById } from '@/app/hook/use-club-by-id';
import { Calendar, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { notFound } from 'next/navigation';
import { use } from 'react';

interface PageProps {
  params: Promise<{ id: string }>; // params нь Promise
}

export default function ClubDetailPage({ params }: PageProps) {
  // 1. params-ийг дамжуулж id-г салгаж авна
  const { id } = use(params);

  // 2. Одоо id нь бэлэн болсон тул hook-ээ дуудна
  const { club, loading } = useClubById(id);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        <span className="ml-3 text-slate-600">Уншиж байна...</span>
      </div>
    );
  }

  if (!club) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Image - URL.createObjectURL хэрэггүй, учир нь API-аас string (url) ирж байгаа */}
      <img src={club.clubImage} alt={club.clubName} className="w-full h-80 object-cover rounded-2xl mb-8" />

      <div className="bg-white border rounded-2xl p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-black">{club.clubName}</h1>
          <p className="text-sm text-slate-500">{club.clubCategoryName}</p>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <MapPin className="w-5 h-5 text-orange-600" />
          <span>{club.clubAddress}</span>
        </div>

        <p className="text-slate-700 whitespace-pre-line">{club.clubDescription}</p>

        {/* Schedule */}
        <div className="space-y-2">
          <h3 className="font-semibold">Хичээлийн хуваарь</h3>
          {club.selectedClubWorkingDays?.map((day: string) => {
            const time = club.scheduledClubTimes?.[day];
            return (
              <div key={day} className="flex items-center gap-4 text-sm">
                <Calendar className="w-4 h-4 text-orange-600" />
                <span className="w-12 font-medium">{day}</span>
                <Clock className="w-4 h-4 text-orange-600" />
                <span>
                  {time?.startTime} – {time?.endTime}
                </span>
              </div>
            );
          })}
        </div>

        {/* Class Levels & Prices */}
        <div className="space-y-2">
          <h3 className="font-semibold">Анги түвшин / Үнэ</h3>
          {club.selectedClassLevelNames?.map((level: string) => (
            <div key={level} className="flex justify-between text-sm">
              <span>{level}</span>
              <span className="font-medium">{club.clubPrices?.[level]?.toLocaleString()}₮</span>
            </div>
          ))}
        </div>

        {/* Teacher */}
        <div className="border-t pt-6 flex gap-4">
          <img src={club.teacherImage} alt={club.teacherName} className="w-20 h-20 rounded-full object-cover" />
          <div className="space-y-1">
            <p className="font-semibold">{club.teacherName}</p>
            <p className="text-sm text-slate-500">{club.teacherProfession}</p>
            <p className="text-sm">Туршлага: {club.teacherExperience}</p>
            <p className="text-sm">Амжилт: {club.teacherAchievement}</p>

            <div className="flex items-center gap-3 text-sm text-slate-600 mt-2">
              <Phone className="w-4 h-4" />
              <span>{club.teacherPhone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Mail className="w-4 h-4" />
              <span>{club.teacherEmail}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
