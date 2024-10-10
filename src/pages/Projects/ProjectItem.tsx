import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { ProjectData } from "../../models/ProjectData";
import LoadingSpinner from "../../shared/components/LoadingSpinner/LoadingSpinner";
import TechBadge from "../../shared/components/TechBadge/TechBadge";
import useAnalyticsEventTracker from "../../shared/GoogleTagManager";
import { isMobileScreen } from "../../shared/isMobile";
import OutsideClickHandler from "../../shared/components/OutsideClickHandler/OutsideClickHandler";

type ProjectProps = {
  project: ProjectData;
  hoveredProjectTitle: string | null;
  setHoveredProjectTitle: (title: string | null) => void;
};

function ProjectItem(props: ProjectProps) {
  const [loading, setLoading] = useState(true);

  const handleMouseOver = (id) => {
    props.setHoveredProjectTitle(id);
  };
  const handleMouseOut = (id) => {
    props.setHoveredProjectTitle(null);
  };

  const onClick = (e) => {
    if (isMobileScreen()) {
      if (props.hoveredProjectTitle !== props.project.title) {
        e.preventDefault();
        props.setHoveredProjectTitle(props.project.title);
        return;
      }
    }
    if (!props.project.link) {
      e.preventDefault();
      return;
    }
    useAnalyticsEventTracker({
      category: "link",
      action: `open ${props.project.link}`,
      label: "projects",
    });
  };

  const handleClickOutside = (project: ProjectData) => {
    // on no selected project, or on click on other project, cancel hoveredProjectTitle
    if (
      !props.hoveredProjectTitle ||
      project.title !== props.hoveredProjectTitle
    )
      return;
    props.setHoveredProjectTitle(null);
  };

  const project = props.project;
  return (
    <OutsideClickHandler onOutsideClick={() => handleClickOutside(project)}>
      <a
        href={project.link ? project.link : "#"}
        target="_blank"
        onClick={onClick}
        className={`ml-2 project-card flex flex-col lg:flex-row w-full my-6 items-center rounded-lg no-underline
       transform transition duration-500 ease-in-out hover:scale-105 ${
         project.link ? "cursor-pointer" : "cursor-default"
       } ${
          props.hoveredProjectTitle === props.project.title
            ? "project-card-clicked scale-105"
            : "bg-white"
        }`}
        onMouseOver={(e) => {
          handleMouseOver(props.project.title);
        }}
        onMouseOut={(e) => {
          handleMouseOut(null);
        }}
      >
        {loading && <LoadingSpinner size="xl" />}
        <img
          className={`${
            loading ? "hidden" : "visible"
          } demo-video w-full lg:w-96 transform transition duration-500 ease-in-out ${
            props.hoveredProjectTitle === project.title
              ? `demo-video-hover rounded-tl-lg rounded-tr-lg lg:rounded-tr-lg lg:rounded-bl-lg lg:rounded-br-lg ${
                  isMobileScreen()
                    ? "scale-125 rounded-bl-lg rounded-br-lg"
                    : "rounded-br-none"
                }`
              : "rounded-tl-lg rounded-tr-lg lg:rounded-tr-none rounded-bl-none lg:rounded-bl-lg rounded-br-none"
          }`}
          src={
            new URL(
              `../../assets/projectsDemos/${project.demoFile}.${
                project.title === props.hoveredProjectTitle ? "gif" : "png"
              }`,
              import.meta.url
            ).href
          }
          alt=""
          onLoad={() => {
            setLoading(false);
          }}
          onError={(event) => {
            (event.target as any).src = new URL(
              `../../assets/projectsDemos/${project.demoFile}.png`,
              import.meta.url
            ).href;
            setLoading(false);
          }}
        />

        <div className="flex flex-col justify-between p-4 leading-normal">
          <div className="flex flex-row justify-start items-center">
            {project.link ? (
              <AiFillGithub className="mb-2 text-black" size={"35px"} />
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
      </a>
    </OutsideClickHandler>
  );
}

export default ProjectItem;
