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
               
                <div className="project-cards flex-start">
                <CreateProjectCard id="create-project-card"/>
                <button className="project-card">Testing card</button>
                </div>
            </div>

        </div>
    );
}