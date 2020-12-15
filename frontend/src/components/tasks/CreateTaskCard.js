import React, { useState } from "react";

export default function CreateTaskCard({ createTask, categoryId }) {
  const [title, setTitle] = useState("");
  //const classes = useStyle();
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const handleClick = () => {
    setIsCreatingTask(true);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    createTask(categoryId,
      { title: title });
    setIsCreatingTask(false);
    setTitle("");
  }

  return (
    <div className="create-task-card">
      {
        isCreatingTask ?
          <div>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                className="input-box"
                placeholder="Enter the task title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required />
              <div className="flex-between">
                <button className="button" type="submit">
                  Add Task
            </button>
                <button className="button" onClick={() => setIsCreatingTask(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </form>
          </div>
          :
          <button id="create-task" onClick={handleClick}>+ Add a Task</button>
      }
    </div>



  );

}