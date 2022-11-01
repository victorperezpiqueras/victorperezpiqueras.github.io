import { Timeline, Button, Badge, Tooltip } from "flowbite-react";
import TechBadge from "../../components/TechBadge/TechBadge";
import { ExperienceData } from "../../models/PortfolioData";
import "./AboutMe.css";

import { BsFillFlagFill } from "react-icons/bs";
import Experience from "../../components/Experience/Experience";

type AboutMeProps = {
  aboutData: { aboutTexts: string[]; experience: ExperienceData[] };
};

function AboutMe(props: AboutMeProps) {
  let experienceSorted = [...props.aboutData.experience].reverse();
  console.log(experienceSorted);
  let experiences = [
    {
      startDate: new Date(),
      endDate: new Date("2021-01-01"),
      title: "test",
    },
  ];

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
        <div className="bg-white rounded text-black p-10">
          <Experience experiences={experiences} />
          {/* <div className="h-10 relative w-full bg-gray-200 rounded-full">
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

            <div className="flex flex-row">
              <div
                style={{ width: "20%" }}
                className="rounded-l-full h-10 absolute text-xs font-medium text-white text-center p-2.5 shim-green"
              >
                Intern
              </div>
              <span>
                <Tooltip content="1 year" style="dark">
                  <BsFillFlagFill
                    color="red"
                    className="mt-2 drop-shadow absolute ml-2 z-10 hover:cursor-pointer"
                  />
                </Tooltip>
              </span>
              <div
                style={{ width: "20%" }}
                className="rounded-l-full h-10 absolute text-xs font-medium text-white text-center p-2.5 shim-green"
              >
                Intern
              </div>
            </div>
          </div> */}
        </div>

        <div className="bg-white rounded text-black p-10">
          <h3>💼 Professional Experience</h3>
          <Timeline>
            {experienceSorted.map((experience: ExperienceData) => (
              <Timeline.Item>
                <Timeline.Point />
                <Timeline.Content>
                  <Timeline.Time>
                    <b>{experience.company}</b> - <i>({experience.date})</i>
                  </Timeline.Time>
                  <Timeline.Title>{experience.position}</Timeline.Title>
                  <Timeline.Body>
                    {experience.description}
                    <br />
                    {experience.labels.map((label: string) => (
                      <TechBadge className="mt-2" tech={label} />
                    ))}
                  </Timeline.Body>

                  {/*  <Button color="gray">
                  Learn More
                  <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                </Button> */}
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
