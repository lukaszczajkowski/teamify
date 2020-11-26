import React, { useState } from "react";
import Popup from "reactjs-popup";



export default function CreateProjectCard( ) {

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");

    console.log("inside project card");
    return (
        <div className="create-bean-card">
            <div className="popup-container">
                <Popup
                    trigger={<button className="button"> + Add New Project</button>}
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
                                    <h2 className="prompt">Enter Your Project Name</h2>
                                    <input
                                        type="text"
                                        className="input-box"
                                        placeholder="projectname"
                                        value = {projectName}
                                        onChange = {e => setProjectName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Enter your project Description</h2>
                                    <textarea                      
                                        className="input-box"
                                        placeholder="project description"
                                        value = {projectDescription}
                                        onChange = {e => setProjectDescription(e.target.value)}
                                    >
                                    </textarea>
                                </div>                           
                            </div>
                            <button
                                className="button"
                                onClick={() => {close();}}>
                                Add
                            </button>
                        </div>

                    )}
                </Popup>

            </div>
        </div>
        
    );
}