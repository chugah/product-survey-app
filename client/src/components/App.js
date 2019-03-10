import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './header/Header';
import Landing from './Landing';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Signout from './auth/Signout';
import Dashboard from './Dashboard';

const App = ({ children }) => {
  return(
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Landing} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signout" component={Signout} />
          {children}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
