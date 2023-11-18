// src/components/MainPage.tsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import Profile from "./Profile";
import Activity from "./Activity";
import NewPost from "./NewPost"; // Import the NewPost component
import "./MainPage.css";
import Feed from "./feed";

const MainPage = () => {
  // const history = useHistory();

  // useEffect(() => {
  //   history.push("/activity");
  // }, [history]);

  return (
    <Router>
      <div className="main-page">
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/activity">Activity</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/new-post">New Post</Link>
            </li>
         <li><Link to="/feed">Feed</Link></li> {/* Add this line */}
          </ul>
        </nav>

        <div className="content-area">
          <Switch>
            <Route exact path="/main">
              <Activity />
            </Route>
            <Route path="/activity">
              <Activity />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/new-post">
              <NewPost />
            </Route>
               <Route path="/feed">
              <Feed />
            </Route>
          </Switch>
        </div>
    </Router>
  );
};

export default MainPage;
