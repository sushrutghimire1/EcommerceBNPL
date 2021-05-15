import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Field, reduxForm } from 'redux-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import History from '../history.js';
import { Tab, AppBar } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Table } from 'reactstrap';
var _ = require('lodash/core');

class Feature4 extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: "1",
            selectedType: "Download"
        }
    }

    handleFormSubmit() {

    }

    handleCancel() {
        History.push('/feature');
    }

    componentWillMount() {
        this.props.fetchMismatch();
        this.props.fetchMissing();
        this.props.fetchMatch();
    }


    getSafe(fn) {
        try {
            return fn();
        } catch (e) {
            return;
        }
    }

    renderRow(array1) {
        console.log(array1);
        if (_.isEmpty(array1)) {
            return (<tr><th colSpan="5">No results found</th></tr>)
        }
        else {
            if (array1 != undefined) {
                var i = 1;
                const array2 = array1.map(element => {
                    return (
                        <tbody key={i}>
                            <tr>
                                <td>{i++}</td>
                                <td>{element.transactionId}</td>
                                <td>{element.amount}</td>
                                <td>{element.currency}</td>
                                <td>{element.valueDate}</td>
                            </tr>
                        </tbody>
                    );
                });
                return array2;
            }
        }

    }

    renderSpecificTab() {
        if (this.state.value == "1")
            return this.renderRow(this.props.match.match)
        else if (this.state.value == "2")
            return this.renderRow(this.props.mismatch.mismatch)
        else if (this.state.value == "3")
            return this.renderRow(this.props.missing.missing)
    }


    renderTable() {
        return (
            <Table hover bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Transaction Id</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Value Date</th>
                    </tr>
                </thead>
                {this.renderSpecificTab()}
            </Table >
        );
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit.bind(this)}>

                    <TabContext value={this.state.value}>
                        <AppBar position="static" style={{ width: '43%' }}>
                            <TabList aria-label="simple tabs example">
                                <Tab label="Match" value="1" onClick={() => this.setState({ value: "1" })} />
                                <Tab label="Mismatch" value="2" onClick={() => this.setState({ value: "2" })} />
                                <Tab label="Missing" value="3" onClick={() => this.setState({ value: "3" })} />
                            </TabList>
                        </AppBar>
                        <TabPanel value="1">
                            {this.renderTable()}
                        </TabPanel>
                        <TabPanel value="2">{this.renderTable()}</TabPanel>
                        <TabPanel value="3">{this.renderTable()}</TabPanel>
                    </TabContext>

                    <div style={{ marginTop: '30px', position: 'static', float: 'right' }}>
                        <button className="btn" onClick={this.handleCancel.bind(this)} style={{ backgroundColor: '#D3D3D3', marginRight: '5px' }}>Handle New Files</button>
                        <div style={{ float: 'right' }}>
                            <DropdownButton
                                variant='success'
                                alignRight
                                title={this.state.selectedType}
                                id="dropdown-menu-align-right"
                                onSelect={this.handleSelect}

                            >
                                <Dropdown.Item eventKey="csv" action="submit">CSV</Dropdown.Item>
                                <Dropdown.Item eventKey="json" action="submit">JSON</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { match: state.match, mismatch: state.mismatch, missing: state.missing }
}

export default reduxForm({
    form: 'feature'
})(connect(mapStateToProps, actions)(Feature4));

