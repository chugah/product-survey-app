import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './header/Header';
import Landing from './Landing';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Signout from './auth/Signout';
import Dashboard from './Dashboard';
import SurveyNew from './SurveyNew';

class App extends Component {
  componentDidMount() {
      this.props.fetchUser();
  }

  render() {
    return(
      <div className="container-fluid">
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={Landing} />
            <Route path="/surveys" exact component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/signout" component={Signout} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
