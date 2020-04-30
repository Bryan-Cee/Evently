import React, { Component } from 'react';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Nav from './components/Nav';
import Auth from './Auth';
import Callback from './pages/Callback';
import Public from './pages/Public';
import Private from './pages/Private';
import Events from './pages/Events';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import AuthContext from './components/AuthContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
      tokenRenewalComplete: false
    }
  }

  componentDidMount() {
    this.state.auth.renewToken(() => this.setState({ tokenRenewalComplete: true }))
  }

  render() {
    const { auth } = this.state;
    if (!this.state.tokenRenewalComplete) return "Loading...";
    return (
      <AuthContext.Provider value={auth}>
        <Nav auth={auth} />
        <div className="App">
          <PublicRoute path="/" exact component={Home} />
          <PublicRoute path="/callback" component={Callback} />
          <PublicRoute path="/public" component={Public} />
          <PrivateRoute path="/private" component={Private} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/events" component={Events} scopes={["read:events"]} />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
