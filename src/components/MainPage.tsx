// src/components/MainPage.tsx
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Profile from "./Profile";
import Activity from "./Activity";
import NewPost from "./NewPost"; // Import the NewPost component

const MainPage = () => {
  return (
    <Router>
      <div className="main-page">
        <nav>
          <ul>
            <li>
              <Link to="/activity">Activity</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/new-post">New Post</Link> {/* Add this line */}
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/activity">
            <Activity />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/new-post">
            <NewPost /> {/* Add this line */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default MainPage;
