import { Tooltip } from "flowbite-react";
import { BsFillFlagFill } from "react-icons/bs";
import { IoMdSchool } from "react-icons/io";
import { ImLab } from "react-icons/im";
import {
  SingleExperienceData,
  ExperienceData,
} from "../../../models/AboutMeData";

import "./ExperienceBar.css";
import { isMobileScreen } from "../../../shared/isMobile";
import { FaCode } from "react-icons/fa";

type UIExperience = SingleExperienceData & {
  diffTime: number;
  barPercentage: number;
  startDateTime: Date;
  endDateTime: Date;
};
type ExperienceProps = {
  experiences: ExperienceData[];
};

function ExperienceBar(props: ExperienceProps) {
  const percentageFactor = 90; // 100 makes UI go out of bounds

  function getUIExperiences(experiences: ExperienceData[]) {
    let uiExperiences = experiences.map((ex) => {
      return ex.experiences.map((exp) => {
        let newEx = {
          ...exp,

          startDateTime: new Date(exp.startDate),
          endDateTime: new Date(exp.endDate),
          diffTime: 0,
          barPercentage: 0,
        };
        if (!newEx.endDate) newEx.endDateTime = new Date();
        const diff =
          newEx.endDateTime.getTime() - newEx.startDateTime.getTime();
        newEx.diffTime = diff;
        return newEx as UIExperience;
      });
    });
    //flatten array
    const flatUiExperiences = uiExperiences.reduce(
      (acc, val) => acc.concat(val),
      []
    );
    return flatUiExperiences;
  }

  function calculateTotalYears(uiExperiences: UIExperience[]) {
    let timeSum = uiExperiences.reduce((a, b) => a + b.diffTime, 0);
    timeSum += 1000 * 3600 * 24 * 365; //plus a year

    //years in timesum
    const yearsInTimeSum = timeSum / (1000 * 3600 * 24 * 365);

    return { yearsInTimeSum, timeSum };
  }

  function getFlags(years: number) {
    let flags = [];
    for (let i = 1; i <= years; i++) {
      flags.push(
        <div
          key={i}
          className="w-4/12 drop-shadow absolute -mt-3 z-30 hover:cursor-pointer"
          style={{ left: `${(i / years) * percentageFactor}%` }}
        >
          <Tooltip content={`${i} year${i > 1 ? "s" : ""}`} style="dark">
            <BsFillFlagFill color="red" />
          </Tooltip>
          <div
            className="relative w-1.5 h-1 z-30 rounded-full left-0 bottom-0"
            style={{ backgroundColor: "rgba(255,0,0,0.7)" }}
          ></div>
        </div>
      );
    }
    return flags;
  }

  function parseTimestampToTimeInYearsAndMonths(timestamp: number): string {
    const date = new Date(timestamp);
    const years = date.getFullYear() - 1970;
    const months = date.getMonth();
    const yearsString = years > 0 ? `${years} year${years > 1 ? "s" : ""}` : "";
    const monthString =
      months > 0 ? `${months} month${months > 1 ? "s" : ""}` : "";

    return `${yearsString}${
      yearsString && monthString ? " and " : ""
    }${monthString}`;
  }

  function getExperienceText(experience: UIExperience) {
    return (
      <div className="inline-flex ml-2 cursor-pointer">
        {getExperienceIcon(experience)}
        &nbsp;&nbsp;
        <span className="mt-0.5">
          {isMobileScreen() || experience.barPercentage < 15
            ? ""
            : experience.shortPosition}
        </span>
      </div>
    );
  }

  function getExperienceIcon(experience: UIExperience) {
    switch (experience.category) {
      case "dev":
        return <FaCode color="white" size="1.2rem" />;
      case "internship":
        return <IoMdSchool size="1.2rem" />;
      case "rdi":
        return <ImLab size="1.2rem" />;
      default:
        return <FaCode size="1.2rem" />;
    }
  }

  function getExperienceSections(
    experiences: UIExperience[],
    maxLimitTime: number,
    mergeMode: string = "role"
  ) {
    let updatedExperiences: UIExperience[] = [];
    if (mergeMode === "role") {
      // merge experiences with same shortPosition
      for (let i = 0; i < experiences.length; i++) {
        if (i > 0) {
          if (
            experiences[i].shortPosition === experiences[i - 1].shortPosition
          ) {
            let last = updatedExperiences.at(-1);
            if (last) {
              last.endDateTime = experiences[i].endDateTime;
              last.diffTime += experiences[i].diffTime;
            }
          } else {
            updatedExperiences.push(experiences[i]);
          }
        } else {
          updatedExperiences.push(experiences[i]);
        }
      }
    } else {
      updatedExperiences = experiences;
    }

    // render bars
    let experienceSections = [];
    let lastEnd = 0;
    for (let i = 0; i < updatedExperiences.length; i++) {
      let ex = updatedExperiences[i];
      let start = lastEnd;
      let end = start + ex.diffTime;
      updatedExperiences[i].barPercentage = (ex.diffTime / maxLimitTime) * 100; //percentageFactor;
      let rounded: string;
      // calculate rounds
      if (i === 0) {
        rounded = "rounded-l-xl";
      } else if (i === updatedExperiences.length - 1) {
        rounded = "rounded-r-xl";
      } else {
        rounded = "rounded-none";
      }
      // calculate gradient
      let nextGradient: string = ex.color;
      if (i < updatedExperiences.length - 1) {
        nextGradient = updatedExperiences[i + 1].color;
      }

      let section = (
        <div
          key={i}
          className={`absolute ${rounded} h-9 text-xs font-medium text-white flex justify-content-start p-2.5 experience-bar z-20`}
          style={{
            width: `${
              updatedExperiences[i].barPercentage * (percentageFactor / 100)
            }%`,
            left: `${(start / maxLimitTime) * percentageFactor}%`,
            backgroundColor: ex.color,
            background: `linear-gradient(90deg, ${ex.color} 0%, ${ex.color} 92%, ${nextGradient} 100%)`,
          }}
        >
          <Tooltip
            className={`inline-flex cursor-pointer absolute z-30 ${
              isMobileScreen() ? "w-64" : "w-96"
            }`}
            content={`${ex.position}: ${parseTimestampToTimeInYearsAndMonths(
              ex.diffTime
            )}`}
            style="dark"
            placement="bottom"
            trigger={isMobileScreen() ? "click" : "hover"}
          >
            {getExperienceText(ex)}
          </Tooltip>
        </div>
      );
      experienceSections.push(section);
      lastEnd = end;
    }
    return experienceSections;
  }

  const uiExperiences = getUIExperiences(props.experiences);
  const { yearsInTimeSum, timeSum } = calculateTotalYears(uiExperiences);

  const flags = getFlags(yearsInTimeSum);
  const experienceSections = getExperienceSections(uiExperiences, timeSum);

  return (
    <div className="h-9 relative w-full bg-gray-200 rounded-full">
      {experienceSections}
      {flags}
    </div>
  );
}

export default ExperienceBar;
