import React from "react";
import { Link } from "react-router-dom";
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
                <Link to="/projects">
                <button className="project-card">Testing card</button>
                </Link>
                
                </div>
            </div>

        </div>
    );
}