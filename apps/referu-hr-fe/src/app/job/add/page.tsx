'use client';

import { useState } from 'react';
import { Bottom } from './_components/Bottom';
import { Form } from './_components/Form';
import { Header } from './_components/Header';

export default function AddJobPage() {
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

  return (
    <div>
      <Header />
      <Form formData={formData} setFormData={setFormData} />
      <Bottom formData={formData} />
    </div>
  );
}
