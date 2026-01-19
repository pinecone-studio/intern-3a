'use client';

import { Badge, Card, CardContent, CardTitle, TabsContent } from '@intern-3a/shadcn';
import { useRouter } from 'next/navigation';
import React from 'react';

type JobWithReferrals = {
  id: string;
  title: string;
  department: string;
  referralCount: number;
};

const mockJobsWithReferrals: JobWithReferrals[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Технологийн хэлтэс',
    referralCount: 3,
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Бүтээгдэхүүний хэлтэс',
    referralCount: 1,
  },
];

const ReferralJobList = () => {
  const router = useRouter();

  const handleJodRefferal = (jobId: string) => {
    router.push(`/hr-myPage/${jobId}`);
  };
  return (
    <div>
      <TabsContent value="account">
        <div className="flex flex-col gap-4">
          {mockJobsWithReferrals.map((jobs) => (
            <div key={jobs.id}>
              <Card className="py-4 space-y-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleJodRefferal(jobs.id)}>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-md">{jobs.title}</div>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">{jobs.referralCount} санал</Badge>
                  </div>

                  <div className="text-sm text-muted-foreground mt-3">{jobs.department}</div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </TabsContent>
    </div>
  );
};

export default ReferralJobList;
