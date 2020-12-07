import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function ProjectActions({onDeleteProject}) {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <div className="action project-actions">
            <button className="action-button" onClick={handleClick}>
                <i className="fas fa-chevron-down"></i>
            </button>
            {
                click ?
                    <div className="action-menu">
                        <button className="action-item"
                            id="delete-project"
                            onClick={onDeleteProject}>
                            Delete project
                </button>
                    </div> :
                    null
            }
        </div>
    );
}

