import { Globe, GraduationCap, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-border pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-6 w-6 " />
              <span className="font-bold text-xl text-foreground">UniFind</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 text-pretty">Дээд боловсролыг хүн бүрт хүртээмжтэй болгоно. Өөрийн ирээдүйг өнөөдрөөс эхлүүлээрэй.</p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-slate-100 dark:bg-neutral-800 flex items-center justify-center text-muted-foreground hove hover:text-white transition-colors">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-100 dark:bg-neutral-800   flex items-center justify-center text-muted-foreground hove hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-100 dark:bg-neutral-800 flex items-center justify-center text-muted-foreground hove hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Платформ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm  hover:text-[#00ACC1]">
                  Их сургуулиуд
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm  hover:text-[#00ACC1]">
                  Мэргэжил & Карьер
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm  hover:text-[#00ACC1]">
                  Элсэлтийн хугацаа
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm  hover:text-[#00ACC1]">
                  Үнийн мэдээлэл
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Нөөц</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm  hover:text-[#00ACC1]">
                  Оюутны блог
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm  hover:text-[#00ACC1]">
                  Тусламжийн төв
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm  hover:text-[#00ACC1]">
                  Зөвлөхийн портал
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm  hover:text-[#00ACC1]">
                  API баримт бичиг
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Хууль эрх зүй</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm  hover:text-[#00ACC1]">
                  Нууцлалын бодлого
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm  hover:text-[#00ACC1]">
                  Үйлчилгээний нөхцөл
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">© 2025 UniFind. Бүх эрх хуулиар хамгаалагдаагүй ккк.</p>
        </div>
      </div>
    </footer>
  );
}
