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

export type EmployeeType = {
  _id: string;
  employeeClerkId: string;
  employeeFirstName: string;
  employeeLastName: string;
  employeeTelNumber: string;
  employeeEmail: string;
  employeeDepartment: string;
  employeeJobTitle: string;
  employeeJobType: string;
  employeeJobLevel: string;
  createdAt: string;
  updatedAt: string;
};

export type ReferralType = {
  _id: string;
  postedJobId: string;
  referringEmployeeId: string;
  relationWithCandidate: string;
  refferalReason: string;
  candidateFirstName: string;
  candidateLastName: string;
  candidateTelNumber: string;
  candidateEmail: string;
  candidateLinkedinUrl?: string;
  candidateCurrentStatus: string;
  candidateFieldOfInterest: string;
  candidateResume: string;
  hasCandidateConsent: boolean;
  isNotCurrentEmployee: boolean;
  referralStatus: string;
  referralStatusUpdatedAt: string;
  bonusAmount?: number;
  bonusApprovedAt?: string;
  createdAt: string;
  updatedAt: string;
};
