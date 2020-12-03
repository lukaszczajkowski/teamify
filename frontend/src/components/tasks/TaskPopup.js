import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";


// eslint-disable-next-line react/prop-types
export default function TaskPopup({ isOpen, currentTask, deleteTask, updateTask, onClose }) {
    console.log(currentTask);

    const {
        id,
        title,
        extendedProps,
    } = currentTask;

    console.log("extended props", extendedProps);

  

    const initialDescription = (extendedProps) => {
        let initialDescription;
        if(extendedProps !== undefined) {
            const {
                creator,
                users,
                description
            } = extendedProps
            initialDescription = description;
        } else {
            initialDescription = "";
        }
        return initialDescription;
    }

    
    const desc = initialDescription(extendedProps);
    const [taskDescription, setTaskDescription] = useState(desc);
    const [emailAddress, setEmailAddress] = useState("");
    const [comment, setComment] = useState("");

    useEffect(() => {
        setTaskDescription(desc);
    }, [currentTask])
    // eslint-disable-next-line react/prop-types
    return (
        extendedProps === undefined ?
        null
        :
        <div className="create-bean-card">
            <div className="popup-container">
                <Popup
                    open = {isOpen}
                    modal
                    nested>
                        {close => (
                        <div className="modal">
                            <button className="close" onClick={()=> {
                                close();
                                onClose(false);
                                }    
                        }>
                                <i className="fas fa-times"></i>
                            </button>
                            <div className="content">
                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Title</h2>
                                    <input
                                        type="text"
                                        className="input-box"
                                        value={name}
                                        placeholder="name"
                    
                                    >
                                    </input>
                                </div>
                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Description</h2>
                                    <textarea
                                        className="input-box"
                                        placeholder=""
                                        value = {taskDescription}
                                        onChange = {e => {
                                            setTaskDescription(e.target.value);
                                        }}
                                    >
                                    </textarea>
                                </div>
                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Invite user by email</h2>
                                    <Tags task = {currentTask}/>
                                </div>
                            </div>
                            <div className="flex-end">
                                <button
                                className="button"
                                onClick={() => {
                                    {updateTask({name, taskDescription})}
                                    close();
                                    {onClose(false)}
                                }}>
                                Update
                                </button>
                                <button
                                className="button"
                                onClick={() => {
                                    {deleteTask(currentTask)}
                                    close();
                                    {onClose(false)}
                                }}>
                                Delete
                                </button>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
        </div>
    );
}