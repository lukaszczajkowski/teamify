import React, { useEffect, useState } from "react";
// import Editable from "./Editable";
import TaskApi from "../../api/TaskApi";
import CommentApi from "../../api/CommentApi";
import CreateTaskCard from "../tasks/CreateTaskCard";
import TaskCard from "../tasks/TaskCard";
import CategoryActions from "./CategoryActions";
import EditableText from "../projects/EditableText";
import { Draggable, Droppable } from 'react-beautiful-dnd';


// eslint-disable-next-line react/prop-types
export default function CategoryCard({ category, updateCategory, deleteCategory, event, categories }) {
    const {
        id,
        title,
        tasksPositioning
    } = category;

    console.log("categories from category card", categories);


    console.log("inital category: " + JSON.stringify(category));
    console.log("initial task order:" + JSON.stringify(tasksPositioning));
    console.log(tasksPositioning == []);
    const categoryId = id;

    const [tasks, setTasks] = useState([]);
    const [orderedTasks, setOrderedTasks] = useState([]);
    const [tasksOrder, setTasksOrder] = useState(tasksPositioning);


    const onDeleteCategory = () => {
        if (window.confirm("Do you want to delete this category?\n**Redesign this to a popup later**")) {
            deleteCategory(categoryId);
        }
    };

    const onTitleUpdated = (newTitle) => {
        const updatedCategory = {
            ...category,
            title: newTitle
        };
        updateCategory(updatedCategory);
    }

    const updateTasksOrder = (newTasksOrder) => {
        const newCategory = {
            ...category,
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
        console.log("!!!!!!!!!!");
        console.log("ordered tasks before sorting", orderedTasks);
        const orderedTasksList = [];
        for (let i = 0; i < tasksOrder.length; i++) {
            for (let j = 0; j < tasks.length; j++) {
                if (tasksOrder[i] == tasks[j].id) {
                    orderedTasksList.push(tasks[j]);
                }
            }
        }
        console.log("list of tasks after sorting:", orderedTasksList);
        const dog = orderedTasksList;
        setOrderedTasks(dog);
        console.log("ordered tasks: ", orderedTasks);
    }


    const createTask = (categoryId, taskData) => {
        return TaskApi.createTask(categoryId, taskData)
            .then((response) => {
                const newTasks = tasks;
                newTasks.push(response.data);
                setTasks(newTasks);
                console.log("tasks after updating:", tasks);
                const newTasksOrder = tasksOrder;
                newTasksOrder.push(response.data.id);
                setTasksOrder(newTasksOrder);
                console.log("tasks order after updating:", tasksOrder);

                // setTasks([...tasks, response.data]);
                // setTasksOrder([...tasksOrder, response.data.id]);
                const newOrderedTasks = orderedTasks;
                newOrderedTasks.push(response.data);
                setOrderedTasks(newOrderedTasks);
                console.log("task ordered tasks from response", orderedTasks);
                updateTasksOrder(tasksOrder);
                console.log("task order from response", tasksOrder);

                sortTasksByOrder(tasks, tasksOrder);
                console.log(orderedTasks);
            });
        // .then(setTasksOrder([...tasksOrder, taskData.id]))
        // .then(updateTasksOrder(tasksOrder))

    };

    const updateTask = (categoryId, task) => {
        return TaskApi.updateTask(categoryId, task)
            .then((response) => setTasks(tasks.map((item) => item.id == task.id ? response.data : item)));
    };

    const deleteTask = (taskId) => {
        // const deletedTaskId = taskId;
        return TaskApi.deleteTask(taskId)
            .then(response => {
                const newTasks = tasks.filter(item => item.id !== response.data);
                setTasks(newTasks);

                const removeIndexFromTasksOrder = tasksOrder.findIndex(item => item == response.data);
                console.log("index to remove from tasks order:", removeIndexFromTasksOrder);
                const newTasksOrder = tasksOrder;
                newTasksOrder.splice(removeIndexFromTasksOrder, 1);
                setTasksOrder(newTasksOrder);


                const newOrderedTasks = orderedTasks;
                const removeIndexFromOrderedTasks = orderedTasks.findIndex(item => item == response.data);
                newOrderedTasks.splice(removeIndexFromOrderedTasks, 1);
                setOrderedTasks(newOrderedTasks);
                console.log("ordered tasks after deletion:", orderedTasks);
            });
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
                            <Droppable droppableId={categoryId.toString()}>
                                {(dropProvided) => (
                                    <div ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                                        {orderedTasks.map((task, index) => (

                                            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                                {
                                                    (dragProvided) => (
                                                        <div
                                                            {...dragProvided.dragHandleProps}
                                                            {...dragProvided.draggableProps}
                                                            ref={dragProvided.innerRef}>
                                                            <TaskCard key={task.id}
                                                                task={task}
                                                                deleteTask={deleteTask}
                                                                updateTask={updateTask}
                                                                addMemberToTask={addMemberToTask}
                                                                addCommentToTask={addCommentToTask}
                                                                updateCommentTask={updateCommentTask}
                                                                deleteCommentTask={deleteCommentTask}
                                                                deleteMemberFromTask={deleteMemberFromTask}
                                                                 />
                                                        </div>

                                                    )
                                                }

                                            </Draggable>

                                        ))}
                                        {dropProvided.placeholder}
                                    </div>)
                                }


                            </Droppable>
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