import { SignOutButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import { Clock, LogOut, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function WaitingApprovalPage() {
  const { sessionClaims } = await auth();
  const user = await currentUser();

  // Хэрэв хэрэглэгч аль хэдийн зөвшөөрөгдсөн бол dashboard руу шилжүүлнэ
  if (sessionClaims?.metadata?.approved) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-amber-100 p-3">
            <Clock className="h-12 w-12 text-amber-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Зөвшөөрөл хүлээгдэж байна</h1>
          <p className="text-gray-500">
            Сайн байна уу, <span className="font-semibold text-gray-700">{user?.firstName}</span>! Таны бүртгэлийг админ эсвэл хүний нөөцийн ажилтан шалгаж байна.
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700 flex items-start gap-3 text-left">
          <ShieldAlert className="h-5 w-5 shrink-0" />
          <p>Аюулгүй байдлын үүднээс байгууллагын дотоод системд нэвтрэх эрхийг зөвхөн баталгаажсан ажилтнуудад олгодог болохыг анхаарна уу.</p>
        </div>

        <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
          <p className="text-xs text-gray-400">Хэрэв та өөр хаягаар нэвтрэх бол доорх товчийг ашиглана уу</p>

          <Link href={'/'}>
            <SignOutButton>
              <button className="flex items-center justify-center gap-2 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800">
                <LogOut className="h-4 w-4" />
                Системээс гарах
              </button>
            </SignOutButton>
          </Link>
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-400">© {new Date().getFullYear()} Таны Байгууллагын Нэр. Бүх эрх хуулиар хамгаалагдсан.</p>
    </div>
  );
}
