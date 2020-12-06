import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function CategoryActions({ onDeleteCategory }) {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <div className="action category-actions">
            <button className="action-button" onClick={handleClick}>
                <i className="fas fa-ellipsis-v"></i>
            </button>
            {
                click ?
                    <div className="action-menu">
                        <button
                            className="action-item"
                            id="delete-category"
                            onClick={onDeleteCategory}>Delete List
                        </button>
                    </div> :
                    null
            }
        </div>
    );
}