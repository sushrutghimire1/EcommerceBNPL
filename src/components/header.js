import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends PureComponent {

    renderHome() {
        if (this.props.authenticated) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/source">Upload</Link>
                </li>
            );
        }
    }

    renderLinks() {
        if (this.props.authenticated) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/signout">Sign Out</Link>
                </li>
            );
        } else {
            return [
                <li className="nav-item" key="signin">
                    <Link className="nav-link" to="/signin">Sign In</Link>
                </li>
            ];
        }
    }

    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                <Link to="/" className="navbar-brand">My Assignment</Link>

                <ul className="navbar-nav">
                    {this.renderHome()}
                    <li className="nav-item">
                        <Link className="nav-link" to="/reconciliation">Reconciliation</Link>
                    </li>
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated }
};

export default connect(mapStateToProps)(Header);
