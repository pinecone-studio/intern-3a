'use client';
import { ArrowRight, Bookmark, Calendar, ChevronRight, ClipboardCheck, Clock, Download, ExternalLink, FileText, GraduationCap, MessageCircle, Share2, Wallet } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useState } from 'react';
import useSWR from 'swr';
import BookmarkButton from '../../_components/BookMarkButton';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Mergejil() {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const majorId = Number(params.id);
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavorite = () => setIsFavorite(!isFavorite);
  const handleShare = () => {
    if (!data) return; // <-- safety check

    if (typeof window !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: data.name,
          text: `Check out this major at ${data.universities?.name}`,
          url: window.location.href,
        })
        .catch((err) => console.log('Share failed:', err));
    } else {
      alert('Share not supported in your browser');
    }
  };

  const handleRegisterClick = () => {
    setOpen(true);
  };

  const { data, error, isLoading } = useSWR(`/api/majors/${majorId}`, fetcher);

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-sky-50/50 animate-pulse">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Title Skeleton */}
          <div className="h-6 w-1/3 bg-sky-200 rounded-full mt-20"></div>
          <div className="h-10 w-3/4 bg-sky-200 rounded-2xl"></div>
          <div className="h-4 w-full max-w-2xl bg-sky-100 rounded-full mt-2"></div>
          <div className="h-4 w-full max-w-3xl bg-sky-100 rounded-full mt-1"></div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-sky-100 rounded-2xl shadow animate-pulse flex flex-col justify-between p-4">
                <div className="h-5 w-1/2 bg-sky-200 rounded-full"></div>
                <div className="h-8 w-3/4 bg-sky-200 rounded-xl mt-2"></div>
                <div className="h-6 w-1/3 bg-sky-200 rounded-full mt-4"></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) return <p className="p-8 text-center text-red-500">Алдаа гарлаа</p>;
  if (!data) return <p className="p-8 text-center text-gray-500">Мэргэжил олдсонгүй</p>;

  function getDaysLeft(targetDate: string) {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  const daysLeft = getDaysLeft('2026-8-15');

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 to-white dark:from-slate-900 dark:to-black">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-sky-500 hover:text-sky-600 font-medium transition-colors">
            Нүүр
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <Link href={`/detail/${data.universities?.id}`} className="text-sky-500 hover:text-sky-600 font-medium transition-colors">
            {data.universities?.name || 'Их сургууль'}
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-gray-900 dark:text-white font-medium">{data.name}</span>
        </nav>

        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-500 text-white">#КШУ-2025</span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500 text-white">Элсэлт нээлттэй</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-balance">{data.name}</h1>
              <p className="text-gray-600 dark:text-neutral-300 leading-relaxed max-w-3xl text-pretty">
                Програм хангамж боловсруулах, дэвшилтэт алгоритм, хиймэл оюун ухаан болон системийн архитектур дээр төвлөрсөн иж бүрэн хөтөлбөр. Онолын үндэс ба практик хэрэглээний хослолоор дээд
                зэргийн технологийн карьерт оюутнуудыг бэлтгэхэд зориулагдсан.
              </p>
            </div>
            <div className="flex items-center gap-1">
              <BookmarkButton majorId={data.id} />

              <Button variant="ghost" size="icon" onClick={handleShare} className="text-gray-400 hover:text-sky-500 hover:bg-sky-50 rounded-xl">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* Score Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm dark:shadow-gray-800 border border-sky-100 dark:border-neutral-800 hover:shadow-md hover:border-sky-200 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 dark:text-neutral-300 font-medium">Босго оноо (2025)</span>
              <div className="w-10 h-10 bg-sky-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-sky-500" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-sky-50 dark:bg-gray-800 text-sky-500 dark:text-sky-400 border border-sky-200 dark:border-neutral-700">
                ∑ Математик A
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-sky-50 dark:bg-gray-800 text-sky-500 dark:text-sky-400 border border-sky-200 dark:border-neutral-700">
                ⚛ Физик
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900 dark:text-neutral-100">500</span>
              <span className="text-sm text-emerald-600 font-medium">↑ +0.5</span>
            </div>
          </div>

          {/* Tuition Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm dark:shadow-gray-800 border border-sky-100 dark:border-neutral-800 hover:shadow-md hover:border-sky-200 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 dark:text-neutral-300 font-medium">Нэг крэдитийн үнэ</span>
              <div className="w-10 h-10 bg-sky-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center">
                <Wallet className="w-5 h-5 text-sky-500" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-2">₮103,500</div>
            <p className="text-sm text-gray-500 dark:text-neutral-400">Жил бүр өөрчлөгддөг</p>
          </div>

          {/* Duration Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm dark:shadow-gray-800 border border-sky-100 dark:border-neutral-800 hover:shadow-md hover:border-sky-200 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 dark:text-neutral-300 font-medium">Хугацаа</span>
              <div className="w-10 h-10 bg-sky-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-sky-500" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-neutral-100">4</span>
              <span className="text-lg text-gray-500 dark:text-neutral-400">Жил</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-neutral-400">Шинжлэх ухааны бакалавр</p>
          </div>

          {/* Registration Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm dark:shadow-gray-800 border border-sky-100 dark:border-neutral-800 hover:shadow-md hover:border-sky-200 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 dark:text-neutral-300 font-medium">Бүртгэлийн хугацаа</span>
              <div className="w-10 h-10 bg-amber-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-300" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-neutral-100 mb-1">7/1 - 8/15</div>
            <div
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                daysLeft > 0 ? 'bg-amber-100 text-amber-700 dark:bg-neutral-700 dark:text-amber-200' : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300'
              }`}
            >
              {daysLeft > 0 ? `${daysLeft} хоног үлдсэн` : 'Хугацаа дууссан'}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Requirements Card */}
            <div className="bg-white dark:bg-gray-900 dark:border-neutral-800 rounded-2xl p-6 shadow-sm border border-sky-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
                  <ClipboardCheck className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Элсэлтийн шаардлага</h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed dark:text-neutral-300">
                Өргөдөл гаргагчид дараах хичээлүүдийн оноог илгээх хэрэгтэй. Эдгээр хичээлүүдийн дунджийг элсэлтийн оноо тооцоход ашигладаг.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-3 dark:text-neutral-300">Шаардлагатай хичээлүүд</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium dark:bg-gray-800 dark:border-neutral-700 bg-sky-50 text-sky-500 border border-sky-200">
                      <span className="text-base">∑</span> Математик A
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium dark:bg-gray-800 dark:border-neutral-700 bg-sky-50 text-sky-500 border border-sky-200">
                      <span className="text-base">⚛</span> Физик
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium dark:bg-gray-800 dark:border-neutral-700 bg-sky-50 text-sky-500 border border-sky-200">
                      <span className="text-base">⚗</span> Хими
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-3  dark:text-neutral-300">Хэлний шаардлага</p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-sky-50 dark:bg-gray-800 dark:border-neutral-700 text-sky-500 border border-sky-200">
                    🌐 Англи хэлний түвшин
                  </span>
                </div>
              </div>

              <div className="border-t border-sky-100 dark:border-sky-600 pt-5">
                <h3 className="font-semibold text-gray-900 mb-3 dark:text-neutral-300">Нэмэлт шаардлага</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 text-gray-600 dark:text-neutral-300">
                    <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2 shrink-0 "></span>
                    Ахлах сургуулийн голч дүн хамгийн багадаа 80
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 dark:text-neutral-300">
                    <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2 shrink-0 dark:text-neutral-300 "></span>
                    Шинжлэх ухааны багшийн зөвлөмжийн захидал
                  </li>
                </ul>
              </div>
            </div>

            {/* Resources Card */}
            <div className="bg-white dark:bg-gray-900 dark:border-neutral-800 rounded-2xl p-6 shadow-sm border border-sky-100">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white  mb-5">Материалууд</h2>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-sky-50 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-xl hover:bg-sky-100 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white dark:bg-neutral-800 dark:border-neutral-700 rounded-xl flex items-center justify-center shadow-sm border border-sky-100">
                      <FileText className="w-6 h-6 text-sky-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white ">Хөтөлбөрийн агуулга</div>
                      <div className="text-sm text-gray-500 dark:text-neutral-300">PDF • 2.4 MB</div>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 group-hover:text-sky-500 transition-colors" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-sky-50 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-xl hover:bg-sky-100 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white dark:bg-neutral-800 dark:border-neutral-700  rounded-xl flex items-center justify-center shadow-sm border border-sky-100">
                      <GraduationCap className="w-6 h-6 text-sky-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white">Тэтгэлгийн заавар</div>
                      <div className="text-sm text-gray-500 dark:text-neutral-300">Гадаад холбоос</div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-sky-500 transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="bg-white dark:bg-gray-900 dark:border-neutral-800 rounded-2xl p-6 shadow-sm border border-sky-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">Өргөдөл гаргахад бэлэн үү?</h3>
              <p className="text-sm text-gray-600 dark:text-white mb-6 leading-relaxed">
                Өргөдөл гаргахын өмнө <span className="font-semibold text-gray-900 dark:text-neutral-300">бүртгэлийн хураамжийг</span> төлсөн байх шаардлагатай.
              </p>

              <Button
                className="w-full bg-sky-500 hover:bg-sky-600 text-white mb-3 h-12 text-base font-semibold rounded-xl shadow-sm shadow-sky-200 dark:shadow-gray-800"
                onClick={handleRegisterClick}
              >
                Бүртгэлийн хураамж төлөх
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button variant="outline" onClick={handleRegisterClick} className="w-full h-12 rounded-xl border-sky-200 text-sky-600 hover:bg-sky-50 hover:border-sky-300 bg-transparent">
                <Calendar className="mr-2 w-5 h-5" />
                Хуанлид нэмэх
              </Button>
            </div>

            {/* Questions Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border dark:bg-gray-900 dark:border-neutral-800 border-sky-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-sky-500" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold dark:text-white text-gray-900">Асуулт байна уу?</div>
                  <p className="text-sm text-gray-500 dark:text-neutral-300">Бидэнтэй холбогдоорой</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center">Бүртгэлийн хураамж төлөх</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center text-center gap-5 pt-2">
              <div className="w-48 h-48 rounded-2xl border-2 border-sky-100 bg-white p-3 shadow-sm">
                <Image src="/qr-code-payment.png" alt="Payment QR" width={192} height={192} className="rounded-xl" />
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Төлөх дүн</p>
                <p className="text-3xl font-bold text-gray-900">37,500 ₮</p>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed px-4">Энэхүү хураамжийг төлснөөр та их сургуулийн өргөдөл гаргах эрхтэй болно. Төлбөрийг буцаан олгохгүй.</p>

              <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white h-12 rounded-xl font-semibold" onClick={() => setOpen(false)}>
                Төлбөр баталгаажуулах
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
