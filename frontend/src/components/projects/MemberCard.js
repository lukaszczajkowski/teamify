import React from "react";
import useComponentVisible from "../hooks/useComponentVisible";
// import randomColor from "randomcolor";

// eslint-disable-next-line react/prop-types
export default function MemberCard({ member, onClick, onClickName }) {

    // const [color, setColor] = useState();

    const {
        ref,
        isComponentVisible,
        setIsComponentVisible
    } = useComponentVisible(false);

    const handleClick = () => {
        setIsComponentVisible(true);
    }

    // const getRandomColor = () => {
    //     const newColor = randomColor();
    //     setColor(newColor);
    // }

    // useEffect(
    //     getRandomColor
    //     , []);

    return (
        <div className="member-card" onClick={handleClick}>

            <button className="member-button">
                {/*eslint-disable-next-line react/prop-types*/}
                {member.name.charAt(0)}
            </button>

            <div ref={ref}>
                {isComponentVisible && (
                    <div className="action-menu">
                        <div className="action-item">
                            {/* eslint-disable-next-line react/prop-types */}
                        <p>{member.name}</p>
                        {/* eslint-disable-next-line react/prop-types */}
                        <p>{member.email}</p>

                        {onClick && 
                            <button className="action-item"
                                id="delete-member"
                                // eslint-disable-next-line react/prop-types
                                onClick={()=> onClick(member.id)}>
                                {onClickName}
                            </button>
                        }
                    </div>
                )}
            </div>
        </div>
    );
}