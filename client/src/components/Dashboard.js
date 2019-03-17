import React, { Component } from 'react';
import requireAuth from './requireAuth';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3>This is the dashboard page.</h3>
      </div>
    );
  }
}

export default requireAuth(Dashboard);
