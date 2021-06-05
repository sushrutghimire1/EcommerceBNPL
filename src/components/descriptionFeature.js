import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { reduxForm } from 'redux-form';
import History from '../history.js';
import { Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { Redirect } from 'react-router';
import _ from 'lodash';

class Description extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            source: '',
            target: '',
            sourceType: '',
            targetType: '',
            selectedType: 'csv',
            test: false
        }
    }


    handleFormSubmit(event) {
        event.preventDefault();
        this.props.uploadFiles(this.props.sourceDescription, this.props.targetDescription);
    }

    handleBack() {
        History.push('/target');
    }

    handleCancel() {
        History.push('/source');
    }

    handleSelect = (e) => {
        this.setState({ selectedType: e })
    }

    renderLoading() {
        if (this.props.filesUploaded === false)
            return <div style={{ color: 'green' }}>Uploading...</div>
        else if (this.props.errorOccured)
            return <div style={{ color: 'red' }}>Error occured while uploading...</div>
        else return <div></div>
    }

    render() {
        console.log(this.state)
        if (this.props.filesUploaded === true) {
            return <Redirect to='/download' />
        }
        if (_.isEmpty(this.props.sourceDescription) || _.isEmpty(this.props.targetDescription)) {
            return <Redirect to='/source' />
        } else {
            return (
                <div style={{ width: "50%" }}>
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                        <div style={{ float: 'left', paddingRight: '20px', width: '50%' }}>
                            <Table hover bordered>
                                <thead style={{ backgroundColor: '#ADD8E6' }}>
                                    <tr>
                                        <th colSpan="2">Source:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Name:</td>
                                        <td>{this.props.sourceDescription.source}</td>
                                    </tr>
                                    <tr>
                                        <td>Type:</td>
                                        <td>{this.props.sourceDescription.sourceSelectedType}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div>
                        </div>
                        <div style={{ float: 'left', width: '50%' }}>
                            <Table hover bordered>
                                <thead style={{ backgroundColor: '#FFC0CB' }}>
                                    <tr>
                                        <th colSpan="2">Target:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Name:</td>
                                        <td>{this.props.targetDescription.target}</td>
                                    </tr>
                                    <tr>
                                        <td>Type:</td>
                                        <td>{this.props.targetDescription.targetSelectedType}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div style={{ clear: 'both' }}>
                            <fieldset className="form-group">
                                <label>Result File Format:</label><br></br>
                                <DropdownButton
                                    variant='success'
                                    alignRight
                                    title={this.state.selectedType}
                                    id="dropdown-menu-align-right"
                                    onSelect={this.handleSelect}>
                                    <Dropdown.Item eventKey="csv">CSV</Dropdown.Item>
                                    <Dropdown.Item eventKey="json">JSON</Dropdown.Item>
                                </DropdownButton>
                            </fieldset>
                        </div>
                        <button className="btn" onClick={this.handleCancel.bind(this)}>Cancel</button>
                        <button className="btn" onClick={this.handleBack.bind(this)}>Back</button>
                        <button action="submit" className="btn btn-primary" >Compare</button>
                        {this.renderLoading()}
                    </form>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        targetDescription: state.targetDesc.target,
        sourceDescription: state.sourceDesc.source,
        filesUploaded: state.filesUpload.filesUpdated,
        errorOccured: state.filesUpload.fileError
    }
}



export default reduxForm({
    form: 'feature'
})(connect(mapStateToProps, actions)(Description));

