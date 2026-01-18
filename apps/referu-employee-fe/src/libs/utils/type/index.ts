export type HrPostedJobsType = {
  _id: string;
  jobTitle: string;
  jobDepartment: string;
  jobType: string;
  jobLevel: string;
  salaryMin: number;
  salaryMax: number;
  keyDuties: string[];
  requirements: string[];
  additionalNotes: string;
  requiredSkills: string[];
  benefits: string[];
  contactInfo: string;
  location: string;
  createdAt: string;
  updatedAt: string;
};
