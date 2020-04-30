import React, { Component } from 'react'

export default class Events extends Component {
    state = {
        message: "",
        events: []
    }
    componentDidMount() {
        fetch('/events', {
            headers: {
                Authorization: `Bearer ${this.props.auth.getAccessToken()}`
            }
        })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("Network response was not okay")
            })
            .then(data => this.setState({ events: data.events }))
            .catch(err => this.setState({ message: err.message }))
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.events.map((event) => <li key={event.id}>{event.title}</li>)}
                </ul>
                {this.state.error && <p>{JSON.stringify(this.state.message, null, 2)}</p>}
            </div>
        )
    }
}
