import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

export default class IdeaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  initialState() {
    return {
      title: '',
      description: '',
      address: '',
      latitude: null,
      longitude: null
    };
  }

  handleTitleChange() {
    this.setState({
      title: event.target.value
    });
  }

  handleDescriptionChange() {
    this.setState({
      description: event.target.value
    });
  }

  handleLocationChange(address) {
    this.setState({ address });
  }

  handleLocationSelect(address) {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          latitude: latLng.lat.toString(),
          longitude: latLng.lng.toString()
        });
      })
      .catch(error => console.error('Error', error));
  }

  handleSubmit(event) {
    event.preventDefault();
    const newIdea = {
      title: this.state.title,
      description: this.state.description,
      address: this.state.address,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };
    this.props.onSubmit(newIdea);
    this.clearForm();
  }

  clearForm() {
    this.setState(this.initialState());
  }

  renderLocationInput({ getInputProps, suggestions, getSuggestionItemProps, loading }) {
    return (
      <>
        <input
          {...getInputProps({ placeholder: 'Where are we going?' })}
          autoFocus
          className="location-input"
        />
        <div className="autocomplete-dropdown-container">
          {loading ? <div>...loading</div> : null}
          {suggestions.map(suggestion => {
            return (
              <div
                {...getSuggestionItemProps(suggestion)}
                key={suggestion.index}
                className="suggestion-item">
                {suggestion.description}
              </div>
            );
          })}
        </div>
      </>
    );
  }

  render() {
    return (
      <div className="idea-form-container">
        <form onSubmit={this.handleSubmit}>
          <label className="form-label">Title
            <br />
            <input
              required
              autoFocus
              type="text"
              value={this.state.title}
              placeholder="What should we do?"
              className="form-input"
              onChange={this.handleTitleChange}/>
          </label>
          <br />
          <label className="form-label">Location
            <br />

            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleLocationChange}
              onSelect={this.handleLocationSelect}>
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                this.renderLocationInput({ getInputProps, suggestions, getSuggestionItemProps, loading })
              )}
            </PlacesAutocomplete>

          </label>
          <br />
          <br />
          <label className="form-label">Description
            <br />
            <textarea
              autoFocus
              type="text"
              value={this.state.description}
              className="form-textarea"
              rows="5"
              onChange={this.handleDescriptionChange}/>
          </label>
          <div className="row form-buttons-container">
            <a href="#" className="form-button cancel-button color-pink">CANCEL</a>
            <button type="submit" className="form-button submit-button">ADD</button>
          </div>
        </form>
      </div>
    );
  }
}
