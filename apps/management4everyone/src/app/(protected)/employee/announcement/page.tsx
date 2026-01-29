'use client';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import React from 'react';

// --- Төрлүүдийг тодорхойлох (TypeScript Interfaces) ---
interface Announcement {
  id: number;
  title: string;
  content: string;
}

interface AnnouncementsData {
  announcements: Announcement[];
}

// --- GraphQL Query болон Mutations ---
const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements {
    announcements {
      id
      title
      content
    }
  }
`;

const AnnouncementPage = () => {
  // 1. Унших (Query) - Төрлийг <AnnouncementsData> гэж зааж өгсөн
  const { loading, error, data } = useQuery<AnnouncementsData>(GET_ANNOUNCEMENTS);

  if (loading) return <p className="p-10 text-center text-gray-500">Ачаалж байна...</p>;
  if (error) return <p className="p-10 text-center text-red-500">Алдаа: {error.message}</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen ">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Зарлалын Удирдлага</h1>

      {/* Зарлалын жагсаалт */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Нийт зарлалууд ({data?.announcements.length})</h2>
        {data?.announcements.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex justify-between items-start hover:shadow-md transition-shadow">
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-900 mb-1">{item.title}</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{item.content}</p>
            </div>
            <div className="flex gap-2 ml-4"></div>
          </div>
        ))}

        {data?.announcements.length === 0 && <p className="text-center text-gray-400 py-10">Одоогоор зарлал байхгүй байна.</p>}
      </div>
    </div>
  );
};

export default AnnouncementPage;
