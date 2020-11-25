import React from "react";
import Header from "../layout/Header";
import BeanBoard from "../beans/BeanBoard";
import ProjectList from "../projects/ProjectList";

function UserPage() {
    return (
        <div>
            <Header />
            <p>Hello, UserName.</p>
            <BeanBoard/>
            <ProjectList />

        </div>
    );
}

export default UserPage;