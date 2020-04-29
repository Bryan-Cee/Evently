import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Nav from './components/Nav';
import Auth from './Auth';
import Callback from './pages/Callback';
import Public from './pages/Public';
import Private from './pages/Private';
import Events from './pages/Events';

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history)
  }

  render() {
    return (
      <div>
        <Nav auth={this.auth} />
        <div className="App">
          <Route path="/" exact render={props => <Home auth={this.auth} {...props} />} />
          <Route path="/callback" render={props => <Callback auth={this.auth} {...props} />} />
          <Route path="/public" component={Public} />
          <Route path="/private" render={
            props => this.auth.isAuthenticated()
              ? <Private auth={this.auth} {...props} />
              : this.auth.login()
          }
          />
          <Route path="/profile" render={
            props => this.auth.isAuthenticated()
              ? <Profile auth={this.auth} {...props} />
              : <Redirect to="/" />
          }
          />
          <Route path="/events" render={
            props => this.auth.isAuthenticated() && this.auth.userHasScopes(['read:events'])
              ? <Events auth={this.auth} {...props} />
              : <Redirect to="/" />
          }
          />
        </div>
      </div>
    );
  }
}

export default App;
