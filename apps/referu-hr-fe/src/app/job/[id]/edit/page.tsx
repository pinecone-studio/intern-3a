'use client';

import { mockJobData } from '@/lib/get-data';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Bottom } from './_components/Bottom';
import { EditForm } from './_components/EditForm';
import { Header } from './_components/Header';

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    jobType: '',
    level: '',
    salaryMin: '',
    salaryMax: '',
    responsibilities: '',
    requirements: '',
    additionalInfo: '',
    skills: '',
    benefits: '',
    contactInfo: '',
    location: '',
  });

  const [hasReferrals, setHasReferrals] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const job = mockJobData[params.id as string];

    if (job) {
      setFormData({
        title: job.title,
        department: job.department,
        jobType: job.jobType,
        level: job.level,
        salaryMin: String(job.salaryMin),
        salaryMax: String(job.salaryMax),
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        additionalInfo: job.additionalInfo,
        skills: job.skills,
        benefits: job.benefits,
        contactInfo: job.contactInfo,
        location: job.location,
      });
      setHasReferrals(job.hasReferrals);
    }

    setIsLoading(false);
  }, [params.id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast.success('Зар амжилттай хадгалагдлаа 🎉');
    setTimeout(() => {
      router.push(`/job/${params.id}`);
    }, 600);
  };

  const handleCancel = () => {
    router.push(`/job/${params.id}`);
  };

  if (isLoading) {
    return <div className="p-4">Ачааллаж байна...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <EditForm formData={formData} hasReferrals={hasReferrals} onChange={handleInputChange} />

      <Bottom hasReferrals={hasReferrals} onCancel={handleCancel} onSave={handleSave} />
    </div>
  );
}
