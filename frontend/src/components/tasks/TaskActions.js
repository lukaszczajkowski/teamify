import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function TaskActions({ onDeleteTask, onUpdateTask }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => setIsOpen(!isOpen);

    return (
        <div className="action category-actions">
            <button className="action-button" onClick={handleClick}>
                <i className="fas fa-ellipsis-v"></i>
            </button>
            {
                isOpen ?
                    <div className="action-menu">
                        <button
                            className="action-item"
                            id="delete-task"
                            onClick={() => {
                                setIsOpen(false);
                                onDeleteTask();
                            }}>Delete Task
                        </button>
                        <button
                            className="action-item"
                            id="update-task"
                            onClick={() => {
                                setIsOpen(false); 
                                onUpdateTask();
                            }}>Update Task
                        </button>
                    </div> :
                    null
            }
        </div>
    );
}