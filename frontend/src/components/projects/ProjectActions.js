import React from "react";
import useComponentVisible from "../hooks/useComponentVisible";

// eslint-disable-next-line react/prop-types
export default function ProjectActions({ onDeleteProject }) {

    const {
        ref,
        isComponentVisible,
        setIsComponentVisible
    } = useComponentVisible(false);

    const handleClick = () => {
        setIsComponentVisible(true);
    }

    return (
        <div className="action project-actions">
            <button className="action-button" onClick={handleClick}>
                <i className="fas fa-chevron-down"></i>
            </button>
            <div ref={ref}>
                {isComponentVisible && (
                    <div className="action-menu">
                        <button className="action-item"
                            id="delete-project"
                            onClick={onDeleteProject}>
                            Delete project
                        </button>
                    </div>)}
            </div>
        </div>
    );
}

