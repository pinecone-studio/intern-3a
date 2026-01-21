'use client';
import { useUser } from '@clerk/nextjs';
import { ArrowRight, BarChart3, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const MainPage = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      {/* Навигацийн хэсэг */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <Users className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Staff<span className="text-blue-600">Flow</span>
          </span>
        </div>
        <button className="text-sm font-medium hover:text-blue-600 transition-colors">Тусламж</button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Зүүн тал: Текст контент */}
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
            Хүний нөөцийн <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">ухаалаг систем</span>
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed max-w-lg">Байгууллагын ажилтнуудын мэдээлэл, ирц болон гүйцэтгэлийг нэг дороос хянах хамгийн хялбар шийдэл.</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={user?.publicMetadata?.role === 'ADMIN' ? '/admin' : '/employee'}>
              <button className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200">
                Системд нэвтрэх
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* Баруун тал: Визуал карт */}
        <div className="relative">
          {/* Арын чимэглэл эффект */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>

          <div className="relative bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-2xl overflow-hidden group">
            <div className="grid grid-cols-2 gap-4">
              {/* Feature 1 */}
              <div className="p-6 bg-blue-600 rounded-3xl text-white space-y-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                <ShieldCheck className="w-8 h-8 opacity-80" />
                <h3 className="font-bold">Аюулгүй байдал</h3>
                <p className="text-xs text-blue-100">Мэдээлэл бүрэн шифрлэгдэнэ</p>
              </div>
              {/* Feature 2 */}
              <div className="p-6 bg-white border border-slate-100 rounded-3xl space-y-4 shadow-sm group-hover:shadow-md transition-all">
                <BarChart3 className="text-blue-600 w-8 h-8" />
                <h3 className="font-bold text-slate-800">Статистик</h3>
                <p className="text-xs text-slate-500">Бодит цагийн аналитик</p>
              </div>
            </div>

            {/* Доод хэсгийн карт */}
            <div className="mt-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Идэвхтэй ажилтнууд</p>
                <p className="text-xs text-slate-500">Одоогоор 124 ажилтан ажиллаж байна</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
