import React from "react";
import randomColor from "randomcolor";
import { Link } from "react-router-dom";

export default function UserMenu({ user, currentTime }) {
    return (
        <div className="user-menu">
            <div className="flex-between board-container">
                <div className="user-prompt">
                    <span className="prompt"> Hello,</span>
                    {/*eslint-disable-next-line react/prop-types*/}
                    <span id="user-name">{user.name}</span>
                </div>

                {/* This section below is for testing displaying time and using random color */}
                <div className="time-prompt flex-start">
                    <Link to="/calendar"><i className="far fa-calendar-alt calendar-icon"></i></Link>
                    <h1 className="prompt">Today </h1>
                    <h1 id="current-time" style={{ color: `${randomColor()}` }}>{currentTime}</h1>

                </div>
            </div>

        </div>


    );
}