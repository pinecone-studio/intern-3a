'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // SIMPLE DEMO AUTH LOGIC
    if (email === 'admin@example.com' && password === '123456') {
      localStorage.setItem('auth', 'true');
      router.push('/dashboard');
    } else {
      setError('Имэйл эсвэл нууц үг буруу байна');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Нэвтрэх</h1>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Имэйл</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Нууц үг</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border rounded-lg px-3 py-2" />
        </div>

        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg font-medium">
          Нэвтрэх
        </button>
      </form>
    </main>
  );
}
