import React from "react";
import CreateTaskCard from "../tasks/CreateTaskCard";


// eslint-disable-next-line react/prop-types
export default function TaskCard({categoryId, tasks, createTask, deleteTask}) {
    return(
        <div className="project-board flex-start">
        {
        tasks === null ?
            null :
            <div className="flex-start">
                {/* eslint-disable-next-line react/prop-types */}
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} deleteTask={deleteTask}/>
                ))}
            </div>
    }
        <CreateTaskCard categoryId={categoryId} onSubmit={createTask} />
</div>
);
}