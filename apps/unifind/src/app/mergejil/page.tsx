'use client';
import { ArrowRight, Bookmark, Calendar, Download, ExternalLink, Share2, User } from 'lucide-react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { Avatar } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
type Subject = {
  id: number;
  name: string;
};

type MajorRequirement = {
  id: number;
  subjects: Subject[];
};

type University = {
  id: number;
  name: string;
  location?: string;
};

type Major = {
  id: number;
  name: string;
  universities: University;
  major_requirements: MajorRequirement[];
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdmissionPage() {
  const searchParams = useSearchParams();
  const universityId = searchParams?.get('university_id');
  const query = universityId ? `?university_id=${universityId}` : '';

  const { data, error, isLoading } = useSWR<Major[]>(`/api/majors${query}`, fetcher);

  if (isLoading) return <p>Уншиж байна...</p>;
  if (error) return <p>Өгөгдөл авахад алдаа гарлаа</p>;
  if (!data) return <p>Мэргэжил олдсонгүй</p>;

  function getDaysLeft(targetDate: string) {
    const today = new Date();
    const target = new Date(targetDate);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }
  const daysLeft = getDaysLeft('2026-8-15');

  return (
    <div className="min-h-screen bg-gray-50">
      {data && <div>{data[0].name}</div>}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="text-cyan-600 hover:text-cyan-700">
            Нүүр
          </Link>
          <span>›</span>
          <Link href="/universities" className="text-cyan-600 hover:text-cyan-700">
            Технологийн их сургууль
          </Link>
          <span>›</span>
          <span className="text-gray-900">Компьютерийн шинжлэх ухаан</span>
        </div>

        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-cyan-100 text-cyan-700 hover:bg-cyan-100">#КШУ-2024</Badge>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Элсэлт нээлттэй</Badge>
              </div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900">Компьютерийн шинжлэх ухаан ба инженерчлэл</h1>
              <p className="text-lg text-blue-600 leading-relaxed max-w-3xl">
                Програм хангамж боловсруулах, дэвшилтэт алгоритм, хиймэл оюун ухаан болон системийн архитектур дээр төвлөрсөн иж бүрэн хөтөлбөр. Онолын үндэс ба практик хэрэглээний хослолоор дээд
                зэргийн технологийн карьерт оюутнуудыг бэлтгэхэд зориулагдсан.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-gray-600">
                <Bookmark className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-white">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm text-gray-600">Босго оноо (2025)</span>
              <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 px-4 py-2 text-sm">
                <span className="mr-2">∑</span>
                Математик A
              </Badge>
              <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-50 px-4 py-2 text-sm">
                <span className="mr-2">⚛</span>
                Физик
              </Badge>

              {/* <span className="text-xl text-gray-500">/ 30</span> */}
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <span className="text-4xl font-bold text-gray-900">500</span>
              <span>↗</span>
              <span>2022-оос +0.5</span>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm text-gray-600">Сургалтын төлбөр нэг крэдитийн үнэ</span>
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">₮ 103,500</div>
            <div className="text-sm text-gray-500">Нэг хичээлийн жилд жил бүр өөрчлөгддөг</div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm text-gray-600">Хугацаа</span>
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-gray-900">4</span>
              <span className="text-xl text-gray-500">Жил</span>
            </div>
            <div className="text-sm text-gray-500">Шинжлэх ухааны бакалавр</div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm text-gray-600">Хугацаа дуусах</span>
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">8-р сарын 15</div>

            <div className="text-sm text-orange-600 font-medium">{daysLeft > 0 ? `${daysLeft} хоног үлдсэн` : 'Хугацаа дууссан'}</div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2 columns width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Entrance Exam Requirements */}
            <Card className="p-6 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Элсэлтийн шалгалтын шаардлага</h2>
              </div>

              <p className="text-blue-600 mb-6 leading-relaxed">Өргөдөл гаргагчид дараах хичээлүүдийн оноо ирүүлэх ёстой. Эдгээр хичээлүүдийн жигнэсэн дунджийг элсэлтийн оноо тооцоход ашигладаг.</p>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 px-4 py-2 text-sm">
                  <span className="mr-2">∑</span>
                  Математик A
                </Badge>
                <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-50 px-4 py-2 text-sm">
                  <span className="mr-2">⚛</span>
                  Физик
                </Badge>
                <Badge className="bg-green-50 text-green-700 hover:bg-green-50 px-4 py-2 text-sm">
                  <span className="mr-2">⚗</span>
                  Хими
                </Badge>
              </div>

              <div className="mb-6">
                <Badge className="bg-orange-50 text-orange-700 hover:bg-orange-50 px-4 py-2 text-sm">
                  <span className="mr-2">🌐</span>
                  Англи хэлний түвшин
                </Badge>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Нэмэлт шаардлага</h3>
                <ul className="space-y-2 text-blue-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Ахлах сургуулийн голч дүн хамгийн багадаа 3.0</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Шинжлэх ухааны багшийн зөвлөмжийн захидал</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* Resources */}
            <Card className="p-6 bg-white">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Материалууд</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Хөтөлбөрийн агуулга</div>
                      <div className="text-sm text-gray-500">PDF • 2.4 MB</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-600">
                    <Download className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Тэтгэлгийн заавар</div>
                      <div className="text-sm text-gray-500">Гадаад холбоос</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-600">
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Ready to Apply Card */}
            <Card className="p-6 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Өргөдөл гаргахад бэлэн үү?</h3>
              <p className="text-sm text-gray-600 mb-6">Эхлэхээс өмнө шаардлагатай бүх баримт бичгийг бэлтгэсэн эсэхийг шалгаарай.</p>

              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white mb-3 h-12 text-base font-medium">
                Өргөдөл эхлүүлэх
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button variant="outline" className="w-full h-12 bg-transparent">
                <Calendar className="mr-2 w-5 h-5" />
                Хуанлид нэмэх
              </Button>
            </Card>

            {/* Questions Card */}
            <Card className="p-4 bg-white">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <Avatar className="w-10 h-10 border-2 border-white">
                    <User></User>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Асуулт байна уу?</div>
                  <Link href="/chat" className="text-sm text-cyan-500 hover:text-cyan-600">
                    Элсэлттэй чатлах
                  </Link>
                </div>
              </div>
            </Card>

            {/* Campus Image Card */}
          </div>
        </div>
      </main>
    </div>
  );
}
