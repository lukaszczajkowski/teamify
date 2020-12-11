import React, { useState, useEffect, useContext } from "react";
import Header from "../layout/Header";
import BeanBoard from "../beans/BeanBoard";
import ProjectsBoard from "../projects/ProjectsBoard";
import ProjectApi from "../../api/ProjectApi";
import UserContext from "../../UserContext";
import BeanApi from "../../api/BeanApi";
import UserMenu from "./UserMenu";



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

    function getAllBeans() {
        return BeanApi.getAllBeans()
            .then(response => setAddedBeans(response.data));
    }

    const createBean = (newBeanData) => {
        return BeanApi.createNewBean(newBeanData)
            .then(response => setAddedBeans([...addedBeans, response.data]))
    };

    const updateBean = (updatedBean) => {
        return BeanApi.updateBean(updatedBean)
        .then(response => setAddedBeans(addedBeans.map(item => item.id == updatedBean.id ? response.data : item)));
        
    }

    const deleteBean = (beanId) => {
        return BeanApi.deleteBean(beanId)
        .then(() => setAddedBeans(addedBeans.filter(b => b.id !== beanId)));

    }

    const getAllProjects = () => {
        return ProjectApi.getCurrentUsersProjects(userId)
            .then(response => setProjects(response.data));
    };

    const createProject = (projectData) => {
        ProjectApi.createProject(projectData)
            .then(response => setProjects([response.data, ...projects]));
    };

    useEffect(() => {
        getPresetBeans(),
            getAllBeans(),
            getAllProjects(userId),
            getCurrentTime()
    }, [user]);


    return (
        <div className="user-page">
            <Header />

            <main className="main-content">
                
                <UserMenu
                    user={user}
                    currentTime={currentTime}
                />

                <BeanBoard
                    presetBeans={presetBeans}
                    addedBeans={addedBeans}
                    createBean={createBean} 
                    updateBean={updateBean} 
                    deleteBean={deleteBean} 
                    />
                    
                <ProjectsBoard
                    creator={user}
                    projects={projects}
                    createProject={createProject} />
            </main>
        </div>
    );
}

export default UserPage;