import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import UserApi from '../../api/UserApi';
import MemberCard from "../projects/MemberCard";
import EditableText from "../projects/EditableText";


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

    const [isMemberAdding, setIsMemberAdding] = useState(false);
    const [projectMembers, setProjectMembers] = useState([]);

    const loadContacts = () => {
        UserApi.getUsersSummaries(projectId).then(response => {

            const existingMemberIds = members ? currentTask.members.map(member => member.id) : [];
            setProjectMembers(response.data.filter(member => !existingMemberIds.includes(member.id)));
        })
    }

    useEffect(() => {
        loadContacts();
    }, [currentTask]);

    const onTitleUpdated = (newTitle) => {
        const updatedTask = {
            id,
            title: newTitle,
            description,
        };

        updateTask(categoryId, updatedTask);
    }

    const onDescriptionUpdated = (newDescription) => {
        const updatedTask = {
            id,
            title,
            description: newDescription,
        };

        updateTask(categoryId, updatedTask);
    }

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
                            <h2 className="prompt">Title</h2>
                            <EditableText
                                text={title}
                                onUpdateText={onTitleUpdated} 
                            />
                        </div>
                        <div className="popup-item flex-start">
                            <h2 className="prompt">Description</h2>
                            <EditableText
                                text={description}
                                onUpdateText={onDescriptionUpdated} 
                            />
                        </div>
                        <div className="popup-item">

                            <div className="flex-start">
                                <h2 className="prompt">Members:</h2>
                                <div className="member-list flex-start">
                                    {members && members.map(member => (
                                        <MemberCard
                                            key={member.id}
                                            member={member}
                                            onClick={() => onDeleteMember(member)}
                                            onClickTitle="Delete member"
                                        />
                                    ))}
                                </div>
                                {projectMembers.length > 0 && 
                                    <button
                                        className="action-button add-member"
                                        onClick={onOpenAddMemberPopup}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                }
                            </div>


                            {isMemberAdding ?
                                <div className="member-list flex-start">
                                    {projectMembers.map(member => (
                                        <MemberCard key={member.id}
                                            member={member}
                                            onClick={() => onAddMember(member)}
                                            onClickTitle="Add member"
                                        />
                                    ))}
                                    <button
                                        className="action-button"
                                        onClick={onCloseAddMemberPopup}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                :
                                null
                            }

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