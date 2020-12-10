import React from "react";
import BeanIcon from "../../assets/bean-black.png";

export default function BeanCard({ bean }) {
    // const [isCollectible, setIsCollectible] = useState(false);
    // const [completed, setIsCompleted] = useState(false);

    // const onCollect = () => {
    //     setIsCompleted(true);

    // }

    return (
        <div>
            <div  className=" bean-card flex-start">
                <p>{bean.title}</p>
                <img className="bean-icon" src={BeanIcon} />
            </div>

            


        </div>
    );
}