import { useState } from "react";
import { ProjectData } from "../../models/ProjectData";
import Project from "./Project/Project";
import "./Projects.css";

type ProjectsProps = {
  projects: ProjectData[];
};

function Projects(props: ProjectsProps) {
  let [hoveredProjectTitle, setHoveredProjectTitle] = useState(null);
  const projects = [...props.projects].reverse();

  return (
    <div className="container flex flex-col items-center">
      {projects.map((project) => (
        <Project project={project} />
      ))}
    </div>
  );
}

export default Projects;
