import React, { useState } from "react";
import TaskPopup from "./TaskPopup";
import TaskActions from "./TaskActions";

// *****************The code below has been refactored to css **********************
// import {Paper} from '@material-ui/core';
// import { makeStyles } from "@material-ui/core/styles";

// const useStyle = makeStyles((theme) => ({
//     card: {
//         padding: theme.spacing(1,1,1,2),
//             margin: theme.spacing(1),
//           },
// }));

// eslint-disable-next-line react/prop-types
export default function TaskCard({ task, deleteTask, updateTask, addMemberToTask, deleteMemberFromTask }) {
    // const classes = useStyle();
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    //const [taskMembers, setTaskMembers] = useState([]);

    const onDeleteTask = () => {
        // eslint-disable-next-line react/prop-types
        if (window.confirm(`Do you want to delete task ${task.id}?\n**Redesign this to a popup later**`)) {

            // eslint-disable-next-line react/prop-types
            deleteTask(task.id);
        }
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
                    {/* eslint-disable-next-line react/prop-types*/}
                    <p className="task-title">{task.title}</p>
                    {/* <Paper className={classes.card}>{task.title}</Paper> */}
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
                onClose={onClosePopup} />
        </div>
    );
}