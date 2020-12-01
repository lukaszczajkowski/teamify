import React, { useState } from "react";
import Editable from "./Editable";

// eslint-disable-next-line react/prop-types
export default function CategoryCard({ category }) {
    // eslint-disable-next-line react/prop-types
    const [title, setTitle] = useState(category.title);


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
            <button>delete</button>
        </div>
        </div>
        


    );
}