import { BookData } from "./BookData";

export type ExperienceData = {
  date: string;
  company: string;
  position: string;
  description: string;
  labels: string[];
};

export interface PortfolioData {
  header: { name: string; title: string };
  aboutMe: { aboutTexts: string[]; experience: ExperienceData[] };
  projects: [];
  library: BookData[];
  resume: string;
}
