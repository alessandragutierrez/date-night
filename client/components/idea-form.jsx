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
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  initialState() {
    const ideaToEdit = this.props.ideaToEdit;
    return (
      this.props.ideaToEdit === undefined
        ? {
            title: '',
            description: '',
            address: '',
            latitude: null,
            longitude: null
          }
        : {
            ideaId: ideaToEdit.ideaId,
            title: ideaToEdit.title,
            description: ideaToEdit.description,
            address: ideaToEdit.address,
            latitude: ideaToEdit.latitude,
            longitude: ideaToEdit.longitude
          }
    );
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
    this.props.newIdea(newIdea);
    window.location.href = '#';
  }

  handleUpdate(event) {
    event.preventDefault();
    const updatedIdea = {
      ideaId: this.state.ideaId,
      title: this.state.title,
      description: this.state.description,
      address: this.state.address,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };
    this.props.updatedIdea(updatedIdea);
    window.location.href = '#';
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
            addButton: 'form-button add-button',
            updateButton: 'hidden',
            cancelButton: 'form-button cancel-button color-pink no-underline',
            deleteButton: 'hidden'
          }
        : window.location.hash === '#edit-idea'
          ? {
              addButton: 'hidden',
              updateButton: 'form-button update-button',
              cancelButton: 'hidden',
              deleteButton: 'form-button delete-button color-pink no-underline'
            }
          : {
              addButton: '',
              updateButton: '',
              cancelButton: '',
              deleteButton: ''
            }
    );
  }

  renderFormButtons() {
    const buttonClasses = this.checkWindowLocation();
    return (
      <div className="row form-buttons-container">
        <a href="#" className={buttonClasses.cancelButton}>CANCEL</a>
        <a className={buttonClasses.deleteButton}>DELETE</a>
        <button onClick={this.handleSubmit} type="submit" className={buttonClasses.addButton}>ADD</button>
        <button onClick={this.handleUpdate} type="submit" className={buttonClasses.updateButton}>UPDATE</button>
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
        <form>
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
