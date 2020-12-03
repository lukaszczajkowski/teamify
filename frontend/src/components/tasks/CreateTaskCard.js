import React, { useState } from "react";


// eslint-disable-next-line react/prop-types
export default function CreateTaskCard({onSubmit, categoryId}) {
    const [title, setTitle] = useState("");
    const [isCreatingTask, setIsCreatingTask] = useState(false);


    const handleClick = () => {
        setIsCreatingTask(true);
    }

    const onCreateTask = () => {
        onSubmit(categoryId, 
                { title: title });
        setIsCreatingTask(false);
    }

    return (
        <div className="category-card">
            {
                isCreatingTask ?
                    <div className="category-input">
                        <input
                            type="text"
                            className="input-box"
                            placeholder="Name"
                            value={title}
                            onChange={e => setTitle(e.target.value)} />
                        <button onClick={() => onCreateTask()}
                            className="button">
                            Add Task
                        </button>
                    </div> :
                        <button onClick={handleClick}> Create Task</button>
            }
        </div>



    );

}