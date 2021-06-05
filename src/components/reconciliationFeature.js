import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { reduxForm } from 'redux-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Tab, AppBar } from '@material-ui/core';
import { Link } from 'react-router-dom';

var _ = require('lodash/core');

class Reconciliation extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            value: "1",
        }
    }

    componentWillMount() {
        this.props.fetchReconciliationFeature();
    }


    renderLoginRow(array1) {
        if (_.isEmpty(array1)) {
            return (<tr><th colSpan="5">No results found</th></tr>)
        }
        else {
            if (array1 != undefined) {
                var i = 1;
                const array2 = array1.map(element => {
                    if (element.action == 'LOGIN') {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td>{i++}</td>
                                    <td>{element.action}</td>
                                    <td>{element.timestamp.substring(0, 19)}</td>
                                </tr>
                            </tbody>
                        );
                    }
                });
                return array2;
            }
        }

    }
    onCompareViewClick(id){
        this.props.updateFileId(id);
    }

    renderCompareRow(array1) {
        if (_.isEmpty(array1)) {
            return (<tr><th colSpan="5">No results found</th></tr>)
        }
        else {
            if (array1 != undefined) {
                var i = 1;
                const array2 = array1.map(element => {
                    if (element.action == 'COMPARE') {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td>{i++}</td>
                                    <td>{element.action}</td>
                                    <td>{element.timestamp.substring(0, 19)}</td>
                                    <td>
                                    <Link to="/download" onClick={this.onCompareViewClick(element.id)}>View</Link>
                                    </td>
                                </tr>
                            </tbody>
                        );
                    }
                });
                return array2;
            }
        }

    }

    renderLoginTable() {
        return (
            <Table hover bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Action</th>
                        <th>Time Stamp</th>
                    </tr>
                </thead>
                {this.renderLoginRow(this.props.reconciliations.reconciliation)}
            </Table >);
    }

    renderCompareTable() {
        return (
            <Table hover bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Action</th>
                        <th>Time Stamp</th>
                    </tr>
                </thead>
                {this.renderCompareRow(this.props.reconciliations.reconciliation)}
            </Table >);
    }

    

    toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

    render() {
        return (
            <div>
                <TabContext value={this.state.value}>
                    <AppBar position="static" style={{ width: '43%' }}>
                        <TabList aria-label="simple tabs example">
                            <Tab label="Login Activity" value="1" onClick={() => this.setState({ value: "1" })} />
                            <Tab label="Compare History" value="2" onClick={() => this.setState({ value: "2" })} />
                        </TabList>
                    </AppBar>
                    <TabPanel value="1">
                        {this.renderLoginTable()}
                    </TabPanel>
                    <TabPanel value="2">{this.renderCompareTable()}</TabPanel>
                </TabContext>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { reconciliations: state.reconciliation }
}

export default connect(mapStateToProps, actions)(Reconciliation);

