// src/app/component/Home/page.tsx
// Pre-login landing page

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Management4Everyone</h1>
          <nav className="space-x-4">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-black">
              Нэвтрэх
            </Link>
            <Link href="/register" className="text-sm font-medium bg-black text-white px-4 py-2 rounded-lg">
              Бүртгүүлэх
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Ажилтны менежментийг
              <span className="block text-gray-600">хялбар болгоё</span>
            </h2>
            <p className="text-gray-600 mb-6">Management4Everyone нь байгууллагын ажилтан, тасаг, ирц, цалин, тайлангийн удирдлагыг нэг дороос хийх боломж олгоно.</p>
            <div className="flex gap-4">
              <Link href="/login" className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium">
                Нэвтрэх
              </Link>
              <Link href="/about" className="border border-gray-300 px-6 py-3 rounded-lg text-sm font-medium">
                Дэлгэрэнгүй
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-white rounded-2xl shadow p-6">
              <ul className="space-y-4">
                <li>✅ Ажилтны бүртгэл</li>
                <li>✅ Ирцийн удирдлага</li>
                <li>✅ Цалингийн тооцоо</li>
                <li>✅ Тайлан, анализ</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-500">© 2026 Management4Everyone. All rights reserved.</div>
      </footer>
    </main>
  );
}

/*
LOGIC FLOW:
1. User enters site -> this page renders (public route)
2. User clicks "Нэвтрэх" -> /login
3. After successful login -> redirect to dashboard (/dashboard)
*/
