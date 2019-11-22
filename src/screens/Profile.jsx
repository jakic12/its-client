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
    this.state = {
      email: '',
      website: '',
      interests: []
    }
  }

  componentDidMount = async () => {
    await this.props.fetchUser(this.props.uid);
  };

  update = async (field, value) => {
    let user = this.props.profile;
    user[field] = value;
    await this.props.updateUser(this.props.uid, user);
  };

  render () {
    if (!this.props.profile || this.props.isLoading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }
    return (
      <Container>
        <Header>
          <Avatar src={this.props.profile.avatar} alt="User avatar"/>
          <UserDescription>
            <h3>{this.props.profile.username}</h3>
          </UserDescription>
        </Header>
        <Body>
          <DataField
            name="Gender"
            value={this.props.profile.gender}
          />
          <DataField
            name="Created"
            value={this.props.profile.createdDate}
          />
          <DataField
            name="Birth Date"
            value={this.props.profile.birthDate}
          />
          <DataField
            name="Email"
            value={this.props.profile.email}
            onValueChange={email => this.update('email', email)}
            enableEdit={true}
          />
          <DataField
            name="Website"
            value={this.props.profile.website}
            onValueChange={website => this.update('website', website)}
            enableEdit={true}
          />
          <DataField
            name="Interests"
            value={this.props.profile.interests.toString()}
            onValueChange={interests => this.update('interests', interests.split(','))}
            enableEdit={true}
            displayLine={false}
          />
        </Body>
      </Container>
    )
  }

}

export default connect(
  state => ({
    isLoading: state.user.isLoading,
    error: state.user.error,
    uid: state.user.uid,
    profile: state.user.profile
  }),
  dispatch => ({
    fetchUser: fetchUser(dispatch),
    updateUser: updateUser(dispatch)
  })
)(Profile);
