'use client';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Card } from 'libs/shared/shadcn/src'; // Таны төслийн зам
import { Clock, ShieldAlert, UserCheck, Users } from 'lucide-react';
import React from 'react';

// 1. Query тодорхойлох
const GET_ADMIN_STATS = gql`
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
  // 3. Apollo Query
  const { loading, error, data } = useQuery<AdminStatsData>(GET_ADMIN_STATS, {
    pollInterval: 60000,
  });

  if (loading) return <div className="p-10 text-center">Уншиж байна...</div>;
  if (error) return <div className="p-10 text-red-500 text-center">Алдаа: {error.message}</div>;
  if (!data) return null;

  const { adminUserStats } = data;

  // 4. Дүрс болон өгөгдлийн нэгтгэл
  const stats = [
    {
      title: 'Нийт хэрэглэгчид',
      value: adminUserStats.totalUsers.toLocaleString(),
      change: 'Нийт',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Өнөөдрийн ирц',
      value: adminUserStats.todayAttendance.toLocaleString(),
      change: `${((adminUserStats.todayAttendance / adminUserStats.totalUsers) * 100).toFixed(1)}%`,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Чөлөөний хүсэлт',
      value: adminUserStats.pendingLeaves.toLocaleString(),
      change: 'Хүлээгдэж буй',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Системийн админ',
      value: (adminUserStats.totalAdmins + 1).toLocaleString(),
      change: 'Эрхтэй',
      icon: ShieldAlert,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Админ хянах самбар</h1>
        <p className="text-muted-foreground mt-1">Системийн ерөнхий төлөв байдал болон ажилчдын мэдээлэл.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6 transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">{stat.change}</span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                <p className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminStatsDashboard;
