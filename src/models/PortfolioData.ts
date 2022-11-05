import { AboutMeData } from "./AboutMeData";
import { BookData } from "./BookData";

export interface PortfolioData {
  header: { name: string; title: string };
  aboutMe: AboutMeData;
  projects: [];
  library: BookData[];
  resume: string;
}
