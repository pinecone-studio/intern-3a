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
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* --- FORM SECTION --- */}
        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-light tracking-tight text-gray-900">Чөлөө авах хүсэлт</h2>
            <p className="text-sm text-gray-500 mt-1">Шаардлагатай мэдээллээ бөглөнө үү.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Эхлэх огноо</label>
                <input
                  type="date"
                  name="startDate"
                  required
                  className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-gray-300 transition-all outline-none"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Дуусах огноо</label>
                <input
                  type="date"
                  name="endDate"
                  required
                  className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-gray-300 transition-all outline-none"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Шалтгаан</label>
              <textarea
                name="reason"
                rows={3}
                required
                placeholder="Чөлөө авах шалтгаанаа энд бичнэ үү..."
                className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-gray-300 transition-all outline-none resize-none"
                value={formData.reason}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={createLoading}
              className={`w-full py-3 rounded-lg text-sm font-medium tracking-wide transition-all
                ${createLoading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-black shadow-lg shadow-gray-200'}`}
            >
              {createLoading ? 'Илгээж байна...' : 'Хүсэлт илгээх'}
            </button>
          </form>
        </section>

        {/* --- LIST SECTION --- */}
        <section>
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-lg font-medium text-gray-800">Миний түүх</h2>
            <span className="text-xs text-gray-400">{data?.myLeaves?.length || 0} хүсэлт</span>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {queryLoading ? (
              <div className="p-12 text-center text-gray-400 text-sm animate-pulse">Уншиж байна...</div>
            ) : queryError ? (
              <div className="p-12 text-center text-red-400 text-sm">Алдаа гарлаа.</div>
            ) : data?.myLeaves?.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-sm italic">Одоогоор хүсэлт бүртгэгдээгүй байна.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Огноо</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Шалтгаан</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest text-center">Төлөв</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest text-right">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {data?.myLeaves?.map((leave) => (
                      <tr key={leave.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-5 text-sm text-gray-600 font-light">
                          {formatDate(leave.startDate)} <span className="text-gray-300 mx-1">→</span> {formatDate(leave.endDate)}
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-500 max-w-50 truncate">{leave.reason}</td>
                        <td className="px-6 py-5 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter uppercase
                            ${leave.status === 'PENDING' ? 'bg-gray-100 text-gray-500' : leave.status === 'APPROVED' ? 'bg-black text-white' : 'bg-red-50 text-red-400'}`}
                          >
                            {leave.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          {leave.status === 'PENDING' && (
                            <button onClick={() => handleDelete(leave.id)} className="text-xs text-gray-400 hover:text-red-500 transition-colors underline underline-offset-4">
                              Устгах
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeavePage;
