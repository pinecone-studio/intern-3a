'use client';

import { Button, Card, CardContent, Input, Label } from '@intern-3a/shadcn';
import { Upload, X } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';

export const ReferPageCandidateDetail = () => {
  const [candidateLastName, setCandidateLastName] = useState<string>('');
  const [candidateFirstName, setCandidateFirstName] = useState<string>('');
  const [candidateTelNumber, setCandidateTelNumber] = useState<string>('');
  const [candidateEmail, setCandidateEmail] = useState<string>('');
  const [candidateLinkedinUrl, setCandidateLinkedinUrl] = useState<string>('null');
  const [candidateResume, setCandidateResume] = useState<File | undefined>();
  const [resumeFilePreview, setResumeFilePreview] = useState<string>('');

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
  console.log({ candidateResume });
  console.log({ resumeFilePreview });

  return (
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
              Имэйл
              <span className="text-destructive">*</span>
            </Label>
            <Input value={candidateEmail} onChange={(e) => setCandidateEmail(e.target.value)} className="text-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-normal">Linkedin</Label>
            <Input value={candidateLinkedinUrl} onChange={(e) => setCandidateLinkedinUrl(e.target.value)} className="text-sm px-4 py-3" />
          </div>
          <div className="flex flex-col gap-2 relative">
            <Label className="font-normal">
              Анкет (PDF)
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
                <iframe src={resumeFilePreview} className="w-full h-[400px] border rounded-md relative" />
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
  );
};
