import React, { useState } from "react";
import Popup from "reactjs-popup";


// eslint-disable-next-line react/prop-types
export default function AddMemberPopup({ projectId, onSubmit }) {
    const [userEmail, setUserEmail] = useState("");

    return (
        <div className="create-bean-card">
            <div className="popup-container">
                <Popup
                    trigger={<button className="button" id="add-member"> + invite members </button>}
                    modal
                    nested>
                    {close => (
                        <div className="modal">
                            <button className="close" onClick={close}>
                                <i className="fas fa-times"></i>
                            </button>
                            <div className="header">Add new member</div>
                            <div className="content">
                                <div className="popup-item">
                                    <input
                                        type="text"
                                        className="input-box"
                                        placeholder="Enter the Email of new member" 
                                        value={userEmail}
                                        onChange={e => setUserEmail(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div>

                            <div className="flex-end">
                                <button
                                    className="button"
                                    onClick={() => {
                                        onSubmit(projectId, userEmail);
                                        close();
                                    }}>
                                    Add
                            </button>
                            </div>

                        </div>

                    )}
                </Popup>

            </div>
        </div >
    );
}