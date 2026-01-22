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

const AdminDepartmentPage = () => {
  const [name, setName] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const { loading, data, refetch } = useQuery<DepartmentsData>(GET_DEPARTMENTS);

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

  if (loading) return <p className="p-10 text-center text-gray-500">Ачаалж байна...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Хэлтсийн удирдлага (Админ)</h1>

      <div className="bg-white shadow-md rounded-lg p-6 border border-blue-100 mb-8">
        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Хэлтсийн нэр..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            {editId ? 'Шинэчлэх' : 'Шинээр нэмэх'}
          </button>
          {editId && (
            <button onClick={reset} className="text-gray-500 underline">
              Болих
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-700">ID</th>
              <th className="p-4 font-semibold text-gray-700">Хэлтсийн нэр</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data?.departments.map((dept) => (
              <tr key={dept.id} className="hover:bg-gray-50">
                <td className="p-4 text-gray-500">{dept.id}</td>
                <td className="p-4 font-medium">{dept.name}</td>
                <td className="p-4 text-right space-x-4">
                  <button
                    onClick={() => {
                      setEditId(dept.id);
                      setName(dept.name);
                    }}
                    className="text-indigo-600 hover:underline text-sm"
                  >
                    Засах
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Устгах уу?')) deleteDept({ variables: { id: dept.id } });
                    }}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Устгах
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDepartmentPage;
