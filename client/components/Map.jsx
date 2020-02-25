import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MarkerClusterer from '@google/markerclusterer';

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultLocation: {},
      markers: [],
      zoom: 10
    };
    this.loadMapData = this.loadMapData.bind(this);
  }
  loadMapData(defaultLocation) {
    fetch(`/user/campaign/${this.props.campaignId}`)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        const campaignData = response.locationData.map(el => {
          return {
            lat: Number(el.lat),
            lng: Number(el.lng)
          };
        });
        this.setState({
          defaultLocation: defaultLocation,
          markers: campaignData
        });
      })
      .catch(err => {
        console.log('error', err);
      });
  }
  componentDidMount() {
    const script = document.createElement('script');
    script.src =
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js';
    script.async = true;
    document.body.appendChild(script);
    let defaultLocation;
    fetch(`http://ip-api.com/json/`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        defaultLocation = {
          lat: data.lat,
          lng: data.lon
        };
        this.loadMapData(defaultLocation);
      });
  }

  setGoogleMapRef(map, maps) {
    this.googleMapRef = map;
    this.googleRef = maps;
    let markers =
      this.state.markers &&
      this.state.markers.map(location => {
        return new this.googleRef.Marker({ position: location });
      });
    let markerCluster = new MarkerClusterer(map, markers, {
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      gridSize: 10,
      minimumClusterSize: 2
    });
  }

  createMapOptions(maps) {
    return {};
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_G_KEY }}
          center={this.state.defaultLocation}
          defaultZoom={this.state.zoom}
          options={this.createMapOptions}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.setGoogleMapRef(map, maps)}
        />
      </div>
    );
  }
}

export default GoogleMap;
