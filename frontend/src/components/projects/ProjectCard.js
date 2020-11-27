import React from "react";

import { Link } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export default function ProjectCard({ project }) {
    return (
        <div>
            <Link to={`/projects/${project.id}`}>
                <button className="project-card">{project.name}</button>
            </Link>

        </div>
    );

}