// import { Card, CardContent } from '@pinecone-intern/ui';
import { Mail, Phone, X } from 'lucide-react';
import { useState } from 'react';

export default function SportClubCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-lg mx-auto relative">
      {/* <Card className="group overflow-hidden rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
        <div className="relative">
          <img src="wrestling-photo.jpeg" alt="Sport" className="w-full h-56 object-cover" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden />

          <div className="absolute left-4 bottom-4 text-white">
            <h2 className="text-2xl font-bold drop-shadow">Чөлөөт бөхийн дугуйлан</h2>
            <p className="text-sm text-white/90">Хүүхэд, өсвөр үеийнхэнд зориулсан мэргэжлийн сургалт</p>
          </div>

          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium">Чөлөөт бөх</span>
          </div>

          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-blue-900 text-sm font-semibold">150,000₮/сар</span>
          </div>
        </div>

        <CardContent className="space-y-4 bg-white">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-500">Ангилал</p>
              <h3 className="text-lg font-semibold">Elementary · Middle · High</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold">Хичээлийн хуваарь</h4>
              <p>Даваа – Баасан · 17:00 – 19:00</p>
            </div>

            <div>
              <h4 className="font-semibold">Хаяг</h4>
              <p>Улаанбаатар, Баянгол дүүрэг</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Багш</h4>

            <button
              onClick={() => setOpen(true)}
              className="w-full flex items-center gap-3 text-left rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-expanded={open}
              type="button"
            >
              <img src="Coach.jpg" alt="Coach Батсөх" className="w-14 h-14 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium">Батсөх</p>
                <p className="text-sm text-gray-600">Чөлөөт бөхийн дасгалжуулагч</p>
              </div>
              <span className="text-sm text-gray-400">View</span>
            </button>
          </div>
        </CardContent>
      </Card> */}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden />

          <div className="relative bg-white rounded-2xl p-6 w-11/12 max-w-sm mx-auto shadow-2xl" role="dialog" aria-modal="true">
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" aria-label="Close details">
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center gap-3">
              <img src="Coach.jpg" alt="Coach Батсөх" className="w-24 h-24 rounded-full object-cover" />
              <h3 className="text-lg font-bold">Батсөх</h3>
              <p className="text-sm text-gray-600">Чөлөөт бөхийн дасгалжуулагч · 10 жилийн туршлага</p>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>Мэргэжил: Чөлөөт бөхийн дасгалжуулагч</li>
              <li>Туршлага: 10 жил</li>
              <li>Амжилт: Улсын аваргын 3 алт</li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" aria-hidden /> <span>9911-2233</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" aria-hidden /> <span>coach@example.com</span>
              </li>
            </ul>

            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-md border text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
