import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Field, reduxForm } from 'redux-form';
import History from '../history.js';
import { post } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown' 

class Feature extends PureComponent {

    constructor(props){
        super(props);
        this.state ={
            file:null,
            selectedType: 'csv',
            source:''
          }
        this.onChange = this.onChange.bind(this)
        this.csvFileUpload = this.csvFileUpload.bind(this);
        this.jsonFileUpload = this.jsonFileUpload.bind(this);
    }

    onChange(e) {
        this.setState({file:e.target.files[0]})
      }

    handleFormSubmit(event) {
        console.log(this.state.file.name)
        console.log(this.state.source)
        this.updateSourceDescription().then((response) => {
            console.log(response.data);
        });
        if(this.state.selectedType == 'csv')
        this.onCsvFormSubmit(event);
        else if(this.state.selectedType == 'json')
        this.onJsonFormSubmit(event);
        History.push('/feature2');
    }

    onCsvFormSubmit(e){
        e.preventDefault();
        this.csvFileUpload(this.state.file).then((response)=>{
          console.log(response.data);
        })
      }

      onJsonFormSubmit(e){
        e.preventDefault();
        this.jsonFileUpload(this.state.file).then((response)=>{
          console.log(response.data);
        })
      }

      csvFileUpload(file){
        console.log(file)
        const url = 'http://localhost:8080/csv-source/upload';
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'part_content_type':'text/csv',
                Authorization: 'Bearer '+localStorage.getItem('token'),
            }
        }
        return  post(url, formData,config)
      }

      jsonFileUpload(file){
        console.log(file)
        const url = 'http://localhost:8080/json-source/upload';
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('token'),
            }
        }
        return  post(url, formData,config)
      }

      updateSourceDescription(){
        const url = 'http://localhost:8080/source';

        const config = {
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('token'),
            }
        }
        return  post(url, 
            {
            sourceName: this.state.source,
            fileType: this.state.selectedType,
            fileName: this.state.file.name
        },config);
      }

      handleSelect=(e)=>{
        this.setState({ selectedType: e })
    }

    render() {
        return (
            <div style={{ width: "50%" }}>
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <fieldset className="form-group">
                        <label>Source Name:</label>
                        <Field className="form-control" value={this.state.source} name="sourcename" 
                        onChange={(e)=>this.setState({source: e.target.value})} component="input" type="text" />
                    </fieldset>
                    <fieldset className="form-group">
                        <label>File Type:</label>
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
                        <label>File:</label><br/>
                        <input type="file" onChange={this.onChange}/>
                    </fieldset>
                    <button action="submit" className="btn btn-primary" >Next</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {};
}

export default reduxForm({
    form: 'feature'
})(connect(mapStateToProps, actions)(Feature));

