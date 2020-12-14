import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import BeanIcon from "../../assets/bean-black.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
                <motion.div initial={{
                                scale: 0
                                    }}
                                animate= {{
                                scale: 1
                                }} className="modal">
                    <button className="close" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>

                    <div className="header1">
                        <div className="flex-start">
                            <img className="header1-icon" src={BeanIcon} />
                            <h2 className="header1-title">Edit Bean</h2>
                        </div>

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

                                            className="input-box text-area"
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

                        <div className="popup-item flex-start">
                        <Link to="/calendar" className="link sub-prompt">
                            <i className="far fa-calendar-alt calendar-icon"></i>
                            Go to calendar to edit the time of your bean</Link>
                        </div>

                    </div>
                </motion.div>
            </Popup>
        </div>
    );
}