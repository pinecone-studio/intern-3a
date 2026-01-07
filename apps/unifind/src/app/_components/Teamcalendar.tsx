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

  // Backend-д push token хадгалах
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

  // Calendar events fetch хийх
  const fetchEvents = async () => {
    try {
      const res = await fetch(`/api/user-university-selection?user_id=${userId}`);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();

    if (typeof window !== 'undefined') {
      (async () => {
        try {
          if (!(await isSupported())) return;

          const permission = await Notification.requestPermission();
          if (permission !== 'granted') {
            console.log('Notification permission denied or blocked');
            return;
          }

          // Service Worker register
          if (!messaging) return; // browser-д дэмжихгүй бол зүгээр гарна
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
            serviceWorkerRegistration: registration,
          });
          console.log('Push token:', token);
          if (token) await registerPushTokenOnServer(token);
          console.log('Push token registered:', token);
        } catch (err) {
          console.error('Push token registration failed:', err);
        }
      })();
    }

    const interval = setInterval(fetchEvents, 30_000); // Live-ish refresh
    return () => clearInterval(interval);
  }, [userId]);

  if (loading) return <p>Loading calendar...</p>;

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        selectable
        select={async (info) => {
          try {
            await fetch('/api/user-university-selection', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                user_id: userId,
                university_id: 0, // тухайн сургууль id-г оруулна
                start_date: info.startStr,
                end_date: info.endStr,
              }),
            });
            fetchEvents();
          } catch (err) {
            console.error(err);
          }
        }}
      />
    </div>
  );
}
