'use client';

import React, { use } from 'react';
import { ReferPageCandidateDetail, ReferPageConfirmation, ReferPageEmployeeDetail, ReferPageEmployeeTypeSection, ReferPageFooterNav, ReferPageHeading } from '../_components';

export default function ReferPersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  console.log({ id });

  return (
    <div className="w-full h-full flex flex-col pb-20">
      <ReferPageHeading />

      <div className="p-5 flex flex-col gap-3">
        <ReferPageEmployeeDetail />
        <ReferPageCandidateDetail />
        <ReferPageConfirmation />
        <ReferPageEmployeeTypeSection />
      </div>

      <ReferPageFooterNav />
    </div>
  );
}
