import React from "react";

import { Link } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export default function ProjectCard({ project }) {
    return (
        <div>
            {/*eslint-disable-next-line react/prop-types*/}
            <Link to={`/projects/${project.id}`} >
                {/*eslint-disable-next-line react/prop-types*/}
                <button className="project-card">{project.title}</button>
            </Link>

        </div>
    );

}