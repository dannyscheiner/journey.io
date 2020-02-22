/* eslint-disable no-param-reassign */
/* eslint-disable react/no-access-state-in-setstate */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from './components/Homepage.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import CreateCampaign from './components/CreateCampaign.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      endpoint: ''
    };

    this.updateId = this.updateId.bind(this);
  }

  updateId(artistId) {
    this.setState({ id: artistId });
  }

  render() {
    return (
      <div className='router'>
        <main>
          <Switch>
            <Route exact path='/' component={CreateCampaign} />
            <Route exact path='/login' component={Login} />} />
            <Route exact path='/createcampaign' component={CreateCampaign} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
