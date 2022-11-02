import { Timeline } from "flowbite-react";
import TechBadge from "../../components/TechBadge/TechBadge";
import { ExperienceData } from "../../models/PortfolioData";
import ExperienceBar from "../../components/ExperienceBar/ExperienceBar";

type AboutMeProps = {
  aboutData: { aboutTexts: string[]; experience: ExperienceData[] };
};

function AboutMe(props: AboutMeProps) {
  let experienceSorted = [...props.aboutData.experience].reverse();
  console.log(experienceSorted);
  /*   let experiences = [
    {
      date: "Jun-Aug 2019",
      startDate: "2019-06-01",
      endDate: "2019-08-31",
      company: "Grupo Vermon",
      position: "Full Stack Developer (Internship)",
      shortPosition: "Dev",
      description:
        "Full stack development of a web application for real-time home sensor management and monitoring.",
      labels: ["angular", "python", "flask"],
      color: "#818990",
    },
    {
      date: "Jul-Sep 2020",
      startDate: "2020-07-01",
      endDate: "2020-09-30",
      company: "Grupo Vermon",
      position: "Full Stack Developer (Internship)",
      shortPosition: "Dev",
      description:
        "Full stack development of a web application for the creation and management of dynamic forms to control incidents in companies.",
      labels: ["angular", "aws", "serverless"],
      color: "#818990",
    },
  ]; */

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
