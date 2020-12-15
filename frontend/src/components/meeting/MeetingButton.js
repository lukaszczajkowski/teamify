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
        <div >
            <button
            id="create-meeting"
                className="meeting-button button"
                onClick={onCreateMeeting}>
                Meeting
            </button>

            <MeetingPopup
                isOpen={popupIsOpen}
                onCreateMeeting = {onCreateMeeting}
                onClose={onClosePopup} />

        </div>
    );
}