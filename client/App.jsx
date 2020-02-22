/* eslint-disable no-param-reassign */
/* eslint-disable react/no-access-state-in-setstate */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from './components/Homepage.jsx';
import Login from './components/Login.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: '',
    };
  }
  render() {
    return (
      <div className="router">
        <main>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
