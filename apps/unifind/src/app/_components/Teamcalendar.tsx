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

  /* ---------------- PUSH TOKEN API ---------------- */

  const savePushToken = async (token: string) => {
    await fetch('/api/push-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, token }),
    });

    console.log('Push token saved:', token);
  };

  /* ---------------- FETCH EVENTS ---------------- */

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

  /* ---------------- REGISTER PUSH ---------------- */

  const registerPush = async () => {
    if (!(await isSupported())) return;

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    if (!messaging) return;

    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
    console.log('FCM Token:', token);
    if (!token) return;

    const savedToken = localStorage.getItem('fcm_token');

    // 🔑 token өөрчлөгдсөн үед л server update
    if (savedToken !== token) {
      await savePushToken(token);
      localStorage.setItem('fcm_token', token);
    }
  };

  /* ---------------- EFFECT ---------------- */

  useEffect(() => {
    if (!userId) return;

    fetchEvents();
    registerPush();

    // 🔁 30 сек тутам event refresh
    const interval = setInterval(fetchEvents, 30_000);
    return () => clearInterval(interval);
  }, [userId]);

  if (loading) return <p>Loading calendar...</p>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        eventContent={(arg) => <div className="rounded px-2 py-1 text-sm bg-sky-500 text-white">{arg.event.title}</div>}
      />
    </div>
  );
}
