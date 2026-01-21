'use client';

import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import React, { useState } from 'react';

// --- Types ---
interface Department {
  id: number;
  name: string;
}

interface DepartmentsData {
  departments: Department[];
}

// --- GraphQL ---
const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
      id
      name
    }
  }
`;

const SELECT_MY_DEPARTMENT = gql`
  mutation SelectMyDepartment($departmentId: Int!) {
    selectMyDepartment(departmentId: $departmentId)
  }
`;

const EmployeeDepartmentPage = () => {
  // null утга авч чаддаг болгосноор сонголтыг арилгах боломжтой болно
  const [selectedId, setSelectedId] = useState<string>('');

  const { loading, data } = useQuery<DepartmentsData>(GET_DEPARTMENTS);

  const [selectDept, { loading: mutationLoading }] = useMutation(SELECT_MY_DEPARTMENT, {
    onCompleted: () => alert('Хэлтэс амжилттай хадгалагдлаа!'),
    onError: (err) => alert('Алдаа: ' + err.message),
  });

  const handleConfirm = () => {
    if (!selectedId) return;
    selectDept({ variables: { departmentId: parseInt(selectedId) } });
  };

  // Сонголтыг арилгах функц
  const handleClear = () => {
    setSelectedId('');
  };

  if (loading) return <p className="p-10 text-center">Ачаалж байна...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 shadow-sm">
        <h1 className="text-2xl font-bold text-amber-900 mb-2">Миний хэлтэс</h1>
        <p className="text-amber-700 mb-6">Жагсаалтаас сонголтоо хийнэ үү. Хүсвэл "Арилгах" товчоор сонголтыг цуцалж болно.</p>

        <div className="space-y-6">
          <div className="relative">
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white text-gray-800 appearance-none focus:border-amber-500 focus:outline-none transition-all cursor-pointer"
            >
              <option value="">-- Хэлтэс сонгоогүй --</option>
              {data?.departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>

            {/* Dropdown сумны дүрс */}
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="flex gap-3">
            {/* Сонголтыг арилгах товч (зөвхөн сонголт хийсэн үед харагдана) */}
            {selectedId && (
              <button onClick={handleClear} className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all">
                Арилгах
              </button>
            )}

            <button
              onClick={handleConfirm}
              disabled={!selectedId || mutationLoading}
              className="flex-1 bg-amber-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-700 disabled:bg-gray-300 transition-all shadow-md active:scale-[0.98]"
            >
              {mutationLoading ? 'Хадгалж байна...' : 'Сонголтоо баталгаажуулах'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDepartmentPage;
