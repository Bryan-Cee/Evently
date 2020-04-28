import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import "../styles/Nav.css"

export default class Nav extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><Link to="/" exact>Home</Link></li>
                    <li><Link to="/profile" exact>Profile</Link></li>
                </ul>
            </nav>
        )
    }
}
