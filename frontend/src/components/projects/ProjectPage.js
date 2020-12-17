import React, { useState, useEffect, useContext } from "react";
import ProjectHeader from "../layout/ProjectHeader";
import CategoryApi from "../../api/CategoryApi";
import { useParams, useHistory } from "react-router-dom";
import ProjectApi from "../../api/ProjectApi";
import ProjectBoard from "./ProjectBoard";
import ProjectMenu from "./ProjectMenu";
import UserContext from "../../UserContext";
import MemberMenu from "./MemberMenu";
import { EventSourcePolyfill } from 'event-source-polyfill';

// eslint-disable-next-line no-unused-vars
import ConfirmDialog from "../projects/ConfirmDialog";


let eventSource;

export default function ProjectPage() {
    const history = useHistory();
    const user = useContext(UserContext);
    const userId = user.id;
    const { projectId } = useParams();

    const [currentProject, setCurrentProject] = useState({});
    const [categories, setCategories] = useState([]);
    const [categoriesOrder, setCategoriesOrder] = useState([]);
    const [orderedCategories, setOrderedCategories] = useState([]);
    const [members, setMembers] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        init();
    }, [])

    var reconnectFrequencySeconds = 1;

    var waitFunc = function() { return reconnectFrequencySeconds * 1000 };

    var tryToSetupFunc = () => {
        init();
        reconnectFrequencySeconds *= 2;
        if (reconnectFrequencySeconds >= 64) {
            reconnectFrequencySeconds = 64;
        }
    };

    var reconnectFunc = function() { setTimeout(tryToSetupFunc, waitFunc()) };

    const init = () => {
        eventSource = new EventSourcePolyfill('http://localhost:8080/sse/project',
            {
                headers: {
                    "Accept": "text/event-stream",
                    "Authorization": window.sessionStorage.getItem("_token"),
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                    "X-Accel-Buffering": "no"
                }
            }
        );
           
        eventSource.onopen = (event) => {
            console.log("connection opened!", event);
            reconnectFrequencySeconds = 1;
        }
        eventSource.onmessage = (event) => {
            console.log("data received", event);
            const newEvents = [...events];
            newEvents.push(event);
            setEvents(newEvents);
        }

        eventSource.onerror = (err) => {
            console.error("Event source failed:", err);
            eventSource.close();
            reconnectFunc();
        }
    }

    /******************************** Project *******************************************/

    function getCurrentProject() {
        return ProjectApi.getProjectById(projectId)
            .then(response => {
                setCurrentProject(response.data);
                setCategoriesOrder(response.data.categoriesPositioning);
            })
            .catch(err => console.log(`error on get project ${err}`));
    }

    const updateProject = (updatedProject) => {
        return ProjectApi.updateProject(updatedProject)
            .then(response => setCurrentProject(response.data))
            .catch(err => console.log(`error on update project: ${err}`));
    }

    useEffect(() => {
        console.log("currentproject = ", currentProject);
    }, [currentProject]);

    const onDeleteProject = () => {
        if (window.confirm("Do you want to delete this project?")) {
            if (userId === currentProject.creator.id) {
                deleteCurrentProject();
                history.push("/home");
                window.location.reload();
            } else {
                alert("you are not the creator of the project, deleting project is not allowed");
            }
        }
    };

    const getAllMembers = (projectId) => {
        return ProjectApi.getProjectById(projectId)
            .then(response => setMembers(response.data.users));
    }

    const onDeleteMember = (memberId) => {
        if (window.confirm("Do you want to remove this member?")) {
            if (userId === currentProject.creator.id && userId !== memberId) {
                //console.log("on deleteMember. creator: " + currentProject.creator.id + ", delete member: " + memberId);
                deleteMember(projectId, memberId);
                getAllMembers(projectId);
            } else if (userId !== currentProject.creator.id) {
                alert("you are not allowed to remove member.");
            } else {
                alert("Are you sure you want to remove yourself from this project?");
            }
        }
    }

    function deleteCurrentProject() {
        return ProjectApi.deleteProject(projectId)
            .then(console.log(`Deleting project ${projectId}`))
            .catch(err => console.log(`error on delete project: ${err}`));
    }

    const addMemberByEmail = (userEmail) => {
        ProjectApi.addMemberByEmail(projectId, userEmail)
            // .then(alert(`add user: ${userEmail} to project ${projectId}`))
            .then(() => getAllMembers(projectId))
            .catch(err => console.log(`error on add member: ${err}`));
    };

    function deleteMember(projectId, memberId) {
        ProjectApi.removeMemberById(projectId, memberId)
            .then(() => getAllMembers(projectId))
            .catch(err => console.log(`error on delete member: ${err}`));
    }


    /************************* Categories ****************************************/
    const getAllCategories = (projectId) => {
        return CategoryApi.getAllCategories(projectId)
            .then(response => setCategories(response.data))
            .catch(err => console.log(`error on get all categories: ${err}`));
    };

    const sortCategoriesByOrder = (categories, categoriesOrder) => {
        console.log("BANANA");
        console.log("ordered categories before sorting", orderedCategories);
        const orderedCategoriesList = [];
        for (let i = 0; i < categoriesOrder.length; i++) {
            for (let j = 0; j < categories.length; j++) {
                if (categoriesOrder[i] == categories[j].id) {
                    orderedCategoriesList.push(categories[j]);
                }
            }
        }
        console.log("Categories after sorting:", orderedCategoriesList);
        const temp = orderedCategoriesList;
        setOrderedCategories(temp);
        console.log("ordered categories:  ", orderedCategories);
    }

    const createCategory = (projectId, categoryData) => {
        return CategoryApi.createCategory(projectId, categoryData)
            .then((response) => {
                const newCategories = categories;
                newCategories.push(response.data);
                setCategories(newCategories);
                console.log("CATs after creation:", categories);

                const newCategoriesOrder = categoriesOrder;
                newCategoriesOrder.push(response.data.id);
                setCategoriesOrder(newCategoriesOrder);
                console.log("CATSORDER after creation", categoriesOrder);

                const newOrderedCatergories = orderedCategories;
                newOrderedCatergories.push(response.data);
                setOrderedCategories(newOrderedCatergories);
                updateCategoriesOrder(categoriesOrder);

                sortCategoriesByOrder(categories, categoriesOrder);
                
            })
            .catch(err => console.log(`error on create new category: ${err}`));
    };

    useEffect(() => {
        console.log("categoriesOrder = ", categoriesOrder);
        updateCategoriesOrder(categoriesOrder);
    }, [categoriesOrder]);

    useEffect(()=> {
        sortCategoriesByOrder(categories, categoriesOrder);
        
    },[categories, categoriesOrder]);

    const updateCategoriesOrder = (newCategoriesOrder) => {
        const {
            id, 
            title,
            // eslint-disable-next-line no-unused-vars
            categoriesPositioning,
            teamBeanScore
        } = currentProject;

        const newProject = {
            id,
            title,
            categoriesPositioning: newCategoriesOrder,
            teamBeanScore
        }
        updateProject(newProject);
    }

   
    const updateCategory = (projectId, newCategoryData) => {
        return CategoryApi.updateCategory(projectId, newCategoryData)
            .then(getCurrentProject())
            .catch(err => console.log(`error on update category: ${err}`));
    };

    const deleteCategory = (categoryId) => {
        return CategoryApi.deleteCategory(categoryId)
            .then(response => {
                const newCategories = categories.filter(c => c.id != response.data);
               setCategories(newCategories);

               const removeIndex = categoriesOrder.findIndex(item => item == response.data);
               const newCategoriesOrder = categoriesOrder;
               newCategoriesOrder.splice(removeIndex, 1);
               setCategoriesOrder(newCategoriesOrder);

               const newOrderedCatergories = orderedCategories;
               const removeIndexFromOrderedCategories = orderedCategories.findIndex(item => item == response.data);
               newOrderedCatergories.splice(removeIndexFromOrderedCategories, 1);
               setOrderedCategories(newOrderedCatergories);
            })
            //.then(setCategoriesPositioning(categoriesPositioning.filter(item => item != categoryId)))
            .catch(err => console.log(`error on delete category: ${err}`));
    };


    useEffect(()=> {
        getCurrentProject();
    },[projectId]);

    useEffect(() => {
        getAllCategories(projectId);
        getAllMembers(projectId);
    }, [projectId]);

    useEffect(() => {
        console.log("incoming changes from project page:", events);
        getCurrentProject();
        getAllCategories(projectId);
        getAllMembers(projectId);
    }, [events]);

    return (
        <div className="project-page">
            <div className="fixed-header">

                <ProjectHeader project={currentProject} />

                <div className="project-menu flex-start ">
                    <ProjectMenu
                        currentProject={currentProject}
                        onDeleteProject={onDeleteProject}
                        updateProject={updateProject}
                    />

                    <MemberMenu
                        currentProject={currentProject}
                        members={members}
                        addMemberByEmail={addMemberByEmail}
                        onDeleteMember={onDeleteMember} />
                </div>
            </div>



            <ProjectBoard
                currentProject={currentProject}
                categories={categories}
                createCategory={createCategory}
                updateCategory={updateCategory}
                deleteCategory={deleteCategory}
                orderedCategories={orderedCategories}
                event={events} />
        </div>
    );
}