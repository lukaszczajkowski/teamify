import React from 'react';
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
import RegisterForm from './components/auth/RegisterForm';

function App() {
//   const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());
//   Auth.bindLoggedInStateSetter(setLoggedIn);
const loggedIn = true;
  
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

                        <Route path="/">
                          <LandingPage/>
                        </Route> 

                        <Route path = "/authenticate">
                            <LoginPage/>
                        </Route>

                        <Route path = "/register">
                            <RegisterForm/>
                        </Route>

                        <Route path="/tasks">
                          <CreateTaskCard/>
                        </Route> 

                    </Switch>
                </div>
            </Router>
  );

  return (loggedIn ? loggedInRouter : <LoginPage/>);
}

export default App;
