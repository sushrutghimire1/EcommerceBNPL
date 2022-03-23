import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import  { Redirect } from 'react-router-dom'
import { FormGroup, Label, Input } from "reactstrap";

class PaymentModes extends PureComponent {

    state = {
        buttonSelected: ''
      }

    clickPay(e){
       
    }
    
    render() {

        return (
            <div>
                <div style={{marginBottom:'30px'}}>
                    Payment Modes:
                </div>
            <div class="list-group" style={{marginBottom: 30, width:'40%'}}>
            <a href="#" class="list-group-item list-group-item-action active" style={{backgroundColor:'orange'}}>
            <Input type="radio" name="radio1" style={{marginLeft:'2px', marginRight:'4px'}} onClick={()=>{ this.setState({ buttonSelected: 'Cash'})}}/> 
            Cash
            </a>
            </div>
            <div class="list-group" style={{marginBottom: 30, width:'40%'}}>
            <a href="#" class="list-group-item list-group-item-action active" style={{backgroundColor:'orange'}}>
            <Input type="radio" name="radio1" style={{marginLeft:'2px', marginRight:'4px'}} onClick={()=>{ this.setState({ buttonSelected: 'UPI'})}}/> 
            UPI
            </a>
            </div>
            <div class="list-group" style={{marginBottom: 30, width:'40%'}}>
            <a href="#" class="list-group-item list-group-item-action active" style={{backgroundColor:'orange'}}>
            <Input type="radio" name="radio1" style={{marginLeft:'2px', marginRight:'4px'}} onClick={()=>{ this.setState({ buttonSelected: 'PayLater'})}}/> 
            Fiserv's Pay Later
            </a>
            </div>
             <button type="button" class="btn" style={{backgroundColor:'blue', color:'white'}}
             onClick={ (e)=>{e.preventDefault();
                    if(this.state.buttonSelected=='PayLater'){
                        this.props.history.push('/offers')
                    }
             }}>
                    Pay
            </button>
            
    </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated }
};

export default connect(mapStateToProps)(PaymentModes);
