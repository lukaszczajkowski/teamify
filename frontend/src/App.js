import React, { useState, useEffect } from 'react';
//import { RecoilRoot } from 'recoil';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { RecoilRoot } from 'recoil';

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

export const AppContext = React.createContext();
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
        <RecoilRoot>
        <Router>
            
            <Navbar onLogout={() => Auth.logout()} />
            <Switch>
                <Route exact path= "/users/me">
                    <UserPage loggedInUser={loggedInUser} />
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
        </RecoilRoot>
        
    );

    const notLoggedIn = (
        <RecoilRoot>
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
                {/* <Route exact path="/chat">
                    <ChatClient />
                </Route> */}

            </Switch>
        </Router>
        </RecoilRoot>
    )

    return (loggedIn ? loggedInRouter : notLoggedIn);
}

export default App;
