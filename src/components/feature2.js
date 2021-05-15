import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Field, reduxForm } from 'redux-form';
import History from '../history.js';
import { post } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

class Feature2 extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            selectedType: 'csv',
            target:''
        }
        this.onChange = this.onChange.bind(this)
        this.csvFileUpload = this.csvFileUpload.bind(this);
        this.jsonFileUpload = this.jsonFileUpload.bind(this);
    }

    csvFileUpload(file) {
        console.log(file)
        const url = 'http://localhost:8080/csv-target/upload';
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'part_content_type': 'text/csv',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }
        return post(url, formData, config)
    }

    jsonFileUpload(file) {
        console.log(file)
        const url = 'http://localhost:8080/json-target/upload';
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }
        return post(url, formData, config)
    }

    onCsvFormSubmit(e) {
        e.preventDefault() // Stop form submit
        this.csvFileUpload(this.state.file).then((response) => {
            console.log(response.data);
        })
    }

    onJsonFormSubmit(e) {
        e.preventDefault() // Stop form submit
        this.jsonFileUpload(this.state.file).then((response) => {
            console.log(response.data);
        })
    }

    handleFormSubmit(event) {
        this.updateTargetDescription()
        if(this.state.selectedType == 'csv')
        this.onCsvFormSubmit(event);
        else if(this.state.selectedType == 'json')
        this.onJsonFormSubmit(event);
        setTimeout(() => {  console.log("World!"); }, 1000);
        History.push('/feature3');
    }

    handlePrevious() {
        History.push('/feature');
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }
    
    handleSelect=(e)=>{
        this.setState({ selectedType: e })
    }

    updateTargetDescription(){
        const url = 'http://localhost:8080/target';

        const config = {
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('token'),
            }
        }
        return  post(url, 
            {
            sourceName: this.state.target,
            fileType: this.state.selectedType,
            fileName: this.state.file.name
        },config);
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
})(connect(mapStateToProps, actions)(Feature2));

