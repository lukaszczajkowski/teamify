import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function CreateCategoryCard({ onSubmit, projectId }) {
    const [title, setTitle] = useState("");
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);


    const handleClick = () => {
        setIsCreatingCategory(true);
    }

    const onCreateCategory = () => {
        onSubmit(projectId, 
                { title: title });
        setIsCreatingCategory(false);
        setTitle("");
    }

    return (
        <div className="category-card">
            {
                isCreatingCategory ?
                    <div className="category-input">
                        <input
                            type="text"
                            className="input-box"
                            placeholder="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)} />
                        <button onClick={onCreateCategory}
                            className="button">
                            Add list
                        </button>
                    </div> :
                        <button id="create-category" onClick={handleClick}>+ Add a list</button>
            }
        </div>



    );

}