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
function Experience(props: ExperienceProps) {
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

  let maxLimitTime = minLimitTime + maxTime;
  //add one year in ms
  maxLimitTime += 1000 * 3600 * 24 * 365;

  return (
    <div className="h-10 relative w-full bg-gray-200 rounded-full">
      <div
        className="w-4/12 drop-shadow absolute mt-2 z-10 hover:cursor-pointer"
        style={{ marginLeft: "20%" }}
      >
        <Tooltip content="1 year" style="dark">
          <BsFillFlagFill color="blue" />
        </Tooltip>
      </div>
      <div
        className="w-4/12 drop-shadow absolute mt-2 z-10 hover:cursor-pointer"
        style={{ marginLeft: "40%" }}
      >
        <Tooltip content="1 year" style="dark">
          <BsFillFlagFill color="blue" />
        </Tooltip>
      </div>
    </div>
  );
}

export default Experience;
