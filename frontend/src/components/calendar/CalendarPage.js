import React from "react";
import ProjectHeader from "../layout/ProjectHeader";
import Calendar from "./Calendar";

export default function CalendarPage() {
    return(
    <div className="calendar-page">
        <ProjectHeader/>
        <Calendar/>
    </div>);
}
