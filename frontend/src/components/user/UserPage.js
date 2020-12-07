import React, { useState, useEffect, useContext } from "react";
import Header from "../layout/Header";
import BeanBoard from "../beans/BeanBoard";
import ProjectsBoard from "../projects/ProjectsBoard";
import ProjectApi from "../../api/ProjectApi";
import UserContext from "../../UserContext";
import randomColor from "randomcolor";



// eslint-disable-next-line react/prop-types
function UserPage() {
    const [projects, setProjects] = useState([]);
    const [currentTime, setCurrentTime] = useState("");
    const user = useContext(UserContext);
    const userId = user.id;
    console.log(userId);

    function getCurrentTime() {
        let today = new Date();
        let date = today.toLocaleDateString();
        setCurrentTime(date);
        console.log(date);
    }

    const getAllProjects = () => {
        return ProjectApi.getCurrentUsersProjects(userId)
            .then(response => setProjects(response.data));
    }

    const createProject = (projectData) => {
        ProjectApi.createProject(projectData)
            .then(response => setProjects([response.data, ...projects]));
    }

    useEffect(() => {
        getAllProjects(userId),
            getCurrentTime()
    }, [user]);


    return (
        <div className="user-page">
            <Header />

            <main className="main-content">
                <div className="user-header flex-between">
                    <div className="user-prompt">
                        <span className="prompt"> Hello,</span>
                        {/*eslint-disable-next-line react/prop-types*/}
                        <span id="user-name">{user.name}</span>
                    </div>

                    {/* This section below is for testing displaying time and using random color */}
                    <div className="time-prompt">
                        <span className="promt">today: </span>
                        <span id="current-time" style={{ color: `${randomColor()}` }}>{currentTime}</span>
                    </div>
                </div>



                <BeanBoard />
                <ProjectsBoard creator={user} projects={projects} createProject={createProject} />
            </main>
        </div>
    );
}

export default UserPage;