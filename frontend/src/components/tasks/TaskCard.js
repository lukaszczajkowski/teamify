import React, { useState } from "react";
import TaskPopup from "./TaskPopup";
import TaskActions from "./TaskActions";
import MemberCard from "../projects/MemberCard";

export default function TaskCard({ task, deleteTask, updateTask, addMemberToTask, deleteMemberFromTask, addCommentToTask, updateCommentTask, deleteCommentTask }) {
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    //const [taskMembers, setTaskMembers] = useState([]);

    const {
        members
    } = task;

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
                <div className="flex-end">
                    <p className="task-title" onClick={onUpdateTask}>{task.title}</p>
                    <div className="member-list flex-end">
                        {members && members.map(member => (
                            <MemberCard
                                key={member.id}
                                member={member}
                            />
                        ))}
                    </div>
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
                onClose={onClosePopup} />
        </div>

    );
}