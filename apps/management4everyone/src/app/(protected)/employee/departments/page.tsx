'use client';

import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import React, { useEffect, useState } from 'react';

// --- TypeScript Interfaces ---
interface Department {
  id: number;
  name: string;
}

interface DepartmentsData {
  departments: Department[];
}

interface MyProfileData {
  me: {
    id: string;
    departmentId: number | null;
    department?: Department;
  } | null;
}

// --- GraphQL Queries ---
const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
      id
      name
    }
  }
`;

const GET_MY_PROFILE = gql`
  query GetMyProfile {
    me {
      id
      departmentId
      department {
        id
        name
      }
    }
  }
`;

const SELECT_MY_DEPARTMENT = gql`
  mutation SelectMyDepartment($departmentId: Int!) {
    selectMyDepartment(departmentId: $departmentId)
  }
`;

const EmployeeDepartmentPage = () => {
  const [selectedId, setSelectedId] = useState<string>('');

  // 1. Бүх хэлтэс татах
  const { data: deptsData } = useQuery<DepartmentsData>(GET_DEPARTMENTS);

  // 2. Профайл татах (onCompleted-ийг хасаж, useEffect ашиглана)
  const { loading, data: profileData, refetch: refetchProfile } = useQuery<MyProfileData>(GET_MY_PROFILE);

  // Профайл ачаалагдаж дуусмагц selectedId-г оноох
  useEffect(() => {
    if (profileData?.me?.departmentId) {
      setSelectedId(profileData.me.departmentId.toString());
    }
  }, [profileData]);

  // 3. Mutation (Энд onCompleted хэвээрээ байж болно)
  const [selectDept, { loading: mutationLoading }] = useMutation<{ selectMyDepartment: boolean }, { departmentId: number }>(SELECT_MY_DEPARTMENT, {
    onCompleted: () => {
      alert('Амжилттай хадгалагдлаа!');
      refetchProfile();
    },
    onError: (error) => {
      alert('Алдаа: ' + error.message);
    },
  });

  if (loading) return <p className="p-10 text-center">Уншиж байна...</p>;

  const currentDeptName = profileData?.me?.department?.name;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 shadow-sm">
        <h1 className="text-2xl font-bold text-amber-900 mb-2">Миний хэлтэс</h1>

        {currentDeptName ? (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-xl">
            <p className="text-green-800 font-medium flex items-center">
              <span className="mr-2">✅</span>
              Таны одоогийн хэлтэс: <strong className="ml-1 uppercase text-lg">{currentDeptName}</strong>
            </p>
          </div>
        ) : (
          <p className="text-amber-700 mb-6 italic">Та одоогоор ямар нэгэн хэлтэст харьяалагдаагүй байна.</p>
        )}

        <div className="space-y-4">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:border-amber-500 outline-none transition-all cursor-pointer text-gray-800"
          >
            <option value="">-- Хэлтэс сонгох --</option>
            {deptsData?.departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            {selectedId && (
              <button onClick={() => setSelectedId('')} className="px-4 py-4 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300">
                Арилгах
              </button>
            )}
            <button
              onClick={() => {
                const id = parseInt(selectedId);
                if (!isNaN(id)) {
                  selectDept({ variables: { departmentId: id } });
                }
              }}
              disabled={!selectedId || mutationLoading}
              className="flex-1 bg-amber-600 text-white py-4 rounded-xl font-bold hover:bg-amber-700 disabled:bg-gray-300 transition-all shadow-md"
            >
              {mutationLoading ? 'Хадгалж байна...' : 'Хадгалах'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDepartmentPage;
