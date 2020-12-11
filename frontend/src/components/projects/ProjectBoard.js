import React from "react";
import CreateCategoryCard from "../categories/CreateCategoryCard";
import CategoryCard from "../categories/CategoryCard";
import {DragDropContext} from 'react-beautiful-dnd';

// eslint-disable-next-line react/prop-types
export default function ProjectBoard( {projectId, categories, createCategory, updateCategory, deleteCategory}) {
    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result;
        if (!destination) {
            return;
            }
        const sourceCategory = categories[source.droppableId];
        const destinationCategory = categories[destination.droppableId];
        const draggingTask = sourceCategory.tasks.filter(
            (task) => task.id === draggableId
        )[0];
        if (source.droppableId === destination.droppableId){
            sourceCategory.tasks.splice(source.index, 1);
            destinationCategory.tasks.splice(destination.index, 0, draggingTask);
        }
    };
    
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