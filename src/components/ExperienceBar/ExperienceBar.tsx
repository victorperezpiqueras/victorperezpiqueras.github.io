import { Tooltip } from "flowbite-react";
import { BsFillFlagFill } from "react-icons/bs";

type ExperienceData = {
  startDate: Date;
  endDate: Date;
  title: string;
};
type UIExperience = {
  startDate: Date;
  endDate: Date;
  title: string;
  diffTime: number;
  barPercentage: number;
};
type ExperienceProps = {
  experiences: ExperienceData[];
};

function ExperienceBar(props: ExperienceProps) {
  let uiExperiences = props.experiences.map((ex) => {
    let newEx = ex as UIExperience;
    if (!newEx.endDate) newEx.endDate = new Date();
    let diff =
      (newEx.endDate.getTime() - newEx.startDate.getTime()) /
      (1000 * 3600 * 24);
    maxTime += diff;
    newEx.diffTime = diff;
    return newEx;
  });

  var maxTime = 0;
  let minLimitTime = Math.min(
    ...uiExperiences.map((o) => o.startDate.getTime())
  );
  let maxLimitTime = Math.max(...uiExperiences.map((o) => o.endDate.getTime()));
  //add one year in ms
  maxLimitTime += 1000 * 3600 * 24 * 365; //plus a year

  // first and last year
  let firstYear = new Date(minLimitTime).getFullYear();
  let lastYear = new Date(maxLimitTime).getFullYear();
  // get the number of years
  let years = lastYear - firstYear; //avoid year 0
  console.log(years, new Date(minLimitTime), new Date(maxLimitTime));

  const percentageFactor = 90; // 100 makes UI go out of bounds
  let flags = [];
  let flagsData = [];
  for (let i = 1; i <= years; i++) {
    flags.push(
      <div
        key={i}
        className="w-4/12 drop-shadow absolute mt-2.5 z-10 hover:cursor-pointer"
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
  console.log(flagsData);
  return (
    <div className="h-10 relative w-full bg-gray-200 rounded-full">{flags}</div>
  );
}

export default ExperienceBar;
