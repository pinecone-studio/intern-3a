'use client';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';

export default function TeamCalendar({ userId }: { userId: number }) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`/api/datesave?user_id=${userId}`);
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [userId]);

  if (loading) return <p>Loading calendar...</p>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate="2026-01-01" // January 2026
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        dayCellClassNames={(arg) => {
          const today = new Date();
          const isToday = arg.date.getFullYear() === today.getFullYear() && arg.date.getMonth() === today.getMonth() && arg.date.getDate() === today.getDate();
          return isToday ? 'fc-today-bold' : '';
        }}
        eventContent={(arg) => <div className="rounded px-2 py-1 text-sm bg-sky-500 text-white dark:bg-sky-600">{arg.event.title}</div>}
      />
    </div>
  );
}
