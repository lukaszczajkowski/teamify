import React, { useState } from "react";
import BeanPopup from "./BeanPopup";
import { motion } from "framer-motion";

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


                    null :

                    <div>
                        <motion.button className="bean-button button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onCreateBean}>

                            {/* eslint-disable-next-line react/prop-types */}
                            {bean.title}
                        </motion.button>

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