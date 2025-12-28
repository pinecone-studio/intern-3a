import { Button, Card, CardContent } from '@intern-3a/shadcn';
import React from 'react';

const AdminMyClubsComponent = () => {
  return (
    <div>
      <Card className="group overflow-hidden rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
        <div className="relative">
          <img src="wrestling-photo.jpeg" alt="Edication" className="w-full h-56 object-cover" />

          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" aria-hidden />

          <div className="absolute left-4 bottom-4 text-white">
            <h2 className="text-2xl font-bold drop-shadow">Robotics Club</h2>
            <p className="text-sm text-white/90">Hands-on robotics club focusing on basic programming and mechanics.</p>
          </div>

          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium">ЧEDUCATION</span>
          </div>

          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-blue-900 text-sm font-semibold">150,000₮/month</span>
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
              <h4 className="font-semibold">Timetable</h4>
              <p>MON – FRI · 17:00 – 19:00</p>
            </div>

            <div>
              <h4 className="font-semibold">Address</h4>
              <p>Sukhbaatar District, Ulaanbaatar</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Teacher</h4>

            <Button
              // onClick={() => setOpen(true)}
              className="w-full flex items-center gap-3 text-left rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              // aria-expanded={open}
              variant={'ghost'}
            >
              <img src="Coach.jpg" alt="Coach Батсөх" className="w-14 h-14 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium">Bat-Erdene T.</p>
                <p className="text-sm text-gray-600">National Robotics Champion</p>
              </div>
              <span className="text-sm text-gray-400">View</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMyClubsComponent;
