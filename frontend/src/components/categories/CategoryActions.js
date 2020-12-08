import React from "react";
import useComponentVisible from "../hooks/useComponentVisible";

// eslint-disable-next-line react/prop-types
export default function CategoryActions({ onDeleteCategory }) {
    const {
        ref,
        isComponentVisible,
        setIsComponentVisible
    } = useComponentVisible(false);

    const handleClick = () => {
        setIsComponentVisible(true);
    }

    return (
        <div className="action category-actions">
            <button className="action-button" onClick={handleClick}>
                <i className="fas fa-ellipsis-v"></i>
            </button>

            <div ref={ref}>
                {isComponentVisible && (
                    <div className="action-menu">
                        <button
                            className="action-item"
                            id="delete-category"
                            onClick={onDeleteCategory}>Delete List
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}