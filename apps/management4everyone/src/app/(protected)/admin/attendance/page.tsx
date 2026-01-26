'use client';
import { gql, OperationVariables } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import React, { useState } from 'react';

// --- TYPES ---
interface User {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  department?: { name: string } | null;
}

interface Attendance {
  id: number;
  date: string;
  clockIn: string;
  clockOut?: string | null;
  user: User;
}

interface AdminAttendanceData {
  attendances: Attendance[];
}

interface FilterState {
  fromDate: string;
  toDate: string;
  searchName: string;
}

// --- GRAPHQL ---
const GET_ALL_ATTENDANCE = gql`
  query GetAllAttendances($filter: AttendanceFilterInput) {
    attendances(filter: $filter) {
      id
      date
      clockIn
      clockOut
      user {
        firstName
        lastName
        email
        department {
          name
        }
      }
    }
  }
`;

export default function AdminAttendancePage() {
  const [filter, setFilter] = useState<FilterState>({
    fromDate: '',
    toDate: '',
    searchName: '',
  });

  // 1. Алдаа засалт: onError-ийг options дотор биш, useQuery-ийн үр дүн дээр шалгана
  const { data, loading, error } = useQuery<AdminAttendanceData, OperationVariables>(GET_ALL_ATTENDANCE, {
    variables: {
      filter: {
        fromDate: filter.fromDate || undefined,
        toDate: filter.toDate || undefined,
      },
    },
  });

  const filteredData =
    data?.attendances?.filter((at) => {
      const fullName = `${at.user?.lastName || ''} ${at.user?.firstName || ''}`.toLowerCase();
      return fullName.includes(filter.searchName.toLowerCase());
    }) || [];

  if (error) {
    console.error('GraphQL Error:', error);
    return <div className="p-8 text-red-500">Алдаа: {error.message}</div>;
  }

  const formatDate = (dateValue: string | number) => {
    const date = new Date(Number(dateValue) || dateValue);
    return date.toLocaleDateString('mn-MN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };
  const formatTime = (timeValue: string | number | null | undefined) => {
    if (!timeValue) return '-';

    const date = new Date(Number(timeValue) || timeValue);

    if (isNaN(date.getTime())) return '-';

    return date.toLocaleTimeString('mn-MN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  console.log('filteredData', filteredData);

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-black">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Ирцийн нэгдсэн хяналт</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <input
            type="text"
            placeholder="Ажилтын нэр..."
            className="border p-2.5 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500/10"
            value={filter.searchName}
            onChange={(e) => setFilter({ ...filter, searchName: e.target.value })}
          />
          <input type="date" className="border p-2.5 rounded-xl bg-gray-50" value={filter.fromDate} onChange={(e) => setFilter({ ...filter, fromDate: e.target.value })} />
          <input type="date" className="border p-2.5 rounded-xl bg-gray-50" value={filter.toDate} onChange={(e) => setFilter({ ...filter, toDate: e.target.value })} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-bold border-b">
              <tr>
                <th className="p-5">Ажилтан</th>
                <th className="p-5">Огноо</th>
                <th className="p-5">Ирсэн</th>
                <th className="p-5">Тарсан</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-gray-400">
                    Ачаалж байна...
                  </td>
                </tr>
              ) : (
                filteredData.map((at) => (
                  <tr key={at.id} className="hover:bg-gray-50 transition">
                    <td className="p-5 font-semibold">
                      {at.user?.lastName} {at.user?.firstName}
                      <div className="text-[10px] text-gray-400 uppercase tracking-tighter">{at.user?.department?.name || 'Хэлтэсгүй'}</div>
                    </td>
                    <td className="p-5 text-sm">{formatDate(at.date)}</td>
                    <td className="p-5 text-emerald-600 font-bold">{formatTime(at.clockIn)}</td>
                    <td className="p-5 text-red-500 font-bold">{formatTime(at.clockOut)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
