import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signin extends PureComponent {

    handleFormSubmit({ username, password }) {
        this.props.signinUser({ username, password })
    }

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <string>Oops! {this.props.errorMessage}</string>
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div style={{width: "50%"}}>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Username:</label>
                    <Field className="form-control" name="username" component="input" type="text" />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <Field className="form-control" name="password" component="input" type="password" />
                </fieldset>
                {this.renderError()}
                <button action="submit" className="btn btn-primary">Login</button>
            </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { errorMessage: state.auth.error }
};

export default reduxForm({
    form: 'signin'
})(connect(mapStateToProps, actions)(Signin));
