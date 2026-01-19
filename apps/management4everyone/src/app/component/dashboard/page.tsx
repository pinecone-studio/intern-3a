'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem('auth');
    if (!isAuth) {
      router.push('/login');
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('auth');
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button onClick={logout} className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg">
            Гарах
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">Total Employees: 1234</div>
          <div className="bg-white p-6 rounded-xl shadow">Departments: 24</div>
          <div className="bg-white p-6 rounded-xl shadow">Present Today: 1180</div>
          <div className="bg-white p-6 rounded-xl shadow">Growth: 8.2%</div>
        </div>
      </div>
    </main>
  );
}
