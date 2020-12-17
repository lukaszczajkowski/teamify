import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import UserApi from '../../api/UserApi';
import MemberCard from "../projects/MemberCard";
import EditableText from "../projects/EditableText";
import Comments from "../comments/Comments";
import { motion } from "framer-motion";
//import { Dropdown } from 'semantic-ui-react';
// import TaskApi from '../../api/TaskApi'
//import 'semantic-ui-css/semantic.min.css'
//import _ from 'lodash';


export default function TaskPopup({ isOpen, currentTask, updateTask, addMemberToTask, deleteMemberFromTask, onClose, addComment, updateComment, deleteComment, categories }) {
    console.log("categories from task popup", categories)
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


    const dropdownOptions = categories.map(c => {
        const category = {
            key: c.id,
            text: c.title,
            value: c.id,
        }
        return category;
    })

    console.log(dropdownOptions);

    const [isMemberAdding, setIsMemberAdding] = useState(false);
    const [projectMembers, setProjectMembers] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [chosenCategoryId, setChosenCategory] = useState(categoryId);


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

    const changeCategory = () => {
        console.log("chosen category id:", chosenCategoryId);
        // TaskApi.updateCategory(currentTask.id, chosenCategoryId)
        //     .then();
        const updatedTask = {
            id,
            title,
            description,
            categoryId: chosenCategoryId,
        };

        updateTask(categoryId, updatedTask);
    }

    const handleChange = (e) => {
        console.log("key:", e.target.value, e)
        setChosenCategory(e.target.value);
    }

    return (
        <div className="task-popup popup-container">
            <Popup open={isOpen} modal nested onClose={onClose}>
                <motion.div  initial={{
                     scale: 0
                         }}
                     animate= {{
                     scale: 1
                     }} className="modal">
                    <button className="close" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                    <div className="header1">
                        <h2 className="header1-title">Update task</h2>

                    </div>
                    <div className="content">
                        <div className="popup-item flex-start">
                            <h2 className="prompt">Title</h2>
                            <EditableText
                                text={title}
                                placeholder="title..."
                                onUpdateText={onTitleUpdated} 
                            />
                        </div>
                        <div className="popup-item flex-start">
                            <h2 className="prompt">Description</h2>
                            <EditableText
                                text={description}
                                placeholder="description..."
                                onUpdateText={onDescriptionUpdated} 
                            />
                        </div>
                        <div className="popup-item">

                        <div className="popup-item flex-start">
                            <h2 className="prompt">Move to</h2>
                            <select name="categories" onChange={handleChange}>
                                 {dropdownOptions.map( item => (
                                    <option key={item.key} value={item.value} selected={categoryId == item.value}>{item.text}</option>)
                                 )}
                            </select>

                          
                            <button 
                            className="action-button"
                            onClick = {changeCategory}>
                                Ok
                            </button>
                        </div>
                        <div className="popup-item"></div>

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

                         <div className="popup-item flex-start"> 
                            <h2 className="prompt">Comments</h2>
                            <Comments 
                                task={currentTask}
                                onCreate={addComment}
                                onUpdate={updateComment}
                                onDelete={deleteComment}
                            />
                        </div> 
                    </div>
                </motion.div>
            </Popup>
        </div>
    );
}