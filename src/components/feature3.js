import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Field, reduxForm } from 'redux-form';
import History from '../history.js';
import { Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown' 

class Feature3 extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            source:'',
            target:'',
            sourceType:'',
            targetType:'',
            selectedType:'csv'
        }
    }

    componentWillMount() {
        this.props.fetchDescriptionFeature();
    }

    getSafe(fn, defaultVal) {
        try {
          return fn();
        } catch (e) {
          return defaultVal;
        }
      }



    handleFormSubmit() {
        History.push('/feature4');
    }

    handleBack() {
        History.push('/feature2');
    }

    handleCancel() {
        History.push('/feature');
    }

    handleSelect=(e)=>{
        this.setState({ selectedType: e })
    }

    render() {
        return (
            <div style={{ width: "50%" }}>
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <div style={{float:'left', paddingRight:'20px',width:'50%'}}>
                    <Table hover bordered>
                        <thead style={{backgroundColor: '#ADD8E6'}}>
                            <tr>
                                <th colSpan="2">Source:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{this.getSafe(() => this.props.feature.description.sourceName)}</td>
                            </tr>
                            <tr>
                                <td>Type:</td>
                                <td>{this.getSafe(() => this.props.feature.description.sourceFileType)}</td>
                            </tr>
                        </tbody>
                    </Table>
                    </div>
                    <div>
                    </div>
                    <div style={{float:'left', width:'50%'}}>
                    <Table hover bordered>
                        <thead style={{backgroundColor: '#FFC0CB'}}>
                            <tr>
                                <th colSpan="2">Target:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{this.getSafe(() => this.props.feature.description.targetName)}</td>
                            </tr>
                            <tr>
                                <td>Type:</td>
                                <td>{this.getSafe(() => this.props.feature.description.targetFileType)}</td>
                            </tr>
                        </tbody>
                    </Table>
                    </div>
                    <div style={{clear: 'both'}}>
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
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { feature: state.descriptions }
}

export default reduxForm({
    form: 'feature'
})(connect(mapStateToProps, actions)(Feature3));

