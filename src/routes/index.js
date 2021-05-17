import React from 'react';
import { Route } from 'react-router-dom';
import App from '../components/app';
import RequireAuth from '../components/auth/require_auth';
import Signin from '../components/auth/signin';
import Signout from '../components/auth/signout';
import Signup from '../components/auth/signup';
import Source from '../components/sourceFeature';
import Target from '../components/targetFeature';
import Description from '../components/descriptionFeature';
import Download from '../components/downloadFeature';
import Reconciliation from '../components/reconciliationFeature'

const Routes = () => {
    return (
        <App>
            <Route exact path="/" component={Signin} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signout" component={Signout} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/source" component={RequireAuth(Source)} />
            <Route exact path="/target" component={RequireAuth(Target)} />
            <Route exact path="/description" component={RequireAuth(Description)} />
            <Route exact path="/download" component={RequireAuth(Download)} />
            <Route exact path="/reconciliation" component={RequireAuth(Reconciliation)} />
        </App>
    );
};

export default Routes;
