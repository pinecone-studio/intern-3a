'use client';
import { useQuery } from '@apollo/client/react';
import React, { useState } from 'react';

import { gql } from '@apollo/client';

// --- Types & Enums ---
export enum Role {
  ADMIN = 'ADMIN',
  WORKER = 'WORKER',
}

export interface Department {
  id: number;
  name: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role?: Role | null;
  department?: Department | null;
}

// GraphQL хариуны төрөл
export interface AllUsersData {
  allUsers: User[];
}

// --- Queries ---
export const GET_ALL_USERS = gql`
  query GetAllUsers {
    allUsers {
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

const AdminUsersPage: React.FC = () => {
  // TypeScript-д AllUsersData төрлийг зааж өгснөөр data.allUsers-ийг танина
  const { data, loading, error } = useQuery<AllUsersData>(GET_ALL_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <div style={{ padding: '20px' }}>Уншиж байна...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Алдаа: {error.message}</div>;

  // Хайлт хийх логик - Null-аас хамгаалсан
  const filteredUsers =
    data?.allUsers.filter((user) => {
      const firstName = user.firstName ?? '';
      const lastName = user.lastName ?? '';
      const fullName = `${firstName} ${lastName}`.toLowerCase();
      const email = user.email.toLowerCase();
      const search = searchTerm.toLowerCase();

      return fullName.includes(search) || email.includes(search);
    }) || [];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Ажилчдын нэгдсэн жагсаалт (Admin)</h2>
        <div style={{ padding: '8px 15px', backgroundColor: '#eef2f7', borderRadius: '20px', fontSize: '14px' }}>
          Нийт ажилчид: <strong>{data?.allUsers.length ?? 0}</strong>
        </div>
      </div>

      {/* Хайлтын хэсэг */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Нэр эсвэл имэйлээр хайх..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '16px',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
        />
      </div>

      {/* Хэрэглэгчдийн хүснэгт */}
      <div style={{ overflowX: 'auto', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderRadius: '10px', border: '1px solid #eee' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: '#fff' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #eee' }}>
              <th style={tableHeaderStyle}>Овог Нэр</th>
              <th style={tableHeaderStyle}>Имэйл</th>
              <th style={tableHeaderStyle}>Хэлтэс</th>
              <th style={tableHeaderStyle}>Эрх</th>
              <th style={tableHeaderStyle}>Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #f1f1f1', transition: 'background 0.2s' }}>
                  <td style={tableCellStyle}>
                    <div style={{ fontWeight: 500 }}>
                      {user.lastName} {user.firstName}
                      {!user.lastName && !user.firstName && <span style={{ color: '#bbb', fontStyle: 'italic' }}>Нэр оруулаагүй</span>}
                    </div>
                  </td>
                  <td style={tableCellStyle}>{user.email}</td>
                  <td style={tableCellStyle}>
                    <span
                      style={{
                        padding: '4px 10px',
                        backgroundColor: '#f0f2f5',
                        borderRadius: '15px',
                        fontSize: '12px',
                        color: '#495057',
                      }}
                    >
                      {user.department?.name || 'Хэлтэсгүй'}
                    </span>
                  </td>
                  <td style={tableCellStyle}>
                    <span
                      style={{
                        color: user.role === Role.ADMIN ? '#d9534f' : '#28a745',
                        fontSize: '13px',
                        fontWeight: 'bold',
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td style={tableCellStyle}>
                    <button onClick={() => alert(`ID: ${user.id} засах цонх`)} style={actionButtonStyle}>
                      Засах
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                  Хайлтын үр дүн олдсонгүй.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Styles ---
const tableHeaderStyle: React.CSSProperties = {
  padding: '16px',
  fontWeight: 600,
  color: '#444',
  fontSize: '14px',
};

const tableCellStyle: React.CSSProperties = {
  padding: '16px',
  color: '#555',
  fontSize: '14px',
};

const actionButtonStyle: React.CSSProperties = {
  padding: '6px 14px',
  backgroundColor: 'transparent',
  border: '1px solid #007bff',
  color: '#007bff',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 500,
  transition: 'all 0.2s',
};

export default AdminUsersPage;
