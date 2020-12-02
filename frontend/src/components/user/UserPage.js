import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import BeanBoard from "../beans/BeanBoard";
import ProjectsBoard from "../projects/ProjectsBoard";
import ProjectApi from "../../api/ProjectApi";


function UserPage() {
    const [projects, setProjects] = useState([]);

    const getAllProjects = () => {
        ProjectApi.getCurrentUsersProjects()
            .then(response => setProjects(response.data));
    }

    const createProject = (projectData) => {
        ProjectApi.createProject(projectData)
            .then(response => setProjects([response.data, ...projects]));
    }

    const sendInvite = (inviteData, callback) => {
        alert(`${inviteData.projectId} ${inviteData.userEmail}`)
        ProjectApi
            .addMemberByEmail(inviteData.projectId, inviteData.userEmail)
            .then(callback);
    }

    useEffect(() => {
        getAllProjects()
    }, []);


    return (
        <div className="user-page">
            <Header />

            <div className="main-content">
                <p className="welcome"> Hello, userName </p>
                <BeanBoard />
                <ProjectsBoard
                    projects={projects}
                    sendInvite={sendInvite}
                    createProject={createProject}
                />
            </div>
        </div>
    );
}

export default UserPage;