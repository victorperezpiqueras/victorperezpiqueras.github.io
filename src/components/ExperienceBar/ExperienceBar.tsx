import { Tooltip } from "flowbite-react";
import { BsFillFlagFill } from "react-icons/bs";
import { ExperienceData } from "../../models/PortfolioData";
import "./ExperienceBar.css";

type UIExperience = ExperienceData & {
  diffTime: number;
  barPercentage: number;
  startDateTime: Date;
  endDateTime: Date;
};
type ExperienceProps = {
  experiences: ExperienceData[];
};

function ExperienceBar(props: ExperienceProps) {
  function getUIExperiencesAndMaxTime(experiences: ExperienceData[]) {
    let maxTime = 0;
    let uiExperiences = experiences.map((ex) => {
      let newEx = {
        ...ex,
        startDateTime: new Date(ex.startDate),
        endDateTime: new Date(ex.endDate),
        diffTime: 0,
        barPercentage: 0,
      };
      if (!newEx.endDate) newEx.endDateTime = new Date();
      let diff =
        (newEx.endDateTime.getTime() - newEx.startDateTime.getTime()) /
        (1000 * 3600 * 24);
      maxTime += diff;
      newEx.diffTime = diff;
      return newEx as UIExperience;
    });
    return { uiExperiences, maxTime };
  }

  function calculateTotalYears(uiExperiences: UIExperience[]) {
    let minLimitTime = Math.min(
      ...uiExperiences.map((o) => o.startDateTime.getTime())
    );
    let maxLimitTime = Math.max(
      ...uiExperiences.map((o) => o.endDateTime.getTime())
    );
    //add one year in ms
    maxLimitTime += 1000 * 3600 * 24 * 365; //plus a year

    // first and last year
    let firstYear = new Date(minLimitTime).getFullYear();
    let lastYear = new Date(maxLimitTime).getFullYear();
    // get the number of years
    let years = lastYear - firstYear; //avoid year 0
    return years;
  }

  function getFlags(years: number) {
    const percentageFactor = 90; // 100 makes UI go out of bounds
    let flags = [];
    let flagsData = [];
    for (let i = 1; i <= years; i++) {
      flags.push(
        <div
          key={i}
          className="w-4/12 drop-shadow absolute -mt-3 z-10 hover:cursor-pointer"
          style={{ marginLeft: `${(i / years) * percentageFactor}%` }}
        >
          <Tooltip content={`${i} years`} style="dark">
            <BsFillFlagFill color="#0E9F6E" />
          </Tooltip>
        </div>
      );
      flagsData.push({
        per: `${(i / years) * percentageFactor}%`,
        text: `${i} years`,
      });
    }
    return { flags, flagsData };
  }

  function getExperienceSections(
    experiences: UIExperience[],
    maxTimeSecs: number
  ) {
    let experienceSections = [];
    let lastEnd = 0;
    for (let i = 0; i < experiences.length; i++) {
      let ex = experiences[i];
      let start = lastEnd;
      let end = start + ex.diffTime;
      let barPercentage = (ex.diffTime / maxTimeSecs) * 100;

      let rounded: string;
      if (i === 0) {
        rounded = "rounded-l-full";
      } else if (i === experiences.length - 1) {
        rounded = "rounded-r-full";
      } else {
        rounded = "rounded-none";
      }
      let section = (
        <div
          key={i}
          className={`absolute ${rounded} h-10 text-xs font-medium text-white text-center p-2.5 shim-green z-20`}
          style={{
            width: `${barPercentage}%`,
            left: `${(start / maxTimeSecs) * 100}%`,
            backgroundColor: ex.color,
          }}
        >
          {ex.shortPosition}
        </div>
      );
      experienceSections.push(section);
      lastEnd = end;
    }
    return experienceSections;
  }

  let { uiExperiences, maxTime } = getUIExperiencesAndMaxTime(
    props.experiences
  );
  console.log(props.experiences);
  let years = calculateTotalYears(uiExperiences);

  const { flags, flagsData } = getFlags(years);
  const experienceSections = getExperienceSections(uiExperiences, maxTime);

  return (
    <div className="h-10 relative w-full bg-gray-200 rounded-full">
      {/* <div
        style={{ width: "20%" }}
        className="absolute rounded-l-full h-10 text-xs font-medium text-white text-center p-2.5 shim-green z-20"
      >
        Intern
      </div>
      <div
        style={{ width: "20%", left: "100%" }}
        className="absolute rounded-l-full h-10 text-xs font-medium text-white text-center p-2.5 shim-green z-20"
      >
        Intern
      </div> */}
      {experienceSections}
      {flags}
    </div>
  );
}

export default ExperienceBar;
