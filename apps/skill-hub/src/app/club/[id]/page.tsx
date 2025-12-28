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
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* GRID CONTAINER: 
         cols-1 on mobile, cols-12 on desktop.
         Left column spans 5, Right spans 7.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Main Images */}
        <div className="lg:col-span-5 space-y-4">
          <img src={club.clubImage} alt={club.clubName} className="w-full h-125 object-cover rounded-2xl shadow-sm" />
          {/* If you have more images, you can map them here to create a gallery effect */}
          {/* Teacher Section */}
          <div className="bg-slate-50 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
            <img src={club.teacherImage} alt={club.teacherName} className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover ring-4 ring-white shadow-sm" />
            <div className="flex-1 space-y-2">
              <div>
                <p className="font-black text-xl text-slate-900">{club.teacherName}</p>
                <p className="text-orange-600 font-medium">{club.teacherProfession}</p>
              </div>
              <div className="text-sm text-slate-600 space-y-1">
                <p>
                  <span className="font-semibold">Туршлага:</span> {club.teacherExperience}
                </p>
                <p>
                  <span className="font-semibold">Амжилт:</span> {club.teacherAchievement}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Phone className="w-4 h-4 text-orange-600" />
                  {club.teacherPhone}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Mail className="w-4 h-4 text-orange-600" />
                  {club.teacherEmail}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t">
            {/* Schedule */}
            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                Хичээлийн хуваарь
              </h3>
              <div className="space-y-3">
                {club.selectedClubWorkingDays?.map((day: string) => {
                  const time = club.scheduledClubTimes?.[day];
                  return (
                    <div key={day} className="flex items-center justify-between text-sm p-2 bg-slate-50 rounded-lg">
                      <span className="font-bold text-slate-700">{day}</span>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>
                          {time?.startTime} – {time?.endTime}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Class Levels & Prices */}
            <div className="space-y-4">
              <h3 className="font-bold">Анги түвшин / Үнэ</h3>
              <div className="space-y-3">
                {club.selectedClassLevelNames?.map((level: string) => (
                  <div key={level} className="flex justify-between items-center text-sm p-2 border-b border-dashed">
                    <span className="text-slate-600">{level}</span>
                    <span className="font-bold text-orange-600">{club.clubPrices?.[level]?.toLocaleString()}₮</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Description & Details */}
        <div className="lg:col-span-7 bg-white border rounded-2xl p-8 space-y-8">
          <div>
            <span className="bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{club.clubCategoryName}</span>
            <h1 className="text-4xl font-black mt-4 text-slate-900">{club.clubName}</h1>
            <div className="flex items-center gap-2 text-slate-600 mt-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              <span className="text-lg">{club.clubAddress}</span>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold">Танилцуулга</h3>
            <p className="text-slate-700 whitespace-pre-line leading-relaxed">{club.clubDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
