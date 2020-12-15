import React, { useState } from "react";
import ProjectActions from "./ProjectActions";
import UpdateProjectPopup from "./UpdateProjectPopup";

// eslint-disable-next-line react/prop-types
export default function ProjectMenu({ currentProject, updateProject, onDeleteProject }) {

    const [popupIsOpen, setPopupIsOpen] = useState(false);

    const onUpdateProject = () => {
        setPopupIsOpen(true);
    }

    const onClosePopup = () => {
        setPopupIsOpen(false);
    }

    

    return (
        <div id="project-menu" className="flex-start">
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
    );
}