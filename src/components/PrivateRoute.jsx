import React from "react";

// external libs
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  isLoggedIn,
  redirectTo,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectTo || "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn
  };
};

export default connect(mapStateToProps)(PrivateRoute);
