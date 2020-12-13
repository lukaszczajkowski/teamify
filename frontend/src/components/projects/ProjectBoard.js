import React from "react";
import CreateCategoryCard from "../categories/CreateCategoryCard";
import CategoryCard from "../categories/CategoryCard";
// import { DragDropContext } from 'react-beautiful-dnd';

// eslint-disable-next-line react/prop-types
export default function ProjectBoard({ projectId, categories, createCategory, updateCategory, deleteCategory }) {
    // const onDragEnd = (result) => {
    //     const { destination, source, draggableId } = result;
    //     console.log("destination", destination, "source", source, draggableId);
    //     if (!result.destination) {
    //         return;
    //     }
    //     let sourceIdx = parseInt(result.source.index)
    //     let destIdx = parseInt(result.destination.index)
    //     {/* eslint-disable-next-line react/prop-types */ }
    //     let draggingCard = category.task[sourceIdx]
    //     {/* eslint-disable-next-line react/prop-types */ }
    //     let newList = category.task.slice();
    //     newList.splice(sourceIdx, 1);
    //     newList.splice(destIdx, 0, draggingCard)
    //     {/* eslint-disable-next-line react/prop-types */ }
    //     category.task = newList;
    // }

    return (
        <div className="project-board flex-start">
            {/* <DragDropContext onDragEnd={onDragEnd}> */}

                {
                    categories === null ?
                        null :
                        <div className="category-cards">
                            {/* eslint-disable-next-line react/prop-types */}
                            {categories.map(category => (
                                <CategoryCard key={category.id}
                                    category={category} projectId={projectId}
                                    updateCategory={updateCategory}
                                    deleteCategory={deleteCategory} />
                            ))}
                            <CreateCategoryCard projectId={projectId} onSubmit={createCategory} />
                        </div>
                }


            {/* </DragDropContext> */}
        </div>
    );
}