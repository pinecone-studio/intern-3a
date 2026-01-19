'use client';

import { Card, CardContent, Checkbox, Label } from '@intern-3a/shadcn';
import React, { useState } from 'react';

export const ReferPageConfirmation = () => {
  const [hasCandidateConsent, setHasCandidateConsent] = useState<boolean>(false);
  const [isNotCurrentEmployee, setIsNotCurrentEmployee] = useState<boolean>(false);

  console.log({ hasCandidateConsent });
  console.log({ isNotCurrentEmployee });

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="text-lg font-semibold">Баталгаажуулах хэсэг</div>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex gap-2 items-center">
            <Checkbox id="hasCandidateConsent" checked={hasCandidateConsent} onCheckedChange={(checked) => setHasCandidateConsent(checked as boolean)} required />

            <div>
              <Label htmlFor="hasCandidateConsent" className="font-normal text-muted-foreground">
                <p>
                  Санал болгож буй хүний зөвшөөрлийг урьдчилан авсан.<span className="text-destructive ml-2">*</span>
                </p>
              </Label>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <Checkbox id="isNotCurrentEmployee" checked={isNotCurrentEmployee} onCheckedChange={(checked) => setIsNotCurrentEmployee(checked as boolean)} />
            <Label className="font-normal text-muted-foreground">
              <p>
                Санал болгож буй хүн одоо энэхүү компанид ажилладаггүй.<span className="text-destructive ml-2">*</span>
              </p>
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
