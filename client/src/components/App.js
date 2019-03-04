import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';
import Signup from './auth/Signup';
import Dashboard from './Dashboard';

const App = ({ children }) => {
  return(
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Landing} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          {children}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
