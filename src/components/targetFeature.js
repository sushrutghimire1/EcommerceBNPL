import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import History from '../history.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Redirect } from 'react-router';
import * as actions from '../actions';
import _ from 'lodash';

class Target extends PureComponent {

    constructor(props) {
        super(props);
        if (!_.isEmpty(this.props.targetDescription)) {
            this.state = {
                file: this.props.targetDescription.targetFile,
                selectedType: this.props.targetDescription.targetSelectedType,
                target: this.props.targetDescription.target,
                showError: false
            }
        } else {
            this.state = {
                file: null,
                selectedType: 'csv',
                target: '',
                showError: false
            }
        }
        this.onChange = this.onChange.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        if (this.state.file != undefined && this.state.target !== '') {
            var targetObject = {
                target: this.state.target,
                targetSelectedType: this.state.selectedType,
                targetFileName: this.state.file.name,
                targetFile: this.state.file
            }
            this.props.updateTargetDescription(targetObject);

            History.push('/description');
        } else {
            this.setState({ showError: true });
        }
    }

    handlePrevious() {
        History.push('/source');
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }

    handleSelect = (e) => {
        this.setState({ selectedType: e })
    }

    showErrors() {
        if (this.state.showError) {
            return <p style={{ color: 'red' }}>Please input all fields..</p>
        }
    }



    render() {
        if (_.isEmpty(this.props.sourceDescription)) {
            return <Redirect to='/source' />
        } else {
            return (
                <div style={{ width: "50%" }}>
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                        <fieldset className="form-group">
                            <label>Target Name:</label><br />
                            <input type="text" value={this.state.target}
                                onChange={(e) => this.setState({ target: e.target.value })} /></fieldset>
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
                            {this.state.file && <div style={{ color: 'green' }}>{this.state.file.name} Uploaded</div>}
                            <input type="file" onChange={this.onChange} />
                        </fieldset>
                        {this.showErrors()}
                        <button className="btn" onClick={this.handlePrevious.bind(this)}>Previous</button>
                        <button action="submit" className="btn btn-primary" >Next</button>
                    </form>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        targetDescription: state.targetDesc.target,
        sourceDescription: state.sourceDesc.source
    };
}


export default reduxForm({
    form: 'feature'
})(connect(mapStateToProps, actions)(Target));

