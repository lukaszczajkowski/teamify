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
    console.log(JSON.stringify(updateProject));

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
                    <div className="content">
                        <div className="popup-item flex-start">
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
                                        className="button" id="confirm-update"
                                        onClick={onUpdateProject}>
                                        <i className="fas fa-check"></i>
                                    </button>
                                </div>
                                :
                                <h2 className="prompt" onClick={() => setIsEditingTitle(true)}>{projectTitle}</h2>
                        }
                        </div>
                        <div className="popup-item flex-start">
                        {
                            isEditingDescription ?
                                <div className="title-input flex-between">
                                    <input
                                        type="text"
                                        className="input-box"
                                        placeholder="Description"
                                        value={projectDescription}
                                        onChange={e => setProjectDescription(e.target.value)}
                                    />
                                    <button
                                        className="button" id="confirm-update"
                                        onClick={onUpdateProject}>
                                        <i className="fas fa-check"></i>
                                    </button>
                                </div>
                                :
                                <h2 className="prompt" onClick={() => setIsEditingDescription(true)}>{projectDescription || "No description"}</h2>
                        }
                        </div>
                        <div className="popup-item flex-start">
                            <h2 className="prompt">Members:</h2>
                            <div className="popup-item flex-start">

                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    );
}