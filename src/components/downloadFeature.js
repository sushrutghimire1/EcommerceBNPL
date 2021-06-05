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
        this.props.resetFileDescriptions();
        this.props.resetSourceDescriptions();
        this.props.resetTargetDescriptions();
        History.push('/source');
    }

    componentDidMount() {
        this.props.fetchResult(this.props.id);
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

    renderSpecificTab(resultFiles) {
        if (this.state.value == "1")
            return this.renderRow(resultFiles.matching)
        else if (this.state.value == "2")
            return this.renderRow(resultFiles.mismatching)
        else if (this.state.value == "3")
            return this.renderRow(resultFiles.missing)
    }

    downloadCsv(resultFiles) {
        if (this.state.value == "1") {
            if (resultFiles.matching != undefined) {
                this.setState({ data: resultFiles.matching })
                return <CSVLink data={this.state.data} headers={this.state.headers} filename={"Match-Result.csv"}>CSV</CSVLink>;
            }
        }
        else if (this.state.value == "2") {
            if (resultFiles.mismatching != undefined) {
                this.setState({ data: resultFiles.mismatching })
                return <CSVLink data={this.state.data} headers={this.state.headers} filename={"Mismatch-Result.csv"}>CSV</CSVLink>;
            }
        }
        else if (this.state.value == "3") {
            if (this.props.resultFiles.missing != undefined) {
                this.setState({ data: resultFiles.missing })
                return <CSVLink data={this.state.data} headers={this.state.headers} filename={"Missing-Result.csv"}>CSV</CSVLink>;
            }
        }
    }

    downloadJson(resultFiles) {
        if (this.state.value == "1") {
            if (resultFiles.matching != undefined) {
                var match = resultFiles.matching.map((element) => {
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
            if (resultFiles.mismatching != undefined) {
                var mismatch = resultFiles.mismatching.map((element) => {
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
            if (resultFiles.missing != undefined) {
                var missing = resultFiles.missing.map((element) => {
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


    renderTable(resultFiles) {
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
                {this.renderSpecificTab(resultFiles)}
            </Table >
        );
    }

    toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

    render() {
        return (
            <div>
                <form>

                    <TabContext value={this.state.value}>
                        <AppBar position="static" style={{ width: '100%' }}>
                            <TabList aria-label="simple tabs example">
                                <Tab label="Match" value="1" onClick={() => this.setState({ value: "1" })} />
                                <Tab label="Mismatch" value="2" onClick={() => this.setState({ value: "2" })} />
                                <Tab label="Missing" value="3" onClick={() => this.setState({ value: "3" })} />
                            </TabList>
                        </AppBar>
                        <TabPanel value="1">
                            {this.renderTable(this.props.resultFiles)}
                        </TabPanel>
                        <TabPanel value="2">{this.renderTable(this.props.resultFiles)}</TabPanel>
                        <TabPanel value="3">{this.renderTable(this.props.resultFiles)}</TabPanel>
                    </TabContext>



                    <div style={{ marginTop: '30px', position: 'static', float: 'right' }}>
                        <button className="btn" onClick={this.handleCancel.bind(this)} style={{ backgroundColor: '#D3D3D3', marginRight: '5px' }}>Handle New Files</button>
                        <div style={{ float: 'right' }}>
                            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret>
                                    Download
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>{this.downloadCsv(this.props.resultFiles)}</DropdownItem>
                                    <DropdownItem>{this.downloadJson(this.props.resultFiles)}</DropdownItem>
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
    return {
        id: state.filesUpload.id,
        resultFiles: state.resultFiles
    }
}

export default reduxForm({
    form: 'feature'
})(connect(mapStateToProps, actions)(Download));

