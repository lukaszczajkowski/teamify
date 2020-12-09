import React, { useState } from "react";
import BeanPopup from "./BeanPopup";

// eslint-disable-next-line react/prop-types
export default function BeanButton({ bean, createBean }) {
    const [popupIsOpen, setPopupIsOpen] = useState(false);

    const onCreateBean = () => {
        setPopupIsOpen(true);
    }

    const onClosePopup = () => {
        setPopupIsOpen(false);
    }

    return (
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
                onClose={onClosePopup}/>

        </div>

    );
}