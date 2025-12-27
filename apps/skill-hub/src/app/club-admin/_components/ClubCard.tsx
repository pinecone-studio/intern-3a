'use client';

import { NewClubType } from '@/lib/utils/types';
import { Card, CardContent } from '@intern-3a/shadcn';
import { Mail, Phone, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function ClubCard({ club }: { club: NewClubType }) {
  const [open, setOpen] = useState(false);
  console.log(club);

  return (
    <div className="max-w-lg mx-auto relative">
      <Card className="group overflow-hidden rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
        <div className="relative">
          <img src={club.clubImage} alt={club.clubName} className="w-full h-56 object-cover" />

          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" aria-hidden />

          <div className="absolute left-4 bottom-4 text-white">
            <h2 className="text-2xl font-bold drop-shadow">{club.clubName}</h2>
            <p className="text-sm text-white/90 line-clamp-1">{club.clubDescription}</p>
          </div>

          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium">{club.clubCategoryName}</span>
          </div>

          <div className="absolute top-4 right-4">
            <span className="inline-flex flex-wrap gap-2">
              {Object.entries(club.clubPrices).map(([k, v]) => (
                <span key={k} className="px-3 py-1 rounded-full bg-white text-blue-900 text-xs font-semibold">
                  {k === 'Elementary' ? 'Бага' : k === 'Middle' ? 'Дунд' : 'Ахлах'}: {v}₮
                </span>
              ))}
            </span>
          </div>
        </div>

        <CardContent className="space-y-4 bg-white">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-500">Ангилал</p>
              <h3 className="text-lg font-semibold">{club.clubName}</h3>
            </div>
          </div>

          <div className="grid sm:grid gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold">Хичээлийн хуваарь</h4>
              <div className="flex gap-0.5">
                {Object.entries(club.selectedClubWorkingDays).map(([key, value]) => (
                  <p key={key}>
                    <span className="font-semibold"></span> {value}.
                  </p>
                ))}
              </div>
            </div>

            {/* <div>
              <h4 className="font-semibold">Хаяг</h4>
              <p>{club.clubAddress}</p>
            </div> */}
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Багш</h4>

            <button
              onClick={() => setOpen(true)}
              className="w-full flex items-center gap-3 text-left rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-expanded={open}
              type="button"
            >
              <img src={club.teacherImage} alt={club.teacherName} className="w-14 h-14 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium">{club.teacherName}</p>
                <p className="text-sm text-gray-600">{club.teacherProfession}</p>
              </div>
              <span className="text-sm text-gray-400">View</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden />

          <div className="relative bg-white rounded-2xl p-6 w-11/12 max-w-sm mx-auto shadow-2xl" role="dialog" aria-modal="true">
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" aria-label="Close details">
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center gap-3">
              <img src={club.teacherImage} alt={`Coach ${club.teacherName}`} className="w-24 h-24 rounded-full object-cover" />
              <h3 className="text-lg font-bold">{club.teacherName}</h3>
              <p className="text-sm text-gray-600">
                {club.teacherProfession} {club.teacherExperience ? `· ${club.teacherExperience}` : ''}
              </p>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>Мэргэжил: {club.teacherProfession}</li>
              <li>Туршлага: {club.teacherExperience}</li>
              <li>Амжилт: {club.teacherAchievement}</li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" aria-hidden /> <span>{club?.teacherPhone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" aria-hidden /> <span>{club?.teacherEmail}</span>
              </li>
            </ul>

            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-md border text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
