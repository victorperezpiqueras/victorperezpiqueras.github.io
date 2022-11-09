import { AboutMeData } from "./AboutMeData";
import { BookData } from "./BookData";
import { ProjectData } from "./ProjectData";

export interface PortfolioData {
  header: { name: string; title: string };
  aboutMe: AboutMeData;
  projects: ProjectData[];
  library: BookData[];
  resume: string;
}
