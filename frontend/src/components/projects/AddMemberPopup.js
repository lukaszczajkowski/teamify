import React, { useState } from "react";
import Popup from "reactjs-popup";


// eslint-disable-next-line react/prop-types
export default function AddMemberPopup({ onSubmit }) {
    const [userEmail, setUserEmail] = useState("");

    return (
        <div className="add-member-popup">
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

                            <div className="header">
                             <h1 className="header-title">Add new member</h1>
                                
                                </div>
            
                            <div className="content">
                            <div className="prompt popup-item"></div>
                                <div className="popup-item">
                                    <input
                                    size="30"
                                       
                                        className="input-box text-area"
                                        placeholder="Enter the Email of new member" 
                                        value={userEmail}
                                        onChange={e => setUserEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex-end">
                                <button
                                    className="button"
                                    onClick={() => {
                                        onSubmit(userEmail);
                                        setUserEmail("");
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