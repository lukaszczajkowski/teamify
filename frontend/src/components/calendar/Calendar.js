import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import EventApi from '../../api/EventApi';
import EventPopup from './EventPopup';

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
        loadData();
    }, []);

    const loadData = () => {
        EventApi.getAllUserEvents().then(response => {
            const listOfEvents = response.data;
            setCalendarEvents(listOfEvents);
        })   
    }

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
        loadData();
        setPopupOpen(true);
    }

    const handleEventChange = (info) => {
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
            loadData();
            const eventAfterUpdate = response.data;
            calendarEvents.filter((e) => {
                if(e.id == eventAfterUpdate.id){
                    e = eventAfterUpdate
                }
            })
        });
        
    }

    const deleteEvent = (toBeRemoved) => {
        const idToRemove = toBeRemoved.id;
        // eslint-disable-next-line no-unused-vars
        EventApi.delete(idToRemove).then(() => { 
            loadData();
            var removeIndex = calendarEvents.findIndex(item => item.id == idToRemove);
            calendarEvents.splice(removeIndex, 1);
            }
        )
    }

    const updateFromPopup = (data) => {
        console.log("data from updateFromPopup", data);
        const startDate = new Date(currentEvent.start);
        var startDateOutput = new Date(startDate.getFullYear(), startDate.getMonth(),
             startDate.getDate(), startDate.getHours(), startDate.getMinutes() + 60)
        const end = new Date(currentEvent.end);
        var endDateOutput = new Date(end.getFullYear(), end.getMonth(),
        end.getDate(), end.getHours(), end.getMinutes() + 60)
        const updatedEvent = {
            id: currentEvent.id,
            title: data.eventTitle,
            description : data.eventDescription,
            start: startDateOutput,
            end: endDateOutput,
            users: currentEvent.extendedProps.users,
            creator: currentEvent.extendedProps.creator,
            allDay: currentEvent.allDay,
            editable: true,
            }
        EventApi.update(updatedEvent).then((response) => {
            loadData();
            const eventAfterUpdate = response.data;
            calendarEvents.filter((e) => {
                if(e.id == eventAfterUpdate.id){
                    e = eventAfterUpdate
                }
            })
        })
    }

    const popupClosed = (value) => {
        setPopupOpen(value);
        setCurrentEvent({});
    };

    return(
        <div>
        <FullCalendar
            initialView = "dayGridMonth"
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

        {currentEvent === null ? 
            null
            :
            <div className="create-bean-card">
                <div className="popup-container">
                <EventPopup isOpen = {popupOpen} 
                currentEvent = {currentEvent} 
                deleteEvent = {deleteEvent}
                updateEvent = {updateFromPopup}
                onClose = {popupClosed}
                />
                </div>
            </div>
        }
    </div>
    );
}