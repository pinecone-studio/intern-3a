'use client';

import { Badge, Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from '@intern-3a/shadcn';
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

  return (
    <div className="min-h-screen bg-background">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-card border-b border-border/50 px-4 pt-3">
          <TabsList className="w-full flex h-11">
            <TabsTrigger value="sent" className="text-xs sm:text-sm">
              Илгээгдсэн
            </TabsTrigger>
            <TabsTrigger value="approved" className="text-xs sm:text-sm">
              Зөвшөөрсөн
            </TabsTrigger>
            <TabsTrigger value="rejected" className="text-xs sm:text-sm">
              Цуцлагдсан
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-4">
          <TabsContent value="sent" className="space-y-4">
            {historyData.sent.map((item) => (
              <Card key={item.id} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-orange-400 shrink-0 mt-2" />
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-base">{item.jobName}</h3>
                      <p className="text-sm text-muted-foreground">Нэр дэвшигч: {item.candidateName}</p>
                      <Badge variant="secondary" className="text-xs mt-2">
                        {new Date(item.sentDate).toLocaleDateString('mn-MN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="approved" className="mt-0 space-y-3">
            {historyData.approved.map((item) => (
              <Card key={item.id} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 shrink-0 mt-2" />

                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-base">{item.jobName}</h3>
                        <span className="text-sm font-semibold text-status-green whitespace-nowrap">{item.bonus}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Нэр дэвшигч: {item.candidateName}</p>
                      <div className="flex gap-2 flex-wrap mt-2">
                        <Badge variant="secondary" className="text-xs">
                          Илгээсэн:{' '}
                          {new Date(item.sentDate).toLocaleDateString('mn-MN', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Зөвшөөрсөн:
                          {new Date(item.approvedDate).toLocaleDateString('mn-MN', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="mt-0 space-y-3">
            {historyData.rejected.map((item) => (
              <Card key={item.id} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 shrink-0 mt-2" />

                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-base">{item.jobName}</h3>
                      <p className="text-sm text-muted-foreground">Нэр дэвшигч: {item.candidateName}</p>
                      <div className="flex gap-2 flex-wrap mt-2">
                        <Badge variant="secondary" className="text-xs">
                          Илгээсэн:{' '}
                          {new Date(item.sentDate).toLocaleDateString('mn-MN', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Хариу:{' '}
                          {new Date(item.responseDate).toLocaleDateString('mn-MN', {
                            month: 'short',
                            day: 'numeric',
                          })}
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
