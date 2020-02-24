import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import LocationSearchInput from './LocationSearchInput';
import Map from './Map.jsx';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class Campaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      hasSubmitted: false,
      coordinates: {},
      campaignLinks: {}
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitInterest = this.submitInterest.bind(this);
  }
  componentDidMount() {
    fetch(`/user/campaign/${this.props.campaignId}`)
      .then(res => res.json())
      .then(response => {
        console.log(response.data);
        this.setState({ campaignLinks: response.data });
      })
      .catch(err => {
        console.log('error', err);
      });
  }
  submitInterest = e => {
    if (this.state.hasSubmitted) {
      return;
    }
    const interestSubmissionBody = {
      campaignId: this.props.campaignId,
      lat: this.state.coordinates.lat,
      lng: this.state.coordinates.lng,
      location: this.state.address
    };
    fetch('/user/campaign/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(interestSubmissionBody)
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        this.setState({ hasSubmitted: true });
        console.log('Success submitting interest');
      })
      .catch(err => {
        console.log('Error submitting interest', err);
      });
  };
  handleChange = address => {
    this.setState({ address });
  };
  handleSelect = address => {
    // Pull in the setFormLocation function from the parent ReportForm
    let city;
    geocodeByAddress(address)
      .then(results => {
        // Set the location in the parent ReportFrom
        city = results[0].formatted_address;
        return getLatLng(results[0]);
      })
      .then(coordinates => {
        this.setState({
          address: city,
          coordinates: Object.assign({}, coordinates)
        });
      })
      .catch(error => console.error('Error', error));
  };
  render() {
    console.log('state', this.state);
    return (
      <div className="d-flex mx-auto">
        <Card style={{ width: '50em' }} className="justify-content-center">
          Let {this.props.artistName} know that you want to see them in your
          city!
          <LocationSearchInput
            handleChange={this.handleChange}
            handleSelect={this.handleSelect}
            submitInterest={this.submitInterest}
            address={this.state.address}
          />
          <Map campaignId={this.props.campaignId} />
        </Card>
      </div>
    );
  }
}

export default Campaign;
