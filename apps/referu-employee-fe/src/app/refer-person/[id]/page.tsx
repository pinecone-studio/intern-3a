'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { Button } from '@intern-3a/shadcn';
import { EmployeeType } from 'apps/referu-employee-fe/src/libs/type';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ReferPageCandidateDetail, ReferPageConfirmation, ReferPageEmployeeDetail, ReferPageEmployeeTypeSection, ReferPageHeading } from '../_components';

export default function ReferPersonPage({ params }: { params: Promise<{ id: string }> }) {
  const [candidateLastName, setCandidateLastName] = useState<string>('');
  const [candidateFirstName, setCandidateFirstName] = useState<string>('');
  const [candidateTelNumber, setCandidateTelNumber] = useState<string>('');
  const [candidateEmail, setCandidateEmail] = useState<string>('');
  const [candidateLinkedinUrl, setCandidateLinkedinUrl] = useState<string>('');
  const [candidateFieldOfInterest, setCandidateFieldOfInterest] = useState<string>('');
  const [candidateCurrentStatus, setCandidateCurrentStatus] = useState<string>('');
  const [candidateResume, setCandidateResume] = useState<File | undefined>();
  const [resumeFilePreview, setResumeFilePreview] = useState<string>('');
  const [hasCandidateConsent, setHasCandidateConsent] = useState<boolean>(false);
  const [isNotCurrentEmployee, setIsNotCurrentEmployee] = useState<boolean>(false);
  const [relationWithCandidate, setRelationWithCandidate] = useState('');
  const [refferalReason, setRefferalReason] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = use(params);
  const router = useRouter();
  const { user } = useUser();
  const [employeeData, setEmployeeData] = useState<EmployeeType>();
  const { getToken } = useAuth();
  console.log({ id });

  useEffect(() => {
    if (!user) return;

    const getEmployeeData = async () => {
      try {
        const token = await getToken();
        console.log({ token });
        const res = await axios.get('http://localhost:4000/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEmployeeData(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getEmployeeData();
  }, [user]);

  const handleSendReferRequest = async () => {
    try {
      if (!candidateResume) {
        toast.warning('Анкетаа хавсаргана уу!');
      } else if (!hasCandidateConsent) {
        toast.warning('Санал болгож буй хүний зөвшөөрлийг урьдчилан авсан байх ёстой!');
      } else if (
        !candidateLastName ||
        !candidateFirstName ||
        !candidateTelNumber ||
        !candidateEmail ||
        !candidateCurrentStatus ||
        !isNotCurrentEmployee! ||
        !relationWithCandidate ||
        !refferalReason
      ) {
        toast.warning('Бүх шаардлагатай талбарыг бөглөнө үү!');
      }

      setLoading(true);
      const newFormData = new FormData();
      newFormData.append('postedJobId', id);
      newFormData.append('referringEmployeeId', employeeData?._id!);
      newFormData.append('candidateLastName', candidateLastName);
      newFormData.append('candidateFirstName', candidateFirstName);
      newFormData.append('candidateTelNumber', candidateTelNumber);
      newFormData.append('candidateEmail', candidateEmail);
      newFormData.append('candidateLinkedinUrl', candidateLinkedinUrl);
      newFormData.append('candidateFieldOfInterest', candidateFieldOfInterest);
      newFormData.append('candidateCurrentStatus', candidateCurrentStatus);
      newFormData.append('candidateResume', candidateResume as File);
      newFormData.append('hasCandidateConsent', String(hasCandidateConsent));
      newFormData.append('isNotCurrentEmployee', String(isNotCurrentEmployee));
      newFormData.append('relationWithCandidate', relationWithCandidate);
      newFormData.append('refferalReason', refferalReason);

      await axios.post('http://localhost:4000/referral', newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Санал амжилттай илгээгдлээ');
      router.push('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col pb-20">
      <ReferPageHeading />

      <div className="p-5 flex flex-col gap-3">
        <div className="px-5"> {employeeData && <ReferPageEmployeeDetail employeeData={employeeData} />}</div>

        <ReferPageCandidateDetail
          candidateLastName={candidateLastName}
          setCandidateLastName={setCandidateLastName}
          candidateFirstName={candidateFirstName}
          setCandidateFirstName={setCandidateFirstName}
          candidateTelNumber={candidateTelNumber}
          setCandidateTelNumber={setCandidateTelNumber}
          candidateEmail={candidateEmail}
          setCandidateEmail={setCandidateEmail}
          candidateLinkedinUrl={candidateLinkedinUrl}
          setCandidateLinkedinUrl={setCandidateLinkedinUrl}
          candidateFieldOfInterest={candidateFieldOfInterest}
          setCandidateFieldOfInterest={setCandidateFieldOfInterest}
          candidateCurrentStatus={candidateCurrentStatus}
          setCandidateCurrentStatus={setCandidateCurrentStatus}
          candidateResume={candidateResume}
          setCandidateResume={setCandidateResume}
          resumeFilePreview={resumeFilePreview}
          setResumeFilePreview={setResumeFilePreview}
        />
        <ReferPageConfirmation
          hasCandidateConsent={hasCandidateConsent}
          setHasCandidateConsent={setHasCandidateConsent}
          isNotCurrentEmployee={isNotCurrentEmployee}
          setIsNotCurrentEmployee={setIsNotCurrentEmployee}
        />
        <ReferPageEmployeeTypeSection
          relationWithCandidate={relationWithCandidate}
          setRelationWithCandidate={setRelationWithCandidate}
          refferalReason={refferalReason}
          setRefferalReason={setRefferalReason}
        />
      </div>

      {/* <ReferPageFooterNav /> */}
      <div className="h-18 fixed bottom-0 left-0 right-0 flex items-center gap-3 bg-card border-t border-border/50 shadow-lg z-50 px-5">
        <Button onClick={() => router.back()} variant={'outline'} className="flex-1 cursor-pointer">
          Буцах
        </Button>
        <Button disabled={loading} onClick={handleSendReferRequest} className="bg-[#005295] hover:bg-[#005295]/90 flex-1 cursor-pointer">
          Илгээх
        </Button>
      </div>
    </div>
  );
}
