import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Form,Button} from 'react-bootstrap'

class MobileRegistration extends PureComponent {

    state = {
        mobile: ''
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

    handleUserInput (e) {
        const value = e.target.value;
        this.setState({mobile: value});
      }

    render() {
        return (
            <div>
            <div style={{marginBottom:'30px', color:'orange', fontSize:'20px'}}>Fiserv's Pay Later</div>
            <div style={{width: "50%"}}>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="mobile" placeholder="Enter mobile" onChange={(event) => this.handleUserInput(event)}/>
                <Form.Text className="text-muted">
                We'll never share your mobile number with anyone else.
                </Form.Text>
            </Form.Group>
            { this.state.mobile.length==10 &&
            <Button variant="primary" type="submit" onClick={(e)=>{
                e.preventDefault();
                localStorage.setItem('mobile', this.state.mobile);
                this.props.history.push('/otp')
            }}>
                Submit
            </Button>
            }
            </Form>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated }
};

export default connect(mapStateToProps)(MobileRegistration);
