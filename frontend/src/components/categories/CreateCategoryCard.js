import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function CreateCategoryCard({ createCategory, projectId }) {
    const [title, setTitle] = useState("");
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);


    const handleClick = () => {
        setIsCreatingCategory(true);
    }

    const onSubmit = () => {
        createCategory(projectId, 
                { title: title });
        setIsCreatingCategory(false);
        setTitle("");
    }

    return (
        <div className="category-card">
            {
                isCreatingCategory ?
                    <div className="category-input">
                        <form onSubmit={onSubmit}>
                            <input
                            type="text"
                            className="input-box"
                            placeholder="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)} 
                            required/>
                        <button 
                        type="submit"
                            className="button">
                            Add list
                        </button>
                        </form>
                        
                    </div> :
                        <button id="create-category" onClick={handleClick}>+ Add a list</button>
            }
        </div>



    );

}