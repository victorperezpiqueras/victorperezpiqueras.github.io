import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { ProjectData } from "../../../models/ProjectData";
import TechBadge from "../../../shared/components/TechBadge/TechBadge";

type ProjectProps = {
  project: ProjectData;
};

function Project(props: ProjectProps) {
  let [hoveredProjectTitle, setHoveredProjectTitle] = useState(null);
  const handleMouseOver = (id) => {
    setHoveredProjectTitle(id);
  };
  const handleMouseOut = (id) => {
    setHoveredProjectTitle(null);
  };

  const project = props.project;
  return (
    <div
      className={`ml-2 project-card flex flex-col lg:flex-row w-full my-6 items-center bg-white rounded-lg transform transition duration-500 ease-in-out hover:scale-105`}
      onMouseOver={(e) => {
        handleMouseOver(props.project.title);
      }}
      onMouseOut={(e) => {
        handleMouseOut(null);
      }}
    >
      <img
        className={`demo-video w-full lg:w-96 rounded-l-lg transform transition duration-500 ease-in-out ${
          hoveredProjectTitle === project.title
            ? "demo-video-hover rounded-lg"
            : ""
        }`}
        src={
          new URL(
            `../../../assets/projectsDemos/${project.demoFile}.${
              project.title === hoveredProjectTitle ? "gif" : "png"
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
  );
}

export default Project;
