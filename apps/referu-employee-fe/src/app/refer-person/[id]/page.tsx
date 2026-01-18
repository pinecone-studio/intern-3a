'use client';

import React, { use } from 'react';
import { ReferPageCandidateDetail, ReferPageEmployeeDetail, ReferPageFooterNav, ReferPageHeading } from '../_components';

export default function ReferPersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <div className="w-full h-full flex flex-col pb-20">
      <ReferPageHeading />

      <div>{id}</div>

      <div className="p-5 flex flex-col gap-3">
        <ReferPageEmployeeDetail />
        <ReferPageCandidateDetail />
      </div>

      <ReferPageFooterNav />
    </div>
  );
}
