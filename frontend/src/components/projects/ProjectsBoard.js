import React from "react";
import { Link } from "react-router-dom";
import CreateProjectCard from "./CreateProjectCard";
import ProjectCard from "./ProjectCard";


// eslint-disable-next-line react/prop-types
export default function ProjectsBoard({projects, createProject}) {

    return (
        <div className="projects-board">
            <div className="board-container">
                <p className="prompt">Keep working on projects:</p>
               
                <div className="project-cards flex-start">
                <CreateProjectCard onSubmit={createProject} />
                <Link to="/projects">
                <button className="project-card">Testing card</button>
                </Link>
              
                 {/*eslint-disable-next-line react/prop-types*/}
                {projects.map(project => (
                   <ProjectCard key={project.id} project={project}/>
                ))}
                </div>
            </div>

        </div>
    );
}