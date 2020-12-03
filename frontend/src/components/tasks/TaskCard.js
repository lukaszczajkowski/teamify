import React from "react";

// eslint-disable-next-line react/prop-types
export default function TaskCard({ task, deleteTask }) {
    return (
        <div className="task-card flex-start">
            {/* eslint-disable-next-line react/prop-types*/}
            <p>{task.title}</p>
            <button className="button"
                    id="delete-category"
                    onClick={deleteTask}>Delete</button>
        </div>
    );
}