'use client';

import { BookOpen, GraduationCap, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

type Stats = {
  universities: number;
  majors: number;
  applications: number;
  scholarships: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    universities: 0,
    majors: 0,
    applications: 0,
    scholarships: 0,
  });

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Удирдлагын самбар</h1>
        <p className="text-muted-foreground mt-1">Их сургуулийн элсэлтийн системийн ерөнхий тойм</p>
      </div>

      {/* STATS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">Нийт их сургууль</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.universities}</div>
            <p className="text-xs text-muted-foreground mt-1">Бүртгэлтэй сургуулиуд</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">Нийт мэргэжил</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.majors}</div>
            <p className="text-xs text-muted-foreground mt-1">Бүх их сургуулиудын</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">Идэвхтэй өргөдөл</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.applications}</div>
            <p className="text-xs text-muted-foreground mt-1">Одоогоор үргэлжилж буй</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">Тэтгэлгийн дүрэм</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.scholarships}</div>
            <p className="text-xs text-muted-foreground mt-1">Идэвхтэй дүрмүүд</p>
          </CardContent>
        </Card>
      </div>

      {/* ACTIVITY */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Сүүлийн үйлдлүүд</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">🏫 Шинэ их сургууль нэмэгдсэн</p>
            <p className="text-sm">🎓 Мэргэжлийн шаардлага шинэчлэгдсэн</p>
            <p className="text-sm">💰 Тэтгэлгийн дүрэм өөрчлөгдсөн</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Элсэлтийн хугацаа</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>2025 оны хаврын элсэлт</span>
              <span className="text-primary text-sm">Идэвхтэй</span>
            </div>
            <div className="flex justify-between">
              <span>2025 оны намрын элсэлт</span>
              <span className="text-muted-foreground text-sm">Тун удахгүй</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
