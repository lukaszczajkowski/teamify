import React, { useState } from "react";
import Popup from "reactjs-popup";



// eslint-disable-next-line react/prop-types
export default function CreateProjectCard({onSubmit}) {

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");

    function onCreateProject() {
        const projectData = {projectName, projectDescription};
        onSubmit(projectData);
        console.log(projectData);
    }

    return (
        <div className="create-project-card">
            <div className="popup-container">
                <Popup
                    trigger={<button id="create-new-project"> + Create New Project</button>}
                    modal
                    nested>
                    {
                        close => (
                            <div className="modal">
                                <button className="close" onClick={close}>
                                    <i className="fas fa-times"></i>
                                </button>
                                <div className="content">
                                    <div className="popup-item flex-start">
                                        <h2 className="prompt">Project Name</h2>
                                        <input
                                            type="text"
                                            className="input-box"
                                            placeholder="projectname"
                                            value={projectName}
                                            onChange={e => setProjectName(e.target.value)}
                                        >
                                        </input>
                                    </div>

                                    <div className="popup-item flex-start">
                                        <h2 className="prompt">Project Description</h2>
                                        <textarea
                                            className="input-box"
                                            placeholder="project description"
                                            value={projectDescription}
                                            onChange={e => setProjectDescription(e.target.value)}
                                        >
                                        </textarea>
                                    </div>
                                </div>
                                <div className="flex-end">
                                     <button
                                    className="button"
                                    onClick={() => { 
                                        onCreateProject();
                                        close(); }}>
                                    Create
                            </button>
                                </div>
                               
                            </div>

                        )}
                </Popup>

            </div>
        </div>

    );
}