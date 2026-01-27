'use client';

import { Button, Card, CardContent, Input, Label } from '@intern-3a/shadcn';
import { statusOptions } from 'apps/referu-employee-fe/src/libs/utils/status-options ';
import { Upload, X } from 'lucide-react';
import React, { ChangeEvent, Dispatch } from 'react';

export const ReferPageCandidateDetail = ({
  candidateLastName,
  setCandidateLastName,
  candidateFirstName,
  setCandidateFirstName,
  candidateTelNumber,
  setCandidateTelNumber,
  candidateEmail,
  setCandidateEmail,
  candidateLinkedinUrl,
  setCandidateLinkedinUrl,
  candidateFieldOfInterest,
  setCandidateFieldOfInterest,
  candidateCurrentStatus,
  setCandidateCurrentStatus,
  candidateResume,
  setCandidateResume,
  resumeFilePreview,
  setResumeFilePreview,
}: {
  candidateLastName: string;
  setCandidateLastName: Dispatch<React.SetStateAction<string>>;
  candidateFirstName: string;
  setCandidateFirstName: Dispatch<React.SetStateAction<string>>;
  candidateTelNumber: string;
  setCandidateTelNumber: Dispatch<React.SetStateAction<string>>;
  candidateEmail: string;
  setCandidateEmail: Dispatch<React.SetStateAction<string>>;
  candidateLinkedinUrl: string;
  setCandidateLinkedinUrl: Dispatch<React.SetStateAction<string>>;
  candidateFieldOfInterest: string;
  setCandidateFieldOfInterest: Dispatch<React.SetStateAction<string>>;
  candidateCurrentStatus: string;
  setCandidateCurrentStatus: Dispatch<React.SetStateAction<string>>;
  candidateResume: File | undefined;
  setCandidateResume: Dispatch<React.SetStateAction<File | undefined>>;
  resumeFilePreview: string;
  setResumeFilePreview: Dispatch<React.SetStateAction<string>>;
}) => {
  const resumeFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCandidateResume(e.target.files[0]);
      setResumeFilePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  console.log({ candidateLastName });
  console.log({ candidateFirstName });
  console.log({ candidateTelNumber });
  console.log({ candidateEmail });
  console.log({ candidateLinkedinUrl });
  console.log({ candidateFieldOfInterest });
  console.log({ candidateCurrentStatus });
  console.log({ candidateResume });
  console.log({ resumeFilePreview });

  return (
    <div className="p-5 flex flex-col gap-3">
      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="text-lg font-semibold">Санал болгож буй хүний мэдээлэл</div>

          <div className="flex flex-col gap-4 text-sm">
            <div className="flex flex-col gap-2">
              <Label className="font-normal">
                Овог
                <span className="text-destructive">*</span>
              </Label>
              <Input value={candidateLastName} onChange={(e) => setCandidateLastName(e.target.value)} className="text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-normal">
                Нэр
                <span className="text-destructive">*</span>
              </Label>
              <Input value={candidateFirstName} onChange={(e) => setCandidateFirstName(e.target.value)} className="text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-normal">
                Утасны дугаар
                <span className="text-destructive">*</span>
              </Label>
              <Input value={candidateTelNumber} onChange={(e) => setCandidateTelNumber(e.target.value)} className="text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-normal">
                И-мэйл хаяг
                <span className="text-destructive">*</span>
              </Label>
              <Input value={candidateEmail} onChange={(e) => setCandidateEmail(e.target.value)} className="text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-normal">Linkedin хаяг</Label>
              <Input value={candidateLinkedinUrl} onChange={(e) => setCandidateLinkedinUrl(e.target.value)} className="text-sm px-4 py-3" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-normal">Сонирхож буй ажлын чиглэл</Label>
              <Input value={candidateFieldOfInterest} onChange={(e) => setCandidateFieldOfInterest(e.target.value)} className="text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="candidateCurrentStatus" className="font-normal">
                Одоогийн ажил эрхлэлтийн байдал
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="candidateCurrentStatus"
                list="recommendedStatusOptions"
                value={candidateCurrentStatus}
                onChange={(e) => setCandidateCurrentStatus(e.target.value)}
                className="text-sm"
                placeholder="Сонгох / оруулах"
              />
              <datalist id="recommendedStatusOptions">
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.label} />
                ))}
              </datalist>
            </div>
            <div className="flex flex-col gap-2 relative">
              <Label className="font-normal">
                Анкет (PDF) хавсаргах
                <span className="text-destructive">*</span>
              </Label>
              <div>
                <Input id="resume-upload" type="file" accept="application/pdf" onChange={resumeFileChangeHandler} className="hidden" />
                <label
                  htmlFor="resume-upload"
                  className="flex items-center justify-center gap-2 cursor-pointer rounded-md border border-dashed border-[#005295] px-4 py-2 text-sm text-[#005295] bg-[#005295]/5 hover:bg-[#005295]/10 transition-all"
                >
                  <Upload size={16} />
                  <span>{candidateResume ? candidateResume.name : 'Файл сонгох'}</span>
                </label>
              </div>

              {candidateResume ? (
                <>
                  <iframe src={resumeFilePreview} className="w-full h-100 border rounded-md relative" />
                  <Button onClick={() => setCandidateResume(undefined)} variant={'outline'} className="absolute w-8 h-8 rounded-full right-2 bottom-2 cursor-pointer">
                    <X />
                  </Button>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
