import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import "../styles/Nav.css"

export default class Nav extends Component {
    render() {
        const { login, logout, isAuthenticated, userHasScopes } = this.props.auth;
        return (
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/public">Public</Link></li>
                    {isAuthenticated() && <li><Link to="/private">Private</Link></li>}
                    {isAuthenticated() && userHasScopes(['read:events']) && <li><Link to="/events">Events</Link></li>}
                    <li>
                        <button onClick={isAuthenticated() ? logout : login }>
                            {isAuthenticated() ? "Logout" : "Login"}
                        </button>
                    </li>
                </ul>
            </nav>
        )
    }
}
