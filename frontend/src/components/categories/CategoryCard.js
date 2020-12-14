import React, { useEffect, useState } from "react";
// import Editable from "./Editable";
import TaskApi from "../../api/TaskApi";
import CommentApi from "../../api/CommentApi";
import CreateTaskCard from "../tasks/CreateTaskCard";
import TaskCard from "../tasks/TaskCard";
import CategoryActions from "./CategoryActions";
import EditableText from "../projects/EditableText";
// import { Droppable } from 'react-beautiful-dnd';


// eslint-disable-next-line react/prop-types
export default function CategoryCard({ category, updateCategory, deleteCategory, event }) {
    const categoryId = category.id;
    const [tasks, setTasks] = useState([]);

    const {
        id, title
    } = category;
   

    const onDeleteCategory = () => {
        if (window.confirm("Do you want to delete this category?\n**Redesign this to a popup later**")) {
            deleteCategory(categoryId);
        }
    };

    const onTitleUpdated = (newTitle) => {
        const updatedCategory = {
            id,
            title: newTitle
        };
        updateCategory(updatedCategory);
    }



    const getTasksByCategory = (categoryId) => {
        return TaskApi.getTasksByCategoryId(categoryId)
            .then(response => setTasks(response.data))
            .catch(err => console.log(`error on get all tasks: ${err}`));
    };


    const createTask = (categoryId, taskData) => {
        //console.log(`create task on category: ${categoryId}`);
        return TaskApi.createTask(categoryId, taskData)
            .then(response => setTasks([...tasks, response.data]));
    };

    const updateTask = (categoryId, task) => {
        //console.log(`update task on category: ${categoryId}`);
        //console.log(` task `, task);
        return TaskApi.updateTask(categoryId, task)
            .then((response) => setTasks(tasks.map((item) => item.id == task.id ? response.data : item)));
    };

    const deleteTask = (taskId) => {
        return TaskApi.deleteTask(taskId)
            .then(() => setTasks(tasks.filter(a => a.id !== taskId)));
    };

    const addMemberToTask = (task, member) => {
        //console.log("updateTaskAddMember:", task, member);
        return TaskApi.addMemberToTask(task.id, member.id)
            .then((response) => setTasks(tasks.map((item) => item.id == task.id ? response.data : item)));
    };

    const deleteMemberFromTask = (task, member) => {
        //console.log("deleteMemberFromTask:", task, member);
        return TaskApi.deleteMemberFromTask(task.id, member.id)
            .then((response) => setTasks(tasks.map((item) => item.id == task.id ? response.data : item)));
    };

    const addCommentToTask = (task, comment) => {
        //console.log("addCommentToTask:", task, comment);
        return CommentApi.createComment(comment, task.id)
        .then(() => getTasksByCategory(categoryId))
    }

    const updateCommentTask = (task, comment) => {
        //console.log("updateCommentTaskz:", task, comment);
        return CommentApi.updateComment(comment, task.id)
        .then(() => getTasksByCategory(categoryId))
    }

    useEffect(() => {
        getTasksByCategory(categoryId);
    }, [categoryId]);

    useEffect(() => {
        console.log("incoming event from category card", event)
        getTasksByCategory(categoryId);
    }, [event]);

    return (
        <div className="category-card">
            <div className="flex-between category-title">
                <EditableText
                text={title}
                placeholder="title"
                onUpdateText={onTitleUpdated}
                />

                <CategoryActions onDeleteCategory={onDeleteCategory}/>
                
            </div>

            <div className="tasks-list">
                {
                    tasks === null ?
                        null :
                        <div>
                            {/* <Droppable droppableId={categoryId.toString()}> */}
                                {/* {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}> */}
                                    {tasks.map((task) => (
                                        <TaskCard key={task.id}
                                            task={task}
                                        
                                            deleteTask={deleteTask}
                                            updateTask={updateTask}
                                            addMemberToTask={addMemberToTask}
                                            addCommentToTask = {addCommentToTask}
                                            updateCommentTask = {updateCommentTask}
                                            deleteMemberFromTask={deleteMemberFromTask} />
                                      ))}

                                            
{/* 
                                        {provided.placeholder}
                                    </div> */}
                                {/* )} */}
                            {/* </Droppable> */}
                           
                        </div>
                }
            </div>

            <CreateTaskCard
                createTask={createTask}
                categoryId={categoryId}
            />
        </div >

    );
}