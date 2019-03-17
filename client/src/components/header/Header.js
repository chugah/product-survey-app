import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './HeaderStyle.css';

class Header extends Component {
  renderLinks() {
      if(this.props.authenticated) {
        return (
          <div>
            <Link to="/surveys">Dashboard</Link>
            <Link to="/surveys/new">New Survey</Link>
            <Link to="/signout">Sign Out</Link>
          </div>
        );
      } else {
          return (
            <div>
              <Link to="/signup">Sign Up</Link>
              <Link to="/signin">Sign In</Link>
              <a href="/auth/google">Google Login</a>
              <a href="/auth/linkedin">Linkedin Login</a>
            </div>
          )
      }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper header">
            <Link to="/">Home</Link>
            {this.renderLinks()}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
