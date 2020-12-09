import React from "react";
import ProjectActions from "./ProjectActions";
import MemberCard from "./MemberCard";
import AddMemberPopup from "./AddMemberPopup";
import MemberIcon from "../../assets/icon/member.png";

// eslint-disable-next-line react/prop-types
export default function ProjectMenu({ currentProject, members, onDeleteProject, addMemberByEmail, onDeleteMember }) {

    
    return (
        <div className="project-menu flex-start">
            <div id="project-menu" className="flex-start">
                {/* eslint-disable-next-line react/prop-types*/}
                <p className="project-title">{currentProject.title}</p>
                <ProjectActions onDeleteProject={onDeleteProject} />

            </div>
            <div id="member-menu" className="flex-start">
            <img className="member-icon" src={MemberIcon} />
                {
                    members === null ?
                        null :
                        <div className="member-list flex-start">
                            {/* eslint-disable-next-line react/prop-types*/}
                            {members.map(member => (
                                <MemberCard key={member.id}
                                    member={member}
                                    onClick={onDeleteMember}
                                    onClickName="Delete member"
                                />
                            ))}

                        </div>
                }
                <AddMemberPopup onSubmit={addMemberByEmail} />
            </div>
        </div>
    );
}