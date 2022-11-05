export type SingleExperienceData = {
  date: string;
  startDate: string;
  endDate: string;
  position: string;
  shortPosition: string;
  description: string;
  labels: string[];
  color: string;
};

export type ExperienceData = {
  company: string;
  experiences: SingleExperienceData[];
};

export type ContactInfoData = { email: string; phone: string };

export type LanguagesData = {
  language: string;
  description: string;
  level: number;
};

export type AboutMeData = {
  contactInfo: ContactInfoData;
  aboutTexts: string[];
  experience: ExperienceData[];
  languages: LanguagesData[];
};
