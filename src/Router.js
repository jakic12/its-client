import React, { useState } from "react";

// import external libs
import { BrowserRouter, Route, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

// import scss
import "./scss/screens/Router.scss";

// import actions
import { logoutSuccess } from "./redux/actions/login";

// import components
import PrivateRoute from "./components/PrivateRoute";
import LoginRegisterForm from "./components/LoginRegisterForm";
import Sidebar from "./components/Sidebar";

// import all the screens
import Dash from "./screens/Dash";
import ClickableList, { ListItem } from "./components/ClickableList";

// import resources
import { MdHome, MdToday, MdPerson } from "react-icons/md";

const screens = [
  ListItem(`Dashboard`, `dash`, <MdHome />),
  ListItem(`Calendar`, `calendar`, <MdToday />),
  ListItem(`Profile`, `profile`, <MdPerson />)
];

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
  const screen = window.location.pathname.match(/[/]?([^/]*)(\/|$)/)[1];
  console.log(screen);
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
          body={
            <ClickableList
              routerMode={true}
              items={screens}
              ItemComponent={Link}
              mapItemPropToComponent={item => ({
                to: `/` + item.urlName,
                style: { textDecoration: `none` }
              })}
            />
          }
          footer={
            <div className="logoutButtonWrapper">
              <button onClick={() => logout()} className="logoutButton">
                Log out
              </button>
            </div>
          }
        />
        {loggedIn && (
          <>
            <Route
              path="/login"
              exact={true}
              component={props => <Redirect to="/" />}
            />
            <Route
              path="/"
              exact={true}
              component={props => <Redirect to={`/${screens[0].urlName}`} />}
            />
          </>
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
      dispatch(logoutSuccess());
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
