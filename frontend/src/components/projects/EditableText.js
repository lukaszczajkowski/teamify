import React,  { useState } from "react";


export default function EditableText({text, onUpdateText}) {
    
    const [isEditing, setIsEditing] = useState(false);
    const [currentText, setCurrentText] = useState(text);

    const onSubmit = (e) => {
        e.preventDefault();
        onUpdateText(currentText)
        setIsEditing(false)
    }

    return (
        <div>
        {
            isEditing ?
                <div className="title-input flex-between">
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            className="input-box"
                            placeholder="Title"
                            value={currentText}
                            onChange={e => setCurrentText(e.target.value)}
                            required
                        />
                        <button
                            className="action-button confirm-update"
                            type="submit">
                            <i className="fas fa-check"></i>
                        </button>
                    </form>
                </div>
                :
                <h2 className="input-box" onClick={() => setIsEditing(true)}>{currentText}</h2>
        }
        </div>
    );
}