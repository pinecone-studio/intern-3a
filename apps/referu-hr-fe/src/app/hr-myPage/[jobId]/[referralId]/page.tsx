'use client';

import { useAllReferrals } from '@/app/hook/use-all-referrals';
import { ReferralType } from '@/lib/type';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  Button,
  Card,
} from '@intern-3a/shadcn';
import axios from 'axios';
import { ArrowLeft, CheckCircle, FileText, Loader, XCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

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
  const referralId = params.referralId;
  const { allReferralsHR, loading } = useAllReferrals();

  const referrals = allReferralsHR.find((referral) => referral._id === referralId);

  const [showApproveDialog, setShowApproveDialog] = useState<boolean>(false);
  const [showRejectDialog, setShowRejectDialog] = useState<boolean>(false);
  const [status, setStatus] = useState<ReferralType['referralStatus']>('SUBMITTED');

  console.log({ status });

  useEffect(() => {
    if (referrals) {
      setStatus(referrals.referralStatus);
    }
  }, [referrals]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!referrals) {
    return <div className="flex justify-center items-center m-auto">Санал олдсонгүй</div>;
  }

  const handleBackToReferrals = async () => {
    router.back();
  };

  const handleBonusHundred = async () => {
    try {
      await axios.patch(`http://localhost:4000/hr/referral/${referralId}/bonus100`);

      toast.success('Амжилттай', {
        description: 'Санал зөвшөөрөгдлөө. Урамшууллын хүсэлт санхүү хэлтэст илгээгдлээ.',
      });
      setShowApproveDialog(false);
      setTimeout(() => {
        // setStatus('PERMANENT');
        setStatus('BONUS100');
        router.back();
      }, 1500);
    } catch (error) {
      toast.error('Алдаа гарлаа');
    }
  };

  const handleBonusTwoHundred = async () => {
    try {
      await axios.patch(`http://localhost:4000/hr/referral/${referralId}/bonus200`);

      toast.success('Амжилттай', {
        description: 'Санал зөвшөөрөгдлөө. Урамшууллын хүсэлт санхүү хэлтэст илгээгдлээ.',
      });
      setShowApproveDialog(false);
      setTimeout(() => {
        // setStatus('PERMANENT');
        setStatus('BONUS200');
        router.back();
      }, 1500);
    } catch (error) {
      toast.error('Алдаа гарлаа');
    }
  };

  const handleReject = async () => {
    try {
      await axios.patch(`http://localhost:4000/hr/referral/${referralId}/rejected`);

      toast.error('Татгалзлаа', {
        description: 'Татгалзсан тухай мэдэгдэл ажилчинд илгээгдлээ.',
      });
      setShowRejectDialog(false);
      setTimeout(() => {
        setStatus('REJECTED');
        router.back();
      }, 1500);
    } catch (error) {
      toast.error('Алдаа гарлаа');
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center w-full p-7 pb-24">
      <div className="flex gap-4 items-center">
        <Button variant="ghost" onClick={handleBackToReferrals}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <p className="text-md font-semibold">Саналын дэлгэрэнгүй</p>
      </div>

      <Card className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Санал болгогч ажилтны мэдээлэл</h2>
        </div>

        {/* <div className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Нэр:</span>
            <p className="font-medium mt-0.5">{referrals.employeeName}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Утас:</span>
            <p className="font-medium mt-0.5">{referrals.employeePhone}</p>
          </div>

          <div>
            <span className="text-muted-foreground">И-мэйл:</span>
            <p className="font-medium mt-0.5">{referrals.employeeEmail}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Хэлтэс:</span>
            <p className="font-medium mt-0.5">{referrals.employeeDepartment}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Түвшин:</span>
            <p className="font-medium mt-0.5">{referrals.employeeJobLevel}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Ажлын төрөл:</span>
            <p className="font-medium mt-0.5">{referrals.employeeJobType}</p>
          </div>

          <div className="pt-2 border-t border-border">
            <span className="text-muted-foreground">Санал болгож буй хүнтэй харилцаа:</span>
            <p className="font-medium mt-0.5">{referrals.relationshipWithCandidate}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Санал болгох шалтгаан:</span>
            <p className="font-medium mt-0.5">{referrals.referralReason}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Зөвшөөрөл авсан эсэх:</span>
            <p className="font-medium mt-0.5">{referrals.consentReceived ? 'Тийм' : 'Үгүй'}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Одоо ажиллаж байгаа:</span>
            <p className="font-medium mt-0.5">{referrals.currentlyWorking ? 'Тийм' : 'Үгүй'}</p>
          </div>
        </div> */}
      </Card>

      <Card className="p-4 flex flex-col gap-4">
        <h2 className="font-semibold">Санал болгож буй хүний мэдээлэл</h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-muted-foreground">Нэр:</span>
              <p className="font-medium mt-0.5">
                {referrals.candidateFirstName} {referrals.candidateLastName}
              </p>
            </div>
            <div>
              <Badge className={statusColors[referrals.referralStatus]}>{statusLabels[referrals.referralStatus]}</Badge>
            </div>
          </div>

          <div>
            <span className="text-muted-foreground">Утас:</span>
            <p className="font-medium mt-0.5">{referrals.candidateTelNumber}</p>
          </div>

          <div>
            <span className="text-muted-foreground">И-мэйл:</span>
            <p className="font-medium mt-0.5">{referrals.candidateEmail}</p>
          </div>

          {referrals.candidateLinkedinUrl && (
            <div>
              <span className="text-muted-foreground">LinkedIn:</span>
              <p className="font-medium mt-0.5">{referrals.candidateLinkedinUrl}</p>
            </div>
          )}

          <div>
            <span className="text-muted-foreground">Ажил эрхлэлтийн байдал:</span>
            <p className="font-medium mt-0.5">{referrals.isNotCurrentEmployee}</p>
          </div>

          {referrals.candidateFieldOfInterest && (
            <div>
              <span className="text-muted-foreground">Сонирхсон чиглэл:</span>
              <p className="font-medium mt-0.5">{referrals.candidateFieldOfInterest}</p>
            </div>
          )}

          <div className="pt-2 border-t border-border">
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <a href={referrals.candidateResume} target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4 mr-2" />
                Анкет үзэх (PDF)
              </a>
            </Button>
          </div>

          <div>
            <span className="text-muted-foreground">Илгээсэн огноо:</span>
            <p className="font-medium mt-0.5">{referrals.createdAt}</p>
          </div>
        </div>
      </Card>

      {status === 'SUBMITTED' && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
          <div className="flex gap-3">
            <Button variant="destructive" className="flex-1" onClick={() => setShowRejectDialog(true)}>
              <XCircle className="w-4 h-4 mr-2" />
              Татгалзах
            </Button>

            <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => setShowApproveDialog(true)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Ажилд авах
            </Button>
          </div>
        </div>
      )}

      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ажилд авах уу?</AlertDialogTitle>
            <AlertDialogDescription>
              Нэр дэвшигчийг ажилд авах тохиолдолд <span className="font-semibold text-gray-600">урамшууллын хүсэлт санхүү хэлтэст</span> илгээгдэх ба санал болгосон{' '}
              <span className="font-semibold text-gray-600">ажилчинд баталгаажуулалтын мэдэгдэл</span> очих болно.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex justify-center gap-4 w-full">
                <AlertDialogAction onClick={handleBonusHundred} className="bg-green-600 hover:bg-green-700 flex-1">
                  Туршилтын хугацаа
                </AlertDialogAction>

                <AlertDialogAction onClick={handleBonusTwoHundred} className="bg-green-600 hover:bg-green-700 flex-1">
                  Бүтэн цагаар
                </AlertDialogAction>
              </div>

              <AlertDialogCancel className="w-full">Цуцлах</AlertDialogCancel>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Татгалзах уу?</AlertDialogTitle>
            <AlertDialogDescription>
              Татгалзсан тохиолдолд <span className="font-semibold text-gray-600">санал болгосон ажилчинд</span> татгалзсан тухай мэдэгдэл очих болно.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Буцах</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject} className="bg-destructive hover:bg-destructive/90">
              Татгалзах
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Page;
