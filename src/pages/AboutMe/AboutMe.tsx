import { Timeline, Toast, Tooltip } from "flowbite-react";
import TechBadge from "../../components/TechBadge/TechBadge";
import {
  ContactInfoData,
  ExperienceData,
  SingleExperienceData,
} from "../../models/PortfolioData";
import ExperienceBar from "../../components/ExperienceBar/ExperienceBar";
import { BsCheckSquareFill, BsFillTelephoneFill } from "react-icons/bs";
import { MdDone, MdEmail } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { useState } from "react";

type AboutMeProps = {
  aboutData: {
    contactInfo: ContactInfoData;
    aboutTexts: string[];
    experience: ExperienceData[];
  };
};

function AboutMe(props: AboutMeProps) {
  const [active, setActive] = useState(false);

  let experienceSorted = [...props.aboutData.experience].reverse();

  experienceSorted.forEach((exp) => {
    exp.experiences.sort((a, b) => {
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    });
  });

  function parseDates(experience: SingleExperienceData): string {
    const startDateTime = new Date(experience.startDate);
    let endDateTime = !!experience.endDate
      ? new Date(experience.endDate)
      : new Date();
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

    if (!!experience.endDate) {
      if (startYear === endYear) {
        return `${startMonth}-${endMonth} ${startYear}`;
      } else {
        return `${startMonth} ${startYear}-${endMonth} ${endYear}`;
      }
    } else {
      return `${startMonth} ${startYear} - Present`;
    }
  }

  function copyPhone() {
    navigator.clipboard.writeText(props.aboutData.contactInfo.phone);
    setActive(true);
  }

  return (
    <div className="container flex flex-row space-x-6 items-start">
      <div className="basis-1/2 container flex flex-col space-y-6">
        <div className="flex flex-col bg-white rounded text-black p-4">
          <h3>📍 Contact info</h3>
          <span className="flex flex-row" onClick={copyPhone}>
            <BsFillTelephoneFill
              className="mt-1 text-green-600"
              size={"15px"}
            />{" "}
            &nbsp;&nbsp;
            <span>{props.aboutData.contactInfo.phone}</span>
            <Tooltip
              content={active ? "Copied!" : "Copy to clipboard"}
              style="dark"
              placement="right"
            >
              <button
                type="button"
                className="focus:outline-none text-white bg-green-500 hover:bg-green-800 font-medium rounded-lg text-sm px-3 py-2 ml-2 -mt-1"
                onClick={copyPhone}
              >
                {active ? <BsCheckSquareFill /> : <FaCopy />}
              </button>
            </Tooltip>
          </span>
          <span className="flex flex-row">
            <MdEmail className="mt-1 text-green-600" size={"20px"} /> &nbsp;{" "}
            <a
              className="text-green-600"
              href="mailto:victorperezpiqueras@gmail.com"
              style={{
                textDecoration: "none",
              }}
            >
              {props.aboutData.contactInfo.email}
            </a>
          </span>
        </div>

        <div className="basis-1/2 bg-white rounded text-black p-4">
          <h3>🎯 About me</h3>
          {props.aboutData.aboutTexts.map((text, index) => (
            <div>
              <p>{text}</p>
              <br />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col basis-1/2 space-y-6">
        <div className="bg-white rounded text-black p-4 relative">
          <ExperienceBar experiences={props.aboutData.experience} />
        </div>

        <div className="bg-white rounded text-black p-10">
          <h3>💼 Professional Experience</h3>
          <Timeline>
            {experienceSorted.map((experience: ExperienceData) =>
              experience.experiences.length > 1 ? (
                // if there are multiple experiences in the same company
                <Timeline.Item>
                  <b className="font-bold text-gray-400">
                    {experience.company}
                  </b>
                  {experience.experiences.reverse().map((exp) => (
                    <>
                      <Timeline.Content>
                        <span className="text-sm text-gray-400">
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
                // if there is only one experience in the company
                <Timeline.Item>
                  {experience.experiences.reverse().map((exp) => (
                    <>
                      <Timeline.Content>
                        <div>
                          <span className="font-bold text-gray-400">
                            {experience.company}{" "}
                          </span>
                          <span className="text-sm text-gray-400">
                            ({parseDates(exp)})
                          </span>
                        </div>

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
