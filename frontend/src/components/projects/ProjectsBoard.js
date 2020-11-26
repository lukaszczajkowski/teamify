import React from "react";

export default function ProjectsBoard() {
    return (
        <div className="projects-board">
            <div className="board-container">
                <p className="prompt">Keep working on projects:</p>

                <div className="project-card" id="create-project">
                    <button>
                        +
                        Create new project
                    </button>
                </div>
                <div className="project-cards">
                    Display all project cards here.
                </div>
            </div>

        </div>
    );
}