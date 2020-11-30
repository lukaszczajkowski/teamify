import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import EventApi from '../../api/EventApi'

/**
 * This is a Calendar class that needs data props from the parent component - be it User 
 * or Project. This data would be used to display relevant events to on the calendar by setting
 * the calendarEvents state. 
 */
export default function Calendar() {
    // const {
    //     id,
    //     email,
    //     name,
    //     title
    // } = data;

    /*
    This serves as an indicator whether the calendar is in the
    user panel or project panel
    */
    const [calendarType, setCalendarType] = useState("");

    const [email] = useState('not null');

    const [calendarEvents, setCalendarEvents] = useState([{
        title: 'Event now',
        start: new Date()
    }]);

    useEffect( () =>{
        email === null ? setCalendarType("project") : setCalendarType("user");
        }, [email]);

    // useEffect( async () => {
    //     EventApi.getUserEventsInRange(id, "2020-11-20", "2025-11-30")
    // },[calendarEvents]);
    

    //test
    console.log("Calendar type:", calendarType);

    const handleDateClick = (e) => {
        if(confirm('Would you like to add an event to ' + e.dateStr + '?')) {
            const newEvent = {
                title: 'test event',
                description : 'test description',
                start: e.dateStr,
                allDay: false,
                editable: true
            }
            setCalendarEvents(calendarEvents.concat(
                newEvent
            ));
        }
    };

    const handleEventClick = (info) => {
        console.log("Title", info.event.title);
        console.log("Start:", info.event.start);
        console.log("End:", info.event.end);
    }

    const handleEventChange = (info) => {
        //EventApi update method here
        console.log("Title:", info.event.title);
        console.log("Start:", info.event.start);
        console.log("End:", info.event.end);
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