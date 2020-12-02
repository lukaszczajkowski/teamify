import React from "react";
import AddMemberCard from "./AddMemberCard";
import CreateProjectCard from "./CreateProjectCard";
import ProjectCard from "./ProjectCard";


// eslint-disable-next-line react/prop-types
export default function ProjectsBoard({ projects, createProject, sendInvite }) {

    return (
        <div className="projects-board">
            <div className="board-container">
                <p className="prompt">Keep working on projects:</p>

                <div className="project-cards flex-center flex-wrap">
                    <CreateProjectCard onSubmit={createProject} />
                
                        {/*eslint-disable-next-line react/prop-types*/}
                        {projects.sort((a, b) => b.id - a.id).map(project => (
                            <ProjectCard key={project.id} project={project}/>
                        ))}
                        <AddMemberCard projects={projects} onSubmit={sendInvite} />
                </div>
            </div>

        </div>
    );
}