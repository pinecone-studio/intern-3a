'use client';

import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import React, { useState } from 'react';

// --- Types ----
interface Department {
  id: number;
  name: string;
}

interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  departmentId: number | null;
}

interface CombinedData {
  departments: Department[];
  allUsers: User[]; // Schema-тайгаа ижил 'allUsers' болгов
}

// --- GraphQL ---
const GET_DATA = gql`
  query GetAdminData {
    departments {
      id
      name
    }
    allUsers {
      id
      email
      departmentId
      firstName
      lastName
    }
  }
`;

const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($input: CreateDepartmentInput!) {
    createDepartment(input: $input) {
      id
      name
    }
  }
`;

const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($id: Int!, $input: UpdateDepartmentInput!) {
    updateDepartment(id: $id, input: $input) {
      id
      name
    }
  }
`;

const DELETE_DEPARTMENT = gql`
  mutation DeleteDepartment($id: Int!) {
    deleteDepartment(id: $id)
  }
`;

const ASSIGN_USER_DEPT = gql`
  mutation AssignUserDepartment($userId: String!, $departmentId: Int!) {
    assignUserDepartment(userId: $userId, departmentId: $departmentId)
  }
`;

const AdminDepartmentPage = () => {
  const [name, setName] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const { loading, data, refetch } = useQuery<CombinedData>(GET_DATA);

  const [createDept] = useMutation(CREATE_DEPARTMENT, {
    onCompleted: () => {
      refetch();
      reset();
    },
  });
  const [updateDept] = useMutation(UPDATE_DEPARTMENT, {
    onCompleted: () => {
      refetch();
      reset();
    },
  });
  const [deleteDept] = useMutation(DELETE_DEPARTMENT, { onCompleted: () => refetch() });

  const [assignDept, { loading: assigning }] = useMutation(ASSIGN_USER_DEPT, {
    onCompleted: () => {
      alert('Ажилтны хэлтэс шинэчлэгдлээ');
      refetch();
    },
    onError: (error) => alert('Алдаа: ' + error.message),
  });

  const reset = () => {
    setName('');
    setEditId(null);
  };

  const handleSave = async () => {
    if (!name.trim()) return alert('Нэр оруулна уу');
    if (editId) {
      await updateDept({ variables: { id: editId, input: { name } } });
    } else {
      await createDept({ variables: { input: { name } } });
    }
  };

  if (loading) return <p className="p-10 text-center text-gray-500 italic">Ачаалж байна...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      {/* 1. Хэлтсийн жагсаалт */}
      <section>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">🏢 Хэлтсийн удирдлага</h1>
        <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200 mb-6">
          <div className="flex gap-2">
            <input
              className="flex-1 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Шинэ хэлтсийн нэр..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
              {editId ? 'Засварлах' : 'Нэмэх'}
            </button>
            {editId && (
              <button onClick={reset} className="text-gray-500 hover:text-gray-700 underline px-2">
                Болих
              </button>
            )}
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b text-gray-600 text-sm">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Нэр</th>
                <th className="p-4 text-right">Үйлдэл</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-blue-50/30">
                  <td className="p-4 text-gray-400 font-mono text-xs">{dept.id}</td>
                  <td className="p-4 font-semibold text-gray-700">{dept.name}</td>
                  <td className="p-4 text-right space-x-3">
                    <button
                      onClick={() => {
                        setEditId(dept.id);
                        setName(dept.name);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Засах
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Устгах уу?')) deleteDept({ variables: { id: dept.id } });
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Устгах
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Ажилтнуудад хэлтэс оноох */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">👥 Ажилтнуудын хэлтэс хуваарилалт</h2>
        <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-800 text-white text-xs uppercase">
              <tr>
                <th className="p-4">Ажилтан</th>
                <th className="p-4">Имэйл</th>
                <th className="p-4 text-center">Статус</th>
                <th className="p-4">Хэлтэс оноох</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {data?.allUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/80">
                  <td className="p-4 font-semibold text-gray-800">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-4 text-gray-500">{user.email}</td>
                  <td className="p-4 text-center">
                    {user.departmentId ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase">{data.departments.find((d) => d.id === user.departmentId)?.name}</span>
                    ) : (
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase">Хуваарилаагүй</span>
                    )}
                  </td>
                  <td className="p-4">
                    <select
                      className="w-full border border-gray-300 p-2 rounded-lg bg-gray-50 outline-none text-sm transition cursor-pointer"
                      value={user.departmentId || ''}
                      disabled={assigning}
                      onChange={(e) => {
                        const deptId = parseInt(e.target.value);
                        if (deptId) {
                          assignDept({ variables: { userId: user.id, departmentId: deptId } });
                        }
                      }}
                    >
                      <option value="" disabled>
                        -- Хэлтэс сонгох --
                      </option>
                      {data.departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDepartmentPage;
