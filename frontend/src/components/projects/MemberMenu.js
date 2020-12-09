import React from "react";
import MemberCard from "./MemberCard";
import MemberIcon from "../../assets/icon/member.png";
import AddMemberPopup from "./AddMemberPopup";

// eslint-disable-next-line react/prop-types
export default function MemberMenu({ members, addMemberByEmail, onDeleteMember}) {

    return (
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
                                onSubmit={onDeleteMember}
                            />
                        ))}

                    </div>
            }
            <AddMemberPopup onSubmit={addMemberByEmail} />


        </div>);
}