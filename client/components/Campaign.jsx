import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import LocationSearchInput from './LocationSearchInput';
import Map from './Map.jsx';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faSpotify,
  faYoutube,
  faSoundcloud,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

class Campaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      hasSubmitted: false,
      coordinates: {},
      campaignLinks: {},
      updateMap: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitInterest = this.submitInterest.bind(this);
  }
  componentDidMount() {
    fetch(`/user/campaign/${this.props.campaignId}`)
      .then(res => res.json())
      .then(response => {
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
    const getId = url => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    };
    const videoUrl = this.state.campaignLinks.video || '';
    const videoId = getId(videoUrl);
    const campaignDisplay =
      Object.keys(this.state.campaignLinks).length > 0 ? (
        <div>
          <iframe
            width="290"
            height="200"
            src={`http://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
          />
          <br />
          <br />
          <div className="d-flex flex-row">
            <a
              className="socialMediaLink"
              href={this.state.campaignLinks.spotify}
            >
              <FontAwesomeIcon
                style={{ width: '2vw', height: '2vw' }}
                icon={faSpotify}
              />
            </a>
            <br />
            <a
              className="socialMediaLink"
              href={this.state.campaignLinks.instagram}
            >
              <FontAwesomeIcon
                style={{ width: '2vw', height: '2vw' }}
                icon={faInstagram}
              />
            </a>
            <br />
            <a
              className="socialMediaLink"
              href={this.state.campaignLinks.facebook}
            >
              <FontAwesomeIcon
                style={{ width: '2vw', height: '2vw' }}
                icon={faFacebook}
              />
            </a>
            <br />
            <a
              className="socialMediaLink"
              href={this.state.campaignLinks.soundcloud}
            >
              <FontAwesomeIcon
                style={{ width: '2vw', height: '2vw' }}
                icon={faSoundcloud}
              />
            </a>
            <br />
            <a
              className="socialMediaLink"
              href={this.state.campaignLinks.twitter}
            >
              <FontAwesomeIcon
                style={{ width: '2vw', height: '2vw' }}
                icon={faTwitter}
              />
            </a>
            <br />
            <a
              className="socialMediaLink"
              href={this.state.campaignLinks.youtube}
            >
              <FontAwesomeIcon
                style={{ width: '2vw', height: '2vw' }}
                icon={faYoutube}
              />
            </a>
            <br />
            <br />
          </div>
          {this.state.campaignLinks.bio}
          <br />
          <br />
        </div>
      ) : (
        <div></div>
      );
    return (
      <div className="d-flex mx-auto">
        <Card
          style={{ width: '60em' }}
          className="mx-auto justify-content-center shadow p-3 mb-5 bg-white rounded row justify-content-center align-self-center"
        >
          <Card.Title>
            <h2>
              Let {this.props.artistName} know that you want to see them in your
              city!
            </h2>
          </Card.Title>
          <div className="row">
            <div className="col-8">
              <Map campaignId={this.props.campaignId} />
            </div>
            <div className="col-4">
              {campaignDisplay}
              <LocationSearchInput
                handleChange={this.handleChange}
                handleSelect={this.handleSelect}
                submitInterest={this.submitInterest}
                address={this.state.address}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default Campaign;
