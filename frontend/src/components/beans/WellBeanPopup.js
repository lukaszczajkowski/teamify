import React from "react";
import BeanIcon from "../../assets/bean-black.png";

export default function WellBeanPopup({onClose}) {
    return (
        <div className="well-bean-popup">
            <div className="popup-content">
                <span onClick={onClose} className=" close-button flex-end"><i className="fas fa-times"></i></span>
                <div className="flex-column content">
                    <div className="flex-center">
                        <img src={BeanIcon} />
                        <span>+1</span>
                    </div>
                    <p>Well Bean!</p>
                </div>
            </div>
        </div>
    );
}