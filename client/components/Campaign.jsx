import React, { useState, useEffect } from 'react';
import LocationSearchInput from './LocationSearchInput';
import Map from './Map.jsx';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class Campaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      hasSubmitted: false,
      coordinates: {}
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitInterest = this.submitInterest.bind(this);
  }
  submitInterest = e => {
    const interestSubmissionBody = {
      id: this.props.campaignId,
      lat: this.state.coordinates.lat,
      lng: this.state.coordinates.lng,
      location: this.state.address
    };
    fetch('/user/campaign/', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ interestSubmissionBody })
    })
      .then(res => res.json())
      .then(response => {
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
    console.log(this.state);
    return (
      <>
        <LocationSearchInput
          submitInterest={this.submitInterest}
          handleChange={this.handleChange}
          submitInterest={this.submitInterest}
          address={this.state.address}
        />
        <Map />
      </>
    );
  }
}

export default Campaign;
