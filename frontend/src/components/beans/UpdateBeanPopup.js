import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
// import Popup from "reactjs-popup";

// eslint-disable-next-line react/prop-types
export default function UpdateBeanPopup({ isOpen, currentBean, updateBean, onClose }) {


    const {
        // eslint-disable-next-line react/prop-types
        id, title, description,
        // users
    } = currentBean;

    const [beanTitle, setBeanTitle] = useState(title);
    const [beanDescription, setBeanDescription] = useState(description);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    // const [taskMembers, setTaskMembers] = useState("");
    //const [taskComments, setTaskComments] = useState([]);

    const updatedBean = {
        id,
        title: beanTitle,
        description: beanDescription
    }

    useEffect(() => {
        setBeanTitle(title);
    }, [currentBean]);

    const onUpdateBean = () => {
        updateBean(updatedBean);
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
                            <h2 className="prompt">Title</h2>
                            {
                                isEditingTitle ?
                                    <div className="title-input flex-between">
                                        <input
                                            type="text"
                                            className="input-box"
                                            placeholder="Title"
                                            value={beanTitle}
                                            onChange={e => setBeanTitle(e.target.value)}
                                        />
                                        <button
                                            className="action-button" id="confirm-update"
                                            onClick={onUpdateBean}>
                                            <i className="fas fa-check"></i>
                                        </button>
                                    </div>
                                    :

                                    <p className="input-box" onClick={() => setIsEditingTitle(true)}>{beanTitle}</p>

                            }
                        </div>
                        <div className="popup-item flex-start">
                            <h2 className="prompt">Description</h2>
                            {
                                isEditingDescription ?
                                    <div className="title-input flex-between">
                                        <textarea

                                            className="input-box"
                                            placeholder="Enter description"
                                            value={beanDescription}
                                            onChange={e => setBeanDescription(e.target.value)}
                                        />
                                        <button
                                            className="action-button" id="confirm-update"
                                            onClick={onUpdateBean}>
                                            <i className="fas fa-check"></i>
                                        </button>
                                    </div>
                                    :
                                    <p className="input-box" onClick={() => setIsEditingDescription(true)}>{beanDescription || "No description"}</p>
                            }
                        </div>

                    </div>
                </div>
            </Popup>
        </div>
    );
}