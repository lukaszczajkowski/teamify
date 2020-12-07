import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function MemberCard({member}) {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <div className="member-card" onClick={handleClick}>
          
            <button className="member-button">  
                    {/*eslint-disable-next-line react/prop-types*/}
                        {member.name.charAt(0)}
            </button>

            {
                click ?
                    <div className="action-menu">
                        <button className="action-item"
                            id="delete-project">
                            Delete member
                </button>
                    </div> :
                    null
            }

        </div>
    );
}