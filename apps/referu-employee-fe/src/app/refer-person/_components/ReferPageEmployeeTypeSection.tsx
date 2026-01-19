'use client';
import { Card, CardContent, Input, Label, Textarea } from '@intern-3a/shadcn';
import React, { useState } from 'react';

export const ReferPageEmployeeTypeSection = () => {
  const [relationWithCandidate, setRelationWithCandidate] = useState('');
  const [refferalReason, setRefferalReason] = useState('');

  console.log({ relationWithCandidate });
  console.log({ refferalReason });
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label className="font-normal">
            Холбоо хамаарал
            <span className="text-destructive">*</span>
          </Label>
          <Input value={relationWithCandidate} onChange={(e) => setRelationWithCandidate(e.target.value)} className="text-sm" />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="font-normal">
            Санал болгож байгаа үндэслэл
            <span className="text-destructive">*</span>
          </Label>
          <Textarea value={refferalReason} onChange={(e) => setRefferalReason(e.target.value)} className="text-sm" />
        </div>
      </CardContent>
    </Card>
  );
};
