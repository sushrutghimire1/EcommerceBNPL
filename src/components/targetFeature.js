import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Field, reduxForm } from 'redux-form';
import History from '../history.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

class Target extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            selectedType: 'csv',
            target:''
        }
        this.onChange = this.onChange.bind(this);
    }

    handleFormSubmit(event) {
        
        this.props.updateTargetDescription(this.state.target, this.state.selectedType,this.state.file.name);
        if(this.state.selectedType == 'csv')
        this.props.uploadTargetCSV(this.state.file);
        else if(this.state.selectedType == 'json')
        this.props.uploadTargetJson(this.state.file);
        setTimeout(function() {
            
         }, 1000000);
        History.push('/description');
    }

    handlePrevious() {
        History.push('/source');
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }
    
    handleSelect=(e)=>{
        this.setState({ selectedType: e })
    }

  

    render() {
        return (
            <div style={{ width: "50%" }}>
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <fieldset className="form-group">
                        <label>Target Name:</label>
                        <Field className="form-control" name="targetname" value={this.state.target}
                        onChange={(e)=>this.setState({target: e.target.value})} component="input" type="text" />
                    </fieldset>
                    <fieldset className="form-group">
                        <label>File Type:</label><br></br>
                        <DropdownButton
                            variant='success'
                            alignRight
                            title={this.state.selectedType}
                            id="dropdown-menu-align-right"
                            onSelect={this.handleSelect}

                        >
                            <Dropdown.Item eventKey="csv">CSV</Dropdown.Item>
                            <Dropdown.Item eventKey="json">JSON</Dropdown.Item>
                        </DropdownButton>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>File:</label><br />
                        <input type="file" onChange={this.onChange} />
                    </fieldset>
                    <button className="btn" onClick={this.handlePrevious.bind(this)}>Previous</button>
                    <button action="submit" className="btn btn-primary" >Next</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}; 
}

export default reduxForm({
    form: 'feature'
})(connect(mapStateToProps, actions)(Target));

