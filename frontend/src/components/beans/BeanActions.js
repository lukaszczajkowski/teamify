import React from "react";
import useComponentVisible from "../hooks/useComponentVisible";


// eslint-disable-next-line react/prop-types
export default function BeanActions({ currentBean, onUpdateBean, onDeleteBean }) {

    const {
        ref,
        isComponentVisible,
        setIsComponentVisible
    } = useComponentVisible(false);

    const handleClick = () => {
        setIsComponentVisible(true);
    }

    return (
        <div className="action" id="bean-action">
            <button className="action-button" onClick={handleClick}>
                {currentBean.title}
            </button>
            <div ref={ref}>
                {isComponentVisible && (
                    <div className="action-menu">
                        <button className="action-item"
                            id="update-bean"
                            onClick={onUpdateBean}
                           >
                            Edit detail
                        </button>
                        <button className="action-item"
                            id="delete-bean"
                            onClick={onDeleteBean}>
                            Delete Bean
                        </button>
                    </div>)}
            </div>
        </div>
    );
}

