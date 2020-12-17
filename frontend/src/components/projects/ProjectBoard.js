import React from "react";
import CreateCategoryCard from "../categories/CreateCategoryCard";
import CategoryCard from "../categories/CategoryCard";
import { DragDropContext } from 'react-beautiful-dnd';

// eslint-disable-next-line react/prop-types
export default function ProjectBoard({ currentProject, categories, orderedCategories, createCategory, updateCategory, deleteCategory, event }) {
    const {
        id, 
        //title,
        //categoriesPositioning
    } = currentProject;

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        console.log("destination", destination, "source", source, draggableId);

        if (!result.destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && 
            destination.index === source.index) {
                return;
            }

        console.log("ordered categories:" + JSON.stringify(orderedCategories));
        let CategoriesObj = orderedCategories.reduce((obj, item) => Object.assign(obj, {[item.key]: item.value}), {});
        console.log(JSON.stringify(CategoriesObj));
        const category = orderedCategories[source.droppableId];
        console.log(category);

        // const newTaskOrder = Array.from(category.tasksPositioning);
        // newTasksOrder.splice(source.index, 1);
        // newTasksOrder.splice(destination.index, 0, draggableId);

        // const newCategory = {
        //     ...category,
        //     tasksPositioning: newTasksOrder,
        // };

        // updateCategory(newCategory);
        



    }

    console.log("event from project board", event);

    return (
        <div className="project-board flex-start">
            <DragDropContext onDragEnd={onDragEnd}>

                {
                    categories === null ?
                        null :
                        <div className="category-cards">
                            {categories.map(category => (
                                <CategoryCard key={category.id}
                                    category={category} 
                                    projectId={id}
                                    updateCategory={updateCategory}
                                    deleteCategory={deleteCategory}
                                    event={event} />
                            ))}
                            <CreateCategoryCard projectId={id} createCategory={createCategory} />
                        </div>
                }


            </DragDropContext>
        </div>
    );
}