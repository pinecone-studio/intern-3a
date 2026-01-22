'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  Button,
  Card,
} from '@intern-3a/shadcn';
import { ArrowLeft, CheckCircle, FileText, XCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

type ReferralDetail = {
  id: string;

  employeeName: string;
  employeePhone: string;
  employeeEmail: string;
  employeeDepartment: string;
  employeeJobLevel: string;
  employeeJobType: string;
  relationshipWithCandidate: string;
  referralReason: string;
  consentReceived: boolean;
  currentlyWorking: boolean;

  candidateName: string;
  candidatePhone: string;
  candidateEmail: string;
  candidateLinkedIn: string;
  candidateCurrentEmployment: string;
  candidateInterestedField: string;
  cvUrl: string;

  submittedDate: string;
  status: 'SUBMITTED' | 'APPROVED' | 'REJECTED';
};

export const mockReferralDetails: ReferralDetail[] = [
  {
    id: '1',
    employeeName: 'Болд Бат',
    employeePhone: '9999-1111',
    employeeEmail: 'bold.bat@company.mn',
    employeeDepartment: 'Технологийн хэлтэс',
    employeeJobLevel: 'Senior',
    employeeJobType: 'Бүтэн цагийн',
    relationshipWithCandidate: 'Их сургуулийн найз',
    referralReason: 'Маш сайн програмист, backend талдаа туршлагатай',
    consentReceived: true,
    currentlyWorking: true,

    candidateName: 'Дорж Цэцэг',
    candidatePhone: '9999-2222',
    candidateEmail: 'dorj.tsetseg@email.com',
    candidateLinkedIn: 'linkedin.com/in/dorj-tsetseg',
    candidateCurrentEmployment: 'ABC Tech – Software Developer',
    candidateInterestedField: 'Backend Development',
    cvUrl: '/cv/dorj-tsetseg.pdf',

    submittedDate: '2026-01-12',
    status: 'SUBMITTED',
  },
  {
    id: '2',
    employeeName: 'Сүх Сарнай',
    employeePhone: '9999-3333',
    employeeEmail: 'sukh.sarnai@company.mn',
    employeeDepartment: 'Технологийн хэлтэс',
    employeeJobLevel: 'Senior',
    employeeJobType: 'Бүтэн цагийн',
    relationshipWithCandidate: 'Хамт ажиллаж байсан',
    referralReason: 'System design сайн, баг удирдах чадвартай',
    consentReceived: true,
    currentlyWorking: true,

    candidateName: 'Ганбат Мөнх',
    candidatePhone: '9999-4444',
    candidateEmail: 'ganbat.munkh@email.com',
    candidateLinkedIn: 'linkedin.com/in/ganbat-munkh',
    candidateCurrentEmployment: 'XYZ LLC – Backend Engineer',
    candidateInterestedField: 'System Architecture',
    cvUrl: '/cv/ganbat-munkh.pdf',

    submittedDate: '2026-01-11',
    status: 'SUBMITTED',
  },
  {
    id: '3',
    employeeName: 'Алтан Өнөө',
    employeePhone: '9999-5555',
    employeeEmail: 'altan.unuu@company.mn',
    employeeDepartment: 'Технологийн хэлтэс',
    employeeJobLevel: 'Lead',
    employeeJobType: 'Бүтэн цагийн',
    relationshipWithCandidate: 'Mentor',
    referralReason: 'Лидер чанартай, техник гүнзгий мэдлэгтэй',
    consentReceived: true,
    currentlyWorking: true,

    candidateName: 'Баяр Төмөр',
    candidatePhone: '9999-6666',
    candidateEmail: 'bayar.tumur@email.com',
    candidateLinkedIn: 'linkedin.com/in/bayar-tumur',
    candidateCurrentEmployment: 'Startup Inc – Tech Lead',
    candidateInterestedField: 'Fullstack',
    cvUrl: '/cv/bayar-tumur.pdf',

    submittedDate: '2026-01-10',
    status: 'SUBMITTED',
  },

  {
    id: '4',
    employeeName: 'Энхтөр Бат',
    employeePhone: '9999-7777',
    employeeEmail: 'enkhtur.bat@company.mn',
    employeeDepartment: 'Бүтээгдэхүүний хэлтэс',
    employeeJobLevel: 'Middle',
    employeeJobType: 'Бүтэн цагийн',
    relationshipWithCandidate: 'Хамт төсөл хийж байсан',
    referralReason: 'Product thinking сайтай, харилцаа сайн',
    consentReceived: true,
    currentlyWorking: true,

    candidateName: 'Саруул Номин',
    candidatePhone: '9999-8888',
    candidateEmail: 'saruul.nomin@email.com',
    candidateLinkedIn: 'linkedin.com/in/saruul-nomin',
    candidateCurrentEmployment: 'Product Co – Associate PM',
    candidateInterestedField: 'Product Management',
    cvUrl: '/cv/saruul-nomin.pdf',

    submittedDate: '2026-01-09',
    status: 'SUBMITTED',
  },

  {
    id: '301',
    employeeName: 'Бат-Эрдэнэ Номин',
    employeePhone: '9999-9001',
    employeeEmail: 'nomiin.bat@company.mn',
    employeeDepartment: 'Дизайны алба',
    employeeJobLevel: 'Senior',
    employeeJobType: 'Бүтэн цагийн',
    relationshipWithCandidate: 'Хамт ажиллаж байсан',
    referralReason: 'UX судалгаа, хэрэглэгчийн урсгал маш сайн',
    consentReceived: true,
    currentlyWorking: true,

    candidateName: 'Энхжин Саруул',
    candidatePhone: '9999-9002',
    candidateEmail: 'enkhjin.saruul@email.com',
    candidateLinkedIn: 'linkedin.com/in/enkhjin-saruul',
    candidateCurrentEmployment: 'Design Studio – UX Designer',
    candidateInterestedField: 'UX Research',
    cvUrl: '/cv/enkhjin-saruul.pdf',

    submittedDate: '2026-01-06',
    status: 'APPROVED',
  },
  {
    id: '302',
    employeeName: 'Халиун Ариун',
    employeePhone: '9999-9003',
    employeeEmail: 'khaliun.ariun@company.mn',
    employeeDepartment: 'Дизайны алба',
    employeeJobLevel: 'Middle',
    employeeJobType: 'Бүтэн цагийн',
    relationshipWithCandidate: 'Найз',
    referralReason: 'UI чадвар сайн боловч UX туршлага дутмаг',
    consentReceived: true,
    currentlyWorking: true,

    candidateName: 'Мөнх-Оргил Туяа',
    candidatePhone: '9999-9004',
    candidateEmail: 'munkhorgil.tuya@email.com',
    candidateLinkedIn: 'linkedin.com/in/munkhorgil-tuya',
    candidateCurrentEmployment: 'Freelancer',
    candidateInterestedField: 'UI Design',
    cvUrl: '/cv/munkhorgil-tuya.pdf',

    submittedDate: '2026-01-05',
    status: 'REJECTED',
  },
  {
    id: '303',
    employeeName: 'Солонго Нарангэрэл',
    employeePhone: '9999-9005',
    employeeEmail: 'solongo.narangerel@company.mn',
    employeeDepartment: 'Дизайны алба',
    employeeJobLevel: 'Senior',
    employeeJobType: 'Бүтэн цагийн',
    relationshipWithCandidate: 'Mentor',
    referralReason: 'Portfolio шаардлага хангаагүй',
    consentReceived: true,
    currentlyWorking: true,

    candidateName: 'Баярмаа Сондор',
    candidatePhone: '9999-9006',
    candidateEmail: 'bayarmaa.sondor@email.com',
    candidateLinkedIn: 'linkedin.com/in/bayarmaa-sondor',
    candidateCurrentEmployment: 'Junior Designer',
    candidateInterestedField: 'UX/UI',
    cvUrl: '/cv/bayarmaa-sondor.pdf',

    submittedDate: '2026-01-04',
    status: 'REJECTED',
  },

  // ================= DATA ANALYST (jobId: 4) =================
  {
    id: '304',
    employeeName: 'Тэмүүлэн Ариун',
    employeePhone: '9999-9010',
    employeeEmail: 'temuulen.ariun@company.mn',
    employeeDepartment: 'Өгөгдлийн алба',
    employeeJobLevel: 'Senior',
    employeeJobType: 'Бүтэн цагийн',
    relationshipWithCandidate: 'Хамт ажиллаж байсан',
    referralReason: 'SQL, Python чадвар маш сайн',
    consentReceived: true,
    currentlyWorking: true,

    candidateName: 'Мөнхтөр Гэрэл',
    candidatePhone: '9999-9011',
    candidateEmail: 'munkhtur.gerel@email.com',
    candidateLinkedIn: 'linkedin.com/in/munkhtur-gerel',
    candidateCurrentEmployment: 'Analytics Co – Data Analyst',
    candidateInterestedField: 'Data Analytics',
    cvUrl: '/cv/munkhtur-gerel.pdf',

    submittedDate: '2026-01-04',
    status: 'APPROVED',
  },
  {
    id: '305',
    employeeName: 'Сод-Эрдэнэ Халиун',
    employeePhone: '9999-9012',
    employeeEmail: 'sod-erdene.khaliun@company.mn',
    employeeDepartment: 'Өгөгдлийн алба',
    employeeJobLevel: 'Senior',
    employeeJobType: 'Бүтэн цагийн',
    relationshipWithCandidate: 'Найз',
    referralReason: 'Статистикийн мэдлэг дутмаг',
    consentReceived: true,
    currentlyWorking: true,

    candidateName: 'Билгүүн Анужин',
    candidatePhone: '9999-9013',
    candidateEmail: 'bilguun.anujin@email.com',
    candidateLinkedIn: 'linkedin.com/in/bilguun-anujin',
    candidateCurrentEmployment: 'Intern',
    candidateInterestedField: 'Data Science',
    cvUrl: '/cv/bilguun-anujin.pdf',

    submittedDate: '2026-01-03',
    status: 'REJECTED',
  },
  {
    id: '306',
    employeeName: 'Ганзориг Ням',
    employeePhone: '9999-9014',
    employeeEmail: 'ganzorig.nyam@company.mn',
    employeeDepartment: 'Өгөгдлийн алба',
    employeeJobLevel: 'Middle',
    employeeJobType: 'Бүтэн цагийн',
    relationshipWithCandidate: 'Хамт сурч байсан',
    referralReason: 'BI tool туршлага хангалтгүй',
    consentReceived: true,
    currentlyWorking: true,

    candidateName: 'Эрдэнэбаяр Хос',
    candidatePhone: '9999-9015',
    candidateEmail: 'erdenebayar.khos@email.com',
    candidateLinkedIn: 'linkedin.com/in/erdenebayar-khos',
    candidateCurrentEmployment: 'Reporting Assistant',
    candidateInterestedField: 'Business Intelligence',
    cvUrl: '/cv/erdenebayar-khos.pdf',

    submittedDate: '2026-01-02',
    status: 'REJECTED',
  },
];

const statusColors = {
  SUBMITTED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  APPROVED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const statusLabels = {
  SUBMITTED: 'Шинэ',
  APPROVED: 'Зөвшөөрсөн',
  REJECTED: 'Татгалзсан',
};

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const referralId = params.referralId;

  const referrals = mockReferralDetails.find((referral) => referral.id === referralId);

  if (!referrals) {
    return <div>Санал олдсонгүй</div>;
  }

  const [showApproveDialog, setShowApproveDialog] = useState<boolean>(false);
  const [showRejectDialog, setShowRejectDialog] = useState<boolean>(false);
  const [status, setStatus] = useState<ReferralDetail['status']>(referrals.status);

  const handleBackToReferrals = () => {
    router.back();
  };

  const handleApprove = () => {
    // setStatus('APPROVED');
    toast.success('Амжилттай', {
      description: 'Санал зөвшөөрөгдлөө. Урамшууллын хүсэлт санхүү хэлтэст илгээгдлээ.',
    });

    setShowApproveDialog(false);
    setTimeout(() => {
      setStatus('APPROVED');
      router.back();
    }, 1500);
  };

  const handleReject = () => {
    // setStatus('REJECTED');
    toast.error('Татгалзлаа', {
      description: 'Татгалзсан тухай мэдэгдэл ажилчинд илгээгдлээ.',
    });

    setShowRejectDialog(false);
    setTimeout(() => {
      setStatus('REJECTED');
      router.back();
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-5 justify-center w-full p-7 pb-24">
      <div className="flex gap-4 items-center">
        <Button variant="ghost" onClick={handleBackToReferrals}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <p className="text-md font-semibold">Саналын дэлгэрэнгүй</p>
      </div>

      <Card className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Санал болгогч ажилтны мэдээлэл</h2>
        </div>

        <div className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Нэр:</span>
            <p className="font-medium mt-0.5">{referrals.employeeName}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Утас:</span>
            <p className="font-medium mt-0.5">{referrals.employeePhone}</p>
          </div>

          <div>
            <span className="text-muted-foreground">И-мэйл:</span>
            <p className="font-medium mt-0.5">{referrals.employeeEmail}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Хэлтэс:</span>
            <p className="font-medium mt-0.5">{referrals.employeeDepartment}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Түвшин:</span>
            <p className="font-medium mt-0.5">{referrals.employeeJobLevel}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Ажлын төрөл:</span>
            <p className="font-medium mt-0.5">{referrals.employeeJobType}</p>
          </div>

          <div className="pt-2 border-t border-border">
            <span className="text-muted-foreground">Санал болгож буй хүнтэй харилцаа:</span>
            <p className="font-medium mt-0.5">{referrals.relationshipWithCandidate}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Санал болгох шалтгаан:</span>
            <p className="font-medium mt-0.5">{referrals.referralReason}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Зөвшөөрөл авсан эсэх:</span>
            <p className="font-medium mt-0.5">{referrals.consentReceived ? 'Тийм' : 'Үгүй'}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Одоо ажиллаж байгаа:</span>
            <p className="font-medium mt-0.5">{referrals.currentlyWorking ? 'Тийм' : 'Үгүй'}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 flex flex-col gap-4">
        <h2 className="font-semibold">Санал болгож буй хүний мэдээлэл</h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-muted-foreground">Нэр:</span>
              <p className="font-medium mt-0.5">{referrals.candidateName}</p>
            </div>
            <div>
              <Badge className={statusColors[referrals.status]}>{statusLabels[referrals.status]}</Badge>
            </div>
          </div>

          <div>
            <span className="text-muted-foreground">Утас:</span>
            <p className="font-medium mt-0.5">{referrals.candidatePhone}</p>
          </div>

          <div>
            <span className="text-muted-foreground">И-мэйл:</span>
            <p className="font-medium mt-0.5">{referrals.candidateEmail}</p>
          </div>

          {referrals.candidateLinkedIn && (
            <div>
              <span className="text-muted-foreground">LinkedIn:</span>
              <p className="font-medium mt-0.5">{referrals.candidateLinkedIn}</p>
            </div>
          )}

          <div>
            <span className="text-muted-foreground">Ажил эрхлэлтийн байдал:</span>
            <p className="font-medium mt-0.5">{referrals.candidateCurrentEmployment}</p>
          </div>

          {referrals.candidateInterestedField && (
            <div>
              <span className="text-muted-foreground">Сонирхсон чиглэл:</span>
              <p className="font-medium mt-0.5">{referrals.candidateInterestedField}</p>
            </div>
          )}

          <div className="pt-2 border-t border-border">
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <a href={referrals.cvUrl} target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4 mr-2" />
                Анкет үзэх (PDF)
              </a>
            </Button>
          </div>

          <div>
            <span className="text-muted-foreground">Илгээсэн огноо:</span>
            <p className="font-medium mt-0.5">{referrals.submittedDate}</p>
          </div>
        </div>
      </Card>

      {status === 'SUBMITTED' && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
          <div className="flex gap-3">
            <Button variant="destructive" className="flex-1" onClick={() => setShowRejectDialog(true)}>
              <XCircle className="w-4 h-4 mr-2" />
              Татгалзах
            </Button>

            <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => setShowApproveDialog(true)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Ажилд авах
            </Button>
          </div>
        </div>
      )}

      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ажилд авах уу?</AlertDialogTitle>
            <AlertDialogDescription>
              Нэр дэвшигчийг ажилд авах тохиолдолд <span className="font-semibold text-gray-600">урамшууллын хүсэлт санхүү хэлтэст</span> илгээгдэх ба санал болгосон{' '}
              <span className="font-semibold text-gray-600">ажилчинд баталгаажуулалтын мэдэгдэл</span> очих болно.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Цуцлах</AlertDialogCancel>
            <AlertDialogAction onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
              Ажилд авах
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Татгалзах уу?</AlertDialogTitle>
            <AlertDialogDescription>
              Татгалзсан тохиолдолд <span className="font-semibold text-gray-600">санал болгосон ажилчинд</span> татгалзсан тухай мэдэгдэл очих болно.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Буцах</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject} className="bg-destructive hover:bg-destructive/90">
              Татгалзах
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Page;
