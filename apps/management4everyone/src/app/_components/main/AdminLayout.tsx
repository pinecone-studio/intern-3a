import { Building2, CalendarCheck, Home, LogOut, Megaphone, Users, Wallet } from 'lucide-react';
import { Header } from './Header';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="h-16 flex items-center px-6 text-xl font-semibold border-b">HR Admin</div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <SidebarItem icon={<Home size={18} />} label="Dashboard" />
          <SidebarItem icon={<Users size={18} />} label="Employees" />
          <SidebarItem icon={<Building2 size={18} />} label="Departments" />
          <SidebarItem icon={<CalendarCheck size={18} />} label="Attendance" />
          <SidebarItem icon={<Wallet size={18} />} label="Payroll" />
          <SidebarItem icon={<Megaphone size={18} />} label="Announcements" />
        </nav>
        <div className="px-4 py-4 border-t">
          <SidebarItem icon={<LogOut size={18} />} label="Logout" />
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Admin</div>
            <div className="w-8 h-8 rounded-full bg-gray-300" />
          </div>
        </header>
        <Header />

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
