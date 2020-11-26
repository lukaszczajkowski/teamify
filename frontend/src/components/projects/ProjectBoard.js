import React from "react";
import Header from "../layout/Header";
import CreateBeanCard from "./CreateProjectCard";




export default function ProjectBoard() {
    return (
        <div className="ProjectBoard">
            <Header />
            <ProjectCard />
        </div>
    )
}
