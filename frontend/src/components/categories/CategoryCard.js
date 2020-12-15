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
    const {
        id,
        title,
        tasksPositioning
    } = category;

    console.log("inital category: " + JSON.stringify(category));
    console.log("initial task order:" + JSON.stringify(tasksPositioning));
    console.log(tasksPositioning == []);
    const categoryId = id;

    const [tasks, setTasks] = useState([]);
    const [orderedTasks, setOrderedTasks] = useState([]);
    const [tasksOrder, setTasksOrder] = useState(category.tasksPositioning);


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

    const updateTasksOrder = (newTasksOrder) => {
        const newCategory = {
            id,
            title,
            tasksPositioning: newTasksOrder
        }
        updateCategory(newCategory);
        console.log(category);
    }


    const getTasksByCategory = (categoryId) => {
        return TaskApi.getTasksByCategoryId(categoryId)
            .then(response => setTasks(response.data))
            .catch(err => console.log(`error on get all tasks: ${err}`));
    };

    const sortTasksByOrder = (tasks, tasksOrder) => {
        const orderedTasksList = [];
        for (let i = 0; i < tasksOrder.length; i++) {
            for (let j = 0; j < tasks.length; j++) {
                if (tasksPositioning[i] == tasks[j].id) {
                    orderedTasks.push(tasks[j].id);
                }
            }
        }
        setOrderedTasks(orderedTasksList);
    }


    const createTask = (categoryId, taskData) => {
        return TaskApi.createTask(categoryId, taskData)
            .then(response => setTasks([...tasks, response.data]))
            .then(setTasksOrder([...tasksOrder, taskData.id]))
            .then(updateTasksOrder(tasksOrder))
            .then(console.log("after creating task. current task order" + tasksOrder));
    };

    const updateTask = (categoryId, task) => {
        return TaskApi.updateTask(categoryId, task)
            .then((response) => setTasks(tasks.map((item) => item.id == task.id ? response.data : item)));
    };

    const deleteTask = (taskId) => {
        return TaskApi.deleteTask(taskId)
            .then(() => setTasks(tasks.filter(task => task.id !== taskId)))
            //.then(() => setTasksOrder(tasksOrder.filter(item => item !== taskId)))
            .then(console.log("after deletion, task order:" + tasksOrder));
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
        // console.log("updateCommentTask:", task, comment);
        return CommentApi.updateComment(comment, task.id)
            .then(() => getTasksByCategory(categoryId))
    }

    const deleteCommentTask = (commentId) => {
        //console.log("deletingComment:", commentId);
        return CommentApi.deleteComment(commentId)
            .then(() => getTasksByCategory(categoryId))
    }

    useEffect(() => {
        sortTasksByOrder(tasks, tasksOrder);
    }, [tasks, tasksOrder]);

    useEffect(() => {
        getTasksByCategory(categoryId);
    }, [categoryId]);

    useEffect(() => {
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

                <CategoryActions onDeleteCategory={onDeleteCategory} />

            </div>

            <div className="tasks-list">
                {
                    orderedTasks === null ?
                        null :
                        <div>
                            {/* <Droppable droppableId={categoryId.toString()}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}> */}
                            {tasks.map((task) => (
                                <TaskCard key={task.id}
                                    task={task}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    addMemberToTask={addMemberToTask}
                                    addCommentToTask={addCommentToTask}
                                    updateCommentTask={updateCommentTask}
                                    deleteCommentTask={deleteCommentTask}
                                    deleteMemberFromTask={deleteMemberFromTask} />
                            ))}
                            {/*   {provided.placeholder}
                                     </div>
                                )}
                            </Droppable> */}
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