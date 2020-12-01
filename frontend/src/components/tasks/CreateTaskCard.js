import React, {useState} from "react";
import Popup from "reactjs-popup";

    
//     

// eslint-disable-next-line react/prop-types
export default function CreateTaskCard({onSubmit}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
   
    const [comment, setComment] = useState();

    function onCreateTask(){
        const taskData = {name: name, description: description, comment: comment};
        onSubmit(taskData);
        console.log(taskData);
    }

    return (
        <div className="create-task-card">
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
                                        value= {name}
                                        onChange= {e => setName(e.target.value)}
                                        placeholder="Name"
                                    >
                                    </input>
                                </div>

                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Description</h2>
                                    <textarea
                                        className="input-box"
                                        value= {description}
                                        onChange= {e => setDescription(e.target.value)}
                                        placeholder="Description"
                                    >
                                    </textarea>
                                </div>     

                                <div className="popup-item flex-start">
                                        <h2 className="prompt">Members</h2>
                                        <p className="letter" href="/user"
                                        style={{
                                            borderWidth:1,
                                            borderColor:'rgba(0,0,0,0.2)',
                                            alignItems:'center',
                                            justifyContent:'center',
                                            width:45,
                                            height:45,
                                            backgroundColor:'lightblue',
                                            borderRadius:50,}}>
                                                +</p>

                                </div>

                                <div className="popup-item flex-start">
                                    <h2 className="prompt">Comment</h2>
                                    <textarea
                                        
                                        className="input-box"
                                        value= {comment}
                                        onChange= {e => setComment(e.target.value)}
                                        placeholder="Comment"
                                    >
                                    </textarea>
                                </div>

                            </div>

                            <div className="flex-end">
                                <button
                                className="button"
                                onClick={() => {
                                    onCreateTask();
                                    close();
                                }}>
                                Add
                            </button>

                            </div>
                            

                        </div>

                    )}
                </Popup>

            </div>
        </div>
    );
}