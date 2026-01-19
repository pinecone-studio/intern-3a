import { Card, CardContent } from '@intern-3a/shadcn';
import { HrPostedJobsType } from 'apps/referu-employee-fe/src/libs/utils/type';
import React from 'react';

export const JobCardDetailPartMain = ({ selectedJob }: { selectedJob: HrPostedJobsType }) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Гүйцэтгэх үндсэн үүрэг</h3>
          <div className="flex flex-col gap-2 text-sm">
            {selectedJob.keyDuties.map((duty) => (
              <div key={duty} className="flex gap-2 items-center">
                <span className="text-[#005295]">•</span>
                <span className="text-muted-foreground">{duty}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Ажлын байранд тавигдах шаардлага</h3>
          <div className="flex flex-col gap-2 text-sm">
            {selectedJob.requirements.map((requirement) => (
              <div key={requirement} className="flex gap-2 items-center">
                <span className="text-[#005295]">•</span>
                <span className="text-muted-foreground">{requirement}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Нэмэлт мэдээлэл</h3>
          <div className="flex gap-2 text-sm items-center">
            <span className="text-[#005295]">•</span>
            <span className="text-muted-foreground">{selectedJob.additionalNotes}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Шаардлагатай ур чадварууд</h3>
          <div className="flex flex-col gap-2 text-sm">
            {selectedJob.requiredSkills.map((skill) => (
              <div key={skill} className="flex gap-2 items-center">
                <span className="text-[#005295]">•</span>
                <span className="text-muted-foreground">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Хангамж урамшуулал</h3>
          <div className="flex flex-col gap-2 text-sm">
            {selectedJob.benefits.map((benefit) => (
              <div key={benefit} className="flex gap-2 items-center">
                <span className="text-[#005295]">•</span>
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
