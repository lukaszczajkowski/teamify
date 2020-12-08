import React, { useState, useEffect } from "react";
import ProjectHeader from "../layout/ProjectHeader";
import CategoryApi from "../../api/CategoryApi";
import { useParams, useHistory } from "react-router-dom";
import ProjectApi from "../../api/ProjectApi";
import ProjectBoard from "./ProjectBoard";
import ProjectMenu from "./ProjectMenu";


function ProjectPage() {
    const history = useHistory();
    const { projectId } = useParams();

    const [currentProject, setCurrentProject] = useState({});
    const [categories, setCategories] = useState([]);
    const [members, setMembers] = useState([]);

    const getCurrentProject = () => {
        return ProjectApi.getProjectById(projectId)
            .then(response => setCurrentProject(response.data))
            .catch(err => console.log(`error on delete project ${err}`));
    }

    const onDeleteProject = () => {
        if (window.confirm("Do you want to delete this project?")) {
            deleteCurrentProject();
            history.push("/users/me");
            window.location.reload();
        }
    }

    function deleteCurrentProject() {
        return ProjectApi.deleteProject(projectId)
            .then(console.log(`Deleting project ${projectId}`))
            .catch(err => console.log(`error on delete project: ${err}`));
    }

    const getMembers = () => {
        return ProjectApi.getProjectById(projectId)
            .then(response => setMembers(response.data.users))
            .then(console.log(JSON.stringify(members)));
    }

    const addMemberByEmail = (userEmail) => {
        ProjectApi.addMemberByEmail(projectId, userEmail)
            .then(setMembers(currentProject.users))
            .then(alert(`add user: ${userEmail} to project ${projectId}`))
            .catch(err => console.log(`error on add member: ${err}`));
    }

    const getAllCategories = (projectId) => {
        return CategoryApi.getAllCategories(projectId)
            .then(response => setCategories(response.data))
            .catch(err => console.log(`error on get all categories: ${err}`));
    }

    const createCategory = (projectId, categoryData) => {
        CategoryApi.createCategory(projectId, categoryData)
            .then(response => setCategories([...categories, response.data]))
            .then(console.log(`new category: ${categoryData.title} is added`))
            .catch(err => console.log(`error on create new category: ${err}`));
    }

    const updateCategory = (projectId, newCategoryData) => {
        CategoryApi.updateCategory(projectId, newCategoryData).
            then(response => console.log(JSON.stringify(response.data)))
            .catch(err => console.log(`error on update category: ${err}`));
    }

    const deleteCategory = (categoryId) => {
        CategoryApi.deleteCategory(categoryId)
            .then(console.log(`Deleting category: ${categoryId}`))
            .then(setCategories(categories.filter(c => c.id !== categoryId)))
            .catch(err => console.log(`error on delete category: ${err}`));
    }

    useEffect(() => {
        getCurrentProject();
        getAllCategories(projectId);
        getMembers();
    }, []);

    return (
        <div className="project-page">
            <ProjectHeader />
           <ProjectMenu currentProject={currentProject} 
                        members={members}
                        onDeleteProject={onDeleteProject} 
                        addMemberByEmail={addMemberByEmail}/>


            <ProjectBoard
                projectId={projectId}
                categories={categories}
                createCategory={createCategory}
                updateCategory={updateCategory}
                deleteCategory={deleteCategory} />
        </div>



    );
}

export default ProjectPage;