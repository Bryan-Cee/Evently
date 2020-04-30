import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthContext from './AuthContext';

export default function PublicRoute({ component: Component, ...rest }) {
    return (
        <AuthContext.Consumer>
            {auth => (
                <Route
                    {...rest}
                    render={props => {
                        return <Component auth={auth} {...props} />;
                    }}
                />
            )}
        </AuthContext.Consumer>
    )
}

PublicRoute.propTypes = {
    component: PropTypes.func.isRequired,
}