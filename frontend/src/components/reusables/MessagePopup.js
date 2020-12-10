import React from "react";

export default function MessagePopup({ message, onClose }) {

    return (
        <div className="message-popup">
            <div className="popup-content">
                <span onClick={onClose} className=" close-button flex-end"><i className="fas fa-times"></i></span>
                <div className="content flex-center">
                    <div>{message}</div>
                </div>
            </div>
        </div>
    );

}