'use client';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import React, { useEffect, useState } from 'react';

// --- Types & Enums ---
export enum Role {
  ADMIN = 'ADMIN',
  WORKER = 'WORKER',
}

export enum LeaveStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
}

export interface Department {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  clerkUserId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role?: Role | null;
  departmentId?: number | null;
  department?: Department | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
}

// --- GraphQL Data Structures ---
export interface GetMeData {
  me: User | null;
}

export interface UpdateMeData {
  updateMe: User;
}

export interface UpdateMeVariables {
  input: UpdateUserInput;
}

// --- Queries & Mutations ---
export const GET_ME = gql`
  query GetMe {
    me {
      id
      firstName
      lastName
      email
      role
      department {
        id
        name
      }
    }
  }
`;

export const UPDATE_ME = gql`
  mutation UpdateMe($input: UpdateUserInput!) {
    updateMe(input: $input) {
      id
      firstName
      lastName
    }
  }
`;

// --- Component ---
const UserProfilePage: React.FC = () => {
  // Query-д <ӨгөгдлийнТөрөл> зааж өгснөөр data.me-г TypeScript танина
  const { data, loading, error } = useQuery<GetMeData>(GET_ME);

  // Mutation-д <ХариуныТөрөл, ХувьсагчийнТөрөл> зааж өгнө
  const [updateMe, { loading: updating }] = useMutation<UpdateMeData, UpdateMeVariables>(UPDATE_ME);

  const [formData, setFormData] = useState<UpdateUserInput>({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (data?.me) {
      setFormData({
        firstName: data.me.firstName ?? '',
        lastName: data.me.lastName ?? '',
      });
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateMe({
        variables: {
          input: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
        },
        // Mutation хийсний дараа GET_ME query-г дахин ажиллуулж мэдээллийг шинэчлэх
        refetchQueries: [{ query: GET_ME }],
      });
      alert('Мэдээлэл амжилттай шинэчлэгдлээ!');
    } catch (err) {
      console.error('error updating user info:', err);
      alert('Алдаа гарлаа: ');
    }
  };

  if (loading) return <p>Уншиж байна...</p>;
  if (error) return <p>Алдаа: {error.message}</p>;
  if (!data?.me) return <p>Хэрэглэгч олдсонгүй.</p>;

  const user = data.me;

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginTop: 0 }}>Миний мэдээлэл</h2>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
        <p>
          <strong>Имэйл:</strong> {user.email}
        </p>
        <p>
          <strong>Эрх:</strong> {user.role}
        </p>
        <p>
          <strong>Хэлтэс:</strong> {user.department?.name || 'Тодорхойгүй'}
        </p>
      </div>

      <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />

      <h3>Мэдээлэл засах</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Нэр:</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Овог:</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <button
          type="submit"
          disabled={updating}
          style={{
            backgroundColor: updating ? '#ccc' : '#007bff',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: updating ? 'not-allowed' : 'pointer',
            width: '100%',
            fontWeight: 'bold',
          }}
        >
          {updating ? 'Хадгалж байна...' : 'Шинэчлэх'}
        </button>
      </form>
    </div>
  );
};

export default UserProfilePage;
