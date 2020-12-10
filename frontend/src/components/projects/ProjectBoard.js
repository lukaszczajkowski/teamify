import React from "react";
import CreateCategoryCard from "../categories/CreateCategoryCard";
import CategoryCard from "../categories/CategoryCard";
import {DragDropContext} from 'react-beautiful-dnd';

// eslint-disable-next-line react/prop-types
export default function ProjectBoard( {projectId, categories, createCategory, updateCategory, deleteCategory, category }) {
    let onDragEnd = (result) => {
        if (!result.destination) {
        return;
        }
        let sourceIdx = parseInt(result.source.index)
        let destIdx = parseInt(result.destination.index)
         {/* eslint-disable-next-line react/prop-types */}
        let draggedLink = category.task[sourceIdx]
         {/* eslint-disable-next-line react/prop-types */}
        let newList = category.task.slice();
        newList.splice(sourceIdx, 1);
        newList.splice(destIdx, 0, draggedLink)
         {/* eslint-disable-next-line react/prop-types */}
        category.task = newList;
        }
    return (
        <div className="project-board flex-start">
            <DragDropContext onDragEnd = {onDragEnd}>
            
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