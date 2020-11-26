import React, {useState} from 'react';
// import { useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

// Import custom styles for our application
import './css/style.css';

//import Auth from './services/Auth';

// Import pages
import LoginPage from "./components/auth/LoginPage";
import LandingPage from './components/home/LandingPage';
import ProjectPage from "./components/projects/ProjectPage";
import UserPage from "./components/user/UserPage";
import ProjectBoard from './components/projects/ProjectBoard';
import CreateTaskCard from './components/tasks/CreateTaskCard';
import Auth from './services/Auth';
//import RegisterForm from './components/auth/RegisterForm';
//import LoginForm from './components/auth/LoginForm';

function App() {

    const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());
    Auth.bindLoggedInStateSetter(setLoggedIn);

    // eslint-disable-next-line no-unused-vars
    const [query, setQuery] = useState("");
  
  const loggedInRouter = (
            <Router>
                {/* <Navbar onLogout={() => Auth.logout()} /> */}

                <div className="">
                    <Switch>
                        <Route path="/projects">
                            <ProjectPage/>
                        </Route>

                        <Route path="/users">
                            <UserPage/>
                        </Route>

                        <Route path="/ProjectBoard">
                            <ProjectBoard/>
                        </Route>

                        <Route path="/tasks">
                          <CreateTaskCard/>
                        </Route> 

                    </Switch>
                </div>
            </Router>
  );

  const notLoggedIn = (
      <Router>
          <Switch>
              <Route exact path = "/">
                <LandingPage/>
              </Route>
              <Route path = "/login">
                  <LoginPage/>
              </Route>
          </Switch>
      </Router>
  )

  return (loggedIn ? loggedInRouter : notLoggedIn);
}

export default App;
