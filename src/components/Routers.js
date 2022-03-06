import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import Profile from "./routes/Profile";

function Routers({ refreshUser, isLoggedIn, userObject }) {
  return (
    <Router>
      {isLoggedIn && <Navigation userObject={userObject} />}
      <Switch>
        <>
          {isLoggedIn ? (
            <div
              style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Route exact path="/">
                <Home userObject={userObject} />
              </Route>
              <Route exact path="/profile">
                <Profile refreshUser={refreshUser} userObject={userObject} />
              </Route>
            </div>
          ) : (
            <>
              <Route exact path="/">
                <Auth />
              </Route>
            </>
          )}
        </>
      </Switch>
    </Router>
  );
}

export default Routers;
