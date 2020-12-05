import React from "react";
import BeanIcon from "../../assets/icon/beans.png";
import MemberIcon from "../../assets/icon/member.png";
import ChatIcon from "../../assets/icon/chat.png";
import { Link } from "react-router-dom";

export default function ProjectHeader() {
    return (
        <div className="project-header ">
            <div className="member-nav">
                <Link to="" className="nav-item">
                    <img className="icon" src={BeanIcon} />
                </Link>
                <Link to="" className="nav-item">
                    <img className="icon" src={MemberIcon} />
                </Link>
                <Link to="" className="nav-item">
                    <img className="icon" src={ChatIcon} />
                </Link>
            </div>
            <div className="personal-nav">

            </div>


        </div>
    );
}