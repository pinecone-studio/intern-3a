'use client';

import { Badge, Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from '@intern-3a/shadcn';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const historyData = {
  sent: [
    {
      id: '1',
      jobName: 'Senior Software Engineer',
      candidateName: 'А. Дорж',
      sentDate: '2024-01-15',
    },
    {
      id: '2',
      jobName: 'Product Manager',
      candidateName: 'Б. Сарнай',
      sentDate: '2024-01-12',
    },
  ],
  approved: [
    {
      id: '3',
      jobName: 'UX Designer',
      candidateName: 'Ц. Болд',
      sentDate: '2024-01-05',
      approvedDate: '2024-01-10',
      bonus: '₮500,000',
    },
  ],
  rejected: [
    {
      id: '4',
      jobName: 'Data Analyst',
      candidateName: 'Д. Өсөх',
      sentDate: '2023-12-20',
      responseDate: '2023-12-28',
    },
  ],
};

export function TabsPage() {
  const [activeTab, setActiveTab] = useState('sent');
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <div className="flex items-center px-4 py-3 gap-3 bg-white">
        <button onClick={() => router.back()} className="p-1 hover:bg-accent rounded-full">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Санал болгосон түүх</h1>
      </div>
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full min-h-screen bg-blue-50/50">
        <div className="bg-blue-50/50 border-t border-border px-4 pt-5">
          <TabsList className="w-full flex h-11">
            <TabsTrigger value="sent" className="text-sm/tight">
              Илгээсэн
            </TabsTrigger>
            <TabsTrigger value="approved" className="text-sm/tight">
              Зөвшөөрсөн
            </TabsTrigger>
            <TabsTrigger value="rejected" className="text-sm/tight">
              Цуцлагдсан
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="pl-4 pb-4 pr-4 bg-blue-50/50">
          <TabsContent value="sent" className="space-y-3">
            {historyData.sent.map((item) => (
              <Card key={item.id} className="border-border/50">
                <CardContent className="px-3 py-1">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-10 rounded-full bg-orange-400 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-base">{item.jobName}</h3>
                      <p className="text-sm text-muted-foreground">Санал болгосон: {item.candidateName}</p>
                      <Badge variant="secondary" className="mt-2 text-xs font-normal">
                        Илгээсэн: {item.sentDate}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-3">
            {historyData.approved.map((item) => (
              <Card key={item.id} className="border-border/50">
                <CardContent className="px-3 py-1">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-10 rounded-full bg-green-500 shrink-0" />
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-base">{item.jobName}</h3>
                        <span className="text-sm font-semibold text-green-600">{item.bonus}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Санал болгосон: {item.candidateName}</p>
                      <div className="flex gap-2 flex-wrap mt-2">
                        <Badge variant="secondary" className="text-xs font-normal">
                          Илгээсэн: {item.sentDate}
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-green-50 font-normal text-green-700 border-green-100">
                          Зөвшөөрсөн: {item.approvedDate}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="rejected" className=" space-y-3">
            {historyData.rejected.map((item) => (
              <Card key={item.id} className="border-border/50">
                <CardContent className="px-3 py-1">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-10 rounded-full bg-red-500 shrink-0" />

                    <div>
                      <h3 className="font-semibold text-base">{item.jobName}</h3>
                      <p className="text-sm text-muted-foreground">Нэр дэвшигч: {item.candidateName}</p>
                      <div className="flex gap-2 flex-wrap mt-2">
                        <Badge variant="secondary" className="text-xs font-normal">
                          Илгээсэн: {item.sentDate}
                        </Badge>
                        <Badge variant="secondary" className="text-xs font-normal bg-red-50 text-red-700 border-red-100">
                          Цуцлагдсан: {item.responseDate}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
