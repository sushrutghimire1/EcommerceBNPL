import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Form,Button} from 'react-bootstrap'
import {Input} from 'reactstrap'

class TermsAndConditions extends PureComponent {

    state={
        selected: false
    }

    render() {
        return (
            <div>
            <div style={{marginBottom:'30px', color:'orange', fontSize:'20px'}}>
                
            <Input
                type="checkbox"
                onChange={(e) => this.setState({selected:e.target.checked})}
                />&nbsp;&nbsp;&nbsp;I agree to <u>Terms and Conditions</u></div>
            <div style={{width: "50%"}}>
            
            {this.state.selected &&
            <Button variant="primary" type="submit" onClick={(e)=>{
                e.preventDefault();
                this.props.history.push('/mobile')
            }}>
                Continue
            </Button>
            }
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated }
};

export default connect(mapStateToProps)(TermsAndConditions);
