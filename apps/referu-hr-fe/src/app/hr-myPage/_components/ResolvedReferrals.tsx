import { Badge, Card, CardContent, TabsContent } from '@intern-3a/shadcn';
import React from 'react';

type Job = {
  id: string;
  title: string;
  department: string;
  postedDate: string;
  salaryRange: string;
  referralCount?: number;
  status: string;
};

const mockJobs: Job[] = [
  {
    id: '3',
    title: 'UX Designer',
    department: 'Дизайны алба',
    postedDate: '1-р сарын 5',
    salaryRange: '₮2,500,000 - ₮4,000,000',
    // status: 'Accepted',
    status: 'Resolved',
  },
  {
    id: '4',
    title: 'Data Analyst',
    department: 'Өгөгдлийн алба',
    postedDate: '1-р сарын 3',
    salaryRange: '₮3,000,000 - ₮4,500,000',
    // status: 'Rejected',
    status: 'Resolved',
  },
];

const ResolvedReferrals = () => {
  return (
    <div>
      <TabsContent value="password">
        <div className="flex flex-col gap-4">
          {mockJobs.map((jobs) => (
            <div key={jobs.id}>
              <Card className="py-4 space-y-3 cursor-pointer hover:shadow-md transition-shadow">
                {/* <CardTitle>{jobs.title}</CardTitle> */}
                <CardContent>
                  <div>
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-md">{jobs.title}</div>
                      {/* <Badge className={`${jobs.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'}`}>{jobs.status} </Badge> */}
                      <Badge className="bg-[#005295]">{jobs.status}</Badge>
                    </div>

                    {/* <div className="text-[#005295] font-medium text-sm">{jobs.salaryRange}</div> */}

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
