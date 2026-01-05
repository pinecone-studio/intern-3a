'use client';

import { BookOpen, ClipboardCheck, FileText, Home, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';

const nav = [
  { name: 'Landing', href: '/', icon: Home },
  { name: 'Study Planner', href: '/planner', icon: BookOpen },
  { name: 'Homework Helper', href: '/homework', icon: ClipboardCheck },
  { name: 'Exam & Analysis', href: '/exam', icon: FileText },
];

export function Sidebar() {
  return (
    <aside className="flex flex-col w-64 min-h-screen bg-white border-r">
      <div className="p-4 text-lg font-bold">EduPlan</div>

      <nav className="flex-1 px-2 space-y-1">
        {nav.map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100">
            <item.icon size={18} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-2 space-y-1 border-t">
        <button className="flex w-full gap-2 px-3 py-2 rounded hover:bg-gray-100">
          <Settings size={16} /> Settings
        </button>
        <button className="flex w-full gap-2 px-3 py-2 rounded hover:bg-gray-100">
          <LogOut size={16} /> Log Out
        </button>
      </div>
    </aside>
  );
}
