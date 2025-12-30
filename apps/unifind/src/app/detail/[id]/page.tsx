import { Calendar, CheckCircle2, ChevronRight, Clock, ExternalLink, Globe, Mail, MapPin, Phone } from 'lucide-react';

import { universities } from 'apps/unifind/src/lib/data/universities';
import Link from 'next/link';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

export default async function UniversityDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  console.log('PARAMS ID', id);

  const uni = universities.find((u) => u.id === Number(id));

  if (!uni) return <div>Их сургуулийн мэдээлэл олдсонгүй</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="g-linear-to-br from-slate-600 to-slate-700 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm">
              <svg viewBox="0 0 24 24" fill="#06b6d4" className="h-8 w-8">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
              </svg>
            </div>
            <Badge variant="secondary" className="bg-gray-600/50 text-white border-gray-500">
              {/* #2 Үндэсний их сургуулиууд */}
              {uni.name}
            </Badge>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-5xl font-bold text-white mb-3">{uni.name}</h1>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="h-4 w-4" />
                <span>{uni.location}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="bg-white/10 border-white/20 text-black hover:bg-white/20">
                <Globe className="h-4 w-4 mr-2" />
                Вэбсайт үзэх
              </Button>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Одоо өргөдөл гаргах
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex gap-8 text-sm">
            <a href="#" className="border-b-2 border-cyan-500 py-4 text-cyan-500 font-medium">
              Тойм
            </a>
            <a href="#" className="py-4 text-gray-600 hover:text-gray-900">
              Элсэлт
            </a>
            <a href="#" className="py-4 text-gray-600 hover:text-gray-900">
              Мэргэжлүүд & Хөтөлбөрүүд
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Их сургуулийн тухай</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {uni.about.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Босго оноо</div>
                  <div className="text-3xl font-bold">450-550</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Дундаж ГПА</div>
                  <div className="text-3xl font-bold">3</div>
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

            {/* Majors Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Мэргэжлүүд & Элсэлтийн оноо</h2>
              </div>

              <div className="space-y-6">
                {uni.majors.map((major, index) => {
                  const competitionText = major.competition >= 75 ? 'Маш өндөр' : major.competition >= 65 ? 'Өндөр' : 'Дунд';

                  const competitionColor = major.competition >= 75 ? 'bg-red-500' : major.competition >= 65 ? 'bg-orange-500' : 'bg-yellow-500';

                  return (
                    <Link
                      key={index}
                      href="/mergejil"

                      // key={index}
                      // href={`/universities/${
                      //   uni.id
                      // }/majors/${encodeURIComponent(major.name)}`}
                    >
                      {major.name}
                      <Card className="p-6 hover:shadow-lg transition cursor-pointer mt-3">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold">{major.name}</h3>
                              <Badge className="bg-green-100 text-green-700 text-xs">Бакалавр</Badge>
                            </div>
                            <p className="text-sm text-gray-600">{major.faculty} факультет</p>
                            <Badge className="bg-blue-50 mt-4 text-blue-700 hover:bg-blue-50 px-4 py-2 text-sm">
                              <span className="mr-2">∑</span>
                              Математик A
                            </Badge>
                            <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-50 px-4 py-2 text-sm">
                              <span className="mr-2">⚛</span>
                              Физик
                            </Badge>
                          </div>

                          <div className="text-right">
                            <div className="text-xs text-gray-500 uppercase mb-1">Хамгийн бага оноо</div>
                            <div className="text-2xl font-bold">{major.minScore}</div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Өрсөлдөөн</span>
                            <span className="text-sm font-semibold">{competitionText}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${competitionColor}`} style={{ width: `${major.competition}%` }} />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Admission Timeline */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-cyan-500" />
                <h3 className="font-semibold">Элсэлтийн хуваарь</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">8 САР 1, 2026</p>
                    <p className="text-sm text-gray-600">Өргөдөл эхэллээ</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                    <div className="h-2 w-2 rounded-full bg-orange-600"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">11 САР 1, 2026</p>
                    <p className="text-sm text-gray-600">Эрт хариулт өгөх хугацаа</p>
                    <Badge variant="destructive" className="mt-1 text-xs">
                      5 хоногт хаагдах
                    </Badge>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                    <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">1 САР 5, 2026</p>
                    <p className="text-sm text-gray-600">Энгийн шийдвэр</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                    <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">4 САР 1, 2026</p>
                    <p className="text-sm text-gray-600">Элсэлтийн шийдвэрүүд</p>
                  </div>
                </div>
              </div>
              <Button variant="link" className="w-full mt-4 text-cyan-500 p-0">
                Миний xуанлид нэмэх
              </Button>
            </Card>

            {/* Requirements */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-cyan-500" />
                <h3 className="font-semibold">Шаардлага</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span className="text-sm">Нийтлэг өргөдөл</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span className="text-sm">$90 өргөдлийн хураамж</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span className="text-sm">Албан ёсны магадлан итгэмжлэл</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span className="text-sm">САТ эсвэл АКТ оноо</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span className="text-sm">2 багшийн үнэлгээ</span>
                </div>
              </div>
              <Button variant="link" className="w-full mt-4 text-cyan-500 p-0 justify-start">
                Бүрэн жагсаалт үзэх
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </Card>

            {/* Admissions Office */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">ЭЛСЭЛТИЙН АЛБА</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" />
                  <a href="tel:6507232091" className="text-sm text-gray-700 hover:text-cyan-500">
                    (650) 723-2091
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" />
                  <a href="mailto:admission@stanford.edu" className="text-sm text-gray-700 hover:text-cyan-500">
                    admission@stanford.edu
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700">Даваа-Баасан, 8:00 - 17:00</span>
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
