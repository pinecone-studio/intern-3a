import { JobDetail } from '@/lib/types';
import { Card } from '@intern-3a/shadcn';
import React from 'react';

type Props = {
  jobDetail: JobDetail;
};

export const Content = ({ jobDetail }: Props) => {
  return (
    <div>
      <div className="p-4 pb-24 space-y-4">
        <Card className="p-5 space-y-4 rounded-xl shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-foreground">{jobDetail.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{jobDetail.department}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Ажлын төрөл:</span>
              <p className="font-medium text-foreground mt-1">{jobDetail.jobType}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Түвшин:</span>
              <p className="font-medium text-foreground mt-1">{jobDetail.level}</p>
            </div>
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Цалин:</span>
            <p className="font-semibold text-primary text-lg mt-1">
              ₮{jobDetail.salaryMin.toLocaleString()} - ₮{jobDetail.salaryMax.toLocaleString()}
            </p>
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Нийтэлсэн огноо:</span>
            <p className="font-medium text-foreground mt-1">{jobDetail.postedDate}</p>
          </div>

          <div className="pt-3 border-t border-border">
            <h3 className="font-semibold text-foreground mb-2">Үндсэн үүрэг хариуцлага</h3>
            <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{jobDetail.responsibilities}</p>
          </div>

          <div className="pt-3 border-t border-border">
            <h3 className="font-semibold text-foreground mb-2">Шаардлага</h3>
            <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{jobDetail.requirements}</p>
          </div>

          <div className="pt-3 border-t border-border">
            <h3 className="font-semibold text-foreground mb-2">Шаардлагатай ур чадвар</h3>
            <p className="text-sm text-foreground">{jobDetail.skills}</p>
          </div>

          <div className="pt-3 border-t border-border">
            <h3 className="font-semibold text-foreground mb-2">Урамшуулал & нэмэгдэл</h3>
            <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{jobDetail.benefits}</p>
          </div>

          <div className="pt-3 border-t border-border">
            <h3 className="font-semibold text-foreground mb-2">Нэмэлт мэдээлэл</h3>
            <p className="text-sm text-foreground">{jobDetail.additionalInfo}</p>
          </div>

          <div className="pt-3 border-t border-border">
            <h3 className="font-semibold text-foreground mb-2">Холбоо барих</h3>
            <p className="text-sm text-foreground">{jobDetail.contactInfo}</p>
          </div>

          <div className="pt-3 border-t border-border">
            <h3 className="font-semibold text-foreground mb-2">Байршил</h3>
            <p className="text-sm text-foreground">{jobDetail.location}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
