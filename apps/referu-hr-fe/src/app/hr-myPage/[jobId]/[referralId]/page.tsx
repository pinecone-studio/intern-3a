'use client';

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
import { ArrowLeft, CheckCircle, FileText, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

type ReferralDetail = {
  id: string;

  employeeName: string;
  employeePhone: string;
  employeeEmail: string;
  employeeDepartment: string;
  employeeJobLevel: string;
  employeeJobType: string;
  relationshipWithCandidate: string;
  referralReason: string;
  consentReceived: boolean;
  currentlyWorking: boolean;

  candidateName: string;
  candidatePhone: string;
  candidateEmail: string;
  candidateLinkedIn: string;
  candidateCurrentEmployment: string;
  candidateInterestedField: string;
  cvUrl: string;

  submittedDate: string;
  status: 'SUBMITTED' | 'APPROVED' | 'REJECTED';
};

const mockReferralDetail: ReferralDetail = {
  id: '1',
  employeeName: 'Болд Бат',
  employeePhone: '9999-1111',
  employeeEmail: 'bold.bat@company.mn',
  employeeDepartment: 'Технологийн хэлтэс',
  employeeJobLevel: 'Senior',
  employeeJobType: 'Бүтэн цагийн',
  relationshipWithCandidate: 'Их сургуулийн найз',
  referralReason: 'Маш сайн програмист, багаар ажиллах чадвартай',
  consentReceived: true,
  currentlyWorking: true,

  candidateName: 'Дорж Цэцэг',
  candidatePhone: '9999-2222',
  candidateEmail: 'dorj.tsetseg@email.com',
  candidateLinkedIn: 'linkedin.com/in/dorj-tsetseg',
  candidateCurrentEmployment: 'ABC Tech Company - Software Developer',
  candidateInterestedField: 'Backend Development',
  cvUrl: '/sample-cv.pdf',

  submittedDate: '2026-01-12',
  status: 'SUBMITTED',
};

const Page = () => {
  const router = useRouter();

  const [showApproveDialog, setShowApproveDialog] = useState<boolean>(false);
  const [showRejectDialog, setShowRejectDialog] = useState<boolean>(false);
  const [status, setStatus] = useState<ReferralDetail['status']>(mockReferralDetail.status);

  const handleBackToReferrals = () => {
    router.back();
  };

  const handleApprove = () => {
    setStatus('APPROVED');
    toast.success('Амжилттай', {
      description: 'Санал зөвшөөрөгдлөө. Урамшууллын хүсэлт санхүү хэлтэст илгээгдлээ.',
    });

    setShowApproveDialog(false);
    setTimeout(() => router.back(), 1500);
  };

  const handleReject = () => {
    setStatus('REJECTED');
    toast.error('Татгалзлаа', {
      description: 'Татгалзсан тухай мэдэгдэл ажилчинд илгээгдлээ.',
    });

    setShowRejectDialog(false);
    setTimeout(() => router.back(), 1500);
  };

  return (
    <div className="flex flex-col gap-5 justify-center w-full p-7 pb-24">
      <div className="flex gap-4 items-center">
        <Button variant="ghost" onClick={handleBackToReferrals}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <p className="text-md font-semibold">Саналын дэлгэрэнгүй</p>
      </div>

      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Санал болгогч ажилтан</h2>
          {status !== 'SUBMITTED' && <Badge className={status === 'APPROVED' ? 'bg-green-500' : 'bg-red-500'}>{status === 'APPROVED' ? 'Зөвшөөрсөн' : 'Татгалзсан'}</Badge>}
        </div>

        <div className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Нэр:</span>
            <p className="font-medium mt-0.5">{mockReferralDetail.employeeName}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Утас:</span>
            <p className="font-medium mt-0.5">{mockReferralDetail.employeePhone}</p>
          </div>

          <div>
            <span className="text-muted-foreground">И-мэйл:</span>
            <p className="font-medium mt-0.5">{mockReferralDetail.employeeEmail}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Хэлтэс:</span>
            <p className="font-medium mt-0.5">{mockReferralDetail.employeeDepartment}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Түвшин:</span>
            <p className="font-medium mt-0.5">{mockReferralDetail.employeeJobLevel}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Ажлын төрөл:</span>
            <p className="font-medium mt-0.5">{mockReferralDetail.employeeJobType}</p>
          </div>

          <div className="pt-2 border-t border-border">
            <span className="text-muted-foreground">Нэр дэвшигчтэй харилцаа:</span>
            <p className="font-medium mt-0.5">{mockReferralDetail.relationshipWithCandidate}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Санал болгох шалтгаан:</span>
            <p className="font-medium mt-0.5">{mockReferralDetail.referralReason}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Зөвшөөрөл авсан:</span>
            <p className="font-medium mt-0.5">{mockReferralDetail.consentReceived ? 'Тийм' : 'Үгүй'}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Одоо ажиллаж байгаа:</span>
            <p className="font-medium mt-0.5">{mockReferralDetail.currentlyWorking ? 'Тийм' : 'Үгүй'}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 space-y-3">
        <h2 className="font-semibold">Нэр дэвшигчийн мэдээлэл</h2>

        <div className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Нэр:</span>
            <p className="font-medium mt-0.5">{mockReferralDetail.candidateName}</p>
          </div>

          <div>
            <span className="text-muted-foreground">Утас:</span>
            <p className="font-medium mt-0.5">{mockReferralDetail.candidatePhone}</p>
          </div>

          <div>
            <span className="text-muted-foreground">И-мэйл:</span>
            <p className="font-medium mt-0.5">{mockReferralDetail.candidateEmail}</p>
          </div>

          {mockReferralDetail.candidateLinkedIn && (
            <div>
              <span className="text-muted-foreground">LinkedIn:</span>
              <p className="font-medium mt-0.5">{mockReferralDetail.candidateLinkedIn}</p>
            </div>
          )}

          <div>
            <span className="text-muted-foreground">Одоогийн ажил:</span>
            <p className="font-medium mt-0.5">{mockReferralDetail.candidateCurrentEmployment}</p>
          </div>

          {mockReferralDetail.candidateInterestedField && (
            <div>
              <span className="text-muted-foreground">Сонирхсон чиглэл:</span>
              <p className="font-medium mt-0.5">{mockReferralDetail.candidateInterestedField}</p>
            </div>
          )}

          <div className="pt-2 border-t border-border">
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <a href={mockReferralDetail.cvUrl} target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4 mr-2" />
                Анкет үзэх (PDF)
              </a>
            </Button>
          </div>

          <div>
            <span className="text-muted-foreground">Илгээсэн огноо:</span>
            <p className="font-medium mt-0.5">{mockReferralDetail.submittedDate}</p>
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
              Нэр дэвшигчийг ажилд авах тохиолдолд урамшууллын хүсэлт санхүү хэлтэст илгээгдэх ба санал болгосон ажилчинд баталгаажуулалтын мэдэгдэл очих болно.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Цуцлах</AlertDialogCancel>
            <AlertDialogAction onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
              Ажилд авах
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Татгалзах уу?</AlertDialogTitle>
            <AlertDialogDescription> Татгалзсан тохиолдолд санал болгосон ажилчинд татгалзсан тухай мэдэгдэл очих болно.</AlertDialogDescription>
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
