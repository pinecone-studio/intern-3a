'use client';
import React, { useState } from 'react';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { formatDate, formatTime } from 'apps/management4everyone/src/utils/dateUtils';

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

const MyProfilePage = () => {
  const { data, loading, error } = useQuery<GetMyProfileData>(GET_MY_PROFILE);
  const [activeTab, setActiveTab] = useState('info');

  if (loading) return <div className="p-10 text-center">Уншиж байна...</div>;
  if (error) return <div className="p-10 text-red-500 text-center">Алдаа гарлаа: {error.message}</div>;

  const user = data?.me;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Миний Профайл</h1>

      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-500">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{user?.department?.name || 'Хэлтэсгүй'}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {['info', 'attendance', 'leaves'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium transition-colors ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
          >
            {tab === 'info' ? 'Мэдээлэл' : tab === 'attendance' ? 'Ирц' : 'Чөлөөний хүсэлт'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Мэдээлэл Tab */}
        {activeTab === 'info' && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Овог:</p>
                <p className="font-medium">{user?.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Нэр:</p>
                <p className="font-medium">{user?.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Имэйл:</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ID:</p>
                <p className="font-mono text-xs">{user?.id}</p>
              </div>
            </div>
          </div>
        )}

        {/* Ирц Tab */}
        {activeTab === 'attendance' && (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 border-b text-gray-600 font-semibold">Огноо</th>
                <th className="p-4 border-b text-gray-600 font-semibold">Ирсэн</th>
                <th className="p-4 border-b text-gray-600 font-semibold">Тарсан</th>
              </tr>
            </thead>
            <tbody>
              {user?.attendances.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 border-b">{formatDate(item.date)}</td>
                  <td className="p-4 border-b text-green-600 font-medium">{formatTime(item.clockIn)}</td>
                  <td className="p-4 border-b text-red-600 font-medium">{formatTime(item.clockOut)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Чөлөө Tab */}
        {activeTab === 'leaves' && (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 border-b text-gray-600 font-semibold">Хугацаа</th>
                <th className="p-4 border-b text-gray-600 font-semibold">Шалтгаан</th>
                <th className="p-4 border-b text-gray-600 font-semibold">Төлөв</th>
              </tr>
            </thead>
            <tbody>
              {user?.leaves.map((leave: any) => (
                <tr key={leave.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b text-sm">
                    {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                  </td>
                  <td className="p-4 border-b">{leave.reason}</td>
                  <td className="p-4 border-b">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        leave.status === 'APPROVED' ? 'bg-green-100 text-green-700' : leave.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyProfilePage;
