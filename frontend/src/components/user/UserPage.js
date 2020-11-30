import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import BeanBoard from "../beans/BeanBoard";
import ProjectsBoard from "../projects/ProjectsBoard";
import ProjectApi from "../../api/ProjectApi";
import Auth from '../../services/Auth';

function UserPage() {
    const user = Auth.getUser();
    const [projects, setProjects] = useState([]);

    const getAllProjects = () => {
        ProjectApi.getCurrentUsersProjects()
        .then(response => setProjects(response.data));
    }

    const createProject = (projectData) => {
        ProjectApi.createProject(projectData)
        .then(response => setProjects([response.data, ...projects]));
    }

    useEffect(()=>{
        getAllProjects()
    },[]);


    return (
        <div className="user-page">
            <Header />
            
            <div className="main-content">
            {user &&  <p className="welcome"> Hello {user.name} </p> }
            <BeanBoard/>
            <ProjectsBoard projects={projects} createProject={createProject}/>
            </div>
            

        </div>
    );
}

export default UserPage;