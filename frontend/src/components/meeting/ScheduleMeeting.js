import React, { useState } from "react";
import DateTimePicker2 from 'react-datetime-picker';


export default function ScheduleMeeting ( {toggleIsScheduleMeeting, onSubmit}) {

    const [topic, setTopic] = useState("");
    const type = 2;
    const [startTime, setStartTime] = useState();
    const [duration, setDuration] = useState();
    const [password, setPassword] = useState("");
    const [agenda, setAgenda] = useState("");
    const [emails, setEmails] = useState("");
    

    return (
        
        <div className="content">
            <div className="flex-start">
                            <button className="flip-arrow" onClick = {toggleIsScheduleMeeting}>
                                 <i className="fas fa-arrow-left"></i>
                            </button>
                        </div>
                        <div className="content">
                        <h1 className="prompt">Schedule meeting</h1>
                            <div className="popup-item flex-start">
                                    <h2 className="prompt">Topic</h2>
                                    <input
                                        type="text"
                                        className="input-box"
                                        placeholder=""
                                        value={topic}
                                        onChange={e => setTopic(e.target.value)}
                                    />      
                            </div>
                            <div className="popup-item flex-start">
                                    <h2 className="prompt">Start Time</h2>   
                                    <DateTimePicker2 format={"dd-MM-yyyy hh:mm a"}
                                     onChange={setStartTime} value={startTime}
                                      />
                             
                            </div>
                            <div className="popup-item flex-start">
                                    <h2 className="prompt">Duration</h2>
                                    <input
                                        type="text"
                                        className="input-box"
                                        placeholder="minutes"
                                        value={duration}
                                        onChange={e => setDuration(e.target.value)}
                                    />      
                            </div>
                            <div className="popup-item flex-start">
                                    <h2 className="prompt">Password</h2>
                                    <input
                                        type="text"
                                        className="input-box"
                                        placeholder=""
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />      
                            </div>
                            <div className="popup-item flex-start">
                                    <h2 className="prompt">Agenda</h2>
                                    <input
                                        type="text"
                                        className="input-box"
                                        placeholder=""
                                        value={agenda}
                                        onChange={e => setAgenda(e.target.value)}
                                    />      
                            </div>
                            <div className="popup-item flex-start">
                                    <h2 className="prompt">Participants</h2>
                                    <input
                                        type="text"
                                        className="input-box"
                                        placeholder=""
                                        value={emails}
                                        onChange={e => setEmails(e.target.value)}
                                    />      
                            </div>



                        </div>
                        <div className="flex-end">
                                <button
                                className="button"
                                id="create-meeting"
                                onClick = {() => {
                                    onSubmit({topic, type, startTime, duration, password, agenda,emails});
                                    toggleIsScheduleMeeting();    
                                }}>
                                Create
                            </button>
                        </div>

                        
                    </div>

    );
}