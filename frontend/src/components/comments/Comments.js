import React, { useState } from "react";
import EditableText from "../projects/EditableText";

export default function Comments({task, onCreate, onUpdate, onDelete}){

    const [isCreatingNewComment, setIsCreatingNewComment] = useState(false);
    const [createdComment, setCreatedComment] = useState("");

    const onAddComment = () => {

        const comment = {
            body: createdComment,
        }

        console.log("Create comment", comment)
        onCreate(task, comment)
        setIsCreatingNewComment(false)
        setCreatedComment("")
    }

    const onEditComment = (comment, text) => {
        const newComment = {
            id: comment.id,
            body: text,
        }
        console.log("Update comment", newComment)
        // onUpdate(task, newComment)
    }

    if (onCreate == "qweqweqw") {
        onCreate(task, onUpdate, onDelete);
    }

    console.log("task", task)

    return (
        <div>
            {isCreatingNewComment ? 
                <form onSubmit={onAddComment}>
                    <input
                        type="text"
                        className="input-box"
                        placeholder="Title"
                        value={createdComment}
                        onChange={e => setCreatedComment(e.target.value)}
                        required
                    />
                    <button
                        className="action-button"
                        type="submit">
                        <i className="fas fa-chevron-down"></i>
                    </button>
                    <button
                        className="action-button"
                        onClick={() => setIsCreatingNewComment(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </form> 
                : 
                <button
                    className="action-button add-comment"
                    onClick={() => setIsCreatingNewComment(true)}>
                    <i className="fas fa-plus"></i>
                </button> 
            }
            <div>
                {task.comments ? task.comments.map( comment => {
                    return <div key={comment.id}>
                        {comment.user.name}: <EditableText text={comment.body} onUpdateText={(text) => onEditComment(comment, text)}/>
                    </div>
                } 
                )
                : 
                null}
            </div>
        </div>
    )
}