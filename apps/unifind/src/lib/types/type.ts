export type University = {
  id: number;
  name: string;
  city: string;
  description: string;
  website: string;
  image?: string;
  logo?: string;
};
export type Subject = { id: number; name: string };
export type MajorRequirement = { id: number; subjects: Subject[] };

export type Major = {
  id: number;
  name: string;
  university_id: number;
  degree_type: string;
  description: string;
  universities: University;
  major_requirements: MajorRequirement[];
};
