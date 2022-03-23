import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Form,Button} from 'react-bootstrap'

class Otp extends PureComponent {

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
        return (
            <div>
            <div style={{marginBottom:'30px', color:'orange', fontSize:'20px'}}>One time password has been sent on XXXXXX{localStorage.getItem('mobile').substr(7,10)}</div>
            <div style={{width: "10%"}}>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>OTP</Form.Label>
                <Form.Control type="otp" placeholder="Enter otp" />
            </Form.Group>
            <a href="#">Resend OTP</a>

            <Button variant="primary" style={{marginTop:'9px'}} type="submit" onClick={(e)=>{
                e.preventDefault();
                this.props.history.push('/success')
            }}>
                Submit
            </Button>
            </Form>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated }
};

export default connect(mapStateToProps)(Otp);
