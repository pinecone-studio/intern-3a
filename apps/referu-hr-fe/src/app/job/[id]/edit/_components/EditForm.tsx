import { Alert, AlertDescription, Card, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@intern-3a/shadcn';
import { Info } from 'lucide-react';
import React from 'react';

type Props = {
  formData: any;
  hasReferrals: boolean;
  onChange: (field: string, value: string) => void;
};

export const EditForm = ({ formData, hasReferrals, onChange }: Props) => {
  return (
    <div>
      <div className="p-4 pb-24 space-y-4">
        {hasReferrals && (
          <Alert className="bg-amber-50 border-amber-200 text-amber-900">
            <Info className="h-4 w-4" />
            <AlertDescription>Санал ирсэн зарыг засварлах боломжгүй</AlertDescription>
          </Alert>
        )}

        <Card className="p-5 space-y-5 rounded-xl shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Албан тушаал <span className="text-destructive">*</span>
            </label>
            <Input value={formData.title} onChange={(e) => onChange('title', e.target.value)} disabled={hasReferrals} placeholder="Жишээ: Senior Software Engineer" className="bg-input" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Хэлтэс <span className="text-destructive">*</span>
            </label>
            <Input value={formData.department} onChange={(e) => onChange('department', e.target.value)} disabled={hasReferrals} placeholder="Жишээ: Технологийн алба" className="bg-input" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Ажлын төрөл <span className="text-destructive">*</span>
            </label>
            <Select value={formData.jobType} onValueChange={(value) => onChange('jobType', value)} disabled={hasReferrals}>
              <SelectTrigger className="bg-input">
                <SelectValue placeholder="Сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Бүтэн цагийн</SelectItem>
                <SelectItem value="part-time">Хагас цагийн</SelectItem>
                <SelectItem value="contract">Гэрээт</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Түвшин <span className="text-destructive">*</span>
            </label>
            <Select value={formData.level} onValueChange={(value) => onChange('level', value)} disabled={hasReferrals}>
              <SelectTrigger className="bg-input">
                <SelectValue placeholder="Сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="mid">Mid-level</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Цалингийн хүрээ <span className="text-destructive">*</span>
            </label>
            <div className="flex gap-2 items-center">
              <Input type="number" value={formData.salaryMin} onChange={(e) => onChange('salaryMin', e.target.value)} disabled={hasReferrals} placeholder="Доод" className="bg-input" />
              <span className="text-muted-foreground">-</span>
              <Input type="number" value={formData.salaryMax} onChange={(e) => onChange('salaryMax', e.target.value)} disabled={hasReferrals} placeholder="Дээд" className="bg-input" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Үндсэн үүрэг хариуцлага <span className="text-destructive">*</span>
            </label>
            <Textarea
              value={formData.responsibilities}
              onChange={(e) => onChange('responsibilities', e.target.value)}
              disabled={hasReferrals}
              placeholder="Үндсэн үүрэг хариуцлагыг оруулна уу"
              rows={4}
              className="bg-input"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Шаардлага <span className="text-destructive">*</span>
            </label>
            <Textarea
              value={formData.requirements}
              onChange={(e) => onChange('requirements', e.target.value)}
              disabled={hasReferrals}
              placeholder="Шаардлагыг оруулна уу"
              rows={4}
              className="bg-input"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Нэмэлт мэдээлэл</label>
            <Textarea
              value={formData.additionalInfo}
              onChange={(e) => onChange('additionalInfo', e.target.value)}
              disabled={hasReferrals}
              placeholder="Нэмэлт мэдээлэл"
              rows={3}
              className="bg-input"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Шаардлагатай ур чадвар <span className="text-destructive">*</span>
            </label>
            <Input value={formData.skills} onChange={(e) => onChange('skills', e.target.value)} disabled={hasReferrals} placeholder="Жишээ: React, TypeScript, Node.js" className="bg-input" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Урамшуулал & нэмэгдэл <span className="text-destructive">*</span>
            </label>
            <Textarea
              value={formData.benefits}
              onChange={(e) => onChange('benefits', e.target.value)}
              disabled={hasReferrals}
              placeholder="Урамшуулал, нэмэгдэл олголт"
              rows={3}
              className="bg-input"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Холбоо барих мэдээлэл <span className="text-destructive">*</span>
            </label>
            <Input value={formData.contactInfo} onChange={(e) => onChange('contactInfo', e.target.value)} disabled={hasReferrals} placeholder="И-мэйл эсвэл утас" className="bg-input" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Байршил <span className="text-destructive">*</span>
            </label>
            <Input value={formData.location} onChange={(e) => onChange('location', e.target.value)} disabled={hasReferrals} placeholder="Жишээ: Улаанбаатар хот" className="bg-input" />
          </div>
        </Card>
      </div>
    </div>
  );
};
