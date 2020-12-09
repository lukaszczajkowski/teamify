import React, { useEffect } from "react";
import lottie from "lottie-web";

import LandingHeader from "../layout/LandingHeader";
import hero from "../../assets/animation/drawkit-grape-animation-9-LOOP.json";
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';


function LandingPage() {

    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#hero"),
            animationData: hero,
        });
    }, []);

    return (
        <div className="landing-page">
            <LandingHeader />
            <motion.div className="content" initial={{opacity: 0}}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1.5 }}>
                
                <div id="hero" ></div>
                <div className="flex-column">
                    <motion.p className="quote"initial={{opacity: 0}}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 1.5 }}>A all-in-one workspace that cares about your well-being!</motion.p>
                    <Link to="/login"><motion.button className="button" id="get-started"  whileHover={{ 
                    scale: 1.1, 
                    textShadow: "0px 0px 8px rgb(255,255,255)",
                    boxShadow: "0px 0px 8px rgb(255,255,255)",}}>Get Started</motion.button></Link>
                </div>


            </motion.div>
        </div>
    );
}

export default LandingPage;