import React from "react";
import CreateCategoryCard from "../categories/CreateCategoryCard";
import CategoryCard from "../categories/CategoryCard";
import { DragDropContext } from 'react-beautiful-dnd';

// eslint-disable-next-line react/prop-types
export default function ProjectBoard({ currentProject, categories, createCategory, updateCategory, deleteCategory, event }) {
    const {
        id, 
        //title,
        //categoriesPositioning
    } = currentProject;

    console.log("categories from project board", categories)

    // const onDragEnd = (result) => {
    //     const { destination, source, draggableId } = result;
    //     console.log("destination", destination, "source", source, draggableId);
    //     if (!result.destination) {
    //         return;
    //     }
    //     let sourceIdx = parseInt(result.source.index)
    //     let destIdx = parseInt(result.destination.index)
    //    
    //     let draggingCard = category.task[sourceIdx]
    //    
    //     let newList = category.task.slice();
    //     newList.splice(sourceIdx, 1);
    //     newList.splice(destIdx, 0, draggingCard)
    //   
    //     category.task = newList;
    // }

    console.log("event from project board", event);

    return (
        <div className="project-board flex-start">
            <DragDropContext>

                {
                    categories === null ?
                        null :
                        <div className="category-cards">
                            {categories.map(category => (
                                <CategoryCard key={category.id}
                                    category={category} 
                                    categories={categories}
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