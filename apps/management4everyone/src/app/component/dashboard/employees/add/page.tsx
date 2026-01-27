'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddEmployeePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Employee saved:', form);
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-full max-w-lg">
        <h1 className="text-xl font-bold mb-6">Ажилтан бүртгэх</h1>

        <div className="mb-4">
          <label className="block text-sm mb-1">Нэр</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded-lg" />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Имэйл</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded-lg" />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Хэлтэс</label>
          <input name="department" value={form.department} onChange={handleChange} required className="w-full border px-3 py-2 rounded-lg" />
        </div>

        <button className="w-full bg-black text-white py-2 rounded-lg">Хадгалах</button>
      </form>
    </main>
  );
}
