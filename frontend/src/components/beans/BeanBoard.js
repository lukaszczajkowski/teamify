import React from "react";
import BeanIcon from "../../assets/beanicon.png";
import BeanCard from "./BeanCard";
import PresetBeans from "./PresetBeans";
import CreateBeanButton from "./CreateBeanButton";


// eslint-disable-next-line react/prop-types
export default function BeanBoard({ presetBeans, addedBeans, createBean, updateBean, deleteBean }) {

    return (
        <article className="bean-board">
            <div className="board-container">
                <div className="flip-front">
                    <div className="board-title flex-start">
                        <img className="bean-icon" src={BeanIcon}></img>
                        <h1 className="board-name">Personal bean board</h1>
                    </div>

                    <div className="board-section">
                        <div className="goal-prompt flex-between">
                            <h2 className="prompt">Choose your well-being goals for today: </h2>
                            <p className="sub-prompt">Click to add new beans to your calendar</p>
                        </div>

                        <div className="bean-buttons flex-center">


                            <PresetBeans
                                presetBeans={presetBeans}
                                createBean={createBean} />



                            <CreateBeanButton createBean={createBean} />


                        </div>
                    </div>

                    <hr />

                    <div className="board-section">
                        <div className="collect-prompt board-item flex-between">
                            <h2 className="prompt">Beans to collect today: </h2>
                            <p className="sub-prompt">Click if you have completed the bean</p>
                        </div>

                        {
                            addedBeans !== undefined ?
                                <div className="bean-cards flex-start">
                                    {/* eslint-disable-next-line react/prop-types */}
                                    {addedBeans.map(bean => (
                                        <BeanCard
                                            key={bean.id}
                                            bean={bean}
                                            updateBean={updateBean} 
                                            deleteBean={deleteBean}/>
                                    ))}
                                </div> : null
                        }


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