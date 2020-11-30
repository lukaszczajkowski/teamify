import React, { useState } from 'react';
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


// testing login
import LoginPageTest from "./components/auth_test/LoginPageTest";
import RegisterPageTest from "./components/auth_test/RegisterPageTest";

function App() {

    const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());
    Auth.bindLoggedInStateSetter(setLoggedIn);

    // eslint-disable-next-line no-unused-vars
    const [query, setQuery] = useState("");

    const loggedInRouter = (
        <Router>
            {/* <Navbar onLogout={() => Auth.logout()} /> */}
                <Switch>

                <Route exact path="/login">
                    <LoginPage />
                </Route>
                    
                    
                    

                    <Route exact path="/users">
                        <UserPage />
                    </Route>
                </Switch>
        </Router>
    );

    const notLoggedIn = (
        <Router>
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                


                <Route exact path="/login/test">
                    <LoginPageTest />
                </Route>
                <Route exact path="/register/test">
                    <RegisterPageTest />
                </Route>

                <Route exact path="/projects">
                    <ProjectPage />
                </Route>

                <Route exact path="/users">
                    <UserPage />
                </Route>

            </Switch>
        </Router>
    )

    return loggedIn ? loggedInRouter : notLoggedIn;
}

export default App;
