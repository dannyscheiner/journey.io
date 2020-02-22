/* eslint-disable no-param-reassign */
/* eslint-disable react/no-access-state-in-setstate */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from './components/Homepage.jsx';

// import './stylesheets/styles.css';

const App = props => {
  return (
    <div className="router">
      <main>
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
