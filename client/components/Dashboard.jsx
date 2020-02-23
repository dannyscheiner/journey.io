import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Jumbotron } from 'react-bootstrap';

import ActiveCard from './ActiveCard';
import InactiveCard from './InactiveCard';
import EditCampaign from './EditCampaign';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedCampaigns: false,
      campaigns: [],
      currentCampaign: '',
      showEditModal: false
    };
    this.assignCurrentCampaign = this.assignCurrentCampaign.bind(this);
  }
  assignCurrentCampaign(id) {
    this.setState({ currentCampaign: id, showEditModal: true });
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
    console.log(this.state.showEditModal, this.state.currentCampaign);
    const cards = campaigns.map((campaign, i) => {
      if (campaign.active) {
        return (
          <ActiveCard
            key={campaign.id}
            id={campaign.id}
            name={campaign.name}
            onClick={this.assignCurrentCampaign}
          />
        );
      } else {
        return (
          <InactiveCard
            key={campaign.id}
            id={campaign.id}
            name={campaign.name}
            onClick={this.assignCurrentCampaign}
          />
        );
      }
    });

    return (
      <div className="dashboard">
        <Jumbotron fluid>
          <h1>My Dashboard</h1>
        </Jumbotron>
        <div className="d-flex row">{cards}</div>
      </div>
    );
  }
}

export default Dashboard;
