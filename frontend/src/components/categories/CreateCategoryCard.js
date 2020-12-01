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
    }

    return (
        <div>
            {
                isCreatingCategory ?
                    <div>
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
                    <div>
                        <button onClick={handleClick}>+ Add a list</button>
                    </div>
            }
        </div>



    );

}