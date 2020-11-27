import React from "react";
import Header from "../layout/Header";
import CreateTaskCard from "../tasks/CreateTaskCard";


export default function ProjectBoard() {
    return (
        <div className="ProjectBoard">
            <Header />
          
         < CreateTaskCard/>
        </div>
    )
}
