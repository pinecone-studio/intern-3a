import { Card, CardContent } from '@intern-3a/shadcn';
import { HrPostedJobsType } from 'apps/referu-employee-fe/src/libs/utils/type';
import { MapPin, Send } from 'lucide-react';
import React from 'react';

export const JobCardDetailPartInfo = ({ selectedJob }: { selectedJob: HrPostedJobsType }) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Холбоо барих</h3>
          <div className="flex gap-2 text-sm items-center">
            <Send size={16} className="text-[#005295] hover:text-black cursor-pointer transition-all duration-300"></Send>
            <span className="text-muted-foreground">{selectedJob.contactInfo}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Байршил</h3>
          <div className="flex gap-2 text-sm items-center">
            <MapPin size={16} className="text-[#005295] hover:text-black cursor-pointer transition-all duration-300" />
            <span className="text-muted-foreground">{selectedJob.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
