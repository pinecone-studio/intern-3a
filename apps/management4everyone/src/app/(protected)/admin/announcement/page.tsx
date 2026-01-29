'use client';

import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import React, { useState } from 'react';

// --- Төрлүүдийг тодорхойлох (TypeScript Interfaces) ---
interface Announcement {
  id: number;
  title: string;
  content: string;
}

interface AnnouncementsData {
  announcements: Announcement[];
}

interface CreateAnnouncementVars {
  title: string;
  content: string;
}

interface UpdateAnnouncementVars {
  id: number;
  title: string;
  content: string;
}

interface DeleteAnnouncementVars {
  id: number;
}

// --- GraphQL Query болон Mutations ---
const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements {
    announcements {
      id
      title
      content
    }
  }
`;

const CREATE_ANNOUNCEMENT = gql`
  mutation CreateAnnouncement($title: String!, $content: String!) {
    createAnnouncement(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

const UPDATE_ANNOUNCEMENT = gql`
  mutation UpdateAnnouncement($id: Int!, $title: String!, $content: String!) {
    updateAnnouncement(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

const DELETE_ANNOUNCEMENT = gql`
  mutation DeleteAnnouncement($id: Int!) {
    deleteAnnouncement(id: $id)
  }
`;

const AnnouncementPage = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);

  // 1. Унших (Query) - Төрлийг <AnnouncementsData> гэж зааж өгсөн
  const { loading, error, data, refetch } = useQuery<AnnouncementsData>(GET_ANNOUNCEMENTS);

  // 2. Үүсгэх (Mutation)
  const [createAnnouncement] = useMutation<{ createAnnouncement: Announcement }, CreateAnnouncementVars>(CREATE_ANNOUNCEMENT, {
    onCompleted: () => {
      refetch();
      resetForm();
    },
  });

  // 3. Засах (Mutation)
  const [updateAnnouncement] = useMutation<{ updateAnnouncement: Announcement }, UpdateAnnouncementVars>(UPDATE_ANNOUNCEMENT, {
    onCompleted: () => {
      refetch();
      resetForm();
    },
  });

  // 4. Устгах (Mutation)
  const [deleteAnnouncement] = useMutation<{ deleteAnnouncement: boolean }, DeleteAnnouncementVars>(DELETE_ANNOUNCEMENT, {
    onCompleted: () => refetch(),
  });

  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditId(null);
  };

  const handleSubmit = async () => {
    if (!title || !content) return alert('Мэдээллээ бүрэн бөглөнө үү!');

    try {
      if (editId) {
        await updateAnnouncement({ variables: { id: editId, title, content } });
        alert('Амжилттай шинэчлэгдлээ!');
      } else {
        await createAnnouncement({ variables: { title, content } });
        alert('Амжилттай хадгалагдлаа!');
      }
    } catch (err) {
      alert('Үйлдэл амжилтгүй боллоо');
    }
  };

  const handleEdit = (item: Announcement) => {
    setEditId(item.id);
    setTitle(item.title);
    setContent(item.content);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Та устгахдаа итгэлтэй байна уу?')) {
      try {
        await deleteAnnouncement({ variables: { id } });
      } catch (err) {
        alert('Устгахад алдаа гарлаа');
      }
    }
  };

  if (loading) return <p className="p-10 text-center text-gray-500">Ачаалж байна...</p>;
  if (error) return <p className="p-10 text-center text-red-500">Алдаа: {error.message}</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Зарлалын Удирдлага</h1>

      {/* Оруулах/Засах Форм */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-200 mb-10 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-amber-700">{editId ? '📝 Зарлал засах' : '➕ Шинэ зарлал нэмэх'}</h2>
        <input
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition-all"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Гарчиг"
        />
        <textarea
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition-all h-32"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Дэлгэрэнгүй мэдээлэл..."
        />
        <div className="flex gap-3">
          <button className={`flex-1 py-3 rounded-lg font-bold text-white transition-colors ${editId ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`} onClick={handleSubmit}>
            {editId ? 'Шинэчлэн хадгалах' : 'Нийтлэх'}
          </button>
          {editId && (
            <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors" onClick={resetForm}>
              Цуцлах
            </button>
          )}
        </div>
      </div>

      {/* Зарлалын жагсаалт */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Нийт зарлалууд ({data?.announcements.length})</h2>
        {data?.announcements.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex justify-between items-start hover:shadow-md transition-shadow">
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-900 mb-1">{item.title}</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{item.content}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <button className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 font-medium transition-colors" onClick={() => handleEdit(item)}>
                Засах
              </button>
              <button className="bg-red-50 text-red-600 px-4 py-2 rounded-md hover:bg-red-100 font-medium transition-colors" onClick={() => handleDelete(item.id)}>
                Устгах
              </button>
            </div>
          </div>
        ))}

        {data?.announcements.length === 0 && <p className="text-center text-gray-400 py-10">Одоогоор зарлал байхгүй байна.</p>}
      </div>
    </div>
  );
};

export default AnnouncementPage;
