import React from 'react';
import { Button } from 'react-bootstrap';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

const LocationSearchInput = props => {
  // When the user selects an autocomplete suggestion...

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
      <Button onClick={props.submitInterest}>Count me in!</Button>
    </div>
  );

  // Limit the suggestions to show only cities in the US
  const searchOptions = {
    types: ['(cities)'],
    componentRestrictions: { country: 'us' }
  };

  return (
    <PlacesAutocomplete
      value={props.address}
      onChange={props.handleChange}
      onSelect={props.handleSelect}
      // Pass the search options prop
      searchOptions={searchOptions}
    >
      {renderInput}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
