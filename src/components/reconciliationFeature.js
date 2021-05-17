import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { reduxForm } from 'redux-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';

var _ = require('lodash/core');

class Reconciliation extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        this.props.fetchReconciliationFeature();
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
                                <td>{element.action}</td>
                                <td>{element.timestamp.substring(0,19)}</td>
                            </tr>
                        </tbody>
                    );
                });
                return array2;
            }
        }

    }

    renderTable() {
        return (
            <Table hover bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Action</th>
                        <th>Time Stamp</th>
                    </tr>
                </thead>
                {this.renderRow(this.props.reconciliations.reconciliation)}
            </Table >
        );
    }

    toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

    render() {
        console.log()
        return (
            <div>
                {this.renderTable()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { reconciliations: state.reconciliation }
}

export default connect(mapStateToProps, actions)(Reconciliation);

