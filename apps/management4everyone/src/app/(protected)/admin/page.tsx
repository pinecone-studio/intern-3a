'use client';

import { CalendarCheck, Clock, Layers, Scissors } from 'lucide-react';
import { useEffect, useState } from 'react';

type Stats = {
  todayOrders: number;
  activeBarbers: number;
  services: number;
  pending: number;
  barbers: number;
};

export default function Page() {
  const [stats, setStats] = useState<Stats>({
    todayOrders: 0,
    activeBarbers: 0,
    services: 0,
    pending: 0,
    barbers: 0,
  });

  useEffect(() => {
    // ===== MOCK DATA =====
    const mockStats: Stats = {
      todayOrders: 24,
      activeBarbers: 5,
      services: 12,
      pending: 7,
      barbers: 9,
    };

    setStats(mockStats);

    // ===== REAL FETCH (түр комментлосон) =====
    /*
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/statistics");
        const {
          todayOrders,
          activeBarbers,
          services,
          incomingOrders,
          barbersCount,
        } = await res.json();

        setStats({
          todayOrders,
          activeBarbers,
          services,
          pending: incomingOrders,
          barbers: barbersCount,
        });
      } catch (error) {
        console.error("Stats fetch error:", error);
      }
    };

    fetchStats();
    */
  }, []);

  const cards = [
    {
      label: 'Өнөөдрийн захиалга',
      value: stats.todayOrders,
      icon: CalendarCheck,
    },
    {
      label: 'Идэвхтэй үсчин',
      value: stats.activeBarbers,
      icon: Scissors,
    },
    {
      label: 'Нийт үйлчилгээний тоо',
      value: stats.services,
      icon: Layers,
    },
    {
      label: 'Хүлээгдэж буй',
      value: stats.pending,
      icon: Clock,
    },
    {
      label: 'Бүртгэлтэй нийт үсчиний тоо',
      value: stats.barbers,
      icon: Scissors,
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold mb-6">Өнөөдрийн товч тойм</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {cards.map((s) => (
          <div key={s.label} className="border rounded-xl p-4 flex items-center gap-4">
            <s.icon className="w-6 h-6" />
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-semibold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
