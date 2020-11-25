import React from "react";

import BeanIcon from "../../assets/beanicon.png";

export default function BeanBoard() {
    return (
        <div className="bean-board board-container">
            <div className="flip-front">
                <div className="flex">
                    <img className="bean-icon" src={BeanIcon}></img>
                    <p>Your personal bean board</p>
                </div>
                <div className="flex">
                    <p>How are you feeling today? </p>
                    <p>Here is a slide</p>
                </div>
                <div className="flex">
                    <p>What is your goal for today? </p>
                    <p>Add new beans to your task list</p>
                </div>
                <div >
                    <button className="button">Drink water</button>
                    <button className="button">Exericise</button>
                    <button className="button">Meditate</button>
                    <button className="button">create a new bean</button>
                </div>
                <button className="button"><i className="fas fa-arrow-right"></i></button>
            </div>

            <div className="flip-back">

            </div>


        </div>
    );
}