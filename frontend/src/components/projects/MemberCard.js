import React, { useState, useEffect } from "react";
import randomColor from "randomcolor";

// eslint-disable-next-line react/prop-types
export default function MemberCard({member}) {
    const [click, setClick] = useState(false);
    const [color, setColor] = useState();

    const handleClick = () => setClick(!click);

    const getRandomColor = () => {
        const newColor = randomColor();
        setColor(newColor);
    }

    useEffect(
        getRandomColor
    ,[]);

    return (
        <div className="member-card" onClick={handleClick} style={{ backgroundColor: `${color}`}}>
          
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