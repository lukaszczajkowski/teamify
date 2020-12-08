/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";


// eslint-disable-next-line react/prop-types
export default function TaskPopup({ isOpen, currentTask, updateTask, onClose }) {
    console.log(currentTask);

    const {
        id,
        title,
        description,
        // members,
        category,
    } = currentTask;

    const {
        id: categoryId,
    } = category;

    const [taskTitle, setTaskTitle] = useState(title);
    const [taskDescription, setTaskDescription] = useState(description);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    // const [taskMembers, setTaskMembers] = useState("");
    //const [taskComments, setTaskComments] = useState([]);

    const updatedTask = {
        id,
        title: taskTitle,
        description: taskDescription
    }

    useEffect(() => {
        setTaskTitle(title);
    }, [currentTask]);

    const onUpdateTask = () => {
        updateTask(categoryId, updatedTask);
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
                                        value={taskTitle}
                                        onChange={e => setTaskTitle(e.target.value)}
                                    />
                                    <button
                                        className="button" id="confirm-update"
                                        onClick={onUpdateTask}>
                                        <i className="fas fa-check"></i>
                                    </button>
                                </div>
                                :
                                <h2 className="prompt" onClick={() => setIsEditingTitle(true)}>{taskTitle}</h2>
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
                                        value={taskDescription}
                                        onChange={e => setTaskDescription(e.target.value)}
                                    />
                                    <button
                                        className="button" id="confirm-update"
                                        onClick={onUpdateTask}>
                                        <i className="fas fa-check"></i>
                                    </button>
                                </div>
                                :
                                <h2 className="prompt" onClick={() => setIsEditingDescription(true)}>{taskDescription || "No description"}</h2>
                        }
                        </div>
                        <div className="popup-item flex-start">
                            <h2 className="prompt">Members:</h2>
                            <div className="popup-item flex-start">

                            </div>
                        </div>

                        {/* <div className="popup-item flex-start"> 
                            <h2 className="prompt">Comments</h2>
                            <textarea
                                className="input-box"
                                placeholder=""
                                value={comments}
                                onChange={e => {
                                    setTaskComments(e.target.value);
                                }}
                            >
                            </textarea>
                        </div> */}
                    </div>
                </div>
            </Popup>
        </div>
    );
}