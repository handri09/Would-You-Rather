import { resetAuthedUserAction } from '../actions/authUser';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';

class Nav extends Component {  
  state = {
    authedUser: null
  }

  handleClick = e => {
    this.props.dispatch(resetAuthedUserAction());
    this.props.putAuthedUser(null);
    this.setState({
      authedUser: null
    })
  }

  render() {
    const { authedUser, users } = this.props
    
    if (authedUser === null ) {
      return (<Redirect to='/login' />);
    }

    return (
      <nav className="nav">
      <ul>
      <li>
      <NavLink to='/home' exact activeClassName='active'>
      Home
      </NavLink>
      </li>
      <li>
      <NavLink to='/add' exact activeClassName='active'>
      New
      </NavLink>
      </li>
      <li>
      <NavLink to='/leaderboard' exact activeClassName='active'>
      LeaderBoard
      </NavLink>
      </li>
      <li>
      Hello, {users[authedUser].name}
  </li>
<li>
<NavLink to='/' exact activeClassName='active'>
<Button size="small" variant="outlined" onClick={this.handleClick}>Log Off</Button>
</NavLink>
</li>
</ul>
</nav>
    );
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    users,
    authedUser,
  };
}

export default connect(mapStateToProps)(Nav);