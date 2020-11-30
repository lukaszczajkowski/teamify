import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import EventApi from '../../api/EventApi';
//import Api from '../../api/Api';

/**
 * This is a Calendar class that needs data props from the parent component - be it User 
 * or Project. This data would be used to display relevant events to on the calendar by setting
 * the calendarEvents state. 
 */
export default function Calendar() {
   
    const [calendarEvents, setCalendarEvents] = useState([]);

    const loadEvents = async () => {
        EventApi.getAllUserEvents()
                .then(response => {
                    const events = response.data;
                    setCalendarEvents(events);
                })
                .then(console.log("data ready to use"))
                .catch(err => console.log(err));
    }
    useEffect( async () => {
        loadEvents().then(console.log("data reloaded!"))         
    }, []);

    const handleDateClick = (e) => {
        if(confirm('Would you like to add an event to ' + e.dateStr + '?')) {
            var date = new Date(e.dateStr);
            const newEvent = {
                title: 'test event',
                description : 'test description',
                start: date,
                allDay: false,
                editable: true,
            }
            EventApi.create(newEvent);
        }
    };

    const handleEventClick = (info) => {
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
        const start = new Date(info.event.start);
        const end = new Date(info.event.end);
        const updatedEvent = {
            id: info.event.id,
            title: info.event.title,
            description: info.event.description,
            start: start,
            end: end,
            creator: info.event.extendedProps.creator,
            allDay: info.event.allDay,
            editable: true
        }
        EventApi.update(updatedEvent);
        
    }

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
        </div>
    )
}