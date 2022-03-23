import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Form,Button, Link} from 'react-bootstrap'
import { Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Col, Row, Input } from 'reactstrap';
import hdfc from '../icons/hdfc.png'
import kotak from '../icons/kotak.jpeg'
import aditya from '../icons/aditya.jpeg'

class Successful extends PureComponent {

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
            <div style={{color:'green'}}>
                    The payment is sucessful! 
            </div>
            <div style={{color:'orange'}}>
                    We've sent a confirmation message on your mobile XXXXXX{localStorage.getItem('mobile').substr(7,10)}
            </div>
            <div style={{marginTop:'20px', width:'45%'}}>
                    <Card>
                        <CardBody>
                        { localStorage.getItem('offer')==='hdfc' &&
                        <img width="70px" height='70px' src={hdfc} alt="Card image cap" />
                        }
                        { localStorage.getItem('offer')==='kotak' &&
                        <img width="70px" height='70px' src={kotak} alt="Card image cap" />
                        }
                        { localStorage.getItem('offer')==='aditya' &&
                        <img width="70px" height='70px' src={aditya} alt="Card image cap" />
                        }
                        <Row style={{marginTop:'20px'}}>
                            <Col sm="4">
                                <Card body>
                                <CardTitle>Monthly EMI</CardTitle>
                                <CardText>Rs. 33,330</CardText>
                                </Card>
                            </Col>
                            <Col sm="4">
                                <Card body>
                                <CardTitle>Loan Amount</CardTitle>
                                <CardText>Rs. 99,990</CardText>
                                </Card>
                            </Col>
                            <Col sm="4">
                                <Card body>
                                <CardTitle>Total Cost</CardTitle>
                                <CardText>Rs. 99,990</CardText>
                                </Card>
                            </Col>
                            </Row>
                           
                        </CardBody>
                    </Card>
                    </div>
                    <Button variant="primary" style={{marginTop:'9px'}} type="Return" onClick={(e)=>{
                e.preventDefault();
                this.props.history.push('/items')
            }}>
                Return
            </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated }
};

export default connect(mapStateToProps)(Successful);
