'use client';
import { useQuery } from '@apollo/client/react';
import React from 'react';

import { gql } from '@apollo/client';

// 1. Query тодорхойлох
export const GET_ADMIN_STATS = gql`
  query GetAdminStats {
    adminUserStats {
      totalUsers
      totalAdmins
      totalWorkers
      pendingLeaves
      todayAttendance
    }
  }
`;

// 2. Interfaces
interface AdminUserStats {
  totalUsers: number;
  totalAdmins: number;
  totalWorkers: number;
  pendingLeaves: number;
  todayAttendance: number;
}

interface AdminStatsData {
  adminUserStats: AdminUserStats;
}

const AdminStatsDashboard = () => {
  // 3. Generics ашиглан useQuery-д төрөл зааж өгөх
  const { loading, error, data } = useQuery<AdminStatsData>(GET_ADMIN_STATS, {
    pollInterval: 60000,
  });

  if (loading) return <div className="p-10 text-center">Уншиж байна...</div>;
  if (error) return <div className="p-10 text-red-500 text-center font-semibold">Алдаа: {error.message}</div>;
  if (!data) return null;

  const { adminUserStats } = data;

  // 4. Картын тохиргоо (Төрлийг нь автоматаар танина)
  const statsConfig = [
    { label: 'Нийт ажилчид', value: adminUserStats.totalUsers, color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { label: 'Өнөөдрийн ирц', value: adminUserStats.todayAttendance, color: 'bg-green-100 text-green-800 border-green-200' },
    { label: 'Чөлөөний хүсэлт', value: adminUserStats.pendingLeaves, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { label: 'Системийн админ', value: adminUserStats.totalAdmins, color: 'bg-purple-100 text-purple-800 border-purple-200' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">Админ хянах самбар</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsConfig.map((stat, index) => (
          <div key={index} className={`p-6 rounded-xl shadow-sm border transition-transform hover:scale-105 duration-200 ${stat.color}`}>
            <p className="text-xs font-bold uppercase tracking-wider opacity-70">{stat.label}</p>
            <p className="text-4xl font-extrabold mt-3 tracking-tight">{stat.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStatsDashboard;
