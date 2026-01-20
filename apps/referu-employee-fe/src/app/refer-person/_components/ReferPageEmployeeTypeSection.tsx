'use client';
import { Card, CardContent, Input, Label, Textarea } from '@intern-3a/shadcn';
import { relationOptions } from 'apps/referu-employee-fe/src/libs/utils/relation-options';
import React, { useState } from 'react';

export const ReferPageEmployeeTypeSection = () => {
  const [relationWithCandidate, setRelationWithCandidate] = useState('');
  const [refferalReason, setRefferalReason] = useState('');

  console.log({ relationWithCandidate });
  console.log({ refferalReason });
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="text-lg font-semibold">Холбоо хамаарал үндэслэл шалтгаан</div>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex flex-col gap-2">
            <Label htmlFor="relationWithCandidate" className="font-normal">
              <p>
                Та санал болгож буй хүнтэй ямар хамааралтай вэ?<span className="text-destructive ml-1.5">*</span>
              </p>
            </Label>
            <Input
              id="relationWithCandidate"
              list="recommendedRelationOptions"
              value={relationWithCandidate}
              onChange={(e) => setRelationWithCandidate(e.target.value)}
              className="text-sm"
              placeholder="Сонгох / оруулах"
            />
            <datalist id="recommendedRelationOptions">
              {relationOptions.map((relation) => (
                <option key={relation.value} value={relation.label} />
              ))}
            </datalist>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-normal">
              <p>
                Дээрх ажлын байранд тухайн хүнийг санал болгож буй шалтгаанаа бичнэ үү.<span className="text-destructive ml-1.5">*</span>
              </p>
            </Label>
            <Textarea value={refferalReason} onChange={(e) => setRefferalReason(e.target.value)} className="text-sm" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
