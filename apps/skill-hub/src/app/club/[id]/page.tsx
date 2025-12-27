'use client';

import { Calendar, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { notFound } from 'next/navigation';

import { useClub } from '@/app/hook/use-club';

interface PageProps {
  params: {
    id: string;
  };
}

export default function ClubDetailPage({ params }: PageProps) {
  const { allClubs } = useClub();

  const club = allClubs.find((item) => item._id === params.id);

  if (!club) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Image */}
      <img src={typeof club.clubImage === 'string' ? club.clubImage : URL.createObjectURL(club.clubImage)} alt={club.clubName} className="w-full h-80 object-cover rounded-2xl mb-8" />

      {/* Main Card */}
      <div className="bg-white border rounded-2xl p-8 space-y-6">
        {/* Title */}
        <div>
          <h1 className="text-3xl font-black">{club.clubName}</h1>
          <p className="text-sm text-slate-500">{club.clubCategoryName}</p>
        </div>

        {/* Address */}
        <div className="flex items-center gap-2 text-slate-600">
          <MapPin className="w-5 h-5 text-orange-600" />
          <span>{club.clubAddress}</span>
        </div>

        {/* Description */}
        <p className="text-slate-700 whitespace-pre-line">{club.clubDescription}</p>

        {/* Schedule */}
        <div className="space-y-2">
          <h3 className="font-semibold">Хичээлийн хуваарь</h3>

          {club.selectedClubWorkingDays?.map((day) => {
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

          {club.selectedClassLevelNames?.map((level) => (
            <div key={level} className="flex justify-between text-sm">
              <span>{level}</span>
              <span className="font-medium">{club.clubPrices?.[level]?.toLocaleString()}₮</span>
            </div>
          ))}
        </div>

        {/* Teacher */}
        <div className="border-t pt-6 flex gap-4">
          <img src={typeof club.teacherImage === 'string' ? club.teacherImage : URL.createObjectURL(club.teacherImage)} alt={club.teacherName} className="w-20 h-20 rounded-full object-cover" />

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
