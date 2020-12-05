import React, { useState, useEffect } from "react";
import ProjectHeader from "../layout/ProjectHeader";
import CategoryApi from "../../api/CategoryApi";
import { useParams, useHistory } from "react-router-dom";
import ProjectApi from "../../api/ProjectApi";
import AddMemberPopup from "./AddMemberPopup";
import ProjectBoard from "./ProjectBoard";


function ProjectPage() {
    const history = useHistory();
    const { projectId } = useParams();

    const [currentProject, setCurrentProject] = useState({});
    const [categories, setCategories] = useState([]);

    const getCurrentProject = () => {
        ProjectApi.getProjectById(projectId)
            .then(response => setCurrentProject(response.data))
            .then(console.log(`current project id: ${projectId}`))
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

    const addMemberByEmail = (userEmail) => {
        ProjectApi.addMemberByEmail(projectId, userEmail)
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

    const deleteCategory = (categoryId) => {
        CategoryApi.deleteCategory(categoryId)
        .then(console.log(`Deleting category: ${categoryId}`))
        .catch(err => console.log(`error on delete category: ${err}`));
    }

    useEffect(() => {
        getCurrentProject();
        getAllCategories(projectId);
    }, []);

    return (
        <div className="project-page">
            <ProjectHeader />
            <div className="project-menu flex-start">
                <p className="project-title prompt">project name:</p>
                <p className="project-title">{currentProject.title}</p>
                <button className="button"
                    id="delete-project"
                    onClick={onDeleteProject}>
                    Delete project
                </button>

            <AddMemberPopup onSubmit={addMemberByEmail} />

            </div>
            
            <ProjectBoard
                projectId={projectId}
                categories={categories}
                createCategory={createCategory}
                deleteCategory={deleteCategory} />
        </div>



    );
}

export default ProjectPage;