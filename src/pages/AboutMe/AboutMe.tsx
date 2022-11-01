import { Timeline, Button, Badge } from "flowbite-react";
import TechBadge from "../../components/TechBadge/TechBadge";
import { Experience } from "../../models/PortfolioData";

type AboutMeProps = {
  aboutData: { aboutTexts: string[]; experience: Experience[] };
};

function AboutMe(props: AboutMeProps) {
  let experienceSorted = [...props.aboutData.experience].reverse();
  console.log(experienceSorted);
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
          <div className="w-full h-10 bg-gray-200 rounded-full dark:bg-gray-700">
            <div className="flex flex-row">
              <div
                className="h-10 bg-gray-400 text-xs font-medium text-white text-center p-3 leading-none rounded-l-full"
                style={{ width: "15%" }}
              >
                Intern
              </div>

              <div
                className="h-10 bg-blue-600 text-xs font-medium text-blue-100 text-center p-3 leading-none"
                style={{ width: "15%" }}
              >
                Intern
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded text-black p-10">
          <h3>💼 Professional Experience</h3>
          <Timeline>
            {experienceSorted.map((experience: Experience) => (
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
