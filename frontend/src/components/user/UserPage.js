import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import BeanBoard from "../beans/BeanBoard";
import ProjectsBoard from "../projects/ProjectsBoard";
import ProjectApi from "../../api/ProjectApi";

function UserPage() {
    const [projects, setProjects] = useState([]);

    const getAll = () => {
        ProjectApi.getCurrentUsersProjects()
        .then(response => setProjects(response.data));
    }

    const createProject = (projectData) => {
        ProjectApi.createProject(projectData)
        .then(response => setProjects([response.data, ...projects]));
    }

    useEffect(()=>{
        getAll()
    },[]);


    return (
        <div className="user-page">
            <Header />
            <div className="main-content">
                <p className="user-prompt">Hello, UserName.</p>
            <BeanBoard/>
            <ProjectsBoard projects={projects} createProject={createProject}/>
            </div>
            

        </div>
    );
}

export default UserPage;