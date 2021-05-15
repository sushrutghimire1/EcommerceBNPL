import React from 'react';
import { Route } from 'react-router-dom';
import App from '../components/app';
import RequireAuth from '../components/auth/require_auth';
import Signin from '../components/auth/signin';
import Signout from '../components/auth/signout';
import Signup from '../components/auth/signup';
import Feature from '../components/feature';
import Feature2 from '../components/feature2';
import Feature3 from '../components/feature3';
import Feature4 from '../components/feature4';

const Routes = () => {
    return (
        <App>
            <Route exact path="/" component={Signin} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signout" component={Signout} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/feature" component={RequireAuth(Feature)} />
            <Route exact path="/feature2" component={RequireAuth(Feature2)} />
            <Route exact path="/feature3" component={RequireAuth(Feature3)} />
            <Route exact path="/feature4" component={RequireAuth(Feature4)} />
        </App>
    );
};

export default Routes;
