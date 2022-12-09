import { useState } from "react";
import { ProjectData } from "../../models/ProjectData";
import ProjectItem from "./ProjectItem";
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
        <ProjectItem
          project={project}
          hoveredProjectTitle={hoveredProjectTitle}
          setHoveredProjectTitle={setHoveredProjectTitle}
        />
      ))}
    </div>
  );
}

export default Projects;
