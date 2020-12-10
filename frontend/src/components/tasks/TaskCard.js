import React, { useState } from "react";
import TaskPopup from "./TaskPopup";
import TaskActions from "./TaskActions";
import {Draggable} from "react-beautiful-dnd";

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
export default function TaskCard({ task, deleteTask, updateTask, addMemberToTask, deleteMemberFromTask, addCommentToTask, updateCommentTask, index }) {
    // const classes = useStyle();
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    //const [taskMembers, setTaskMembers] = useState([]);

    const onDeleteTask = () => {
            // eslint-disable-next-line react/prop-types
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
        {/* eslint-disable-next-line react/prop-types*/}
        <Draggable draggableId={task.id.toString()} index={index}>{
            (provided) => (
                <div ref={provided.innerRef} 
                {...provided.dragHandleProps} 
                {...provided.draggableProps}>
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
                addComment = {addCommentToTask}
                updateComment = {updateCommentTask}

          onClose={onClosePopup} />
          </div>
          
        </div>
        )}
        </Draggable>
        </div>
       
    );
}