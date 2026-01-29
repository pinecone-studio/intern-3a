import { useAllReferrals } from '@/app/hook/use-all-referrals';
import { ReferralType } from '@/lib/type';
import { hrPostedJobs } from '@/lib/utils/get-data';
import { Badge, Card, CardContent, TabsContent } from '@intern-3a/shadcn';
import { useRouter } from 'next/navigation';
import React from 'react';

const statusColors = {
  RESOLVED: 'bg-[#3a3b3d]/20 text-[#3a3b3d] ',
};

const statusLabels = {
  RESOLVED: 'Шийдвэрлэгдсэн',
};

const ResolvedReferrals = () => {
  const router = useRouter();
  const { allReferralsHR } = useAllReferrals();

  const handleResolvedJob = (jobId: string) => {
    router.push(`/hr-myPage/${jobId}`);
  };

  const resolvedReferrals: ReferralType['referralStatus'][] = ['REJECTED', 'BONUS100', 'BONUS200'];

  const resolvedJobs = hrPostedJobs.filter((job) => allReferralsHR.find((referral) => referral.postedJobId === job._id && resolvedReferrals.includes(referral.referralStatus)));

  return (
    <div>
      <TabsContent value="password">
        <div className="flex flex-col gap-4">
          {resolvedJobs.map((jobs) => (
            <div key={jobs._id}>
              <Card className="py-4 space-y-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleResolvedJob(jobs._id)}>
                <CardContent>
                  <div>
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-md">{jobs.jobTitle}</div>
                      {/* <Badge className={statusColors[jobs.status as keyof typeof statusColors]}>{statusLabels[jobs.status as keyof typeof statusLabels]}</Badge> */}
                      <Badge className={statusColors.RESOLVED}>{statusLabels.RESOLVED}</Badge>
                    </div>

                    <div className="text-sm text-muted-foreground mt-3">{jobs.jobDepartment}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </TabsContent>
    </div>
  );
};

export default ResolvedReferrals;
