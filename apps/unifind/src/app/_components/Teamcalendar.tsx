'use client';

import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { getToken, isSupported } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import { messaging } from '../../lib/firebaseClient';

type TeamCalendarProps = {
  userId: number;
};

export default function TeamCalendar({ userId }: TeamCalendarProps) {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [loading, setLoading] = useState(true);

  const registerPushTokenOnServer = async (token: string) => {
    try {
      await fetch('/api/push-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, token }),
      });
      console.log('Push token saved to server:', token);
    } catch (err) {
      console.error('Failed to save push token:', err);
    }
  };

  useEffect(() => {
    if (!userId) return;

    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/user-university-selection?user_id=${userId}`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error('Fetch events error:', err);
      } finally {
        setLoading(false);
      }
    };

    const registerPush = async () => {
      try {
        if (!(await isSupported())) return;

        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;

        if (!messaging) return;
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
          serviceWorkerRegistration: registration,
        });
        if (token) await registerPushTokenOnServer(token);
      } catch (err) {
        console.error('Push token registration failed:', err);
      }
    };

    fetchEvents();
    registerPush();

    const interval = setInterval(fetchEvents, 30_000);
    return () => clearInterval(interval);
  }, [userId]);

  if (loading) return <p>Loading calendar...</p>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate="2026-01-01"
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
