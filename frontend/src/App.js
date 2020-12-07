import React, { useState, useEffect } from 'react';
//import { RecoilRoot } from 'recoil';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

// Import custom styles for our application
import './css/style.css';

// Import pages
import LoginPage from "./components/auth/LoginPage";
import LandingPage from './components/home/LandingPage';
import ProjectPage from "./components/projects/ProjectPage";
import UserPage from "./components/user/UserPage";
import Auth from './services/Auth';
import Calendar from './components/calendar/Calendar'
import UserApi from './api/UserApi';

import Navbar from "./components/layout/Navbar";
import ChatClient from './components/chat/ChatClient';
import UserContext from './UserContext';


function App() {

    const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());
    Auth.bindLoggedInStateSetter(setLoggedIn);

    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() => {
        if (loggedIn) {
            UserApi.getCurrentUser().then(response => setLoggedInUser(response.data));
        }
    }, []);


    const loggedInRouter = (
        <UserContext.Provider value={loggedInUser}>
            <Router>
            <Switch>
                <Route exact path= "/users/me">
                    <UserPage />
                </Route>
                
                <Route path='/projects/:projectId'>
                    <ProjectPage loggedInUser={loggedInUser}/>
                </Route>

                <Route exact path="/calendar">
                    <Calendar />
                </Route>

                <Route exact path="/chat">
                    <ChatClient />
                </Route>
                <Route exact path="/">
                    <LandingPage />
                </Route>
            </Switch>
        </Router>
        </UserContext.Provider>
        
    );

    const notLoggedIn = (
        <Router>
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route exact path="/login">
                    <LoginPage />
                </Route>

                <Route exact path="/projects/:projectId">
                    <ProjectPage />
                </Route>

                <Route exact path="/users">
                    <UserPage />
                </Route>


                <Route exact path="/calendar">
                    <Calendar />
                </Route>
                <Route exact path="/chat">
                    <ChatClient />
                </Route>

            </Switch>
        </Router>
    )

    return (loggedIn ? loggedInRouter : notLoggedIn);
}

export default App;
