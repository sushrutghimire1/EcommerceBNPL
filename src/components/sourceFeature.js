import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Field, reduxForm } from 'redux-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import History from '../history.js';

class Source extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            selectedType: 'csv',
            source: null,
            showError: false
        }
        this.onChange = this.onChange.bind(this)
        this.showErrors = this.showErrors.bind(this)
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }

    handleFormSubmit(event) {
        event.preventDefault();
        if (this.state.file !== null && this.state.source !==null) {
            console.log('came here')
            History.push('/target');
            this.props.updateSourceDescription(this.state.source, this.state.selectedType, this.state.file.name);
            if (this.state.selectedType == 'csv')
                this.props.uploadSourceCSV(this.state.file);
            else if (this.state.selectedType == 'json')
                this.props.uploadSourceJson(this.state.file);
        } else {
            this.setState({ showError: true });
        }
    }

    showErrors() {
        if (this.state.showError) {
            return <p style={{ color: 'red' }}>Please input all fields..</p>
        }
        else {
            return <div></div>
        }
    }

    handleSelect = (e) => {
        this.setState({ selectedType: e })
    }

    render() {
        return (
            <div style={{ width: "50%" }}>
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <fieldset className="form-group">
                        <label>Source Name:</label>
                        <Field className="form-control" value={this.state.source} name="sourcename"
                            onChange={(e) => this.setState({ source: e.target.value })} component="input" type="text" />
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
                        <label>File:</label><br />
                        <input type="file" onChange={this.onChange} />
                    </fieldset>
                    {this.showErrors()}
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
})(connect(mapStateToProps, actions)(Source));

