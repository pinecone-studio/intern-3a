'use client';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import React from 'react';

// --- Types ---
interface Department {
  name: string;
}

interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  department: Department | null;
}

interface AllUsersData {
  allUsers: User[];
}

// --- GraphQL Query ---
const GET_ALL_USERS = gql`
  query GetAllUsers {
    allUsers {
      id
      firstName
      lastName
      department {
        name
      }
    }
  }
`;

const UsersListPage = () => {
  const { loading, error, data } = useQuery<AllUsersData>(GET_ALL_USERS);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );

  if (error) return <div className="p-6 text-red-600 bg-red-50 rounded-xl border border-red-200">Алдаа гарлаа: {error.message}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Нийт ажилчид</h1>
          <p className="text-gray-500 text-sm">Системд бүртгэлтэй бүх хэрэглэгчдийн жагсаалт</p>
        </div>
        <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg font-medium">Нийт: {data?.allUsers.length}</div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-gray-600">Овог нэр</th>
              <th className="p-4 font-semibold text-gray-600">Хэлтэс</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Төлөв</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data?.allUsers.map((user) => (
              <tr key={user.id} className="hover:bg-amber-50/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold uppercase">{user.firstName?.charAt(0) || '?'}</div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {user.lastName} {user.firstName}
                      </p>
                      <p className="text-xs text-gray-400">ID: {user.id.slice(0, 8)}...</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  {user.department ? (
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 uppercase">{user.department.name}</span>
                  ) : (
                    <span className="text-gray-400 italic text-sm ">Хэлтэсгүй</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button className="text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors">Дэлгэрэнгүй</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data?.allUsers.length === 0 && <div className="p-20 text-center text-gray-500">Хэрэглэгч олдсонгүй.</div>}
      </div>
    </div>
  );
};

export default UsersListPage;
