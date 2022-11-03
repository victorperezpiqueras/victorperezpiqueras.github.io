import { BookData } from "./BookData";

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
  /*   date: string;
  startDate: string;
  endDate: string; */
  company: string;
  /*  position: string;
  shortPosition: string;
  description: string;
  labels: string[];
  color: string; */
  experiences: SingleExperienceData[];
};

export type ContactInfoData = { email: string; phone: string };

export interface PortfolioData {
  header: { name: string; title: string };
  aboutMe: {
    contactInfo: ContactInfoData;
    aboutTexts: string[];
    experience: ExperienceData[];
  };
  projects: [];
  library: BookData[];
  resume: string;
}
