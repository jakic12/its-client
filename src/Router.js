import React, { useState } from "react";

// import external libs
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// import scss
import "./scss/screens/Router.scss";

// import components
import PrivateRoute from "./components/PrivateRoute";
import LoginRegisterForm from "./components/LoginRegisterForm";

// import all the screens
import Dash from "./screens/Dash";

//import Login from './screens/Login'; // test import

/**
 * Top level Components that joins together the sidebar and all other screens
 * ========= ROUTER ==========
 * |== SIDE == == screens ===|
 * |         | |             |
 * |         | |             |
 * |         | |             |
 * ===========================
 */
const Router = ({ loggedIn }) => {
  console.log(loggedIn);

  return (
    <BrowserRouter>
      <div className="routerWrapper">
        <div className="loginForm">
          <LoginRegisterForm compactMode={!loggedIn} />
          {loggedIn && (
            <Route path="/login" exact={true} component={
              props => <Redirect to="/"/>
            }/>
          )}
        </div>
        <PrivateRoute path={"/"} exact={true} component={Dash} />
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.login.loggedIn
  };
};

function consoleHeader() {
  console.log(
    `%c   /$$   /$$  /$$$$$$  /$$    /$$ /$$$$$$$$       /$$$$$$$$ /$$   /$$ /$$   /$$
  | $$  | $$ /$$__  $$| $$   | $$| $$_____/      | $$_____/| $$  | $$| $$$ | $$
  | $$  | $$| $$  \\ $$| $$   | $$| $$            | $$      | $$  | $$| $$$$| $$
  | $$$$$$$$| $$$$$$$$|  $$ / $$/| $$$$$         | $$$$$   | $$  | $$| $$ $$ $$
  | $$__  $$| $$__  $$ \\  $$ $$/ | $$__/         | $$__/   | $$  | $$| $$  $$$$
  | $$  | $$| $$  | $$  \\  $$$/  | $$            | $$      | $$  | $$| $$\\  $$$
  | $$  | $$| $$  | $$   \\  $/   | $$$$$$$$      | $$      |  $$$$$$/| $$ \\  $$
  |__/  |__/|__/  |__/    \\_/    |________/      |__/       \\______/ |__/  \\__/
                                                                               `,
    "color: cyan"
  );
}

export default connect(mapStateToProps)(Router);
