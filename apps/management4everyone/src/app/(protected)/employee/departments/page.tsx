'use client';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import React from 'react';

// --- TypeScript Interfaces ---
interface Department {
  id: number;
  name: string;
}

interface MyProfileData {
  me: {
    id: string;
    department?: Department;
  } | null;
}

// --- GraphQL Queries ---
const GET_MY_PROFILE = gql`
  query GetMyProfile {
    me {
      id
      department {
        id
        name
      }
    }
  }
`;

const EmployeeDepartmentPage = () => {
  // Зөвхөн өөрийн мэдээллийг татна
  const { loading, data } = useQuery<MyProfileData>(GET_MY_PROFILE);

  if (loading) return <p className="p-10 text-center text-gray-500">Уншиж байна...</p>;

  const currentDeptName = data?.me?.department?.name;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Миний хэлтэс</h1>

        {currentDeptName ? (
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-blue-800 font-medium flex items-center">
              <span className="mr-3 text-2xl">🏢</span>
              Таны харьяалагдах хэлтэс:
              <strong className="ml-2 uppercase text-xl text-blue-900">{currentDeptName}</strong>
            </p>
            <p className="mt-4 text-sm text-blue-600">* Хэлтэс солих шаардлагатай бол Админд хандана уу.</p>
          </div>
        ) : (
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
            <p className="text-gray-600 italic flex items-center">
              <span className="mr-3 text-2xl">⚠️</span>
              Та одоогоор ямар нэгэн хэлтэст харьяалагдаагүй байна.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDepartmentPage;
