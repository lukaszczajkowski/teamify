/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";


// eslint-disable-next-line react/prop-types
export default function EventPopup({ isOpen, currentEvent, deleteEvent, updateEvent, onClose }) {
    console.log(currentEvent)

    const {
        id,
        title,
        extendedProps,
    } = currentEvent;

    console.log("extended props", extendedProps);

  

    const initialDescription = (extendedProps) => {
        let initialDescription;
        if(extendedProps !== undefined) {
            const {
                creator,
                users,
                description
            } = extendedProps
            initialDescription = description;
        } else {
            initialDescription = "";
        }
        return initialDescription;
    }

    const [eventTitle, setEventTitle] = useState("");
    const desc = initialDescription(extendedProps);
    console.log("desc: ", desc);
    const [eventDescription, setEventDescription] = useState(desc);

    useEffect(() => {
        setEventTitle(title);
        setEventDescription(desc);
    }, [currentEvent])
    // eslint-disable-next-line react/prop-types
    //console.log("event from event popup:", id, allDay, end, start, title, extendedProps.description);
    console.log("title", title);
    console.log("description", eventDescription);
    return (
        extendedProps === undefined ?
        null
        :
        <div className="create-bean-card">
            <div className="popup-container">
                <Popup
                    open = {isOpen}
                    modal
                    nested>
                        {close => (
                        <div className="modal">
                            <button className="close" onClick={()=> {
                                close();
                                onClose(false);
                                }    
                        }>
                                <i className="fas fa-times"></i>
                            </button>
                            <div className="content">
                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Title</h2>
                                    <input
                                        type="text"
                                        className="input-box"
                                        value={eventTitle}
                                        placeholder="title"
                                        onChange = {e => {
                                            setEventTitle(e.target.value);
                                        }}
                                    >
                                    </input>
                                </div>

                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Description</h2>
                                    <textarea
                                        className="input-box"
                                        placeholder=""
                                        value = {eventDescription}
                                        onChange = {e => {
                                            setEventDescription(e.target.value);
                                        }}
                                    >
                                    </textarea>
                                </div>
                            </div>
                            <div className="flex-end">
                                <button
                                className="button"
                                onClick={() => {
                                    {updateEvent({eventTitle, eventDescription})}
                                    close();
                                    {onClose(false)}
                                }}>
                                Update
                                </button>
                                <button
                                className="button"
                                onClick={() => {
                                    {deleteEvent(currentEvent)}
                                    close();
                                    {onClose(false)}
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