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
    window.location.href = '#';
  }

  clearForm() {
    this.setState(this.initialState());
  }

  renderTitleInput() {
    return (
      <label className="form-label">Title
        <br />
        <input
          required
          autoFocus
          type="text"
          value={this.state.title}
          placeholder="What should we do?"
          className="form-input"
          onChange={this.handleTitleChange} />
      </label>
    );
  }

  renderPlacesAutocomplete() {
    return (
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
    );
  }

  renderLocationInput({ getInputProps, suggestions, getSuggestionItemProps, loading }) {
    return (
      <>
        <input
          {...getInputProps({ placeholder: 'Where are we going?' })}
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

  renderDescriptionInput() {
    return (
      <label className="form-label">Description
        <br />
        <textarea
          type="text"
          value={this.state.description}
          className="form-textarea"
          rows="5"
          onChange={this.handleDescriptionChange} />
      </label>
    );
  }

  checkWindowLocation() {
    return (
      window.location.hash === '#add-idea'
        ? {
            addOrUpdateText: 'ADD',
            addOrUpdateClass: 'form-button add-button',
            cancelOrDeleteText: 'CANCEL'
          }
        : window.location.hash === '#edit-idea'
          ? {
              addOrUpdateText: 'UPDATE',
              addOrUpdateClass: 'form-button update-button',
              cancelOrDeleteText: 'DELETE'
            }
          : {
              addOrUpdateText: '',
              addOrUpdateClass: '',
              cancelOrDeleteText: ''
            }
    );
  }

  renderFormButtons() {
    const buttonTextAndClass = this.checkWindowLocation();
    return (
      <div className="row form-buttons-container">
        <a href="#" className="form-button cancel-button color-pink no-underline">{buttonTextAndClass.cancelOrDeleteText}</a>
        <button type="submit" className={buttonTextAndClass.addOrUpdateClass}>{buttonTextAndClass.addOrUpdateText}</button>
      </div>
    );
  }

  render() {
    const titleInput = this.renderTitleInput();
    const placesAutocomplete = this.renderPlacesAutocomplete();
    const descriptionInput = this.renderDescriptionInput();
    const formButtons = this.renderFormButtons();
    return (
      <div className="idea-form-container">
        <form onSubmit={this.handleSubmit}>
          {titleInput}
          <br />
          {placesAutocomplete}
          <br />
          <br />
          {descriptionInput}
          {formButtons}
        </form>
      </div>
    );
  }
}
