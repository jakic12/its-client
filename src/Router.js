import React, { useState } from "react";

// import external libs
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// import scss
import "./scss/screens/Router.scss";

// import actions
import { fetchLogout } from "./redux/actions/login";

// import components
import PrivateRoute from "./components/PrivateRoute";
import LoginRegisterForm from "./components/LoginRegisterForm";
import Sidebar from "./components/Sidebar";

// import all the screens
import Dash from "./screens/Dash";
import SpringSubmitButton from "./components/SpringSubmitButton";

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
const Router = ({ loggedIn, logout }) => {
  console.log(loggedIn);
  return (
    <BrowserRouter>
      <div className="routerWrapper">
        <Sidebar
          hide={!loggedIn}
          title={
            <>
              <div className="emptyLoginCard"></div>
              <div className={`loginForm ${loggedIn ? `` : `open`}`}>
                <LoginRegisterForm
                  compactMode={loggedIn}
                  width={loggedIn ? `300px` : undefined}
                />
              </div>
            </>
          }
          body={<div></div>}
          footer={
            <SpringSubmitButton>
              <button onClick={() => logout()}>Log out</button>
            </SpringSubmitButton>
          }
        />
        {loggedIn && (
          <Route
            path="/login"
            exact={true}
            component={props => <Redirect to="/" />}
          />
        )}
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

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(fetchLogout(dispatch));
    }
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Router);
