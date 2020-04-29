import React, { Component } from 'react'

export default class Private extends Component {
    state = {
        message: ""
    }
    componentDidMount() {
        fetch('/private', {
            headers: {
                Authorization: `Bearer ${this.props.auth.getAccessToken()}`
            }
        })
        .then(res => {
            if(res.ok) return res.json();
            throw new Error("Network response was not okay")
        })
        .then(data => this.setState({ message: data.message }))
        .catch(err => this.setState({ message: err.message }))
    }
    render() {
        return (
            <div>
                <p>{this.state.message}</p>
            </div>
        )
    }
}
