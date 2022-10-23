import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUserAction } from '../actions/authUser';

class Login extends Component {
  state = {
    choosedUser:'',
  }
  
  handleChange = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      ...prevState,
      authedUser: e.target.value,
    }));
    this.props.dispatch(setAuthedUserAction(e.target.value));
    this.props.putAuthedUser(e.target.value);
  };
  
  render() {
    const { usersIds, users} = this.props;
    
    return (
      <div>
        <h3>Login</h3>
        <p>Selecting User</p>
        <select value={this.state.authedUser} onChange={ this.handleChange }>
          <option value="None">Select User</option>
          {usersIds.map( id => (
            <option key={id} value={id}>{users[id].name}</option>
          ))}
        </select>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  const usersIds = Object.keys(users);
  return {
    usersIds,
    users,
    authedUser
  };
}

export default connect(mapStateToProps)(Login);