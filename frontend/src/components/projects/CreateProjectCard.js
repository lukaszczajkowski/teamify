import React, { useState, useContext } from "react";
import Popup from "reactjs-popup";
import UserContext from "../../UserContext";
import { motion } from "framer-motion";



// eslint-disable-next-line react/prop-types
export default function CreateProjectCard({ onSubmit }) {
    const creator = useContext(UserContext);
    const [projectName, setProjectName] = useState("");



    function onCreateProject() {
        const projectData =
        {
            title: projectName,
            creator: creator,
            users: [creator]

        };
        onSubmit(projectData);
        console.log(projectData);
    }

    return (
        <motion.div 
            className="create-project-card"
            whileHover={{ scale: 1.1 }}>
            <div className="popup-container">
                <Popup
                    trigger={<button id="create-new-project"> + Create New Project</button>}
                    modal
                    nested>
                    {
                        close => (
                            <motion.div initial={{
                                scale: 0
                                    }}
                                animate= {{
                                scale: 1
                                }} className="modal">
                                <button className="close" onClick={close}>
                                    <i className="fas fa-times"></i>
                                </button>
                                <div className="header1">
                                    <h1 className="header1-title"> New Project</h1>
                                </div>
                                <div className="content">
                                    <div className="popup-item flex-start">
                                        <h2 className="prompt">Name</h2>
                                        <input
                                            type="text"
                                            className="input-box"
                                            placeholder="Project Name"
                                            value={projectName}
                                            onChange={e => setProjectName(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="flex-end">
                                    <button
                                        className="button"
                                        onClick={() => {
                                            onCreateProject();
                                            close();
                                        }}>
                                        Create
                            </button>
                                </div>

                            </motion.div>

                        )}
                </Popup>

            </div>
        </motion.div>

    );
}