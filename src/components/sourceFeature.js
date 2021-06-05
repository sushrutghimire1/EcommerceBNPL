import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import History from '../history.js';
import * as actions from '../actions';
import _ from 'lodash';

class Source extends PureComponent {

    constructor(props) {
        super(props);
        if (!_.isEmpty(this.props.sourceDescription)) {
            console.log(this.props.sourceDescription)
            this.state = {
                file: this.props.sourceDescription.sourceFile,
                selectedType: this.props.sourceDescription.sourceSelectedType,
                source: this.props.sourceDescription.source,
                showError: false
            }
        } else {
            this.state = {
                file: null,
                selectedType: 'csv',
                source: '',
                showError: false
            }
        }
        this.onChange = this.onChange.bind(this)
        this.showErrors = this.showErrors.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }

    handleFormSubmit(event) {
        event.preventDefault();
        console.log(this.state)
        if (this.state.file && this.state.source) {
            var sourceObject = {
                source: this.state.source,
                sourceSelectedType: this.state.selectedType,
                sourceFileName: this.state.file.name,
                sourceFile: this.state.file
            }
            this.props.updateSourceDescription(sourceObject);
            History.push('/target');
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
                        <label>Source Name:</label><br />
                        <input type="text" value={this.state.source}
                            onChange={(e) => this.setState({ source: e.target.value })} />
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
                        {this.state.file && <div style={{ color: 'green' }}>{this.state.file.name} Uploaded</div>}
                        <input type="file" onChange={this.onChange} />
                    </fieldset>
                    {this.showErrors()}
                    <button action="submit" className="btn btn-primary" >Next</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sourceDescription: state.sourceDesc.source
    };
}

export default reduxForm({
    form: 'feature'
})(connect(mapStateToProps, actions)(Source));

