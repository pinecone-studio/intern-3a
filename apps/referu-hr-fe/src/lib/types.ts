export type JobDetail = {
  id: string;
  title: string;
  department: string;
  jobType: string;
  level: string;
  salaryMin: number;
  salaryMax: number;
  responsibilities: string;
  requirements: string;
  additionalInfo: string;
  skills: string;
  benefits: string;
  contactInfo: string;
  location: string;
  postedDate: string;
  hasReferrals: boolean;
};

export type Job = {
  id: string;
  title: string;
  department: string;
  postedDate: string;
  salaryMin: number;
  salaryMax: number;
  referralCount?: number;
};

export type FormData = {
  title: string;
  department: string;
  jobType: string;
  level: string;
  salaryMin: string;
  salaryMax: string;
  responsibilities: string;
  requirements: string;
  additionalInfo: string;
  skills: string;
  benefits: string;
  contactInfo: string;
  location: string;
};

export type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};
