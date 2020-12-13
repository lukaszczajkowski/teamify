import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
// import Popup from "reactjs-popup";

// eslint-disable-next-line react/prop-types
export default function UpdateProjectPopup({ isOpen, currentProject, updateProject, onClose }) {
    // eslint-disable-next-line react/prop-types
    console.log("on updateProjectPopup. current project: " + currentProject.id);

    const {
        // eslint-disable-next-line react/prop-types
        id, title, description,
        // users
    } = currentProject;

    const [projectTitle, setProjectTitle] = useState(title);
    const [projectDescription, setProjectDescription] = useState(description);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    // const [taskMembers, setTaskMembers] = useState("");
    //const [taskComments, setTaskComments] = useState([]);

    const updatedProject = {
        id,
        title: projectTitle,
        description: projectDescription
    }

    useEffect(() => {
        setProjectTitle(title);
    }, [currentProject]);

    const onUpdateProject = () => {
        updateProject(updatedProject);
        setIsEditingTitle(false);
        setIsEditingDescription(false);
    };

    return (
        <div className="task-popup popup-container">
            <Popup open={isOpen} modal nested onClose={onClose}>
                <div className="modal">
                    <button className="close" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                    <div className="popup-header">
                        <h2 className="header-title">Edit project detail</h2>

                    </div>
                    <div className="content">
                        <div className="popup-item flex-start">
                            <h2 className="prompt">Title</h2>
                            {
                                isEditingTitle ?
                                    <div className="title-input flex-between">
                                        <input
                                            type="text"
                                            className="input-box"
                                            placeholder="Title"
                                            value={projectTitle}
                                            onChange={e => setProjectTitle(e.target.value)}
                                        />
                                        <button
                                            className="action-button" id="confirm-update"
                                            onClick={onUpdateProject}>
                                            <i className="fas fa-check"></i>
                                        </button>
                                    </div>
                                    :

                                    <p className="input-box" onClick={() => setIsEditingTitle(true)}>{projectTitle}</p>

                            }
                        </div>
                        <div className="popup-item flex-start">
                            <h2 className="prompt">Description</h2>
                            {
                                isEditingDescription ?
                                    <div className="title-input flex-between">
                                        <textarea
                                           
                                            className="input-box text-area"
                                            placeholder="Enter description"
                                            value={projectDescription}
                                            onChange={e => setProjectDescription(e.target.value)}
                                        />
                                        <button
                                            className="action-button" id="confirm-update"
                                            onClick={onUpdateProject}>
                                            <i className="fas fa-check"></i>
                                        </button>
                                    </div>
                                    :
                                    <p className="input-box" onClick={() => setIsEditingDescription(true)}>{projectDescription || "No description"}</p>
                            }
                        </div>

                    </div>
                </div>
            </Popup>
        </div>
    );
}