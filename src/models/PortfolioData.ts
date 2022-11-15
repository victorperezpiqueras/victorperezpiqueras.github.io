import { AboutMeData } from "./AboutMeData";
import { AchievementData } from "./AchievementsData";
import { BookData } from "./BookData";
import { ProjectData } from "./ProjectData";
import { ResearchData } from "./ResearchData";

export interface PortfolioData {
  header: { name: string; title: string };
  aboutMe: AboutMeData;
  projects: ProjectData[];
  achievements: AchievementData[];
  library: BookData[];
  resume: string;
  researches: ResearchData[];
}
