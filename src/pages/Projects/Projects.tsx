import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import TechBadge from "../../components/TechBadge/TechBadge";
import TechIcon from "../../components/TechIcon/TechIcon";
import { ProjectData } from "../../models/ProjectData";
import "./Projects.css";

type ProjectsProps = {
  projects: ProjectData[];
};

function Projects(props: ProjectsProps) {
  let [hoveredProject, setHoveredProject] = useState(null);
  const handleMouseOver = (id) => {
    setHoveredProject(id);
  };
  const handleMouseOut = (id) => {
    setHoveredProject(null);
  };

  const projects = [...props.projects].reverse();
  return (
    <div className="container flex flex-col items-center">
      {projects.map((project) => (
        <div
          className={`ml-2 project-card flex flex-col lg:flex-row w-full my-6 items-center bg-white rounded-lg transform transition duration-500 ease-in-out hover:scale-105`}
          onMouseOver={(e) => handleMouseOver(project.title)}
          onMouseOut={(e) => handleMouseOut(project.title)}
        >
          <img
            className={`demo-video w-full lg:w-96 rounded-l-lg hover:rounded-lg transform transition duration-500 ease-in-out ${
              hoveredProject === project.title ? "demo-video-hover" : ""
            }`}
            src={
              new URL(
                `../../assets/projectsDemos/${project.demoFile}.${
                  project.title === hoveredProject ? "gif" : "png"
                }`,
                import.meta.url
              ).href
            }
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <div className="flex flex-row justify-start items-center">
              {project.link ? (
                <a
                  className="mb-2 transition ease-in-out hover:scale-125 duration-300"
                  href={project.link}
                  target="_blank"
                >
                  <AiFillGithub
                    className="hover:text-white text-black"
                    size={"35px"}
                  />
                </a>
              ) : (
                ""
              )}
              <h5 className="ml-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {project.title}
              </h5>
            </div>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {project.description}
            </p>
            <div className="flex flex-wrap items-center">
              {project.tags.map((tech) => (
                <span className="mr-2">
                  <TechBadge className="mt-2" tech={tech} />
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Projects;
