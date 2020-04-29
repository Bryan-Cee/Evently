import React, { Component } from 'react'

export default class Public extends Component {
    state = {
        message: ""
    }
    componentDidMount() {
        fetch('/public')
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
