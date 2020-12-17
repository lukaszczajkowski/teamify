import React from "react";
import CreateCategoryCard from "../categories/CreateCategoryCard";
import CategoryCard from "../categories/CategoryCard";
import { DragDropContext } from 'react-beautiful-dnd';
//import TaskApi from "../../api/TaskApi";

//dndChanges prop deleted temporarily
// eslint-disable-next-line no-unused-vars
export default function ProjectBoard({ currentProject, categories, createCategory, updateCategory, deleteCategory, event, onDragEnd}) {
    const {
        id,
        //title,
        // eslint-disable-next-line no-unused-vars
        categoriesPositioning
    } = currentProject;



     const sortCategories = () => {
        const sortedCategories = categories.sort((a, b) => ((a.id > b.id) ? 1 : -1));
        return sortedCategories;
    }
    // eslint-disable-next-line no-unused-vars
    // const [lists, setLists] = useState([]);

    // const [project] = useState(currentProject);

    // // eslint-disable-next-line no-unused-vars
    // const [listsOrder, setListsOrder] = useState([]);
    // // eslint-disable-next-line no-unused-vars
    // const [orderedLists, setOrderedLists] = useState([]);

    // useEffect(() => {
    //     setLists(categories);
    //     setListsOrder(categoriesPositioning);
    // }, [project]);

    // console.log("liststate=", lists);
    // console.log("listsorder=", listsOrder);

    // const sortCategories = () => {
    //     const sortedCategories = categories.sort((a, b) => ((a.id > b.id) ? 1 : -1));
    //     return sortedCategories;
    // }
    
    // console.log("on project Board. orderedCategories:", orderedCategories);


    // eslint-disable-next-line no-unused-vars
    // const updateListsOrder = (newListsOrder) => {

    //     const newProject = {
    //         ...currentProject,
    //         categoriesPositioning: newListsOrder,
    //     }
    //     updateProject(newProject);
    //     setListsOrder(newListsOrder);
    // }

    // eslint-disable-next-line no-unused-vars
    // const sortListsByOrder = () => {
    //     console.log("before sorting, lists=", lists);
    //     console.log("before sorting, orderedlists=", orderedLists);
    //     const orderedLists = [];
    //     for (let i = 0; i < listsOrder.length; i++) {
    //         for (let j = 0; j < lists.length; j++) {
    //             if (listsOrder[i] == lists[j].id) {
    //                 orderedLists.push(lists[j]);
    //             }
    //         }
    //     }
    //     const temp = orderedLists;
    //     setOrderedLists(temp);
    //     console.log("after sorting, orderedlists=:", orderedLists);
    // }

    // const onDragEnd = (result) => {
    //     const { destination, source, draggableId } = result;
    //     console.log("destination", destination, "source", source, draggableId);

    //     // drop outside the category area
    //     if (!result.destination) {
    //         return;
    //     }

    //     // drop at the same position
    //     if (destination.droppableId === source.droppableId &&
    //         destination.index === source.index) {
    //         return;
    //     }


    //     const start = categories.find(item => item.id == source.droppableId);
    //     console.log("startlist=", JSON.stringify(start));
    //     const finish = categories.find(item => item.id == destination.droppableId);
    //     console.log("finishlist=", JSON.stringify(finish));

    //     // drop in the same category
    //     if (start.id === finish.id) {
    //         const newTasksOrder = start.tasksPositioning;
    //         console.log("startorder=", newTasksOrder);
    //         console.log("draggableid=", draggableId);
    //         newTasksOrder.splice(source.index, 1);
    //         newTasksOrder.splice(destination.index, 0, parseInt(draggableId));

    //         console.log("splicedlist=", newTasksOrder);

    //         const newCategory = {
    //             ...start,
    //             tasksPositioning: newTasksOrder,
    //         };

    //         console.log("newlist=", newCategory);

    //         updateCategory(newCategory);
    //         changesFromDnd(newCategory);
    //         //setLists(newTasksOrder);
    //         return;
    //     }

    //     // Drag and Drop in different columns
    //     const startTasksOrder = start.tasksPositioning;
    //     startTasksOrder.splice(source.index, 1);
    //     const newStart = {
    //         ...start,
    //         tasksPositioning: startTasksOrder,
    //     };
    //     updateCategory(newStart);
    //     changesFromDnd(newStart);

    //     const finishTasksOrder = finish.tasksPositioning;
    //     finishTasksOrder.splice(destination.index, 0, parseInt(draggableId));
    //     const newFinish = {
    //         ...finish,
    //         tasksPositioning: finishTasksOrder,
    //     };
    //     updateCategory(newFinish);
    //     changesFromDnd(newFinish);

    //     // updateTask
    //     const updateTask = () => {
    //         TaskApi.updateTaskCategory(parseInt(draggableId), finish.id)
    //             .then(response => {
    //                 changesFromDnd(response.data);
    //             })
    //     }
    //     updateTask();

    // }

    // useEffect(() => {

    // }, []);

    console.log("event from project board", event);

    return (
        <div className="project-board flex-start">
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    {categories == undefined ?
                        null :
                        <div className="category-cards">
                            {
                                sortCategories().map((category) => (
                                    <CategoryCard
                                        
                                        key={category.id}
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