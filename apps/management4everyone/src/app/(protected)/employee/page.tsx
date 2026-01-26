'use client';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { formatDate, formatTime } from 'apps/management4everyone/src/utils/dateUtils';
import { AlertCircle, Calendar as CalendarIcon, CheckCircle2, Clock, Users } from 'lucide-react';
import React, { useState } from 'react';

// GraphQL-ээс ирэх ирцийн төрөл
interface Attendance {
  id: number;
  date: string;
  clockIn: string;
  clockOut: string | null;
}

// Чөлөөний хүсэлтийн төрөл
interface Leave {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'DENIED';
}

// Хэрэглэгчийн үндсэн төрөл
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: {
    name: string;
  } | null;
  attendances: Attendance[];
  leaves: Leave[];
}

// useQuery-д ашиглагдах хариултын төрөл
interface GetMyProfileData {
  me: UserProfile | null;
}

const GET_MY_PROFILE = gql`
  query GetMyFullProfile {
    me {
      id
      firstName
      lastName
      email
      department {
        name
      }
      attendances {
        id
        date
        clockIn
        clockOut
      }
      leaves {
        id
        startDate
        endDate
        reason
        status
      }
    }
  }
`;

export default function EmployeePage() {
  const { data, loading, error } = useQuery<GetMyProfileData>(GET_MY_PROFILE);
  const [currentDate, setCurrentDate] = useState(new Date());

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <p className="text-destructive">Error loading profile</p>
        </div>
      </div>
    );
  }

  const profile = data?.me;

  if (!profile) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-muted-foreground">No profile data available</p>
      </div>
    );
  }

  // Calendar logic
  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const attendanceMap = new Map(profile.attendances.map((att) => [new Date(att.date).toDateString(), att]));

  const leaveMap = new Map(profile.leaves.map((leave) => [new Date(leave.startDate).toDateString(), leave]));

  const monthDays = Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => i + 1);
  const firstDay = getFirstDayOfMonth(currentDate);
  const prevMonthDays = Array.from({ length: firstDay }, (_, i) => i + 1).map((day) => ({
    day,
    isCurrentMonth: false,
  }));

  const currentMonthDays = monthDays.map((day) => ({
    day,
    isCurrentMonth: true,
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
  }));

  const calendarDays = [...prevMonthDays, ...currentMonthDays];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'DENIED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const recentAttendances = [...profile.attendances].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  const pendingLeaves = profile.leaves.filter((leave) => leave.status === 'PENDING');

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="rounded-lg bg-linear-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {profile.firstName} {profile.lastName}!
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            {profile.department?.name || 'No Department'} • {profile.email}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Calendar */}
          <div className="rounded-lg border border-border/50 bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">{monthName}</h2>
              <div className="flex gap-2">
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className="rounded-lg px-3 py-2 hover:bg-primary/10 transition-colors">
                  ←
                </button>
                <button onClick={() => setCurrentDate(new Date())} className="rounded-lg px-3 py-2 hover:bg-primary/10 transition-colors text-sm font-medium">
                  Today
                </button>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className="rounded-lg px-3 py-2 hover:bg-primary/10 transition-colors">
                  →
                </button>
              </div>
            </div>

            {/* Weekday headers */}
            <div className="mb-4 grid grid-cols-7 gap-2 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-xs font-semibold text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((dayObj, idx) => {
                const { day, isCurrentMonth, date } = dayObj as any;
                const dateStr = date?.toDateString();
                const attendance = dateStr ? attendanceMap.get(dateStr) : null;
                const leave = dateStr ? leaveMap.get(dateStr) : null;

                return (
                  <div
                    key={`${idx}-${day}`}
                    className={`relative aspect-square rounded-lg border transition-all duration-200 flex items-center justify-center cursor-pointer group
                      ${!isCurrentMonth ? 'bg-muted/30 text-muted-foreground border-border/30' : 'border-border/50 hover:border-primary/50 hover:bg-primary/5'}
                      ${attendance ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800/30' : ''}
                      ${leave?.status === 'APPROVED' ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800/30' : ''}
                      ${leave?.status === 'PENDING' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-800/30' : ''}
                    `}
                  >
                    <div className="text-center">
                      <p className="font-semibold text-sm">{day}</p>
                      {attendance && <Clock className="h-3 w-3 mx-auto mt-1 text-green-600" />}
                      {leave?.status === 'APPROVED' && <CalendarIcon className="h-3 w-3 mx-auto mt-1 text-blue-600" />}
                      {leave?.status === 'PENDING' && <AlertCircle className="h-3 w-3 mx-auto mt-1 text-yellow-600" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-green-200 dark:bg-green-900/30" />
                <span className="text-muted-foreground">Clock In</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-blue-200 dark:bg-blue-900/30" />
                <span className="text-muted-foreground">Approved Leave</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-yellow-200 dark:bg-yellow-900/30" />
                <span className="text-muted-foreground">Pending Leave</span>
              </div>
            </div>
          </div>

          {/* Recent Attendance */}
          <div className="rounded-lg border border-border/50 bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Attendance</h3>
            <div className="space-y-3">
              {recentAttendances.length > 0 ? (
                recentAttendances.map((att) => (
                  <div key={att.id} className="flex items-center justify-between rounded-lg bg-muted/30 p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{formatDate(att.date)}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatTime(att.clockIn)} → {att.clockOut ? formatTime(att.clockOut) : 'Ongoing'}
                        </p>
                      </div>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No attendance records yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Leave Requests */}
          <div className="rounded-lg border border-border/50 bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Leave Requests</h3>
            <div className="space-y-3">
              {profile.leaves.length > 0 ? (
                profile.leaves.map((leave) => (
                  <div key={leave.id} className={`rounded-lg p-3 space-y-2 ${getStatusBadgeColor(leave.status)}`}>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase">{leave.status}</p>
                      <CalendarIcon className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-medium line-clamp-1">{leave.reason}</p>
                    <p className="text-xs opacity-75">
                      {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No leave requests</p>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4">
            <div className="rounded-lg border border-border/50 bg-linear-to-br from-green-50/50 to-green-50/20 dark:from-green-900/10 dark:to-green-900/5 p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Clock-ins</p>
              <p className="text-2xl font-bold text-green-600">{profile.attendances.length}</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-linear-to-br from-blue-50/50 to-blue-50/20 dark:from-blue-900/10 dark:to-blue-900/5 p-4">
              <p className="text-xs text-muted-foreground mb-1">Approved Leaves</p>
              <p className="text-2xl font-bold text-blue-600">{profile.leaves.filter((l) => l.status === 'APPROVED').length}</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-linear-to-br from-yellow-50/50 to-yellow-50/20 dark:from-yellow-900/10 dark:to-yellow-900/5 p-4">
              <p className="text-xs text-muted-foreground mb-1">Pending Requests</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingLeaves.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
