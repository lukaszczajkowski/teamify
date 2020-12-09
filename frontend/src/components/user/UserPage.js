import React, { useState, useEffect, useContext } from "react";
import Header from "../layout/Header";
import BeanBoard from "../beans/BeanBoard";
import ProjectsBoard from "../projects/ProjectsBoard";
import ProjectApi from "../../api/ProjectApi";
import UserContext from "../../UserContext";
import randomColor from "randomcolor";
import BeanApi from "../../api/BeanApi";
import Api from "../../api/Api";



// eslint-disable-next-line react/prop-types
function UserPage() {
    const [currentTime, setCurrentTime] = useState("");
    const user = useContext(UserContext);
    const userId = user.id;

    const [projects, setProjects] = useState([]);
    const [presetBeans, setPresetBeans] = useState([]);
    const [addedBeans, setAddedBeans] = useState([]);


    function getCurrentTime() {
        let today = new Date();
        let date = today.toLocaleDateString();
        setCurrentTime(date);
        console.log(date);
    }


    function getPresetBeans() {
        return BeanApi.getPresets()
            .then(response => setPresetBeans(response.data));
    }

    const getAllBeans = () => {
        return Api.getAllBeans()
            .then(response => setAddedBeans(response.data))
            .then(console.log("get all beans" + JSON.stringify(addedBeans)));
    }

    const createBean = (newBeanData) => {
        return Api.createNewBean(newBeanData)
            .then(response => setAddedBeans([...addedBeans, response.data]))
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
        getPresetBeans(),
            getAllBeans,
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

                <BeanBoard
                    presetBeans={presetBeans}
                    addedBeans={addedBeans} 
                    createBean={createBean} />
                <ProjectsBoard
                    creator={user}
                    projects={projects}
                    createProject={createProject} />
            </main>
        </div>
    );
}

export default UserPage;