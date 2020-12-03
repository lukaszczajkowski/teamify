import React from "react";

// eslint-disable-next-line react/prop-types
export default function TaskCard({ task, deleteTask }) {
    const onDeleteTask = () => {
        // eslint-disable-next-line react/prop-types
        if (window.confirm(`Do you want to delete task ${task.id}?\n**Redesign this to a popup later**`)) {
            // eslint-disable-next-line react/prop-types
            deleteTask(task.id);
        }

    }

    return (
        <div className="task-card flex-between">
            {/* eslint-disable-next-line react/prop-types*/}
            <p>{task.title}</p>
            <button className="button"
                    id="delete-category"
                    onClick={onDeleteTask}>Delete</button>
        </div>
    );
}