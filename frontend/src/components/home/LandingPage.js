import React from "react";
import Header from "../layout/Header";
import allinone from '../../assets/allinone.png';
import { Link } from 'react-router-dom';


function LandingPage() {

    return (
        <div className="landingpage">
            <div className="landingpage-body">
                <Header />
                <img className="image" src= {allinone} alt = "allinone"  />
                <p className="quote">A all-in-one workspace that cares about your well-being!</p>
                <Link to = "/authenticate" className="button"><span>Get Started </span></Link>

            </div>
        </div>
    );
}

export default LandingPage;