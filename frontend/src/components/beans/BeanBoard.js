import React from "react";
import BeanIcon from "../../assets/beanicon.png";
import CreateBeanPopup from "./CreateBeanPopup";
import BeanCard from "./BeanCard";
import PresetBeans from "./PresetBeans";

// eslint-disable-next-line react/prop-types
export default function BeanBoard({ createBean }) {


    return (
        <article className="bean-board">
            <div className="board-container">
                <div className="flip-front">
                    <div className="board-title flex-start">
                        <img className="bean-icon" src={BeanIcon}></img>
                        <h1 className="board-name">Your personal bean board</h1>
                    </div>

                    <div className="board-section">
                        <div className="goal-prompt flex-between">
                            <h2 className="prompt">Your well-being goals for today: </h2>
                            <p className="sub-prompt">Add new beans to your calendar</p>
                        </div>

                        <div className="bean-buttons flex-center">
                            

                            <PresetBeans />

                            {/* <CreateBeanCard onSubmit= {createBean}/> */}
                            <CreateBeanPopup onSubmit={createBean}/>
                        </div>
                    </div>

                    <hr />

                    <div className="board-section">
                        <div className="collect-prompt board-item flex-between">
                            <h2 className="prompt">Beans to collect today: </h2>
                            <p className="sub-prompt">Click if you have completed the bean</p>
                        </div>

                        <BeanCard/>
                    </div>



                    <div className="flex-end">
                        <button className="flip-arrow"><i className="fas fa-arrow-right"></i></button>
                    </div>

                </div>

                <div className="flip-back">

                </div>
            </div>

        </article>
    );
}