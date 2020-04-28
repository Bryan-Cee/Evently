import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Profile from "./pages/Profile";
import Nav from "./components/Nav"
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Nav />
      <div className="App">
        <Route path="/" exact component={App} />
        <Route path="/profile" exact component={Profile} />
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
