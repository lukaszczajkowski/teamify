import React, { useState } from "react";
import BeanPopup from "./BeanPopup";

// eslint-disable-next-line react/prop-types
export default function BeanButton({ bean, createBean }) {
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const onCreateBean = () => {
        setPopupIsOpen(true);
    }

    const onClosePopup = () => {
        setPopupIsOpen(false);
    }

    const onAddBean = () => {
        setIsAdded(true);
    }

    return (
        <div>
            {
                isAdded ?
                
                    <div>
                        <button className="added-button button">{bean.title}</button>
                    </div> :

                    <div>
                        <button className="bean-button button"
                            onClick={onCreateBean}>

                            {/* eslint-disable-next-line react/prop-types */}
                            {bean.title}
                        </button>

                        <BeanPopup
                            isOpen={popupIsOpen}
                            initialData={bean}
                            createBean={createBean}
                            onAddBean={onAddBean}
                            onClose={onClosePopup} />
                    </div>
            }
        </div>

    );
}