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
        
        if(
            destination.droppableId === source.droppableId && 
            destination.index === source.index
        ) {
            return;
        }

        const category = categories[source.droppableId];
        const newTasks = category.tasks.slice();
        newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, draggableId);

        const newCategory = {
            ...category,
            tasks: newTasks,
        };

        const newState = {
            ...this.state,
            categories: {
                ...this.state.categories,
                [newCategory.id]: newCategory, 
            },
        }
        this.setState(newState);
    };
    return (
        <DragDropContext onDragEnd = {onDragEnd}>
        <div className="project-board flex-start">
            
            
                {
                categories === null ?
                    null :
                    <div className="category-cards flex-start">
                        {/* eslint-disable-next-line react/prop-types */}
                        {categories.map((category, tasks) => (
                            <CategoryCard key={category.id} 
                                        tasks={tasks}
                                        category={category} projectId={projectId}
                                        updateCategory={updateCategory} 
                                        deleteCategory={deleteCategory}/>
                        ))}
                    </div>
            }
                
                <CreateCategoryCard projectId={projectId} onSubmit={createCategory}/>
                
        </div>
        </DragDropContext>
    );
}