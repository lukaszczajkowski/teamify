import React, { useState } from "react";
import TaskPopup from "./TaskPopup";

// eslint-disable-next-line react/prop-types
export default function TaskCard({ task, deleteTask, updateTask }) {
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const onDeleteTask = () => {
        // eslint-disable-next-line react/prop-types
        if (window.confirm(`Do you want to delete task ${task.id}?\n**Redesign this to a popup later**`)) {
            // eslint-disable-next-line react/prop-types
            deleteTask(task.id);
        }
    }

    const openPopup = () => {
        setPopupIsOpen(true);

    }

    return (
        <div className="task-card">
            <div className="flex-between">
                <div className="flex-grow" onClick={openPopup}>
                {/* eslint-disable-next-line react/prop-types*/}
                <p>{task.title}</p>
            </div>

            <button className="button flex-ungrow"
                id="delete-category"
                onClick={onDeleteTask}>
                Delete
            </button>
            </div>
            
            <TaskPopup isOpen={popupIsOpen} 
                        currentTask={task} 
                        deleteTask={deleteTask} 
                        updateTask={updateTask} 
                        onClose={(v)=> setPopupIsOpen(v)}  />
        </div>
    );
}