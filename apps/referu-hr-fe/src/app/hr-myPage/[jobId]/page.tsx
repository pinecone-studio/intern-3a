'use client';

import { Badge, Button, Card, CardContent, Separator } from '@intern-3a/shadcn';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

type Referral = {
  id: string;
  employeeName: string;
  employeeJobTitle: string;
  employeeDepartment: string;
  submittedDate: string;
  candidateName: string;
  status: 'SUBMITTED' | 'APPROVED' | 'REJECTED';
};

const mockReferrals: Referral[] = [
  {
    id: '1',
    employeeName: 'Болд Бат',
    employeeJobTitle: 'Software Engineer',
    employeeDepartment: 'Технологийн хэлтэс',
    submittedDate: '2026-01-12',
    candidateName: 'Дорж Цэцэг',
    status: 'SUBMITTED',
  },
  {
    id: '2',
    employeeName: 'Сүх Сарнай',
    employeeJobTitle: 'Senior Engineer',
    employeeDepartment: 'Технологийн хэлтэс',
    submittedDate: '2026-01-11',
    candidateName: 'Ганбат Мөнх',
    status: 'SUBMITTED',
  },
  {
    id: '3',
    employeeName: 'Алтан Өнөө',
    employeeJobTitle: 'Lead Engineer',
    employeeDepartment: 'Технологийн хэлтэс',
    submittedDate: '2026-01-10',
    candidateName: 'Баяр Төмөр',
    status: 'SUBMITTED',
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

  const handleReferralClick = (referralId: string) => {
    router.push(`/hr-myPage/${params.jobId}/${referralId}`);
  };
  return (
    <div className="flex flex-col gap-5 justify-center w-full p-7">
      <div className="flex gap-4 items-center">
        <Button variant={'ghost'} onClick={() => router.push('/hr-myPage')}>
          <ArrowLeft className="w-4" />
        </Button>
        <div>
          <p className="text-md font-semibold">Санал ирсэн хүмүүс</p>
          <p>songoson ajliin ner</p>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          {mockReferrals.map((referrals) => (
            <div key={referrals.id}>
              <Card className="py-4 space-y-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleReferralClick(referrals.id)}>
                <CardContent className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-md">{referrals.candidateName}</div>
                      <p className="text-xs text-muted-foreground">Нэр дэвшигч</p>
                    </div>

                    <Badge className="bg-[#005295]">{referrals.status}</Badge>
                  </div>
                  <Separator />
                  <div className="flex flex-col justify-between h-20">
                    <div className="">
                      <div className="text-sm font-medium text-foreground">{referrals.employeeName}</div>
                      <div className="flex gap-2 items-center -mt-2.5">
                        <div className="text-sm text-muted-foreground mt-3">{referrals.employeeDepartment}</div>
                        <p>.</p>
                        <div className="text-sm text-muted-foreground mt-3">{referrals.employeeJobTitle}</div>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground mt-3">Огноо: {referrals.submittedDate}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
