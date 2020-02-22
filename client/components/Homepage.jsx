/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CreateCampaign from './CreateCampaign.jsx';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='homepage'>
        <h1>Homepage</h1>
        <CreateCampaign />
      </div>
    );
  }
}

export default Homepage;
