import React, { Component } from 'react';
import requireAuth from './requireAuth';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3>This is the dasboard page.</h3>
      </div>
    );
  }
}

export default requireAuth(Dashboard);
