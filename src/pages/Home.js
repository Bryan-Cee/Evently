import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "../styles/Home.css"

export default class Home extends Component {
    render() {
        const { isAuthenticated, login } = this.props.auth;
        return (
            <div>
                <h2>Home</h2>
                { isAuthenticated()
                ? <Link to="profile">View Profile</Link>
                : <button onClick={login}>Login</button>
                }
                
            </div>
        )
    }
}
