import { Timeline, Toast, Tooltip } from "flowbite-react";
import TechBadge from "../../components/TechBadge/TechBadge";
import ExperienceBar from "../../components/ExperienceBar/ExperienceBar";
import { BsCheckSquareFill, BsFillTelephoneFill } from "react-icons/bs";
import {
  MdDone,
  MdEmail,
  MdOutlineStar,
  MdOutlineStarHalf,
  MdOutlineStarOutline,
} from "react-icons/md";
import { FaCopy, FaStar, FaStarHalf } from "react-icons/fa";
import { useState } from "react";
import {
  AboutMeData,
  SingleExperienceData,
  ExperienceData,
} from "../../models/AboutMeData";

type AboutMeProps = {
  aboutData: AboutMeData;
};

function AboutMe(props: AboutMeProps) {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

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
    setCopiedPhone(true);
    setCopiedEmail(false);
    setTimeout(() => {
      // can happen that previous switch timeout affects next switch state
      setCopiedPhone(false);
    }, 2000);
  }
  function copyEmail() {
    navigator.clipboard.writeText(props.aboutData.contactInfo.email);
    setCopiedEmail(true);
    setCopiedPhone(false);
    setTimeout(() => {
      setCopiedEmail(false);
    }, 2000);
  }

  function getStars(starNumber: number) {
    let stars = [];
    for (let i = 0; i < Math.trunc(starNumber); i++) {
      stars.push(<MdOutlineStar color="#0E9F6E" size={"20px"} />);
    }
    let offset: number = 0;
    if (starNumber % 1 !== 0) {
      stars.push(<MdOutlineStarHalf color="#0E9F6E" size={"20px"} />);
      offset++;
    }
    for (let i = Math.trunc(starNumber) + offset; i < 5; i++) {
      stars.push(<MdOutlineStarOutline color="#0E9F6E" size={"20px"} />);
    }
    return stars;
  }

  return (
    <div className="container flex flex-row space-x-6 items-start">
      <div className="basis-1/2 container flex flex-col space-y-6">
        <div className="flex flex-col bg-white rounded text-black p-4">
          <h4>📍 Contact Info</h4>
          <span className="flex flex-row" onClick={copyPhone}>
            <BsFillTelephoneFill
              className="mt-1 text-green-500"
              size={"15px"}
            />{" "}
            &nbsp;&nbsp;
            {props.aboutData.contactInfo.phone}
            <Tooltip
              content={copiedPhone ? "Copied!" : "Copy to clipboard"}
              style="dark"
              placement="right"
            >
              {copiedPhone ? (
                <BsCheckSquareFill
                  className="text-green-300 ml-1 mt-1 hover:cursor-pointer"
                  onClick={copyPhone}
                />
              ) : (
                <FaCopy
                  className="text-green-200 ml-1 mt-1 hover:cursor-pointer"
                  onClick={copyPhone}
                />
              )}
            </Tooltip>
          </span>
          <span className="flex flex-row">
            <MdEmail className="mt-1 text-green-500" size={"20px"} /> &nbsp;{" "}
            <a
              className="text-green-500"
              href="mailto:victorperezpiqueras@gmail.com"
              style={{
                textDecoration: "none",
              }}
            >
              {props.aboutData.contactInfo.email}
            </a>
            <Tooltip
              content={copiedEmail ? "Copied!" : "Copy to clipboard"}
              style="dark"
              placement="right"
            >
              {copiedEmail ? (
                <BsCheckSquareFill
                  className="text-green-300 ml-1 mt-1 hover:cursor-pointer"
                  onClick={copyEmail}
                />
              ) : (
                <FaCopy
                  className="text-green-200 ml-1 mt-1 hover:cursor-pointer"
                  onClick={copyEmail}
                />
              )}
            </Tooltip>
          </span>
        </div>

        <div className="basis-1/2 bg-white rounded text-black p-4 pb-0">
          <h4>🎯 About Me</h4>
          {props.aboutData.aboutTexts.map((text, index) => (
            <div>
              <p>{text}</p>
              <br />
            </div>
          ))}
        </div>

        <div className="flex flex-col bg-white rounded text-black p-4">
          <h4>🇬🇧 Language skills</h4>
          {props.aboutData.languages.map((lang) => {
            return (
              <div className="flex flex-column mb-2">
                <div className="flex flex-row space-x-2">
                  <span>{lang.language}:</span>
                  <span className="text-gray-500">{lang.description}</span>
                </div>
                <div className="flex flex-row space-x-0">
                  {getStars(lang.level)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col basis-1/2 space-y-6">
        <div className="flex flex-col bg-white rounded text-black p-4">
          <h4 className="pb-2.5">🚩 My Progress</h4>
          <ExperienceBar experiences={props.aboutData.experience} />
        </div>

        <div className="bg-white rounded text-black px-10 pt-4">
          <h4 className="-ml-4">💼 Professional Experience</h4>
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
