'use client';

import { useAllReferrals } from '@/app/hook/use-all-referrals';
import { Badge, Button, Card, CardContent, Separator } from '@intern-3a/shadcn';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const statusColors = {
  SUBMITTED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  BONUS100: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  BONUS200: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const statusLabels = {
  SUBMITTED: 'Шинэ',
  BONUS100: 'Туршилтын ажилтан',
  BONUS200: 'Бүтэн цагийн ажилтан',
  REJECTED: 'Татгалзсан',
};

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const { allReferralsHR } = useAllReferrals();

  const jobId = params.jobId;

  const filteredReferrals = allReferralsHR.filter((referrals) => referrals.postedJobId === jobId);

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
          {/* <p>songoson ajliin ner</p> */}
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          {filteredReferrals.map((referrals) => (
            <div key={referrals._id}>
              <Card className="py-4 space-y-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleReferralClick(referrals._id)}>
                <CardContent className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-md">
                        {referrals.candidateFirstName} {referrals.candidateLastName}
                      </div>
                      <p className="text-xs text-muted-foreground"> Санал болгосон</p>
                    </div>

                    <Badge className={statusColors[referrals.referralStatus]}>{statusLabels[referrals.referralStatus]}</Badge>
                  </div>
                  <Separator />
                  {/* <div className="flex flex-col justify-between h-20">
                    <div className="">
                      <div className="text-sm font-medium text-foreground">{referrals.name}</div>
                      <div className="flex gap-2 items-center -mt-2.5">
                        <div className="text-sm text-muted-foreground mt-3">{referrals.employeeDepartment}</div>
                        <p>.</p>
                        <div className="text-sm text-muted-foreground mt-3">{referrals.employeeJobTitle}</div>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground mt-3">Огноо: {referrals.submittedDate}</div>
                  </div> */}
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
