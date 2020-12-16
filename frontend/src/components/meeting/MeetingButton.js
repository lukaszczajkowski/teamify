import React, { useState } from "react";
import MeetingPopup from "./MeetingPopup";

export default function MeetingButton () {


    const [popupIsOpen, setPopupIsOpen] = useState(false);

    const onCreateMeeting = () => {
        setPopupIsOpen(true);
    }

    const onClosePopup = () => {
        setPopupIsOpen(false);
    }
    return (
        <div className="zoom">
            <button
                id="create-meeting"
                className="meeting-button button"
                onClick={onCreateMeeting}>
                ZOOM
            </button>

            <MeetingPopup
                isOpen={popupIsOpen}
                onCreateMeeting = {onCreateMeeting}
                onClose={onClosePopup} />

        </div>
    );
}