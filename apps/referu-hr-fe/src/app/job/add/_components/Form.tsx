import { Props } from '@/lib/types';
import { Card, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@intern-3a/shadcn';
import React from 'react';

export const Form = ({ formData, setFormData }: Props) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="p-4 pb-24 space-y-4">
        <Card className="p-5 space-y-5 rounded-xl shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Албан тушаал <span className="text-destructive">*</span>
            </label>
            <Input value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} placeholder="Жишээ: Senior Software Engineer" className="bg-input" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Хэлтэс <span className="text-destructive">*</span>
            </label>
            <Input value={formData.department} onChange={(e) => handleInputChange('department', e.target.value)} placeholder="Жишээ: Технологийн алба" className="bg-input" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Ажлын төрөл <span className="text-destructive">*</span>
            </label>
            <Select value={formData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
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
            <Select value={formData.level} onValueChange={(value) => handleInputChange('level', value)}>
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
              <Input type="number" value={formData.salaryMin} onChange={(e) => handleInputChange('salaryMin', e.target.value)} placeholder="Доод" className="bg-input" />
              <span className="text-muted-foreground">-</span>
              <Input type="number" value={formData.salaryMax} onChange={(e) => handleInputChange('salaryMax', e.target.value)} placeholder="Дээд" className="bg-input" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Үндсэн үүрэг хариуцлага <span className="text-destructive">*</span>
            </label>
            <Textarea
              value={formData.responsibilities}
              onChange={(e) => handleInputChange('responsibilities', e.target.value)}
              placeholder="Үндсэн үүрэг хариуцлагыг оруулна уу"
              rows={4}
              className="bg-input"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Шаардлага <span className="text-destructive">*</span>
            </label>
            <Textarea value={formData.requirements} onChange={(e) => handleInputChange('requirements', e.target.value)} placeholder="Шаардлагыг оруулна уу" rows={4} className="bg-input" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Нэмэлт мэдээлэл</label>
            <Textarea value={formData.additionalInfo} onChange={(e) => handleInputChange('additionalInfo', e.target.value)} placeholder="Нэмэлт мэдээлэл" rows={3} className="bg-input" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Шаардлагатай ур чадвар <span className="text-destructive">*</span>
            </label>
            <Input value={formData.skills} onChange={(e) => handleInputChange('skills', e.target.value)} placeholder="Жишээ: React, TypeScript, Node.js" className="bg-input" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Урамшуулал & нэмэгдэл <span className="text-destructive">*</span>
            </label>
            <Textarea value={formData.benefits} onChange={(e) => handleInputChange('benefits', e.target.value)} placeholder="Урамшуулал, нэмэгдэл олголт" rows={3} className="bg-input" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Холбоо барих мэдээлэл <span className="text-destructive">*</span>
            </label>
            <Input value={formData.contactInfo} onChange={(e) => handleInputChange('contactInfo', e.target.value)} placeholder="И-мэйл эсвэл утас" className="bg-input" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Байршил <span className="text-destructive">*</span>
            </label>
            <Input value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)} placeholder="Жишээ: Улаанбаатар хот" className="bg-input" />
          </div>
        </Card>
      </div>
    </div>
  );
};
