import React, { useState } from "react";
import Popup from "reactjs-popup";
import BeanIcon from "../../assets/bean-black.png";

// eslint-disable-next-line react/prop-types
export default function BeanPopup({ isOpen, onAddBean, initialData, createBean, onClose }) {

    const {
        // eslint-disable-next-line react/prop-types
        title, description, eventCount, duration
    } = initialData;

    const [beanTitle, setBeanTitle] = useState(title);
    const [beanDescription, setBeanDescription] = useState(description);
    const [beanEventCount, setBeanEventCount] = useState(eventCount);
    const [beanDuration, setBeanDuration] = useState(duration);

    const onCreateBean = () => {
        const beanData = {
            title: beanTitle,
            description: beanDescription,
            eventCount: beanEventCount,
            duration: beanDuration
        };
        console.log(JSON.stringify(beanData));
        createBean(beanData);
        () => { onAddBean };
        onClose();
    };



    return (
        <div className="bean-popup">
            <div className="popup-container">
                <Popup
                    open={isOpen}
                    modal
                    nested
                    onClose={onClose}
                >

                    <div className="modal" id="bean-popup">
                        <button className="close" onClick={onClose}>
                            <i className="fas fa-times"></i>
                        </button>
                        <div className="popup-header">
                            <div className="flex-start">
                                 <img src={BeanIcon} className="header-icon"/>
                            <h1 className="header-title">Add a new bean</h1>
                            </div>
                           
                        </div>
                        
                        <div className="content">
                            <div className="popup-item flex-start">
                                <h2 className="prompt">title</h2>
                                <input
                                    type="text"
                                    className="input-box"
                                    placeholder="Give it a name..."
                                    value={beanTitle}
                                    onChange={e => setBeanTitle(e.target.value)}
                                />

                            </div>

                            <div className="popup-item flex-start">
                                <h2 className="prompt">Description</h2>
                                <textarea

                                    className="input-box text-area"
                                    placeholder="Add more detail to this bean..."
                                   cols="50"
                                    value={beanDescription}
                                    onChange={e => setBeanDescription(e.target.value)}
                                />

                            </div>

                            <div className="popup-item">
                                <h6 className="sub-prompt">How long does one task take?</h6>
                                <div className="flex-start">
                                    <h2 className="prompt">It takes</h2>
                                    <input
                                        type="number"
                                        className="input-box"
                                        min="0"
                                        max="60"
                                        step="15"
                                        value={beanDuration}
                                        onChange={e => setBeanDuration(e.target.value)}
                                    />
                                    <h2 className="prompt">minutes</h2>

                                </div>
                                
                            </div>

                            <div className="popup-item">
                                <h6 className="sub-prompt">How many times do you want to do this bean task today?</h6>
                                <div className="flex-start">
                                    <h2 className="prompt">Repeat</h2>
                                    <input
                                        type="number"
                                        className="input-box"
                                        min="0"
                                        max="10"
                                        value={beanEventCount}
                                        onChange={e => setBeanEventCount(e.target.value)}
                                    />
                                    <h2 className="prompt">times</h2>
                                </div>



                            </div>


                        </div>
                        <div className="flex-end">
                            <button
                                className="button"
                                id="add-bean"
                                onClick={onCreateBean}>
                                Add
                            </button>
                        </div>

                    </div>
                </Popup>

            </div>
        </div>
    );
}