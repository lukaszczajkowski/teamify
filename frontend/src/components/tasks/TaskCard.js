import React, { useState } from "react";
import TaskPopup from "./TaskPopup";
import TaskActions from "./TaskActions";

export default function TaskCard({ task, deleteTask, updateTask, addMemberToTask, deleteMemberFromTask, addCommentToTask, updateCommentTask, deleteCommentTask, categories}) {
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    //const [taskMembers, setTaskMembers] = useState([]);
    console.log("categories from task card", categories);

    const onDeleteTask = () => {
        deleteTask(task.id);

    }

    const onUpdateTask = () => {
        setPopupIsOpen(true);
    }

    const onClosePopup = () => {
        setPopupIsOpen(false);
    }

    return (
        <div className="task-card">
            <div className="flex-between">
                <div className="flex-grow">
                    <p className="task-title">{task.title}</p>
                </div>

                <TaskActions
                    onDeleteTask={onDeleteTask}
                    onUpdateTask={onUpdateTask} />
            </div>
            <div className="task-member"></div>

            <TaskPopup isOpen={popupIsOpen}
                currentTask={task}
                updateTask={updateTask}
                addMemberToTask={addMemberToTask}
                deleteMemberFromTask={deleteMemberFromTask}
                addComment={addCommentToTask}
                updateComment={updateCommentTask}
                deleteComment={deleteCommentTask}
                categories={categories}
                onClose={onClosePopup} />
        </div>

    );
}