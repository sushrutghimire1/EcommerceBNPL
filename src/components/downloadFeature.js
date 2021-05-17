import React, { PureComponent } from 'react';
import { CSVLink } from "react-csv";
import { connect } from 'react-redux';
import * as actions from '../actions';
import { reduxForm } from 'redux-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import History from '../history.js';
import { Tab, AppBar } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Table, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

var _ = require('lodash/core');

class Download extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            value: "1",
            selectedType: "Download",
            dropdownOpen: false,
            headers: [
                { label: 'Transaction Id', key: 'transactionId' },
                { label: 'Amount', key: 'amount' },
                { label: 'Currency', key: 'currency' },
                { label: 'Value Date', key: 'valueDate' },],
            data: []
        }
    }

    handleCancel() {
        History.push('/source');
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

    downloadCsv() {
        if (this.state.value == "1") {
            if (this.props.match.match != undefined) {
                this.setState({ data: this.props.match.match })
                return <CSVLink data={this.state.data} headers={this.state.headers} filename={"Match-Result.csv"}>CSV</CSVLink>;
            }
        }
        else if (this.state.value == "2") {
            if (this.props.mismatch.mismatch != undefined) {
                this.setState({ data: this.props.mismatch.mismatch })
                return <CSVLink data={this.state.data} headers={this.state.headers} filename={"Mismatch-Result.csv"}>CSV</CSVLink>;
            }
        }
        else if (this.state.value == "3") {
            if (this.props.missing.missing != undefined) {
                this.setState({ data: this.props.missing.missing })
                return <CSVLink data={this.state.data} headers={this.state.headers} filename={"Missing-Result.csv"}>CSV</CSVLink>;
            }
        }
    }

    downloadJson() {
        if (this.state.value == "1") {
            if (this.props.match.match != undefined) {
                var match = this.props.match.match.map((element)=>{
                    delete element.username;
                    return element;
                })
                return (<a
                    href={`data:text/json;charset=utf-8,${encodeURIComponent(
                        JSON.stringify(match)
                    )}`}
                    download="Match-Result.json">
                    JSON
                </a>);
            }
        }
        else if (this.state.value == "2") {
            if (this.props.mismatch.mismatch != undefined) {
                var mismatch = this.props.mismatch.mismatch.map((element)=>{
                    delete element.username;
                    return element;
                })
                return (<a
                    href={`data:text/json;charset=utf-8,${encodeURIComponent(
                        JSON.stringify(mismatch)
                    )}`}
                    download="Mismatch-Result.json">
                    JSON
                </a>);
                }
        }
        else if (this.state.value == "3") {
            if (this.props.missing.missing != undefined) {
                var missing = this.props.missing.missing.map((element)=>{
                    delete element.username;
                    return element;
                })
                return (<a
                    href={`data:text/json;charset=utf-8,${encodeURIComponent(
                        JSON.stringify(missing)
                    )}`}
                    download="Missing-Result.json">
                    JSON
                </a>);
                }
        }
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

    toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

    render() {
        return (
            <div>
                <form>

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
                            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret>
                                    Download
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>{this.downloadCsv()}</DropdownItem>
                                    <DropdownItem>{this.downloadJson()}</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
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
})(connect(mapStateToProps, actions)(Download));

