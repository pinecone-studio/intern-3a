export interface Job {
  role: string; // frontend, backend, fullstack, accountant ...
  title: string;
  salaryRange: string | null;
  jobType: string | null;
  detailUrl: string;
  jobId: string; // /job/82386224166163 → 82386224166163
}
