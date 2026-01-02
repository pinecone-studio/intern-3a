"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function TeamCalendar() {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="auto"
        events={[
          {
            title: "Элсэлтийн материал илгээх",
            date: "2026-01-15",
          },
          {
            title: "Ангидаа дэмо",
            date: "2026-01-02",
          },
          {
            title: "Муис Элсэлт",
            date: "2026-01-04",
          },
          {
            title: "Муис Элсэлт дуусах",
            date: "2026-01-10",
          },
          {
            title: "Элсэлтийн материал илгээх",
            date: "2026-01-15",
          },
          {
            title: "IELTS шалгалт",
            start: "2026-01-10T10:00:00",
            end: "2026-01-10T12:00:00",
          },
        ]}
      />
    </div>
  );
}
