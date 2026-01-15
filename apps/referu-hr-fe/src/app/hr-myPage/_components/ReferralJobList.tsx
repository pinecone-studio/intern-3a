import { Badge, Card, CardContent, CardTitle, TabsContent } from '@intern-3a/shadcn';
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
  return (
    <div>
      <TabsContent value="account">
        <div className="flex flex-col gap-4">
          {mockJobsWithReferrals.map((jobs) => (
            <div key={jobs.id}>
              <Card className="py-4 space-y-3 cursor-pointer hover:shadow-md transition-shadow">
                {/* <CardTitle>{jobs.title}</CardTitle> */}
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-md">{jobs.title}</div>
                    <Badge className="bg-[#005295]">{jobs.referralCount} санал</Badge>
                    {/* <div>{jobs.referralCount} санал</div> */}
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
