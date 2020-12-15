import React, { useState } from "react";
import EditableText from "../projects/EditableText";
import Auth from '../../services/Auth'; 

export default function Comments({task, onCreate, onUpdate, onDelete}){

    const [isCreatingNewComment, setIsCreatingNewComment] = useState(false);
    const [createdComment, setCreatedComment] = useState("");

    const user = Auth.getUser();

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
        onUpdate(task, newComment)
        setIsCreatingNewComment(false)
    }

    const onDeleteComment = (commentId) => {
    
        console.log("delete comment")
        onDelete(commentId)
        setIsCreatingNewComment(false)
    }

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
                    return <div key={comment.id} className="flex-between">
                         {user && comment.user.id === user.id ?
                         <div>
                         <div>{comment.user.name}:</div>
                         <EditableText text={comment.body} onUpdateText={(text) => onEditComment(comment, text)}/>
                         </div>
                         :
                         <div>
                         <div>{comment.user.name}:</div>
                         <h2 className="input-box">{comment.body}</h2>
                         </div>
                        }

                        {user && comment.user.id === user.id && 
                            <button
                                className="action-button confirm-update"
                                onClick={() => onDeleteComment(comment.id)}
                                >
                                <i className="fas fa-minus"></i>
                            </button>
                        }
                    </div>
                } 
                )
                : 
                null}
            </div>
        </div>
    )
}