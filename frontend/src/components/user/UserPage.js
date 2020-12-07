import React, { useState, useEffect, useContext } from "react";
import Header from "../layout/Header";
import BeanBoard from "../beans/BeanBoard";
import ProjectsBoard from "../projects/ProjectsBoard";
import ProjectApi from "../../api/ProjectApi";
import UserContext from "../../UserContext";



// eslint-disable-next-line react/prop-types
function UserPage() {
    const [projects, setProjects] = useState([]);
    const user = useContext(UserContext);
    const userId = user.id;
    console.log(user);
    console.log(userId);
    console.log(JSON.stringify(projects));

    const getAllProjects = () => {
        return ProjectApi.getCurrentUsersProjects(userId)
            .then(response => setProjects(response.data));
    }

    const createProject = (projectData) => {
        ProjectApi.createProject(projectData)
            .then(response => setProjects([response.data, ...projects]));
    }

    useEffect(() => {
        getAllProjects(userId)
    }, [user]);


    return (
        <div className="user-page">
            <Header />

            <div className="main-content">
                {/*eslint-disable-next-line react/prop-types*/}
                <p className="welcome"> Hello, {user.name}</p>
                <BeanBoard />
                <ProjectsBoard creator={user} projects={projects} createProject={createProject} />
            </div>
        </div>
    );
}

export default UserPage;