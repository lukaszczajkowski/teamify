import React, { useState } from "react";
import ProjectActions from "./ProjectActions";
import UpdateProjectPopup from "./UpdateProjectPopup";

// eslint-disable-next-line react/prop-types
export default function ProjectMenu({ currentProject, updateProject, onDeleteProject }) {

    // eslint-disable-next-line react/prop-types
    console.log("on project menu. current project: " + currentProject.id);

    const [popupIsOpen, setPopupIsOpen] = useState(false);

    const onUpdateProject = () => {
        setPopupIsOpen(true);
    }

    const onClosePopup = () => {
        setPopupIsOpen(false);
    }

    return (
        <div className="project-menu flex-start">
            <div id="project-menu" className="flex-start">
                {/* eslint-disable-next-line react/prop-types*/}
                <p className="project-title">{currentProject.title}</p>

                <ProjectActions
                    currentProject={currentProject}
                    onUpdateProject={onUpdateProject}
                    onDeleteProject={onDeleteProject} />

                <UpdateProjectPopup
                    isOpen={popupIsOpen}
                    currentProject={currentProject}
                    updateProject={updateProject}
                    onClose={onClosePopup}
                />

            </div>
            
        </div>
    );
}