import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Map from './Map.jsx';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      hasSubmitted: false,
      coordinates: {}
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  submitInterest = e => {
    console.log(this.state.address);
  };

  handleChange = address => {
    this.setState({ address });
  };

  // When the user selects an autocomplete suggestion...
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
    const renderInput = ({
      getInputProps,
      getSuggestionItemProps,
      suggestions
    }) => (
      <div className="autocomplete-root">
        <input className="form-control" id="cityForm" {...getInputProps()} />
        <div className="autocomplete-dropdown-container">
          {suggestions.map(suggestion => (
            <div {...getSuggestionItemProps(suggestion)} className="suggestion">
              <span>{suggestion.description}</span>
            </div>
          ))}
        </div>
        <Button onClick={this.submitInterest}>Count me in!</Button>
      </div>
    );

    // Limit the suggestions to show only cities in the US
    const searchOptions = {
      types: ['(cities)'],
      componentRestrictions: { country: 'us' }
    };

    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        // Pass the search options prop
        searchOptions={searchOptions}
      >
        {renderInput}
      </PlacesAutocomplete>
    );
  }
}

const Campaign = props => {
  console.log(props.artistId);
  console.log(props.campaignId);
  const [campaignData, updateCampaignData] = useState({});
  useEffect(() => {
    fetch('/editcampaign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
      });
  });
  return (
    <>
      <LocationSearchInput />
      <Map />
    </>
  );
};

export default Campaign;
