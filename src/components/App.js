import '../utils/styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Login from './Login';
import Nav from './Nav';
import Home from './Home';
import New from './New';
import QuestionItem from './QuestionItem';
import Leader from './Leader';

class App extends Component {
  state = {
    authedUser: null,
  }
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }
  handleSetAuthedUser = (e) => {
    this.setState({
      authedUser: e,
    })
  }
  
  render() {
    return (
      <Router>
        <Fragment>
          <div className="App">
            <Header />
            {this.state.authedUser !== null ? (
              <div className="corp">
                <Nav authedUser={this.state.authedUser} putAuthedUser={this.handleSetAuthedUser}/>
                  <Route>
                    <Route path='/login' component={Login} />
                    <Route path='/' exact component={Home} />
                    <Route path='/add' component={New} />
                    <Route path='/home' component={Home} />
                    <Route path='/question/:question_id' component={QuestionItem} />
                    <Route path='/leaderboard' component={Leader} />
                  </Route>
              </div>
            ):(
              <Login putAuthedUser={this.handleSetAuthedUser}/>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

// Header
const Header = () => {
  return (
    <header className="App-header">
      <h3>Would You Rather App!</h3>
    </header>
  );
}

export default connect()(App);