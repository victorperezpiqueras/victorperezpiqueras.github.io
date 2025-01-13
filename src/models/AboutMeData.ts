export type SingleExperienceData = {
  date: string;
  startDate: string;
  endDate: string;
  position: string;
  shortPosition: string;
  description: string;
  labels: string[];
  color: string;
  type: string;
  category: string;
};

export type ExperienceData = {
  company: string;
  experiences: SingleExperienceData[];
};

export type ContactInfoData = { email: string };

export type LanguagesData = {
  language: string;
  description: string;
  level: number;
};

export type EducationData = {
  course: string;
  entity: string;
  description: string;
  startDate: string;
  endDate: string;
  type: string;
};

export type AboutMeData = {
  contactInfo: ContactInfoData;
  aboutTexts: string[];
  experience: ExperienceData[];
  languages: LanguagesData[];
  education: EducationData[];
};
