/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import UserApi from '../../api/UserApi';
import MemberCard from "../projects/MemberCard";


// eslint-disable-next-line react/prop-types
export default function TaskPopup({ isOpen, currentTask, updateTask, addMemberToTask, deleteMemberFromTask, onClose }) {
    console.log(currentTask);

    const {
        id,
        title,
        description,
        members,
        category: {
            id: categoryId,
            project: {
                id: projectId
            },
        },
    } = currentTask;

    const [taskTitle, setTaskTitle] = useState(title);
    const [taskDescription, setTaskDescription] = useState(description);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    const [isMemberAdding, setIsMemberAdding] = useState(false);
    const [projectMembers, setProjectMembers] = useState([]);

    // const [taskMembers, setTaskMembers] = useState("");
    //const [taskComments, setTaskComments] = useState([]);

    const updatedTask = {
        id,
        title: taskTitle,
        description: taskDescription
    }

    const loadContacts = () => {
        UserApi.getUsersSummaries(projectId).then(response => {
            const existingMemberIds = currentTask.members.map(member => member.id);
            setProjectMembers(response.data.filter(member => !existingMemberIds.includes(member.id)));
        })
      }

    useEffect(() => {
        setTaskTitle(title);
        loadContacts();
    }, [currentTask]);

    const onUpdateTask = () => {
        updateTask(categoryId, updatedTask);
        setIsEditingTitle(false);
        setIsEditingDescription(false);
    };

    const onOpenAddMemberPopup = () => {
        setIsMemberAdding(true);
    }

    const onCloseAddMemberPopup = () => {
        setIsMemberAdding(false);
    }

    const onAddMember = (member) => {
        addMemberToTask(currentTask, member);
        setIsMemberAdding(false);
    }

    const onDeleteMember = (member) => {
        deleteMemberFromTask(currentTask, member);
        setIsMemberAdding(false);
    }

    return (
        <div className="task-popup popup-container">
            <Popup open={isOpen} modal nested onClose={onClose}>
                <div className="modal">
                    <button className="close" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                    <div className="content">
                        <div className="popup-item flex-start">
                        {
                            isEditingTitle ?
                                <div className="title-input flex-between">
                                    <input
                                        type="text"
                                        className="input-box"
                                        placeholder="Title"
                                        value={taskTitle}
                                        onChange={e => setTaskTitle(e.target.value)}
                                    />
                                    <button
                                        className="button" id="confirm-update"
                                        onClick={onUpdateTask}>
                                        <i className="fas fa-check"></i>
                                    </button>
                                </div>
                                :
                                <h2 className="prompt" onClick={() => setIsEditingTitle(true)}>{taskTitle}</h2>
                        }
                        </div>
                        <div className="popup-item flex-start">
                        {
                            isEditingDescription ?
                                <div className="title-input flex-between">
                                    <input
                                        type="text"
                                        className="input-box"
                                        placeholder="Description"
                                        value={taskDescription}
                                        onChange={e => setTaskDescription(e.target.value)}
                                    />
                                    <button
                                        className="button" id="confirm-update"
                                        onClick={onUpdateTask}>
                                        <i className="fas fa-check"></i>
                                    </button>
                                </div>
                                :
                                <h2 className="prompt" onClick={() => setIsEditingDescription(true)}>{taskDescription || "No description"}</h2>
                        }
                        </div>
                        <div className="popup-item">
                            <h2 className="prompt">Members:</h2>
                            <div className="">
                                <div className="member-list flex-start">
                                    {members.map(member => (
                                        <MemberCard key={member.id}
                                            member={member}
                                            onClick={() => onDeleteMember(member)}
                                            onClickName="Remove member"
                                        />
                                    ))}
                                </div>

                                {isMemberAdding ? 
                                    <div className="member-list flex-start">
                                        {projectMembers.map(member => (
                                            <MemberCard key={member.id}
                                                member={member}
                                                onClick={() => onAddMember(member)}
                                                onClickName="Add member"
                                            />
                                        ))}
                                        <button
                                            className="button"
                                            onClick={onCloseAddMemberPopup}>
                                            <i className="fas fa-times"></i>
                                        </button> 
                                    </div>
                                    :
                                    (projectMembers.length > 0 && <button
                                        className="button"
                                        onClick={onOpenAddMemberPopup}>
                                        <i className="fas fa-plus"></i>
                                    </button>)
                                }
                            </div>
                        </div>

                        {/* <div className="popup-item flex-start"> 
                            <h2 className="prompt">Comments</h2>
                            <textarea
                                className="input-box"
                                placeholder=""
                                value={comments}
                                onChange={e => {
                                    setTaskComments(e.target.value);
                                }}
                            >
                            </textarea>
                        </div> */}
                    </div>
                </div>
            </Popup>
        </div>
    );
}