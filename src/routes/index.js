import React from 'react';
import { Route } from 'react-router-dom';
import App from '../components/app';
import RequireAuth from '../components/auth/require_auth';
import Signin from '../components/auth/signin';
import Signout from '../components/auth/signout';
import Signup from '../components/auth/signup';
import Items from '../components/itemsList';
import PaymentModes from '../components/paymentModes';
import MobileRegistration from '../components/payLater';
import Otp from '../components/otp';
import Offers from '../components/Offers'
import LoginActivity from '../components/loginActivityFeature'
import Successful from '../components/Successful'
import TermsAndConditions from '../components/TermsAndConditions';

const Routes = () => {
    return (
        <App>
            <Route exact path="/" component={PaymentModes} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/terms" component={TermsAndConditions} />
            <Route exact path="/source" component={PaymentModes} />
            <Route exact path="/signout" component={Signout} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/buy" component={PaymentModes} />
            <Route exact path="/mobile" component={MobileRegistration} />
            <Route exact path="/otp" component={Otp} />
            <Route exact path="/offers" component={Offers} />
            <Route exact path="/success" component={Successful} />
            <Route exact path="/items" component={Items} />
        </App>
    );
};

export default Routes;
