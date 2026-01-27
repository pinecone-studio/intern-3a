'use client';

import { useState } from 'react';

export default function AttendancePage() {
  const [records] = useState([
    { id: 1, name: 'Bat-Erdene', status: 'Present' },
    { id: 2, name: 'Anu', status: 'Absent' },
  ]);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Ажилтны ирц</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Нэр</th>
              <th className="p-3 text-left">Төлөв</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.name}</td>
                <td className="p-3">
                  <span className={'px-3 py-1 rounded-full text-sm ${r.status==="Present" ?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}'}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
