import React, { useState } from "react";

// import external libs
import { BrowserRouter, Route, Redirect, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";

// import scss
import "./scss/screens/Router.scss";

// import actions
import { logoutSuccess } from "./redux/actions/login";

// import components
import PrivateRoute from "./components/PrivateRoute";
import LoginRegisterForm from "./components/LoginRegisterForm";
import Sidebar from "./components/Sidebar";
import ClickableList, { ListItem } from "./components/ClickableList";

// import all the screens
import Dash from "./screens/Dash";
import ScreenSwitcher from "./screens/ScreenSwitcher";

// import resources
import { MdHome, MdToday, MdPerson } from "react-icons/md";

const screens = [
  ListItem(`Dashboard`, `dash`, <MdHome />, null, null, null, {
    component: Dash
  }),
  ListItem(`Calendar`, `calendar`, <MdToday />, null, null, null, {
    component: props => <div {...props}>calendar</div>
  }),
  ListItem(`Profile`, `profile`, <MdPerson />, null, null, null, {
    component: props => <div {...props}>profile</div>
  })
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
      <div className={`routerWrapper${loggedIn ? ` loggedIn` : ``}`}>
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
                to: `/` + item.urlName + `/`,
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
        {!loggedIn && (
          <>
            <Switch>
              <Route path="/login" exact={true} />
              <Route path="/" component={props => <Redirect to={`/login`} />} />
            </Switch>
          </>
        )}
        <div className="mainScreens">
          {loggedIn && <ScreenSwitcher screens={screens} />}
        </div>
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
