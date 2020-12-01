import React from "react";
import CreateCategoryCard from "../categories/CreateCategoryCard";
import CategoryCard from "../categories/CategoryCard";

// eslint-disable-next-line react/prop-types
export default function ProjectBoard( {projectId, categories, createCategory}) {
    return (
        <div className="project-board">
            {
                categories === null ?
                    null :
                    <div>
                        {/* eslint-disable-next-line react/prop-types */}
                        {categories.map(category => (
                            <CategoryCard key={category.id} category={category}/>
                        ))}
                    </div>
            }

            <div className="board-container">
                <CreateCategoryCard projectId = {projectId} onSubmit={createCategory} />
            </div>

        </div>
    );
}