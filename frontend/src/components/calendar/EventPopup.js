import React from "react";
import Popup from "reactjs-popup";


// eslint-disable-next-line react/prop-types
export default function EventPopup({isOpen, currentEvent, deleteEvent, updateEvent}) {
    console.log("from eventpopup, isOpen", isOpen);
    console.log("from eventpopup, currentEvent", currentEvent);
    return (
        <div className="create-bean-card">
            <div className="popup-container">
                <Popup
                    open = {isOpen}
                    modal
                    nested>
                    {close => (
                        <div className="modal">
                            <button className="close" onClick={close}>
                                <i className="fas fa-times"></i>
                            </button>
                            <div className="content">
                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Name</h2>
                                    <input
                                        type="text"
                                        className="input-box"
                                        placeholder=""
                                    >
                                    </input>
                                </div>

                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Description</h2>
                                    <textarea
                                        
                                        className="input-box"
                                        placeholder=""
                                    >
                                    </textarea>
                                </div>
                            </div>
                            <div className="flex-end">
                                <button
                                className="button"
                                onClick={() => {
                                    {updateEvent(currentEvent)}
                                    close();
                                }}>
                                Update
                                </button>
                                <button
                                className="button"
                                onClick={() => {
                                    {deleteEvent(currentEvent)}
                                    close();
                                }}>
                                Delete
                                </button>
                            </div>
                            
                        </div>

                    )}
                </Popup>

            </div>
        </div>
    );
}