import React, { useState } from "react";
import TaskPopup from "./TaskPopup";
import TaskActions from "./TaskActions";
// import { Draggable } from "react-beautiful-dnd";

export default function TaskCard({ task, deleteTask, updateTask, addMemberToTask, deleteMemberFromTask, addCommentToTask, updateCommentTask }) {
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    //const [taskMembers, setTaskMembers] = useState([]);

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
        <div>

            {/* <Draggable draggableId={task.id.toString()}>
                {
                    (provided) => (
                        <div ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}> */}
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

                                    onClose={onClosePopup} />
                            </div>

                        {/* </div>
                    )
                }
            </Draggable> */}
        </div>

    );
}