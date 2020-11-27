import React from "react";
import Popup from "reactjs-popup";

// export default function CreateBeanCard({ onSubmit }) {
//     const [name, setName] = useState("");
//     const [description, setDescription] = useState("");
//     const [points, setPoints] = useState();

//     function onCreateBean() {
//         const beanData = {name, description, points};
//         onSubmit(beanData);
//     }

// Added value and onChange property to the input fields
// value={points}
// onChange={e => setPoints(e.target.value)}

export default function CreateBeanCard() {

    return (
        <div className="create-bean-card">
            <div className="popup-container">
                <Popup
                    trigger={<button className="button"> + Create Task </button>}
                    modal
                    nested>
                    {close => (
                        <div className="modal">
                            <button className="close" onClick={close}>
                                <i className="fas fa-times"></i>
                            </button>
                            <div className="content">
                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Name</h2>
                                    <input
                                        type="text"
                                        className="input-box"
                                        placeholder=""
                                    >
                                    </input>
                                </div>

                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Description</h2>
                                    <textarea
                                        
                                        className="input-box"
                                        placeholder=""
                                    >
                                    </textarea>
                                </div>

                                

                                <div className="popup-item flex-start">
                                        <h2 className="prompt">Members</h2>

                                    <input
                                        type="range"
                                        className="input-slide"
                                        min="0"
                                        max="10"
                                    >
                                    </input>
                                </div>
                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Comment</h2>
                                    <textarea
                                        
                                        className="input-box"
                                        placeholder=""
                                    >
                                    </textarea>
                                </div>

                            </div>

                            <button
                                className="button"
                                onClick={() => {

                                    close();
                                }}>
                                Add
                            </button>
                        </div>

                    )}
                </Popup>

            </div>
        </div>
    );
}