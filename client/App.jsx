/* eslint-disable no-param-reassign */
/* eslint-disable react/no-access-state-in-setstate */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import Campaign from './components/Campaign';
import CreateCampaign from './components/CreateCampaign';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      endpoint: '',
    };

    this.updateId = this.updateId.bind(this);
  }

  updateId(artistId) {
    this.setState({ id: artistId });
  }

  render() {
    return (
      <div className="router">
        <main>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route
              exact
              path="/login"
              render={props => <Login {...props} updateState={this.updateId} />}
            />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/campaign" component={Campaign} />
            <Route exact path="/createcampaign" component={CreateCampaign} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
