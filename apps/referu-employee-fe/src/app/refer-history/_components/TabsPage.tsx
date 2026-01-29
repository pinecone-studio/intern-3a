'use client';

import { Badge, Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from '@intern-3a/shadcn';
import { formatDate } from 'apps/referu-employee-fe/src/libs/utils/get-date';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAllReferrals } from '../../hook/use-all-referrals';

export function TabsPage() {
  const [activeTab, setActiveTab] = useState('sent');
  const router = useRouter();

  const { allReferrals } = useAllReferrals();
  console.log('allReferrals', allReferrals);

  return (
    <div className="min-h-screen">
      <div className="flex items-center px-4 py-3 gap-3 bg-white">
        <button onClick={() => router.back()} className="p-1 hover:bg-accent rounded-full cursor-pointer">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold tracking-tight">Санал болгосон түүх</h1>
      </div>
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full min-h-screen bg-blue-50/50">
        <div className="bg-blue-50/50 border-t border-border px-4 pt-5">
          <TabsList className="w-full flex h-11">
            <TabsTrigger value="sent" className="text-sm/tight cursor-pointer">
              Илгээсэн
            </TabsTrigger>
            <TabsTrigger value="approved" className="text-sm/tight cursor-pointer">
              Зөвшөөрсөн
            </TabsTrigger>
            <TabsTrigger value="rejected" className="text-sm/tight cursor-pointer">
              Цуцлагдсан
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="pl-4 pb-4 pr-4 bg-blue-50/50">
          <TabsContent value="sent" className="space-y-3">
            {allReferrals
              .filter((ref) => ref.referralStatus === 'SUBMITTED')
              .map((referral) => (
                <Card key={referral._id} className="border-border/50">
                  <CardContent className="px-3 py-1">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-10 rounded-full bg-orange-400 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-base">{referral.candidateFieldOfInterest}</h3>
                        <p className="text-sm text-muted-foreground">
                          Санал болгосон:
                          <h2 className="font-semibold text-base">{referral.candidateFirstName}</h2>
                        </p>
                        <Badge variant="secondary" className="mt-2 text-xs font-normal">
                          Илгээсэн: {formatDate(referral.createdAt)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-3">
            {allReferrals
              .filter((ref) => ref.referralStatus === 'BONUS100' || ref.referralStatus === 'BONUS200')
              .map((referral) => (
                <Card key={referral._id} className="border-border/50">
                  <CardContent className="px-3 py-1">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-10 rounded-full bg-green-500 shrink-0" />
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-base">{referral.candidateFieldOfInterest}</h3>
                          <div className="text-sm font-semibold text-green-600">{referral.bonusAmount}₮</div>
                        </div>

                        <p className="text-sm text-muted-foreground">Санал болгосон: {referral.candidateFirstName}</p>
                        <div className="flex gap-2 flex-wrap mt-2">
                          <Badge variant="secondary" className="text-xs font-normal">
                            Илгээсэн: {formatDate(referral.createdAt)}
                          </Badge>
                          <Badge variant="secondary" className="text-xs bg-green-50 font-normal text-green-700 border-green-100">
                            Зөвшөөрсөн: {formatDate(referral.updatedAt)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="rejected" className=" space-y-3">
            {allReferrals
              .filter((ref) => ref.referralStatus === 'REJECTED')
              .map((referral) => (
                <Card key={referral._id} className="border-border/50">
                  <CardContent className="px-3 py-1">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-10 rounded-full bg-red-500 shrink-0" />

                      <div>
                        <h3 className="font-semibold text-base">{referral.candidateFieldOfInterest}</h3>
                        <p className="text-sm text-muted-foreground">Санал болгосон: {referral.candidateFirstName}</p>
                        <div className="flex gap-2 flex-wrap mt-2">
                          <Badge variant="secondary" className="text-xs font-normal">
                            Илгээсэн: {formatDate(referral.createdAt)}
                          </Badge>
                          <Badge variant="secondary" className="text-xs font-normal bg-red-50 text-red-700 border-red-100">
                            Цуцлагдсан: {formatDate(referral.updatedAt)}
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
