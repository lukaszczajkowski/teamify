import React from "react";
import CreateProjectCard from "./CreateProjectCard";
import ProjectCard from "./ProjectCard";


// eslint-disable-next-line react/prop-types
export default function ProjectsBoard({ creator, projects, createProject }) {

    return (
        <div className="projects-board">
            <div className="board-container">
                <p className="prompt">Keep working on projects:</p>

                <div className="project-cards flex-center flex-wrap">
                    <CreateProjectCard creator={creator} onSubmit={createProject} />
                
                        {/*eslint-disable-next-line react/prop-types*/}
                        {projects.sort((a, b) => b.id - a.id).map(project => (
                            <ProjectCard key={project.id} project={project}/>
                        ))}
                </div>
            </div>

        </div>
    );
}