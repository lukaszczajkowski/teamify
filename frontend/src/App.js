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
import HomePage from './components/home/HomePage';
import ProjectPage from "./components/projects/ProjectPage";
import UserPage from "./components/user/UserPage";

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

                        <Route path="/">
                          <HomePage/>
                        </Route>
                    </Switch>
                </div>
            </Router>
  );

  return (loggedIn ? loggedInRouter : <LoginPage/>);
}

export default App;
