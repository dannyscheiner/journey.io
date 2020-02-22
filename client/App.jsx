/* eslint-disable no-param-reassign */
/* eslint-disable react/no-access-state-in-setstate */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// import CompName from './components/taskLists.jsx';

import './stylesheets/styles.css';

const App = props => {
  return (
    <div className="router">
      <main>
        <Switch>
          <Route
            exact
            path="/"
            component={CompName}
          />
      </main>
    </div>
  );
}

export default App;