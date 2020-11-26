import React from "react";

import BeanIcon from "../../assets/beanicon.png";
import CreateBeanCard from "./CreateBeanCard";

export default function BeanBoard() {

    // const [beans, setBeans] = useState([]);
    // const createBean = (beanData) => (
        
    // );


    return (
        <div className="bean-board">
            <div className="board-container">
                <div className="flip-front">
                    <div className="flex-start board-item board-title">
                        <img className="bean-icon" src={BeanIcon}></img>
                        <p className="board-name">Your personal bean board</p>
                    </div>
                    <div className="flex-between board-item">
                        <p className="prompt">How are you feeling today? </p>
                        <p className="">Here is a slide</p>
                    </div>
                    <div className="flex-start board-item">
                        <p className="prompt">What are your well-being goals for today? </p>
                        <p className="sub-prompt">Add new beans to your task list</p>
                    </div>
                    <div className="flex-center board-item">
                        <button className="button">Drink water</button>
                        <button className="button">Exericise</button>
                        <button className="button">Meditate</button>
                        <button className="button">+ create a new bean</button>
                        {/* <CreateBeanCard onSubmit= {createBean}/> */}
                        <CreateBeanCard />
                    </div>
                 <div className="flex-end">
                     <button className="flip-arrow"><i className="fas fa-arrow-right"></i></button>
                 </div>
                    
                </div>

                <div className="flip-back">

                </div>
            </div>

        </div>
    );
}