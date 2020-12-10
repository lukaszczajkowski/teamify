import React, { useState } from "react";
import BeanPopup from "./BeanPopup";

export default function CreateBeanButton({ createBean }) {

    const emptyBean = {
        title: "",
        description: "",
        eventCount: 0,
        duration: 0
    };
    const [popupIsOpen, setPopupIsOpen] = useState(false);

    const onCreateBean = () => {
        setPopupIsOpen(true);
    }

    const onClosePopup = () => {
        setPopupIsOpen(false);
    }
    return (
        <div >
            <button
            id="create-bean"
                className="bean-button button"
                onClick={onCreateBean}>
                + Create a new bean
            </button>

            <BeanPopup
                isOpen={popupIsOpen}
                initialData={emptyBean}
                createBean={createBean}
                onClose={onClosePopup} />

        </div>
    );
}