import React from "react";
import Header from "../layout/Header";
import BeanBoard from "../beans/BeanBoard";
import ProjectList from "../projects/ProjectsBoard";

function UserPage() {
    return (
        <div className="user-page">
            <Header />
            <div className="main-content">
                <p className="user-prompt">Hello, UserName.</p>
            <BeanBoard/>
            <ProjectList />
            </div>
            

        </div>
    );
}

export default UserPage;