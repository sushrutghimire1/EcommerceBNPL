import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Form,Button, Link} from 'react-bootstrap'
import { Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Col, Row, Input } from 'reactstrap';
import hdfc from '../icons/hdfc.png'
import kotak from '../icons/kotak.jpeg'
import aditya from '../icons/aditya.jpeg'

class Otp extends PureComponent {

    state = {
        buttonSelected: ''
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
        return (
            <div>
                 <div style={{marginBottom:'30px', color:'orange', fontSize:'20px'}}>Offers:</div>
                    <div style={{marginTop:'20px', width:'33%', float:'left'}}>
                    <Card>
                        <CardBody>
                        <img width="70px" height='70px' src={hdfc} alt="Card image cap" />
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
                        <button type="button" class="btn" style={{float:'left', borderColor:'white', marginTop:'20px', backgroundColor:'orange'}}
                        onClick={()=>{
                            this.setState({buttonSelected:'hdfc'})
                        }}
                        >
                         Select</button>
                    </Card>
                    </div>

                    <div style={{marginTop:'20px', width:'33%', float:'left'}}>
                    <Card>
                        
                        <CardBody>
                        <img width="70px" height='70px' src={kotak} alt="Card image cap" />
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
                            <button type="button" class="btn" style={{float:'left', borderColor:'white', marginTop:'20px', backgroundColor:'orange'}}
                            onClick={()=>{
                                this.setState({buttonSelected:'kotak'})
                            }}
                            >
                         Select</button>
                    </Card>
                    </div>

                    

                    <div style={{marginTop:'20px', width:'33%', float:'left'}}>
                    <Card>
                        
                        <CardBody>
                        <img width="70px" height='70px' src={aditya} alt="Card image cap" />
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
                     <button type="button" class="btn" style={{float:'left', borderColor:'white', marginTop:'20px', backgroundColor:'orange'}}
                     onClick={
                         ()=>{ this.setState({buttonSelected:'aditya'})}
                     }
                     >
                         Select</button>
                    </Card>
                    </div>

                    { this.state.buttonSelected==='hdfc' &&
                    <div style={{marginTop:'20px', width:'33%', float:'left', marginLeft:'0px'}}>
                    <Card>
                        
                        <CardBody>
                        <img width="70px" height='70px' src={hdfc} alt="Card image cap" />
                        <Row style={{marginTop:'20px'}}>
                            <Col sm="4">
                            Tenor
                            </Col>
                            <Col sm="4">
                                EMI Payable
                            </Col>
                            <Col sm="4">
                                Total Payable
                            </Col>
                            </Row>
                        <Row style={{marginTop:'20px'}}>
                            <Col sm="4">
                            <Input
                               type="radio"
                               name="radio1"
                                onChange={(e) => console.log(e.target.checked)}
                                style={{marginLeft:'20px', marginRight:'5px'}}
                                />
                                1 months
                            </Col>
                            <Col sm="4">
                                Rs. 99,990
                            </Col>
                            <Col sm="4">
                            Rs. 99,990
                            </Col>
                            </Row>
                            <Row style={{marginTop:'20px'}}>
                            <Col sm="4">
                            <Input
                                type="radio"
                                name="radio1"
                                onChange={(e) => console.log(e.target.checked)}
                                style={{marginLeft:'20px', marginRight:'5px'}}
                                />
                                3 months
                            </Col>
                            <Col sm="4">
                                Rs. 33,330
                            </Col>
                            <Col sm="4">
                                Rs. 99,990
                            </Col>
                            </Row>
                            <Row style={{marginTop:'20px'}}>
                            <Col sm="4">
                            <Input
                                type="radio"
                                name="radio1"
                                onChange={(e) => console.log(e.target.checked)}
                                style={{marginLeft:'20px', marginRight:'5px'}}
                                />
                                6 months
                            </Col>
                            <Col sm="4">
                                Rs. 16,665
                            </Col>
                            <Col sm="4">
                                Rs. 1,06,047
                            </Col>
                            </Row>
                           
                        </CardBody>
                        <button type="button" class="btn btn-success" style={{float:'left', borderColor:'white', marginTop:'20px', width:'100%'}}
                            onClick={(e)=>{e.preventDefault();
                                localStorage.setItem('offer', 'hdfc');
                                this.props.history.push('/terms')
                            }}
                            >Continue</button>
                    </Card>
                    </div>
                    }

                    { this.state.buttonSelected==='kotak' &&
                    <div style={{marginTop:'20px', width:'33%', float:'left', marginLeft:'34%'}}>
                    <Card>
                        
                        <CardBody>
                        <img width="70px" height='70px' src={kotak} alt="Card image cap" />
                        <Row style={{marginTop:'20px'}}>
                            <Col sm="4">
                            Tenor
                            </Col>
                            <Col sm="4">
                                EMI Payable
                            </Col>
                            <Col sm="4">
                                Total Payable
                            </Col>
                            </Row>
                        <Row style={{marginTop:'20px'}}>
                            <Col sm="4">
                            <Input
                               type="radio"
                               name="radio1"
                                onChange={(e) => console.log(e.target.checked)}
                                style={{marginLeft:'20px', marginRight:'5px'}}
                                />
                                1 months
                            </Col>
                            <Col sm="4">
                                Rs. 99,990
                            </Col>
                            <Col sm="4">
                            Rs. 99,990
                            </Col>
                            </Row>
                            <Row style={{marginTop:'20px'}}>
                            <Col sm="4">
                            <Input
                                type="radio"
                                name="radio1"
                                onChange={(e) => console.log(e.target.checked)}
                                style={{marginLeft:'20px', marginRight:'5px'}}
                                />
                                3 months
                            </Col>
                            <Col sm="4">
                                Rs. 33,330
                            </Col>
                            <Col sm="4">
                                Rs. 99,990
                            </Col>
                            </Row>
                            <Row style={{marginTop:'20px'}}>
                            <Col sm="4">
                            <Input
                                type="radio"
                                name="radio1"
                                onChange={(e) => console.log(e.target.checked)}
                                style={{marginLeft:'20px', marginRight:'5px'}}
                                />
                                6 months
                            </Col>
                            <Col sm="4">
                                Rs. 16,665
                            </Col>
                            <Col sm="4">
                                Rs. 1,06,047
                            </Col>
                            </Row>
                           
                        </CardBody>
                        <button type="button" class="btn btn-success" style={{float:'left', borderColor:'white', marginTop:'20px', width:'100%'}}
                            onClick={(e)=>{e.preventDefault();
                                localStorage.setItem('offer', 'kotak');
                                this.props.history.push('/terms')
                            }}
                            >Continue</button>
                    </Card>
                    </div>
                    }

                    { this.state.buttonSelected==='aditya' &&
                    <div style={{marginTop:'20px', width:'33%', float:'left', marginLeft:'66%'}}>
                    <Card>
                        
                        <CardBody>
                        <img width="70px" height='70px' src={aditya} alt="Card image cap" />
                        <Row style={{marginTop:'20px'}}>
                            <Col sm="4">
                            Tenor
                            </Col>
                            <Col sm="4">
                                EMI Payable
                            </Col>
                            <Col sm="4">
                                Total Payable
                            </Col>
                            </Row>
                        <Row style={{marginTop:'20px'}}>
                            <Col sm="4">
                            <Input
                               type="radio"
                               name="radio1"
                                onChange={(e) => console.log(e.target.checked)}
                                style={{marginLeft:'20px', marginRight:'5px'}}
                                />
                                1 months
                            </Col>
                            <Col sm="4">
                                Rs. 99,990
                            </Col>
                            <Col sm="4">
                            Rs. 99,990
                            </Col>
                            </Row>
                            <Row style={{marginTop:'20px'}}>
                            <Col sm="4">
                            <Input
                                type="radio"
                                name="radio1"
                                onChange={(e) => console.log(e.target.checked)}
                                style={{marginLeft:'20px', marginRight:'5px'}}
                                />
                                3 months
                            </Col>
                            <Col sm="4">
                                Rs. 33,330
                            </Col>
                            <Col sm="4">
                                Rs. 99,990
                            </Col>
                            </Row>
                            <Row style={{marginTop:'20px'}}>
                            <Col sm="4">
                            <Input
                                type="radio"
                                name="radio1"
                                onChange={(e) => console.log(e.target.checked)}
                                style={{marginLeft:'20px', marginRight:'5px'}}
                                />
                                6 months
                            </Col>
                            <Col sm="4">
                                Rs. 16,665
                            </Col>
                            <Col sm="4">
                                Rs. 1,06,047
                            </Col>
                            </Row>
                           
                        </CardBody>
                        <button type="button" class="btn btn-success" style={{float:'left', borderColor:'white', marginTop:'20px', width:'100%'}}
                            onClick={(e)=>{e.preventDefault();
                                localStorage.setItem('offer', 'aditya');
                                this.props.history.push('/terms')
                            }}
                            >Continue</button>
                    </Card>
                    </div>
                    }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated }
};

export default connect(mapStateToProps)(Otp);
