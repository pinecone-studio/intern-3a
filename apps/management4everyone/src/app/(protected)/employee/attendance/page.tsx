'use client';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import React from 'react';

// --- TYPES ---
interface Attendance {
  id: number;
  date: string;
  clockIn: string;
  clockOut?: string | null;
}
interface MyAttendanceData {
  myAttendances: Attendance[];
}

// --- GRAPHQL ---
const GET_MY_ATTENDANCE = gql`
  query GetMyAttendances {
    myAttendances {
      id
      date
      clockIn
      clockOut
    }
  }
`;
const CLOCK_IN = gql`
  mutation ClockIn {
    clockIn {
      id
      clockIn
    }
  }
`;
const CLOCK_OUT = gql`
  mutation ClockOut {
    clockOut {
      id
      clockOut
    }
  }
`;

export default function WorkerAttendancePage() {
  const { data, loading, refetch } = useQuery<MyAttendanceData>(GET_MY_ATTENDANCE);
  const [doClockIn, { loading: inLoading }] = useMutation(CLOCK_IN, { onCompleted: () => refetch() });
  const [doClockOut, { loading: outLoading }] = useMutation(CLOCK_OUT, { onCompleted: () => refetch() });

  const handleAction = async (type: 'in' | 'out') => {
    try {
      if (type === 'in') await doClockIn();
      else await doClockOut();
      alert('Амжилттай бүртгэгдлээ');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const formatTime = (iso: string | null | undefined) => {
    if (!iso) return '-';

    // Хэрэв iso нь зөвхөн тооноос бүрдсэн текст бол (жишээ нь "1768..."),
    // түүнийг тоо (Number) болгож хөрвүүлнэ. Үгүй бол шууд Date руу хийнэ.
    const dateObj = isNaN(Number(iso)) ? new Date(iso) : new Date(Number(iso));

    return dateObj.toString() === 'Invalid Date' ? '-' : dateObj.toLocaleTimeString('mn-MN', { hour: '2-digit', minute: '2-digit' });
  };

  console.log('data', data);
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 text-black">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center space-y-6">
        <h2 className="text-3xl font-black text-gray-800 tracking-tight">Өдрийн бүртгэл</h2>
        <p className="text-gray-400 font-medium">Өнөөдөр: {new Date().toLocaleDateString('mn-MN')}</p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
          <button
            onClick={() => handleAction('in')}
            disabled={inLoading || loading}
            className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100 disabled:bg-gray-200"
          >
            📥 ИРСЭН
          </button>
          <button
            onClick={() => handleAction('out')}
            disabled={outLoading || loading}
            className="flex-1 py-5 bg-slate-800 text-white rounded-2xl font-bold text-xl hover:bg-slate-900 active:scale-95 transition-all shadow-lg shadow-slate-200 disabled:bg-gray-200"
          >
            📤 ТАРСАН
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b bg-gray-50/50 flex justify-between items-center">
          <h3 className="font-bold text-gray-700">Миний сүүлийн ирцүүд</h3>
        </div>
        <table className="w-full text-left">
          <thead className="text-gray-400 text-[11px] uppercase tracking-widest font-bold">
            <tr>
              <th className="p-5 border-b">Огноо</th>
              <th className="p-5 border-b">Ирсэн</th>
              <th className="p-5 border-b">Тарсан</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data?.myAttendances.map((at) => (
              <tr key={at.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="p-5 font-medium">
                  {(() => {
                    const d = isNaN(Number(at.date)) ? new Date(at.date) : new Date(Number(at.date));
                    return d.toLocaleDateString('mn-MN');
                  })()}
                </td>
                <td className="p-5 font-bold text-blue-600">{formatTime(at.clockIn)}</td>
                <td className="p-5 font-bold text-gray-500">{formatTime(at.clockOut)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
