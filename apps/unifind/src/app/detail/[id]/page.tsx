'use client';

import { Calendar, CheckCircle2, ChevronRight, Clock, ExternalLink, Globe, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { toast } from 'sonner';

import { Major, MONGOL_MONTHS, NumDates } from 'apps/unifind/src/lib/types/type';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Props {
  params: Promise<{ id: string }>;
}

type Scholarship = {
  title: string;
  link: string;
  image?: string;
};

export default function UniversityDetailPage2({ params }: Props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<NumDates | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'scholarships' | 'majors'>('overview');
  const [data2, setData2] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/tetgeleg')
      .then((res) => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.json();
      })
      .then((json) => {
        setData2(json);
        setLoading(false);
        console.log(json);
      })
      .catch(() => {
        setError('Мэдээлэл ачаалж чадсангүй');
        setLoading(false);
      });
  }, []);

  // ✅ Resolve params FIRST
  const resolvedParams = React.use(params);
  const uniId = Number(resolvedParams.id);

  // ✅ Now it's safe to use uniId
  useEffect(() => {
    if (!uniId) return;

    const fetchScrapeData = async () => {
      try {
        const res = await fetch(`/api/scrape/${uniId}`);
        if (!res.ok) throw new Error('Fetch failed');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError('Элсэлтийн огноог авахад алдаа гарлаа');
      } finally {
        setLoading(false);
      }
    };

    fetchScrapeData();
  }, [uniId]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const month = MONGOL_MONTHS[d.getMonth()];
    const day = d.getDate();
    return `${month} ${day}`;
  };
  const daysLeft = (endDateStr: string) => {
    const today = new Date();
    const endDate = new Date(endDateStr);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const { data: majors, error: majorsError, isLoading: majorsLoading } = useSWR<Major[]>(`/api/majors?university_id=${uniId}`, fetcher);
  const { isSignedIn, user } = useUser();
  console.log({ majors });

  const handleRegisterClick = async () => {
    if (!isSignedIn || !user) {
      toast.warning('Нэвтэрч орно уу', {
        description: 'Өргөдөл гаргахын тулд эхлээд нэвтрэх шаардлагатай.',
      });
      return;
    }

    try {
      // 1️⃣ Clerk user → MRUser id авах
      const mrRes = await fetch('/api/mruser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.emailAddresses[0].emailAddress,
          name: `${user.firstName} ${user.lastName}`,
        }),
      });

      const mrData = await mrRes.json();
      if (!mrRes.ok) {
        toast.error('MRUser үүсгэхэд алдаа гарлаа: ' + (mrData.error || mrData.message));
        return;
      }

      const userId = mrData.id; // жинхэнэ MRUser id
      const universityId = uniId;
      const startDateStr = data?.start_date ?? '2025-12-01';
      const endDateStr = data?.end_date ?? '2025-12-15';

      // 2️⃣ Өргөдөл хадгалах API
      const res = await fetch('/api/datesave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          university_id: universityId,
          start_date: startDateStr,
          end_date: endDateStr,
        }),
      });

      const result = await res.json();

      // ✅ Хадгалагдсан эсэхийг шууд message-аар шалгах
      if (result.message) {
        toast.info(result.message); // аль хэдийн хадгалагдсан бол info
        return;
      }

      if (!res.ok || result.error) {
        toast.error('Өргөдөл гаргах явцад алдаа гарлаа: ' + (result.error || 'Server error'));
        return;
      }

      toast.success('Амжилттай бүртгэгдлээ!');
      setOpen(false); // modal хаах
    } catch (error: any) {
      console.error(error);
      toast.error('Серверийн алдаа гарлаа: ' + (error.message || error));
    }
  };

  console.log(user?.primaryEmailAddress?.id);

  if (majorsLoading || !majors || data === null) {
    return (
      <div className="min-h-screen bg-white mt-10 dark:bg-black animate-pulse">
        {/* HERO */}
        <div className="h-72 w-full bg-gray-200 dark:bg-gray-800" />

        {/* TABS */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-8 py-4">
              <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 w-44 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title */}
              <div className="h-7 w-64 bg-gray-300 dark:bg-gray-700 rounded" />

              {/* Paragraphs */}
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-4 w-11/12 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-4 w-10/12 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
                  </div>
                ))}
              </div>

              {/* MAJOR CARDS */}
              <div className="space-y-6 mt-12">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between">
                      <div className="space-y-3 w-full">
                        <div className="h-5 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
                        <div className="flex gap-2">
                          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
                          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded" />
                        </div>
                      </div>
                      <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4">
                  <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="h-4 w-10/12 bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="h-4 w-8/12 bg-gray-200 dark:bg-gray-800 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (majorsError) return <p>Өгөгдөл авахад алдаа гарлаа</p>;
  if (!majors) return <p>Их сургуулийн мэдээлэл олдсонгүй</p>;
  const university = majors[0]?.universities;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="bg-white dark:bg-black dark:border-gray-800 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <a href="/" className="text-sky-600 dark:text-sky-600  font-medium  hover:text-gray-900">
              Нүүр хуудас
            </a>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium dark:text-white">{university?.name ? university.name : 'Монгол улсын их сургууль'}</span>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <div
        className="
    relative
    bg-[url('/university-logo-arts.jpg')]
    bg-cover
    bg-center
  "
      >
        {/* Overlay */}
        <div className="px-6 py-16 bg-linear-to-br from-slate-600/90 to-slate-900/90 dark:from-gray-900/90 dark:to-gray-800/90">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-gray-700">
                <img src="/university-logo-arts.jpg" className="h-full w-full object-contain" />
              </div>

              <Badge variant="secondary" className="bg-gray-600/50 text-white border-gray-500 dark:bg-gray-700/50 dark:text-gray-100 dark:border-gray-600">
                {university?.name ?? 'Монгол улсын их сургууль'}
              </Badge>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-5xl font-bold text-white mb-3 dark:text-gray-100">{university?.name ?? 'Монгол улсын их сургууль'}</h1>
                <div className="flex items-center gap-2 text-white/90 dark:text-gray-300">
                  <MapPin className="h-4 w-4" />
                  <span>{university?.city ?? 'Улаанбаатар'}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Link href={`${university?.website ? university.website : 'https://elselt.num.edu.mn/'}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 dark:bg-gray-700/20 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700/40">
                    <Globe className="h-4 w-4 mr-2" />
                    Вэбсайт үзэх
                  </Button>
                </Link>

                <Button onClick={handleRegisterClick} className="bg-sky-500 hover:bg-sky-600 text-white dark:bg-sky-600 dark:hover:bg-sky-700">
                  Бүртгүүлэх
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 dark:text-gray-100">
                    <DialogHeader>
                      <DialogTitle>Бүртгэлийн хураамж төлөх</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col items-center text-center gap-4">
                      {/* QR Image */}
                      <div className="w-48 h-48 rounded-lg border bg-white p-2 dark:bg-gray-800 dark:border-gray-700">
                        <Image src="/qr-mock.png" alt="Payment QR" width={192} height={192} className="rounded-md" />
                      </div>

                      {/* Amount */}
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Төлөх дүн</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">37,500 ₮</p>
                      </div>

                      <p className="text-xs text-gray-500 dark:text-gray-400">Энэхүү хураамжийг төлснөөр та их сургуулийн өргөдөл гаргах эрхтэй болно. Төлбөрийг буцаан олгохгүй.</p>

                      <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white dark:bg-cyan-600 dark:hover:bg-cyan-700" onClick={() => setOpen(false)}>
                        Төлбөр баталгаажуулах
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b bg-white dark:bg-black dark:border-gray-800 sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex gap-8 text-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 font-medium transition ${
                activeTab === 'overview' ? 'border-b-2 border-sky-500 text-sky-500' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Тойм
            </button>

            <button
              onClick={() => setActiveTab('majors')}
              className={`py-4 font-medium transition ${
                activeTab === 'majors' ? 'border-b-2 border-sky-500 text-sky-500' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Мэргэжлүүд & Хөтөлбөрүүд
            </button>

            <button
              onClick={() => setActiveTab('scholarships')}
              className={`py-4 font-medium transition ${
                activeTab === 'scholarships' ? 'border-b-2 border-sky-500 text-sky-500' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Тэтгэлгийн мэдээлэл
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Majors Section */}
            {/* TAB CONTENT */}
            {activeTab === 'overview' && (
              <section>
                {/* About Section */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Их сургуулийн тухай</h2>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-[24px]">{university?.name ? university.name : 'Монгол улсын их сургууль'}</div>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {university?.description
                      ? university.description
                      : 'Эрдмийн эрх чөлөөг баталгаажуулж, эдийн засаг, нийгмийн хөгжил, шинжлэх ухаан, технологи, инновацын тэргүүлэх чиглэлийг хөгжүүлнэ.'}
                  </div>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 font-bold leading-relaxed">{university?.city ? university.city : 'Улаанбаатар'}</div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Босго оноо</div>
                      <div className="text-3xl font-bold">550-650</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Дундаж голч</div>
                      <div className="text-3xl font-bold">3.2</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Бакалавр оюутнууд</div>
                      <div className="text-3xl font-bold">7,645</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Дундаж крэдитийн үнэ</div>
                      <div className="text-3xl font-bold">₮ 106,169</div>
                      <div className="text-xs text-gray-400 pt-4 uppercase tracking-wide mb-1">Жил бүр өөрчлөгддөг</div>
                    </div>
                  </div>
                </section>
              </section>
            )}

            {activeTab === 'majors' && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Мэргэжлүүд & Элсэлтийн оноо</h2>

                <div className="space-y-6">
                  {majors.map((major) => (
                    <Link key={major.id} href={`/mergejil/${major.id}`}>
                      <Card className="p-6 hover:shadow-lg transition cursor-pointer">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold">{major.name}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {major.major_requirements.map((req) => (
                                <Badge key={req.id}>
                                  {req.subjects.name} – {req.min_score}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xs text-gray-500">Хамгийн бага оноо</div>
                            <div className="text-xl font-bold">{Math.min(...major.major_requirements.map((r) => r.min_score))}</div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'scholarships' && (
              <section>
                <h2 className="text-2xl font-bold mb-6">🎓 Тэтгэлгийн мэдээлэл</h2>

                <ul className="grid gap-6 md:grid-cols-2">
                  {data2.map((item, i) => (
                    <li key={i} className="border rounded-xl overflow-hidden bg-white dark:bg-gray-900 hover:shadow-md transition">
                      {item.image && <img src={item.image} alt={item.title} className="w-full h-44 object-cover" />}

                      <div className="p-4">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="font-medium text-sky-600 hover:underline">
                          {item.title}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>

                {data2.length === 0 && <p className="text-center text-gray-500 mt-10">Одоогоор тэтгэлгийн мэдээлэл алга байна.</p>}
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 ">
            {/* Admission Timeline */}
            <Card className="p-6 dark:bg-gray-900">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-sky-500" />
                <h3 className="font-semibold">Элсэлтийн хуваарь</h3>
              </div>
              <div className="space-y-4">
                {/* Бүртгэл эхлэх */}
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{data ? formatDate(data.start_date) : '-'}</p>
                    <p className="text-sm text-gray-600">Бүртгэл эхлэх</p>
                  </div>
                </div>

                {/* Бүртгэл дуусах */}
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                    <div className="h-2 w-2 rounded-full bg-orange-600"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{data ? formatDate(data.end_date) : '-'}</p>
                    <p className="text-sm text-gray-600">Бүртгэл дуусах</p>
                    {data && (
                      <Badge variant="destructive" className="mt-1 text-xs">
                        {daysLeft(data.end_date)} хоногт хаагдах
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Button onClick={handleRegisterClick} variant="link" className="w-full mt-4 cursor-pointer text-sky-500 p-0">
                Миний xуанлид нэмэх
              </Button>
            </Card>

            {/* Requirements */}
            <Card className="p-6 dark:bg-gray-900">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-sky-500" />
                <h3 className="font-semibold">Шаардлага</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0" />
                  <span className="text-sm">Нийтлэг өргөдөл</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0" />
                  <span className="text-sm">₮37500 өргөдлийн хураамж</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0" />
                  <span className="text-sm">Боловсролын гэрчилгээ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0" />
                  <span className="text-sm">
                    САТ эсвэл IELTS оноо <span className="text-sky-500"> байхгүй байсанч болно</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0" />
                  <span className="text-sm">Багшийн үнэлгээ</span>
                </div>
              </div>
              <Button variant="link" className="w-full mt-4 text-sky-500 p-0 justify-start">
                Бүрэн жагсаалт үзэх
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </Card>

            {/* Admissions Office */}
            <Card className="p-6 dark:bg-gray-900">
              <h3 className="font-semibold mb-4">ЭЛСЭЛТИЙН АЛБА</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-sky-500 mt-0.5 shrink-0" />
                  <a href="tel:6507232091" className="text-sm text-gray-700 hover:text-sky-500  dark:text-gray-400 dark:hover:text-sky-500">
                    (976) 7023-2091
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-sky-500 mt-0.5 shrink-0" />
                  <a href="mailto:admission@stanford.edu" className="text-sm text-gray-700 hover:text-sky-500  dark:text-gray-400 dark:hover:text-sky-500">
                    admission@num.edu
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-sky-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-400 dark:hover:text-sky-500">Даваа-Баасан, 8:00 - 17:00</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}
