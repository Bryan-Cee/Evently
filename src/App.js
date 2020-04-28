import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Nav from './components/Nav';
import Auth from './Auth';
import Callback from './pages/Callback';

class App extends Component{
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history)
  }
  
  render(){
    return (
      <div>
        <Nav auth={this.auth} />
        <div className="App">
          <Route path="/" exact render={props => <Home auth={this.auth} {...props} />} />
          <Route path="/callback" render={props => <Callback auth={this.auth} {...props} />} />
          <Route path="/profile" render={
            props => this.auth.isAuthenticated()
              ? <Profile auth={this.auth} {...props} />
              : <Redirect to="/" />
            }
          />
        </div>
      </div>
    );
  }
}

export default App;
