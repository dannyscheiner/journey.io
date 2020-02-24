import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MarkerClusterer from '@google/markerclusterer';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const location = {
  lat: 34.0522,
  lng: -118.244
};
const locationArray = [];

for (let i = 0; i < 10; i++) {
  if (i === 0) {
    locationArray.push({ lat: location.lat + 0.01, lng: location.lng + 0.01 });
  } else {
    locationArray.push({
      lat: locationArray[i - 1].lat + 0.01,
      lng: locationArray[i - 1].lng + 0.01
    });
  }
}

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultLocation: {},
      zoom: 10
    };
  }
  componentDidMount() {
    const script = document.createElement('script');
    script.src =
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js';
    script.async = true;
    document.body.appendChild(script);
    fetch(`http://ip-api.com/json/`)
      .then(res => res.json())
      .then(data => {
        const defaultLocation = {
          lat: data.lat,
          lng: data.lon
        };
        this.setState({ defaultLocation: defaultLocation });
      });
  }

  setGoogleMapRef(map, maps) {
    this.googleMapRef = map;
    this.googleRef = maps;
    let markers =
      locationArray &&
      locationArray.map(location => {
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
      <div style={{ height: '70vh', width: '70%' }}>
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
