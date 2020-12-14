import React from "react";
import useComponentVisible from "../hooks/useComponentVisible";
//import ConfirmDialog from "../projects/ConfirmDialog";

// eslint-disable-next-line react/prop-types
export default function ProjectActions({ currentProject, onUpdateProject, onDeleteProject }) {
    // const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    console.log("on project action. current project:" + currentProject);
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
                            id="update-project"
                            onClick={onUpdateProject}>
                            Edit project
                        </button>

                        <button className="action-item"
                            id="delete-project"
                            onClick= {  onDeleteProject }>
                            Delete project
                        </button>
                    </div>)}
            </div>
        </div>
    );
}

