import React, { useState, useEffect, useContext } from "react";
import ProjectHeader from "../layout/ProjectHeader";
import CategoryApi from "../../api/CategoryApi";
import { useParams, useHistory } from "react-router-dom";
import ProjectApi from "../../api/ProjectApi";
import ProjectBoard from "./ProjectBoard";
import ProjectMenu from "./ProjectMenu";
import UserContext from "../../UserContext";
import MemberMenu from "./MemberMenu";


function ProjectPage() {
    const history = useHistory();
    const user = useContext(UserContext);
    const userId = user.id;
    console.log("on project page. User id:" + userId);

    const { projectId } = useParams();
    console.log("project id:" + projectId);

    const [currentProject, setCurrentProject] = useState({});
    const [categories, setCategories] = useState([]);
    const [members, setMembers] = useState([]);

    function getCurrentProject() {
        return ProjectApi.getProjectById(projectId)
            .then(response => setCurrentProject(response.data))
            .then(console.log(currentProject.id))
            .catch(err => console.log(`error on get project ${err}`));
    }

    const updateProject = (updatedProject) => {
        return ProjectApi.updateProject(updatedProject)
            .then(response => console.log("updated project: " + JSON.stringify(response.data)))
            .catch(err => console.log(`error on update project: ${err}`));
    }

    const onDeleteProject = () => {
        if (window.confirm("Do you want to delete this project?")) {
            if (userId === currentProject.creator.id) {
                deleteCurrentProject();
                history.push("/users/me");
                window.location.reload();
            } else {
                alert("you are not the creator of the project, deleting project is not allowed");
            }
        }
    };

    const getAllMembers = (projectId) => {
        return ProjectApi.getProjectById(projectId)
            .then(response => setMembers(response.data.users))
            .then(console.log("members: " + JSON.stringify(members)));
    }

    const onDeleteMember = (memberId) => {
        if (window.confirm("Do you want to remove this member?")) {
            if (userId === currentProject.creator.id && userId !== memberId) {
                console.log("on deleteMember. creator: " + currentProject.creator.id + ", delete member: " + memberId);
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
            .then(alert(`add user: ${userEmail} to project ${projectId}`))
            .then(getAllMembers())
            .catch(err => console.log(`error on add member: ${err}`));
    };

    function deleteMember(projectId, memberId) {
        ProjectApi.removeMemberById(projectId, memberId)
            .then(getAllMembers(projectId))
            .catch(err => console.log(`error on delete member: ${err}`));
    }

    const getAllCategories = (projectId) => {
        return CategoryApi.getAllCategories(projectId)
            .then(response => setCategories(response.data))
            .catch(err => console.log(`error on get all categories: ${err}`));
    };

    const createCategory = (projectId, categoryData) => {
        return CategoryApi.createCategory(projectId, categoryData)
            .then(response => setCategories([...categories, response.data]))
            .then(console.log(`new category: ${categoryData.title} is added`))
            .catch(err => console.log(`error on create new category: ${err}`));
    };

    const updateCategory = (projectId, newCategoryData) => {
        return CategoryApi.updateCategory(projectId, newCategoryData)
            .then(getCurrentProject())
            .catch(err => console.log(`error on update category: ${err}`));
    };

    const deleteCategory = (categoryId) => {
        return CategoryApi.deleteCategory(categoryId)
            .then(console.log(`Deleting category: ${categoryId}`))
            .then(setCategories(categories.filter(c => c.id !== categoryId)))
            .catch(err => console.log(`error on delete category: ${err}`));
    };

    useEffect(() => {
        getCurrentProject();
        getAllCategories(projectId);
        getAllMembers(projectId);
    }, [projectId]);

    return (
        <div className="project-page">
            <ProjectHeader />

            <div className="flex-start">
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