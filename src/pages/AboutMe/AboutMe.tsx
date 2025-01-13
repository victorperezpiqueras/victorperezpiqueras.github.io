import { Timeline } from "flowbite-react";
import TechBadge from "../../shared/components/TechBadge/TechBadge";
import ExperienceBar from "./ExperienceBar/ExperienceBar";
import { BsCheckSquareFill } from "react-icons/bs";
import {
  MdEmail,
  MdOutlineStar,
  MdOutlineStarHalf,
  MdOutlineStarOutline,
} from "react-icons/md";
import {
  FaCode,
  FaCopy,
  FaGraduationCap,
  FaUserGraduate,
} from "react-icons/fa";
import { useState } from "react";
import {
  AboutMeData,
  ExperienceData,
  EducationData,
} from "../../models/AboutMeData";
import { SlChemistry } from "react-icons/sl";
import { FcGraduationCap } from "react-icons/fc";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import uuid from "react-uuid";
import { Alert, Snackbar } from "@mui/material";

type AboutMeProps = {
  aboutData: AboutMeData;
};

function AboutMe(props: AboutMeProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [expandedAboutMe, setExpandedAboutMe] = useState(false);

  const experienceSorted = [...props.aboutData.experience].reverse();
  const educationSorted = [...props.aboutData.education].reverse();

  experienceSorted.forEach((exp) => {
    exp.experiences.sort((a, b) => {
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    });
  });

  function parseDates(
    startDate: string,
    endDate: string,
    includeMonths: boolean = true
  ): string {
    const startDateTime = new Date(startDate);
    let endDateTime = !!endDate ? new Date(endDate) : new Date();
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

    if (!!endDate) {
      if (startYear === endYear) {
        return `${includeMonths ? startMonth + " " : ""}${
          includeMonths ? "- " : ""
        }${includeMonths ? endMonth + " " : ""}${startYear}`;
      } else {
        return `${includeMonths ? startMonth + " " : ""}${startYear} - ${
          includeMonths ? endMonth + " " : ""
        }${endYear}`;
      }
    } else {
      return `${includeMonths ? startMonth + " " : ""}${startYear} - Present`;
    }
  }

  function copyEmail() {
    navigator.clipboard.writeText(props.aboutData.contactInfo.email);
    setCopiedEmail(true);
  }

  function handleClose() {
    setCopiedEmail(false);
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

  const experienceIconsMapping = new Map([
    ["dev", FaCode],
    ["rdi", SlChemistry],
  ]);
  const educationIconsMapping = new Map([
    ["bach", FcGraduationCap],
    ["master", FaGraduationCap],
    ["phd", FaUserGraduate],
  ]);

  return (
    <div className="flex flex-row xs:flex-wrap lg:flex-nowrap space-y-6 lg:space-y-0 lg:space-x-6 items-start">
      <div className="flex flex-col basis-100 lg:basis-1/2 space-y-6">
        <div className="flex flex-col bg-white rounded text-black p-4">
          <h4>📍 Contact Info</h4>
          <span className="flex flex-row">
            <MdEmail className="mt-1 text-green-500 min-w-max" size={"20px"} />{" "}
            &nbsp;{" "}
            <a
              className="text-green-500"
              href="mailto:victorperezpiqueras@gmail.com"
              style={{
                textDecoration: "none",
              }}
            >
              <span className="text-sm md:text-base">
                {props.aboutData.contactInfo.email}
              </span>
            </a>
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
          </span>
        </div>

        <div
          className="basis-1/2 bg-white rounded text-black p-4 pb-3 hover:cursor-pointer"
          onClick={() => setExpandedAboutMe(!expandedAboutMe)}
        >
          <div className="flex flex-row">
            <h4 className="w-2/3">🎯 About Me</h4>
            <div className="w-1/3 flex justify-end">
              {expandedAboutMe ? (
                <HiOutlineChevronUp
                  className="text-green-500 hover:cursor-pointer"
                  size={30}
                />
              ) : (
                <HiOutlineChevronDown
                  className="text-green-500 hover:cursor-pointer"
                  size={30}
                />
              )}
            </div>
          </div>

          {expandedAboutMe ? (
            <div className="pb-0">
              {props.aboutData.aboutTexts.map((text) => (
                <div key={uuid()}>
                  <p>{text}</p>
                  <br />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-0 text-lg text-gray-300"></div>
          )}
        </div>

        <div className="bg-white rounded text-black px-10 pt-4">
          <h4 className="-ml-4 mb-3">🎓 Education</h4>
          <Timeline>
            {educationSorted.map((education: EducationData) => (
              <Timeline.Item className="mb-0" key={uuid()}>
                <Timeline.Content>
                  <div>
                    <Timeline.Point
                      icon={educationIconsMapping.get(education.type)}
                    />
                    <Timeline.Title className="text-green-500 mb-0">
                      {education.course}
                    </Timeline.Title>
                    <span className="font-bold text-gray-400">
                      {education.entity}{" "}
                    </span>
                    <span className="text-sm text-gray-400">
                      (
                      {parseDates(
                        education.startDate,
                        education.endDate,
                        false
                      )}
                      )
                    </span>
                  </div>
                  <Timeline.Body>{education.description}</Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>

        <div className="flex flex-col bg-white rounded text-black p-4">
          <h4>🇬🇧 Language skills</h4>
          {props.aboutData.languages.map((lang) => (
            <div className="flex flex-column mb-2" key={uuid()}>
              <div className="flex flex-row space-x-2">
                <span>{lang.language}:</span>
                <span className="text-gray-500">{lang.description}</span>
              </div>
              <div className="flex flex-row space-x-0">
                {getStars(lang.level)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col basis-100 lg:basis-1/2 space-y-6">
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
                <Timeline.Item className="mb-0" key={uuid()}>
                  <b className="font-bold text-gray-400">
                    {experience.company}
                  </b>
                  {experience.experiences.reverse().map((exp) => (
                    <Timeline.Content key={uuid()}>
                      <span className="text-sm text-gray-400">
                        ({parseDates(exp.startDate, exp.endDate)})
                      </span>
                      <Timeline.Point
                        icon={experienceIconsMapping.get(exp.type)}
                      />
                      <Timeline.Title className="text-green-500 mb-0">
                        {exp.position}
                      </Timeline.Title>
                      <Timeline.Body>
                        {exp.description}
                        <br />
                        {exp.labels.map((label: string) => (
                          <TechBadge
                            className="mt-2"
                            tech={label}
                            key={uuid()}
                          />
                        ))}
                      </Timeline.Body>
                    </Timeline.Content>
                  ))}
                </Timeline.Item>
              ) : (
                // if there is only one experience in the company
                <Timeline.Item key={uuid()}>
                  {experience.experiences.reverse().map((exp) => (
                    <Timeline.Content key={uuid()}>
                      <div>
                        <span className="font-bold text-gray-400">
                          {experience.company}{" "}
                        </span>
                        <span className="text-sm text-gray-400">
                          ({parseDates(exp.startDate, exp.endDate)})
                        </span>
                      </div>

                      <Timeline.Point
                        icon={experienceIconsMapping.get(exp.type)}
                      />
                      <Timeline.Title className="text-green-500 mb-0">
                        {exp.position}
                      </Timeline.Title>
                      <Timeline.Body>
                        {exp.description}
                        <br />
                        {exp.labels.map((label: string) => (
                          <TechBadge
                            className="mt-2"
                            tech={label}
                            key={uuid()}
                          />
                        ))}
                      </Timeline.Body>
                    </Timeline.Content>
                  ))}
                </Timeline.Item>
              )
            )}
          </Timeline>
        </div>
      </div>
      {copiedEmail ? (
        <Snackbar
          open={copiedEmail}
          onClose={handleClose}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            {copiedEmail ? "Email copied to clipboard!" : ""}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AboutMe;
