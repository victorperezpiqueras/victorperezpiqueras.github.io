import { BookData } from "./BookData";

export type ExperienceData = {
  date: string;
  startDate: string;
  endDate: string;
  company: string;
  position: string;
  shortPosition: string;
  description: string;
  labels: string[];
  color: string;
};

export interface PortfolioData {
  header: { name: string; title: string };
  aboutMe: { aboutTexts: string[]; experience: ExperienceData[] };
  projects: [];
  library: BookData[];
  resume: string;
}
