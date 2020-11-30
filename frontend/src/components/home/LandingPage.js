import React, { useEffect } from "react";
import lottie from "lottie-web";

import LandingHeader from "../layout/LandingHeader";
import hero from "../../assets/animation/drawkit-grape-animation-9-LOOP.json";
import { Link } from 'react-router-dom';


function LandingPage() {

    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#hero"),
            animationData: hero,
        });
    }, []);

    return (
        <div className="landing-page">
            <div className="content">
                <LandingHeader />
                <div id="hero"></div>
                <div className="flex-column">
                    <p className="quote">A all-in-one workspace that cares about your well-being!</p>
                    <Link to="/login"><button className="button" id="get-started">Get Started</button></Link>
                </div>


            </div>
        </div>
    );
}

export default LandingPage;