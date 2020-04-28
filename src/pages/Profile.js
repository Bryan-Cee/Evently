import React, { Component } from 'react'

export default class Profile extends Component {
    state = {
        profile: null,
        error: ""
    }

    componentDidMount() {
        this.loadProfileData();
    }

    loadProfileData = () => {
        this.props.auth.getProfile((profile, error) => this.setState({ profile, error }))
    }

    render() {
        const { profile } = this.state;
        if(!profile) return null;
        return (
            <div>
                <h2>Profile</h2>
                <div>
                    <p>{profile.nickname}</p>
                    <img
                        style={{ maxHeight: 50, maxWidth: 50 }}
                        src={profile.picture}
                        alt="profile pic"
                    />
                </div>
                <pre>{JSON.stringify(profile, null, 2)}</pre>
            </div>
        )
    }
}
