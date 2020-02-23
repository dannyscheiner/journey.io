import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Jumbotron } from 'react-bootstrap';

import ActiveCard from './ActiveCard';
import InactiveCard from './InactiveCard';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedCampaigns: false,
      campaigns: [],
    };
  }

  componentDidMount() {
    fetch('/artist/dashboard/' + this.props.artistId)
      .then(data => data.json())
      .then(res => {
        this.setState({ campaigns: res.campaigns });
      })
      .catch(err => {
        console.log('Error retrieving campaigns: ', err);
      });
  }

  render() {
    const { campaigns } = this.state;
    const cards = campaigns.map((campaign, i) => {
      if (campaign.active) {
        return <ActiveCard key={i} name={campaign.name} />;
      } else {
        return <InactiveCard key={i} name={campaign.name} />;
      }
    });

    return (
      <div className="dashboard">
        <Jumbotron fluid>
          <h1>My Dashboard</h1>
        </Jumbotron>
        <div>{cards}</div>
      </div>
    );
  }
}

export default Dashboard;
