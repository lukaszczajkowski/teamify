import React, { useState } from "react";
import BeanPopup from "./BeanPopup";
import { motion } from "framer-motion";

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
            <motion.button
                id="create-bean"
                className="bean-button button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCreateBean}>
                + Create a new bean
            </motion.button>

            <BeanPopup
                isOpen={popupIsOpen}
                initialData={emptyBean}
                createBean={createBean}
                onClose={onClosePopup} />

        </div>
    );
}