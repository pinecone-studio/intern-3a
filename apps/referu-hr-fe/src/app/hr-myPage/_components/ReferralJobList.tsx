'use client';

import { useAllReferrals } from '@/app/hook/use-all-referrals';
import { ReferralType } from '@/lib/type';
import { hrPostedJobs } from '@/lib/utils/get-data';
import { Badge, Card, CardContent, CardTitle, TabsContent } from '@intern-3a/shadcn';
import { useRouter } from 'next/navigation';
import React from 'react';

// type JobWithReferrals = {
//   id: string;
//   title: string;
//   department: string;
//   referralCount: number;
// };

// const mockJobsWithReferrals: JobWithReferrals[] = [
//   {
//     id: '1',
//     title: 'Senior Software Engineer',
//     department: 'Технологийн хэлтэс',
//     referralCount: 3,
//   },
//   {
//     id: '2',
//     title: 'Product Manager',
//     department: 'Бүтээгдэхүүний хэлтэс',
//     referralCount: 1,
//   },
// ];

const ReferralJobList = () => {
  const { allReferralsHR } = useAllReferrals();
  const router = useRouter();
  console.log({ allReferralsHR });

  const handleJodRefferal = (jobId: string) => {
    router.push(`/hr-myPage/${jobId}`);
  };

  return (
    <div>
      <TabsContent value="account">
        <div className="flex flex-col gap-4">
          {hrPostedJobs.map((jobs) => {
            const jobReferrals = allReferralsHR.filter((referral) => referral._id === jobs._id);
            return (
              <div key={jobs._id}>
                <Card className="py-4 space-y-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleJodRefferal(jobs._id)}>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-md">{jobs.jobTitle}</div>

                      {jobReferrals.length > 0 && <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">{jobReferrals.length} санал</Badge>}
                    </div>

                    <div className="text-sm text-muted-foreground mt-3">{jobs.jobDepartment}</div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </TabsContent>
    </div>
  );
};

export default ReferralJobList;
