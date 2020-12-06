import React from "react";

// eslint-disable-next-line react/prop-types
export default function MemberCard({member}) {
    return (
        <div className="member-card">
            {/*eslint-disable-next-line react/prop-types*/}
            <button className="member-button">{member.name.charAt(0)}</button>

        </div>
    );
}