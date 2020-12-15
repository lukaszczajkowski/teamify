import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import MeetingApi from "../../api/MeetingApi";
import ScheduleMeeting from "./ScheduleMeeting";
import MeetingCard from "./DisplayCard";

export default function MeetingPopup ({ isOpen,  onClose }) {

    const [meetings, setMeetings] = useState([]);
    const [isScheduleMeeting, setIsScheduleMeeting] = useState(false);
    const [isQuickMeeting, setIsQuickMeeting] = useState(false);
    const [quickMeeting, setQuickMeeting] = useState("");

    useEffect(  () => {
        fetchdata();
    }, []);

    const  fetchdata = async() => {
        await MeetingApi.getMeetings()
                         .then(response => {const data = response.data;
                            setMeetings(data);
                            console.log(data);
                            })
                         .catch(err => console.log(err));
    }
    const meetingCards = meetings.map((item) => {
        return <MeetingCard key = {item.id} data = {item} fetchdata = {fetchdata}/>
    });

    const createMeeting = (meetingData) => {
         MeetingApi.createNewMeeting(meetingData)
            .then(response => {const data = response.data;
                addMembers(meetingData.emails,data.id)
                fetchdata();           
                toggleIsScheduleMeeting();
                console.log(data);
            })
    };
    const addMembers = (members,id) => {
        const emailsArray = members.split(',');
        MeetingApi.addMembers(emailsArray,id)
           .then(response => {const data = response.data;
               fetchdata();
               console.log(data);
           })
   };

    const createQuickMeeting = () => {
        const meetingData = {
            type : 1
        }
        return MeetingApi.createNewMeeting(meetingData)
            .then(response => {const data = response.data;
                setIsQuickMeeting(true);
                setQuickMeeting(data.start_url);
            })
    };

    const toggleIsScheduleMeeting = () => {
        setIsScheduleMeeting(!isScheduleMeeting);
    }
    const toggleIsQuickMeeting = () => {
        setIsQuickMeeting(false);
    }



    return (
        <div className="meeting-popup">
        <div className="popup-container">
            <Popup
               open={isOpen}
                modal
                nested
                onClose={onClose}
                >
                
                    <div className="modal" id="meeting-popup">
                        <button className="close" onClick={() => {
                                        onClose();
                                        setIsScheduleMeeting(false);
                                        toggleIsQuickMeeting();
                                }}>
                            <i className="fas fa-times"></i>
                        </button>
                        
                        {isScheduleMeeting ? <ScheduleMeeting 
                                                    toggleIsScheduleMeeting = {toggleIsScheduleMeeting}
                                                    onSubmit = {createMeeting}
                                                    
                                             /> : 
                        <div className="content">
                            <h1 className="prompt">Open Zoom meeting </h1>
                            <div className="flex-center">
                                <button
                                className="button"
                                id="create-meeting"
                                onClick={createQuickMeeting}>
                                Quick Meeting
                                </button>
                                <div className="flex-center">
                                {isQuickMeeting ? <input
                                        type="text"
                                        className="input-box"
                                        placeholder=""
                                        value={quickMeeting}
                                    /> :null}
                                </div>
                            </div>
                            <div className="flex-center">
                                <button
                                className="button"
                                id="create-meeting"
                                onClick={toggleIsScheduleMeeting}>
                                Scheduled Meeting
                                </button>
                            </div>
                            <hr />
                            <h1 className="prompt">Upcoming meetings in your calender</h1>
                            <hr/>
                            <table id = "meeting_table">
                                <th> Topic</th><th> Agenda</th><th> Start Time</th> 
                                <th> Duration</th><th>Meeting URL</th><th> Host</th>
                                <th> </th> 
                            </table>
                            {meetingCards}            
                          
                            

                        </div>
                        
                        
                        }
                        
                        
                    </div>

                
            </Popup>

        </div>
    </div>
    );
}