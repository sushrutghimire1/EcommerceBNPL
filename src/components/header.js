import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends PureComponent {

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
                    <li className="nav-item">
                    <Link className="nav-link" to="/reconciliation">Profile</Link>
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
