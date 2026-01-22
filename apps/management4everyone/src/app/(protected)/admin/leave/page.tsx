'use client';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import React, { useState } from 'react';

// --- TYPES & INTERFACES ---
type LeaveStatus = 'PENDING' | 'APPROVED' | 'DENIED';

interface User {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
}

interface Leave {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  createdAt: string;
  user: User; // Admin талд хэрэглэгчийн мэдээлэл хэрэгтэй
}

interface AllLeavesData {
  allLeaves: Leave[];
}

// --- GRAPHQL QUERIES & MUTATIONS ---

export const GET_ALL_LEAVES = gql`
  query GetAllLeaves {
    allLeaves {
      id
      startDate
      endDate
      reason
      status
      createdAt
      user {
        firstName
        lastName
        email
      }
    }
  }
`;

export const UPDATE_LEAVE_STATUS = gql`
  mutation UpdateLeaveStatus($id: Int!, $status: LeaveStatus!) {
    updateLeaveStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

const AdminLeaveManagement = () => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // 1. Бүх хүсэлтийг татах
  const { data, loading, error } = useQuery<AllLeavesData>(GET_ALL_LEAVES);

  // 2. Төлөв өөрчлөх Mutation
  const [updateStatus, { loading: updating }] = useMutation(UPDATE_LEAVE_STATUS, {
    refetchQueries: [{ query: GET_ALL_LEAVES }],
    onCompleted: () => alert('Хүсэлтийн төлөв шинэчлэгдлээ.'),
  });

  const handleAction = (id: number, status: LeaveStatus) => {
    const actionText = status === 'APPROVED' ? 'зөвшөөрөх' : 'татгалзах';
    if (confirm(`Та энэ хүсэлтийг ${actionText}дээ итгэлтэй байна уу?`)) {
      updateStatus({ variables: { id, status } });
    }
  };

  const formatDate = (dateValue: string | number) => {
    const date = new Date(Number(dateValue) || dateValue);
    return date.toLocaleDateString('mn-MN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // Шүүлтүүр хийх логик
  const filteredLeaves = data?.allLeaves.filter((leave) => (filterStatus === 'ALL' ? true : leave.status === filterStatus)) || [];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Чөлөөний хүсэлтүүд (Админ)</h1>

        {/* Шүүлтүүр */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Төлөвөөр шүүх:</label>
          <select className="border border-gray-300 rounded-md p-2 text-sm text-black" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="ALL">Бүгд</option>
            <option value="PENDING">Хүлээгдэж буй</option>
            <option value="APPROVED">Зөвшөөрсөн</option>
            <option value="DENIED">Татгалзсан</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        {loading && <p className="p-10 text-center  text-black">Ачаалж байна...</p>}
        {error && <p className="p-10 text-center text-red-500 ">Алдаа: {error.message}</p>}

        {!loading && filteredLeaves.length === 0 && <p className="p-10 text-center text-gray-500 ">Хүсэлт олдсонгүй.</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-black">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ажилтан</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Огноо</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Шалтгаан</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Төлөв</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Үйлдэл</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-black">
              {filteredLeaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {leave.user?.lastName} {leave.user?.firstName}
                    </div>
                    <div className="text-sm text-gray-500">{leave.user?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{leave.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full 
                      ${leave.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : leave.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    {leave.status === 'PENDING' ? (
                      <>
                        <button
                          disabled={updating}
                          onClick={() => handleAction(leave.id, 'APPROVED')}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition disabled:opacity-50"
                        >
                          Зөвшөөрөх
                        </button>
                        <button
                          disabled={updating}
                          onClick={() => handleAction(leave.id, 'DENIED')}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition disabled:opacity-50"
                        >
                          Татгалзах
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400 italic">Шийдвэрлэгдсэн</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminLeaveManagement;
