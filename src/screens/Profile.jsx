import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUser, updateUser } from "../redux/actions/user";
import 'styled-components/macro';


/**
 * PLANNED:
 * - show user info
 * - show user statistics ?
 * - show user event history ?
 */


class Profile extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount = async () => {
    await this.props.fetchUser('some uid');
  };

  render () {
    return (
      <div css={`padding: 20px;`}>
        <pre>{JSON.stringify(this.props.profile, null, 4)}</pre>
      </div>
    )
  }

}

export default connect(
  state => ({
    isLoading: state.user.isLoading,
    error: state.user.error,
    profile: state.user.profile
  }),
  dispatch => ({
    fetchUser: fetchUser(dispatch)
  })
)(Profile);
