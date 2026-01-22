import { Badge, Card, CardContent, TabsContent } from '@intern-3a/shadcn';
import { useRouter } from 'next/navigation';
import React from 'react';

type Job = {
  id: string;
  title: string;
  department: string;
  postedDate: string;
  salaryRange: string;
  referralCount?: number;
  status: Status;
};

type Status = 'RESOLVED';

const mockJobs: Job[] = [
  {
    id: '3',
    title: 'UX Designer',
    department: 'Дизайны алба',
    postedDate: '1-р сарын 5',
    salaryRange: '₮2,500,000 - ₮4,000,000',
    status: 'RESOLVED',
  },
  {
    id: '4',
    title: 'Data Analyst',
    department: 'Өгөгдлийн алба',
    postedDate: '1-р сарын 3',
    salaryRange: '₮3,000,000 - ₮4,500,000',
    status: 'RESOLVED',
  },
];

const statusColors: Record<Status, string> = {
  RESOLVED: 'bg-[#3a3b3d]/20 text-[#3a3b3d] ',
};

const statusLabels: Record<Status, string> = {
  RESOLVED: 'Шийдвэрлэгдсэн',
};

const ResolvedReferrals = () => {
  const router = useRouter();

  const handleResolvedJob = (jobId: string) => {
    router.push(`/hr-myPage/${jobId}`);
  };
  return (
    <div>
      <TabsContent value="password">
        <div className="flex flex-col gap-4">
          {mockJobs.map((jobs) => (
            <div key={jobs.id}>
              <Card className="py-4 space-y-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleResolvedJob(jobs.id)}>
                <CardContent>
                  <div>
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-md">{jobs.title}</div>
                      <Badge className={statusColors[jobs.status as keyof typeof statusColors]}>{statusLabels[jobs.status as keyof typeof statusLabels]}</Badge>
                    </div>

                    <div className="text-sm text-muted-foreground mt-3">{jobs.department}</div>
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
