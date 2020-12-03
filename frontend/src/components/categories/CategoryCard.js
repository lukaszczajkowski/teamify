
import React, { useEffect, useState } from "react";
import Editable from "./Editable";
import TaskApi from "../../api/TaskApi";
import{useParams, useHistory} from "react-router-dom";
import CreateTaskCard from "../tasks/CreateTaskCard";
import CategoryApi from "../../api/CategoryApi";
import TaskCard from "../tasks/TaskCard";

// eslint-disable-next-line react/prop-types
export default function CategoryCard({ category }) {
    const history = useHistory();
    const {categoryId} = useParams();
    // eslint-disable-next-line react/prop-types

    const [tasks, setTasks] = useState([]);
    // eslint-disable-next-line react/prop-types
    const [title, setTitle] = useState(category.title);
    const [categories, setCategories] = useState([]);
    

    

    const onDeleteCategory = () => {
        if (window.confirm("Do you want to delete this category?")) {
            deleteCurrentCategory();
            history.push("/users");
            window.location.reload();
        }

    }
    function deleteCurrentCategory() {
        // eslint-disable-next-line react/prop-types
        return CategoryApi.deleteCategory(category.id)
        // eslint-disable-next-line react/prop-types
        .then(()=> setCategories(categories.filter(a => a.id != category.id)))
            .then(console.log(`Deleting category ${categoryId}`))
            .catch(err => console.log(`error on delete category: ${err}`));
    }

    const getAllTasks = (categoryId) => {
        return TaskApi.getAllTasks(categoryId)
        .then(response => setTasks(response.data))
        .catch(err => console.log(`error on get all tasks: ${err}`));
    }
    useEffect(() => {
        getAllTasks(categoryId);
    }, []);


    const createTask = (categoryId,taskData) => {
        return TaskApi.createTask(categoryId,taskData)
        .then((res)=> {
            setTasks([res.data, ...tasks]);
        });
    };


    const updateTask  = (task) => {
        return TaskApi.updateTask(task)
            .then(res => console.log(res.data));
    }

    const deleteTask = (task) => {
        return TaskApi.deleteTask(task.id)
             .then(() => setTasks(tasks.filter(a => a.id !== task.id)));
     }

   

    // const onDeleteCategory = ({category.id}) => {
    //     deleteCategory

    //     }

    

    return (
        <div className="category-card">
            <div className="flex-between">
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
            

            <button className="button"
            id="delete-category"
            onClick={onDeleteCategory}>Delete</button>
        </div>

        <TaskCard />

        <CreateTaskCard tasks= {tasks}
        onSubmit ={createTask}
        deleteTask = {deleteTask}
        updateTask = {updateTask}
        />
        
        
        
             
             </div>

    );
}