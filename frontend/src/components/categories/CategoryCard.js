import React, { useEffect, useState } from "react";
import Editable from "./Editable";
import TaskApi from "../../api/TaskApi";
import CreateTaskCard from "../tasks/CreateTaskCard";
import TaskCard from "../tasks/TaskCard";

// eslint-disable-next-line react/prop-types
export default function CategoryCard({ category, deleteCategory }) {
    // eslint-disable-next-line react/prop-types
    const categoryId = category.id;
    // eslint-disable-next-line react/prop-types
    const [tasks, setTasks] = useState([]);
    // eslint-disable-next-line react/prop-types
    const [title, setTitle] = useState(category.title);

    const onDeleteCategory = () => {
        if (window.confirm("Do you want to delete this category?\n**Redesign this to a popup later**")) {
            deleteCategory(categoryId);
        }

    }

    const getTasksByCategory = (categoryId) => {
        return TaskApi.getTasksByCategoryId(categoryId)
            .then(response => setTasks(response.data))
            .catch(err => console.log(`error on get all tasks: ${err}`));
    }


    const createTask = (categoryId, taskData) => {
        console.log(`create task on category: ${categoryId}`);
        return TaskApi.createTask(categoryId, taskData)
            .then(response => setTasks([...tasks, response.data]));
    }


    const updateTask = (task) => {
        return TaskApi.updateTask(task)
            .then(res => console.log(res.data));
    }

    const deleteTask = (taskId) => {
        return TaskApi.deleteTask(taskId)
            .then(() => setTasks(tasks.filter(a => a.id !== taskId)));
    }

    useEffect(() => {
        getTasksByCategory(categoryId);
    }, [categoryId]);

    return (
        <div className="category-card">
            <div className="card-title flex-between">
                <Editable
                    text={title}
                    placeholder="title"
                    type="input"
                >
                    <input
                        type="text"
                        name="category title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </Editable>


                <button
                    id="delete-category"
                    onClick={onDeleteCategory}><i className="fas fa-times"></i></button>
            </div>

            <div className="tasks-list">
                {
                    tasks === null ?
                        null :
                        <div>
                            {tasks.map(task => (
                                <TaskCard key={task.id} 
                                        task={task} 
                                        deleteTask={deleteTask} 
                                        updateTask={updateTask}/>
                            ))}
                        </div>
                }
            </div>

            <CreateTaskCard
                onSubmit={createTask}
                categoryId={categoryId}
            />
        </div>

    );
}