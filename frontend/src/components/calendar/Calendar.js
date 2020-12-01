import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import EventApi from '../../api/EventApi';
import Popup from "reactjs-popup";
//import Api from '../../api/Api';

/**
 * This is a Calendar class that needs data props from the parent component - be it User 
 * or Project. This data would be used to display relevant events to on the calendar by setting
 * the calendarEvents state. 
 */
export default function Calendar() {
   
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [currentEvent, setCurrentEvent] = useState({});

    
    useEffect( async () => {
        EventApi.getAllUserEvents().then(response => {
            const listOfEvents = response.data;
            setCalendarEvents(listOfEvents);
        })        
    }, []);

    const handleDateClick = (e) => {
        if(confirm('Would you like to add an event to ' + e.dateStr + '?')) {
            var startDate = new Date(e.dateStr);
            var startDateOutput = new Date(startDate.getFullYear(), startDate.getMonth(),
             startDate.getDate(), startDate.getHours(), startDate.getMinutes() + 60)
            var startInMililis = startDate.getMilliseconds();
            var endDate = startInMililis + 60000*30;
            var endDateOutput = new Date(endDate.toDateString)
            const newEvent = {
                title: 'test event',
                description : 'test description',
                start: startDateOutput,
                end: endDateOutput,
                allDay: false,
                editable: true,
            }
            EventApi.create(newEvent).then(response => {
                const events = response.data;
                setCalendarEvents([...calendarEvents, events]);
            });
        }
    };

    const handleEventClick = (info) => {
        setCurrentEvent(info.event);
        console.log("open?", popupOpen);
        setPopupOpen(!popupOpen);
        console.log("open?", popupOpen);
        console.log("Title", info.event.title);
        console.log("Start:", info.event.start);
        console.log("End:", info.event.end);
        console.log("Creator", info.event.extendedProps.creator)
        console.log(info.event);
    }

    const handleEventChange = (info) => {
        //EventApi update method here
        console.log("Title:", info.event.title);
        console.log("Start:", info.event.start);
        console.log("End:", info.event.end);
        const startDate = new Date(info.event.start);
        var startDateOutput = new Date(startDate.getFullYear(), startDate.getMonth(),
             startDate.getDate(), startDate.getHours(), startDate.getMinutes() + 60)
        const end = new Date(info.event.end);
        var endDateOutput = new Date(end.getFullYear(), end.getMonth(),
        end.getDate(), end.getHours(), end.getMinutes() + 60)
        const updatedEvent = {
            id: info.event.id,
            title: info.event.title,
            description: info.event.description,
            start: startDateOutput,
            end: endDateOutput,
            users: info.event.extendedProps.users,
            creator: info.event.extendedProps.creator,
            allDay: info.event.allDay,
            editable: true
        }
        EventApi.update(updatedEvent).then(response => {
            const eventAfterUpdate = response.data;
            calendarEvents.filter((e) => {
                if(e.id == eventAfterUpdate.id){
                    e = eventAfterUpdate
                }
            })
        });
        
    }

    return(
        <div>
        <FullCalendar
            initialView = "dayGridWeek"
            headerToolbar={{
                left: 'prev, next, today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            plugins = {[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            events = {calendarEvents}
            dateClick = {(e) => handleDateClick(e)}
            eventClick = {(info) => handleEventClick(info)}
            eventChange = {(info) => handleEventChange(info)}
        />
        <div className="create-bean-card">
            <div className="popup-container">
                <Popup
                    open = {popupOpen}
                    modal
                    nested>
                    {console.log("trying to open this")}
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

                                <div className="popup-item">
                                    <div className="flex-start">
                                        <h2 className="prompt">Points</h2>
                                        <h6 className="sub-prompt">How many times do you want to do this bean task today?</h6>
                                    </div>

                                    <input
                                        type="range"
                                        className="input-slide"
                                        min="0"
                                        max="10"
                                    >
                                    </input>
                                </div>

                            </div>
                            <div className="flex-end">
                                <button
                                className="button"
                                onClick={() => {
                                    close();
                                }}>
                                Add
                            </button>
                            </div>
                            
                        </div>

                    )}
                </Popup>
            </div>
        </div>
        </div>
    );
}