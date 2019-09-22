import React, { Component, useState } from "react";

//import contexts
import { UserContext } from "../contexts/Contexts";

//import external libs
import Cookies from "universal-cookie";

const cookies = new Cookies();

/**
 * @author Jakob
 * This component must exist as a child of the UserContext
 */
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: this.getWithCookie("accessToken"),
      userData: this.getWithCookie("userData")
    };

    this.getWithCookie = this.getWithCookie.bind(this);
    this.setWithCookie = this.setWithCookie.bind(this);
  }

  getWithCookie(property) {
    return cookies.get(property);
  }

  setWithCookie(property, value) {
    cookies.set(property, value);
    this.setState({ [property]: value });
  }

  render() {
    if (!this.state.accessToken) {
      return (
        <LoginForm
          onData={(username, password) => {
            this.setWithCookie(
              "accessToken",
              this.fetchAccessToken(username, password)
            );
          }}
        />
      );
    }

    if (!this.state.userData) {
      this.setWithCookie(
        "userData",
        this.fetchUserData(this.state.accessToken)
      );
    }

    if (this.state.accessToken || this.state.userData)
      this.context.setAccessTokenAndUserData(
        this.state.accessToken,
        this.state.userData
      );

    return <div>An error has ocurred</div>;
  }

  /**
   * Calls the api and returns the user data
   * @param {*} accessToken the access token to call the api with
   */
  fetchUserData(accessToken) {
    return { name: `accessToken: ${accessToken}` }; // TODO: connect api to fetchUserData
  }

  /**
   * Authenticate the user, and return the access token
   * @param {String} username
   * @param {String} password
   */
  fetchAccessToken(username, password) {
    return username + password; // TODO: connect api to fetchAccessToken
  }
}

/**
 * Callback for the loginForm
 *
 * @callback userCredsCallback
 * @param {String} username
 * @param {String} password
 */

/**
 * Login form, returns back the data that the user has inputted
 * @param {userCredsCallback} onData
 */
function LoginForm({onData}) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log(username, password);
          onData(username, password);
        }}
      >
        username:{" "}
        <input type="text" onChange={e => setUsername(e.target.value)} />
        password:{" "}
        <input type="text" onChange={e => setPassword(e.target.value)} />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
Login.contextType = UserContext;

export default Login;
