'use client';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import { formatDate } from 'apps/management4everyone/src/utils/dateUtils';
import React, { ChangeEvent, FormEvent, useState } from 'react';

// 1. Чөлөөний төлөвт зориулсан Enum (Сонголттой бол)
type LeaveStatus = 'PENDING' | 'APPROVED' | 'DENIED';

// 2. Leave объектын үндсэн бүтэц
interface Leave {
  id: number;
  startDate: string; // GraphQL-ээс ISO string хэлбэрээр ирдэг
  endDate: string;
  reason: string;
  status: LeaveStatus;
  createdAt: string;
  updatedAt?: string;
  userId: string;
}

// 3. useQuery-ийн буцаах дата төрөл
interface MyLeavesData {
  myLeaves: Leave[];
}

// --- GraphQL Mutations & Queries ---

export const GET_MY_LEAVES = gql`
  query GetMyLeaves {
    myLeaves {
      id
      startDate
      endDate
      reason
      status
      createdAt
    }
  }
`;

export const CREATE_LEAVE_MUTATION = gql`
  mutation CreateLeave($input: CreateLeaveInput!) {
    createLeave(input: $input) {
      id
      status
    }
  }
`;

export const DELETE_LEAVE_MUTATION = gql`
  mutation DeleteLeave($id: Int!) {
    deleteLeave(id: $id) {
      id
    }
  }
`;

const LeavePage = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });

  // 1. Өгөгдөл татах (Жагсаалт)
  const { data, loading: queryLoading, error: queryError } = useQuery<MyLeavesData>(GET_MY_LEAVES);

  console.log('data', data);

  // 2. Хүсэлт үүсгэх Mutation
  const [createLeave, { loading: createLoading }] = useMutation(CREATE_LEAVE_MUTATION, {
    refetchQueries: [{ query: GET_MY_LEAVES }], // Шинэчлэгдсэн жагсаалтыг шууд татах
    onCompleted: () => {
      alert('Чөлөөний хүсэлт амжилттай илгээгдлээ!');
      setFormData({ startDate: '', endDate: '', reason: '' });
    },
  });

  // 3. Устгах Mutation
  const [deleteLeave] = useMutation(DELETE_LEAVE_MUTATION, {
    refetchQueries: [{ query: GET_MY_LEAVES }],
    onCompleted: () => alert('Хүсэлт устгагдлаа.'),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createLeave({
      variables: {
        input: {
          startDate: formData.startDate,
          endDate: formData.endDate,
          reason: formData.reason,
        },
      },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id: number) => {
    if (confirm('Та энэ хүсэлтийг устгахдаа итгэлтэй байна уу?')) {
      deleteLeave({ variables: { id } });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      {/* --- FORM ХЭСЭГ --- */}
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-6 text-black">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Чөлөө авах хүсэлт</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Эхлэх огноо</label>
            <input type="date" name="startDate" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={formData.startDate} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Дуусах огноо</label>
            <input type="date" name="endDate" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={formData.endDate} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Чөлөө авах шалтгаан</label>
            <textarea name="reason" rows={3} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={formData.reason} onChange={handleChange} />
          </div>
          <button
            type="submit"
            disabled={createLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${createLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {createLoading ? 'Илгээж байна...' : 'Хүсэлт илгээх'}
          </button>
        </form>
      </div>

      <hr />

      {/* --- ЖАГСААЛТ ХЭСЭГ --- */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-black">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Миний илгээсэн хүсэлтүүд</h2>

        {queryLoading && <p className="text-gray-500 text-center">Уншиж байна...</p>}
        {queryError && <p className="text-red-500 text-center">Алдаа гарлаа: {queryError.message}</p>}

        {!queryLoading && data?.myLeaves?.length === 0 && <p className="text-gray-500 text-center py-4">Танд илгээсэн хүсэлт байхгүй байна.</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Огноо</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Шалтгаан</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Төлөв</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Үйлдэл</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.myLeaves?.map((leave: any) => (
                <tr key={leave.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate">{leave.reason}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full 
                      ${leave.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : leave.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {leave.status === 'PENDING' && (
                      <button onClick={() => handleDelete(leave.id)} className="text-red-600 hover:text-red-900 transition">
                        Устгах
                      </button>
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

export default LeavePage;
