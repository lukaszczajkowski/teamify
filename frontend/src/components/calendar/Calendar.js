import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function Calendar() {


    const [calendarEvents, setCalendarEvents] = useState([{
        title: 'Event now',
        start: new Date()
    }]);

    const handleDateClick = (e) => {
        if(confirm('Would you like to add an event to ' + e.dateStr + '?')) {
            setCalendarEvents(calendarEvents.concat({
                title: 'New event',
                start: e.date,
                allDay: e.allDay
            }))
        }
    };

    return(
        <div>
        <FullCalendar
            defaultView = "dayGridMonth"
            header={{
                left: 'prev, next, today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            plugins = {[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            events = {calendarEvents}
            dateClick = {(e) => handleDateClick(e)}
        />
        </div>
    )
}