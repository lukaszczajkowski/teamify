import React from "react";
import CreateCategoryCard from "../categories/CreateCategoryCard";
import CategoryCard from "../categories/CategoryCard";
import { DragDropContext } from 'react-beautiful-dnd';
import TaskApi from "../../api/TaskApi";


// eslint-disable-next-line no-unused-vars
export default function ProjectBoard({ currentProject, categories, orderedCategories, createCategory, updateCategory, deleteCategory, event }) {
    const {
        id,
        //title,
        // eslint-disable-next-line no-unused-vars
        categoriesPositioning
    } = currentProject;

    console.log("on project Board. orderedCategories:", orderedCategories);

    //const [lists, setLists] = useState(orderedCategories);
    //console.log("liststate=", lists);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        console.log("destination", destination, "source", source, draggableId);

        // drop outside the category area
        if (!result.destination) {
            return;
        }

        // drop at the same position
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }


        const start = orderedCategories.find(item => item.id == source.droppableId);
        console.log("startlist=", JSON.stringify(start));
        const finish = orderedCategories.find(item => item.id == destination.droppableId);
        console.log("finishlist=", JSON.stringify(finish));

        // drop in the same category
        if (start.id === finish.id) {
            const newTasksOrder = start.tasksPositioning;
            console.log("startorder=", newTasksOrder);
            console.log("draggableid=", draggableId);
            newTasksOrder.splice(source.index, 1);
            newTasksOrder.splice(destination.index, 0, parseInt(draggableId));

            console.log("splicedlist=", newTasksOrder);

            const newCategory = {
                ...start,
                tasksPositioning: newTasksOrder,
            };

            console.log("newlist=", newCategory);

            updateCategory(newCategory);
            //setLists(newTasksOrder);
            return;
        }

        // Drag and Drop in different columns
        const startTasksOrder = start.tasksPositioning;
        startTasksOrder.splice(source.index, 1);
        const newStart = {
            ...start,
            tasksPositioning: startTasksOrder,
        };
        updateCategory(newStart);

        const finishTasksOrder = finish.tasksPositioning;
        finishTasksOrder.splice(destination.index, 0, parseInt(draggableId));
        const newFinish = {
            ...finish,
            tasksPositioning: finishTasksOrder,
        };
        updateCategory(newFinish);

        // updateTask
        const updateTask = () => {
            return TaskApi.updateTaskCategory(parseInt(draggableId), finish.id);
        }
        updateTask();

    }

    console.log("event from project board", event);

    return (
        <div className="project-board flex-start">
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    {orderedCategories == null ?
                        null :
                        <div className="category-cards">
                            {
                                orderedCategories.map((category) => (
                                        <CategoryCard key={category.id}
                                            category={category}
                                            categories={categories}
                                            projectId={id}
                                            updateCategory={updateCategory}
                                            deleteCategory={deleteCategory}
                                            event={event} />
                                ))
                                       
                            }
                            <CreateCategoryCard projectId={id} createCategory={createCategory} />
                        </div>
                    }
                </div>
            </DragDropContext>

        </div >
    );
}