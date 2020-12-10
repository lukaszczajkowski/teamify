import React from "react";
import CreateCategoryCard from "../categories/CreateCategoryCard";
import CategoryCard from "../categories/CategoryCard";
import {DragDropContext} from 'react-beautiful-dnd';

// eslint-disable-next-line react/prop-types
export default function ProjectBoard( {projectId, categories, createCategory, updateCategory, deleteCategory }) {
    return (
        <div className="project-board flex-start">
            <DragDropContext>
            
                {
                categories === null ?
                    null :
                    <div className="category-cards flex-start">
                        {/* eslint-disable-next-line react/prop-types */}
                        {categories.map(category => (
                            <CategoryCard key={category.id} 
                                        category={category} projectId={projectId}
                                        updateCategory={updateCategory} 
                                        deleteCategory={deleteCategory}/>
                        ))}
                    </div>
            }
                
                <CreateCategoryCard projectId={projectId} onSubmit={createCategory}/>
                </DragDropContext>
        </div>
    );
}