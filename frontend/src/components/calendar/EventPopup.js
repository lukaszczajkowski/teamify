/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Tags from './Tags';
import Chips from './Chips';
import { motion } from "framer-motion";
//import { Link } from "react-router-dom";
import UserApi from "../../api/UserApi";


// eslint-disable-next-line react/prop-types
export default function EventPopup({ isOpen,
    currentEvent,
    updateEvent,
    onClose,
    deleteEvent,
    onMembersChange,
    onDelete,
    changesMade,
    emailRemoved,
    sourceOfEvent,
    createEvent,
    purpose
}) {

    const [chips, setChips] = useState([]);
    const [event, setEvent] = useState({});
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventMembersEmails, setEventMembersEmails] = useState([]);
    const [emails, setEmails] = useState([]);
    const [isEditable, setIsEditable] = useState(true);
    const [meeting, setMeeting] = useState("");
    const [user, setUser] = useState();

    useEffect(() => {
        setEvent(currentEvent);
        if (purpose == 'create') {
            setEventTitle("");
            setEventDescription("");
            setEmails("");
            setEventMembersEmails([]);
            setChips([]);
        } else if (purpose == 'update') {
            if (currentEvent != {}) {
                const {
                    id,
                    title,
                    extendedProps,
                } = currentEvent;
                setEventTitle(title);

                if(extendedProps !== undefined){
                    
                    if(extendedProps.meeting !== null)
                    {
                        if(user !== extendedProps.meeting.host.name)
                        {
                            setIsEditable(false);
                        }
                        setMeeting(extendedProps.meeting)
                    }
                    setEventDescription(extendedProps.description);
                    const eventMembersEmailsFromProps = extendedProps.users.map(user => user.email);
                    setEventMembersEmails(eventMembersEmailsFromProps);
                    const renderedChips = renderChips(eventMembersEmails);
                    setChips(renderedChips);
                }
            }
        }

    }, [currentEvent, changesMade, emailRemoved, purpose])

    useEffect(() => {
        setEmails(emails);
        currentUser();
    }, []);

    const currentUser = async() => {
        await  UserApi.getCurrentUser()
            .then(response => {const data = response.data;
                if(data.name.toLocaleString() !== null)
                {
                setUser(data.name);
            }
        })
    };
    const onEmailsChange = (updatedEmails, eventToUpdate) => {
        setEmails(updatedEmails);
    }

    const renderChips = (eventMembersEmails) => {
        const chips = eventMembersEmails.map(email => <Chips email={email}
            handleDelete={onDelete}
            changesMade={changesMade}
        />)
        return chips;
    }
    //generates the chips with emails of invited users
    // eslint-disable-next-line react/jsx-key


    const buttons = purpose == 'create' ?
        <button
            className="button"
            onClick={() => {
                { createEvent({ eventTitle, eventDescription, emails }) }
                { onMembersChange({ emails, currentEvent }) }
                close();
                { onClose(false) }
            }}>
            Create
                                </button>
                                : 
                                <div>
                                    {isEditable ? 
                                    <div>
                                        <button
                                        className="button"
                                        disabled={!isEditable}
                                        onClick={() => {
                                            {updateEvent({ eventTitle, eventDescription })}
                                            {onMembersChange({emails, currentEvent})}
                                            close();
                                            {onClose(false)}
                                        }}>
                                        Update
                                        </button>
                                        <button
                                        className="button"
                                        disabled={!isEditable}
                                        onClick={() => {
                                              {deleteEvent(currentEvent)}
                                              close();
                                              {onClose(false)}
                                        }}>
                                         Delete
                                        </button>
                                    </div>
                                    : null}
                                </div>      

    console.log(sourceOfEvent);

    // eslint-disable-next-line react/prop-types
    return (
        <div className="create-bean-card">
            <div className="popup-container">
                <Popup
                    open={isOpen}
                    closeOnDocumentClick={false}
                    closeOnEscape={false}
                    modal
                    nested>
                    {close => (
                        <motion.div  initial={{
                            scale: 0
                                }}
                            animate= {{
                            scale: 1
                            }} className="modal">
                            <button className="close" onClick={() => {
                                close();
                                setIsEditable(true);
                                onClose(false);
                            }
                            }>
                                <i className="fas fa-times"></i>
                            </button>

                            <div className="header1">
                                <h2 className="header1-title">Event detail</h2>
                            </div>



                            <div className="content">
                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Title</h2>
                                    <input
                                        type="text"
                                        className="input-box"
                                        disabled={!isEditable}
                                        defaultValue={eventTitle}
                                        placeholder="Your title here..."
                                        onChange={e => {
                                            setEventTitle(e.target.value);
                                        }}
                                    >
                                    </input>
                                </div>
                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Description</h2>
                                    <textarea
                                        disabled={!isEditable}
                                        className="input-box text-area"
                                        cols="35"
                                        placeholder="Your description here..."
                                        defaultValue={eventDescription}
                                        onChange={e => {
                                            setEventDescription(e.target.value);
                                        }}
                                    >
                                    </textarea>
                                </div>
                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Members of the event:</h2>
                                    <div className="popup-item flex-start">
                                        {chips}
                                    </div>
                                </div>
                                {isEditable ? 
                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Invite user by email</h2>
                                    <Tags event={currentEvent} onEmailsChange={onEmailsChange} />
                                </div>
                                : 
                                <div className="popup-item flex-start">
                                <div className="popup-item flex-start">
                                <h2 className="prompt">Host</h2>
                                            {meeting.host.name}
                                </div>
                                <div className="popup-item flex-start">
                                <h2 className="prompt">Zoom Link</h2>
                                    <button className="button">
                                        <a href={meeting.start_url} target="_blank" rel="noopener noreferrer">Click to Join</a>
                                    </button> 
                                 </div>
                                </div>
                                    }
                            </div>
                            <div className="flex-end">
                                {buttons}
                            </div>
                        </motion.div>
                    )}
                </Popup>
            </div>
        </div>
    );
}
