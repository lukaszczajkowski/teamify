import React, { useState } from "react";
import Popup from "reactjs-popup";
import { motion } from "framer-motion";


// eslint-disable-next-line react/prop-types
export default function AddMemberPopup({ onSubmit }) {
    const [userEmail, setUserEmail] = useState("");

    return (
        <div className="add-member-popup">
            <div className="popup-container">
                <Popup
                    trigger={<button className="button" id="add-member"> + Invite Members </button>}
                    modal
                    nested>
                    {close => (
                        <motion.div  initial={{
                            scale: 0
                                }}
                            animate= {{
                            scale: 1
                            }}className="modal">
                            <button className="close" onClick={close}>
                                <i className="fas fa-times"></i>
                            </button>

                            <div className="header1">
                             <h1 className="header1-title">Add new member</h1>
                                
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

                        </motion.div>

                    )}
                </Popup>

            </div>
        </div >
    );
}