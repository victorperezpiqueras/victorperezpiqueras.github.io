import { Timeline } from "flowbite-react";
import TechBadge from "../../components/TechBadge/TechBadge";
import {
  ExperienceData,
  SingleExperienceData,
} from "../../models/PortfolioData";
import ExperienceBar from "../../components/ExperienceBar/ExperienceBar";

type AboutMeProps = {
  aboutData: { aboutTexts: string[]; experience: ExperienceData[] };
};

function AboutMe(props: AboutMeProps) {
  let experienceSorted = [...props.aboutData.experience].reverse();

  experienceSorted.forEach((exp) => {
    exp.experiences.sort((a, b) => {
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    });
  });

  function parseDates(experience: SingleExperienceData): string {
    const startDateTime = new Date(experience.startDate);
    let endDateTime = new Date(experience.endDate);
    if (!experience.endDate) endDateTime = new Date();
    //parse to format Month-Month Year
    const startYear = startDateTime.getFullYear();
    const endYear = endDateTime.getFullYear();

    let startMonth = startDateTime.toLocaleString("default", {
      month: "short",
    });
    let endMonth = endDateTime.toLocaleString("default", {
      month: "short",
    });
    // capitalize first letter
    startMonth = startMonth.charAt(0).toUpperCase() + startMonth.slice(1);
    endMonth = endMonth.charAt(0).toUpperCase() + endMonth.slice(1);
    if (startYear === endYear) {
      return `${startMonth}-${endMonth} ${startYear}`;
    } else {
      return `${startMonth} ${startYear}-${endMonth} ${endYear}`;
    }
  }

  return (
    <div className="container flex flex-row space-x-6 items-start">
      <div className="basis-1/2 bg-white rounded text-black p-10">
        <h3>🎯 About me</h3>
        {props.aboutData.aboutTexts.map((text, index) => (
          <div>
            <p>{text}</p>
            <br />
          </div>
        ))}
      </div>

      <div className="flex flex-col basis-1/2 space-y-6">
        <div className="bg-white rounded text-black p-10 relative">
          {/*          <div
            style={{ width: "20%", left: "50%" }}
            className="absolute rounded-l-full h-10 left-40 text-xs font-medium text-white text-center p-2.5 shim-green z-20"
          >
            Intern
          </div>
          <div
            style={{ width: "20%" }}
            className="absolute rounded-l-full h-10 text-xs font-medium text-white text-center p-2.5 shim-green z-20"
          >
            Intern
          </div> */}

          <ExperienceBar experiences={props.aboutData.experience} />
        </div>

        <div className="bg-white rounded text-black p-10">
          <h3>💼 Professional Experience</h3>
          <Timeline>
            {experienceSorted.map((experience: ExperienceData) =>
              experience.experiences.length > 1 ? (
                <Timeline.Item>
                  <b className="font-bold text-gray-400">
                    {experience.company}
                  </b>
                  {experience.experiences.reverse().map((exp) => (
                    <>
                      <Timeline.Content>
                        <span className="italic text-sm text-gray-400">
                          ({parseDates(exp)})
                        </span>
                        <Timeline.Point />
                        <Timeline.Title className="text-green-500">
                          {exp.position}
                        </Timeline.Title>
                        <Timeline.Body>
                          {exp.description}
                          <br />
                          {exp.labels.map((label: string) => (
                            <TechBadge className="mt-2" tech={label} />
                          ))}
                        </Timeline.Body>
                      </Timeline.Content>
                    </>
                  ))}
                </Timeline.Item>
              ) : (
                <Timeline.Item>
                  {experience.experiences.reverse().map((exp) => (
                    <>
                      <Timeline.Content>
                        <span className="font-bold text-gray-400">
                          {experience.company} -{" "}
                          <span className="italic text-sm text-gray-400">
                            ({parseDates(exp)})
                          </span>
                        </span>
                        <Timeline.Point />
                        <Timeline.Title className="text-green-500">
                          {exp.position}
                        </Timeline.Title>
                        <Timeline.Body>
                          {exp.description}
                          <br />
                          {exp.labels.map((label: string) => (
                            <TechBadge className="mt-2" tech={label} />
                          ))}
                        </Timeline.Body>
                      </Timeline.Content>
                    </>
                  ))}
                </Timeline.Item>
              )
            )}
          </Timeline>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
