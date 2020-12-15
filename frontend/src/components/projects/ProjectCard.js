import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export default function ProjectCard({ project }) {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}>
            <Link to={`/projects/${project.id}`} >
                <button className="project-card">{project.title}</button>
            </Link>

        </motion.div>
    );

}