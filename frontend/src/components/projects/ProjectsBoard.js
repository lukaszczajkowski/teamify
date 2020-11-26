import React from "react";
import CreateProjectCard from "./CreateProjectCard";

export default function ProjectsBoard() {

    // const createProject = (projectdata) => {
    //     console.log("create project" + projectdata);

    // }
    return (
        <div className="projects-board">
            <div className="board-container">
                <p className="prompt">Keep working on projects:</p>
                <CreateProjectCard id="create-project-card"/>
                <div >
                   
                    
                
                </div>
                <div className="project-cards">
                    Display all project cards here.
                </div>
            </div>

        </div>
    );
}