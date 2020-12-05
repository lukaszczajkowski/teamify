/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";


// eslint-disable-next-line react/prop-types
export default function TaskPopup({ isOpen, currentTask, deleteTask, updateTask, onClose }) {
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
    // const [taskMembers, setTaskMembers] = useState("");
    // const [emails, setEmails] = useState([]);
    //const [taskComments, setTaskComments] = useState([]);

    const updatedTask = {
        id,
        title: taskTitle,
        description: taskDescription
    }

    useEffect(() => {
        setTaskTitle(title);
    }, [currentTask]);

    return (
        <div className="task-popup popup-container">
            <Popup
                open={isOpen}
                modal
                nested>
                {close => (
                    <div className="modal">
                        <button className="close" onClick={() => {
                            close();
                            { onClose(false) }
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
                                    value={taskTitle}
                                    placeholder="title"
                                    onChange={e => {
                                        setTaskTitle(e.target.value);
                                    }}

                                >
                                </input>
                            </div>
                            <div className="popup-item flex-start">
                                <h2 className="prompt">Description</h2>
                                <textarea
                                    className="input-box"
                                    placeholder=""
                                    value={taskDescription}
                                    onChange={e => {
                                        setTaskDescription(e.target.value);
                                    }}
                                >
                                </textarea>
                            </div>
                            <div className="popup-item flex-start">
                                <h2 className="prompt">Members:</h2>
                                <div className="popup-item flex-start">

                                </div>
                            </div>

                            <div className="popup-item flex-start">
                                <h2 className="prompt">Invite user by email</h2>

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
                        <div className="flex-end">

                            <button
                                className="button"
                                onClick={() => {
                                    { updateTask(categoryId, updatedTask) }  
                                    close()
                                    { onClose(false) }
                                }}>
                                Update
                                </button>
                            <button
                                className="button"
                                onClick={() => {
                                    { deleteTask(currentTask) }
                                    close();
                                    { onClose(false) }

                                }}>
                                Delete
                                </button>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    );
}