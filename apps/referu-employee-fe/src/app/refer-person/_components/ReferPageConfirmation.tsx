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
      <CardContent className="flex flex-col gap-4">
        <div className="text-lg font-semibold">Баталгаажуулалт</div>
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex gap-2">
            <Checkbox id="hasCandidateConsent" checked={hasCandidateConsent} onCheckedChange={(checked) => setHasCandidateConsent(checked as boolean)} required />
            <Label htmlFor="hasCandidateConsent" className="font-normal text-muted-foreground">
              Санал болгож буй хүнээс өөрөөс нь зөвшөөрөл авсан.
              <span className="text-destructive">*</span>
            </Label>
          </div>

          <div className="flex gap-2">
            <Checkbox id="isNotCurrentEmployee" checked={isNotCurrentEmployee} onCheckedChange={(checked) => setIsNotCurrentEmployee(checked as boolean)} />
            <Label className="font-normal text-muted-foreground flex-1">
              Санал болгож буй хүн одоо энэ компанид ажилладагүй.<span className="text-destructive">*</span>
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
