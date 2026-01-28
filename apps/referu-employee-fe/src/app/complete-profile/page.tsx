'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from '@intern-3a/shadcn';
import axios from 'axios';
import { Loader, NotebookPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { jobLevelOptions } from '../../libs/utils/job-level-options';
import { jobTypeOptions } from '../../libs/utils/job-type-options';

export default function CompleteProfilePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { getToken } = useAuth();

  const [form, setForm] = useState({
    employeeTelNumber: '',
    employeeDepartment: '',
    employeeJobTitle: '',
    employeeJobLevel: '',
    employeeJobType: '',
  });

  console.log({ form });
  const handleSaveUserInfo = async () => {
    try {
      const token = await getToken();

      await axios.post('http://localhost:4000/user', form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Мэдээлэл амжилттай хадгалагдлаа!');
      router.push('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Алдаа гарлаа');
    }
  };
  if (!isLoaded)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader className="animate-spin" size={32} />
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-20">
      <div className="min-w-100 h-screen">
        <Card className="gap-10">
          <CardHeader className="gap-0">
            <CardTitle className="text-lg font-semibold flex justify-center items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#005295]/10 hover:bg-[#005295]/5 transition-all delay-300 flex items-center justify-center cursor-pointer">
                <NotebookPen size={20} className="text-[#005295]" />
              </div>
              <p>Холбогдох мэдээлэл оруулах</p>
            </CardTitle>
            <CardDescription hidden></CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-2">
                <Label className="font-normal">
                  Утасны дугаар
                  <span className="text-destructive">*</span>
                </Label>
                <Input value={form.employeeTelNumber} onChange={(e) => setForm({ ...form, employeeTelNumber: e.target.value })} className="text-sm" />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-normal">
                  Хэлтэс
                  <span className="text-destructive">*</span>
                </Label>
                <Input value={form.employeeDepartment} onChange={(e) => setForm({ ...form, employeeDepartment: e.target.value })} className="text-sm" />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-normal">
                  Албан тушаал
                  <span className="text-destructive">*</span>
                </Label>
                <Input value={form.employeeJobTitle} onChange={(e) => setForm({ ...form, employeeJobTitle: e.target.value })} className="text-sm" />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-normal">
                  Түвшин
                  <span className="text-destructive">*</span>
                </Label>

                <Input
                  list="jobLevelOptions"
                  value={form.employeeJobLevel}
                  onChange={(e) => setForm({ ...form, employeeJobLevel: e.target.value })}
                  className="text-sm"
                  placeholder="Сонгох / оруулах"
                />
                <datalist id="jobLevelOptions">
                  {jobLevelOptions.map((level) => (
                    <option key={level.value} value={level.label}>
                      {level.label}
                    </option>
                  ))}
                </datalist>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-normal">
                Төрөл
                <span className="text-destructive">*</span>
              </Label>
              <Input list="jobTypeOptions" value={form.employeeJobType} onChange={(e) => setForm({ ...form, employeeJobType: e.target.value })} className="text-sm" placeholder="Сонгох / оруулах" />
              <datalist id="jobTypeOptions">
                {jobTypeOptions.map((type) => (
                  <option key={type.value} value={type.label}>
                    {type.label}
                  </option>
                ))}
              </datalist>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex items-center gap-3 bg-card">
              <Button onClick={() => router.back()} variant={'outline'} className="flex-1 cursor-pointer">
                Буцах
              </Button>
              <Button onClick={handleSaveUserInfo} className="bg-[#005295] hover:bg-[#005295]/90 flex-1 cursor-pointer">
                Хадгалах
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
