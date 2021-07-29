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
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.exitModal = this.exitModal.bind(this);
  }

  initialState() {
    const ideaToEdit = this.props.ideaToEdit;
    return (
      this.props.ideaToEdit === undefined
        ? {
            title: '',
            description: '',
            address: '',
            latitude: '',
            longitude: '',
            deleteModalOpen: false,
            errorMessage: ''
          }
        : {
            ideaId: ideaToEdit.ideaId,
            title: ideaToEdit.title,
            description: ideaToEdit.description,
            address: ideaToEdit.address,
            latitude: ideaToEdit.latitude,
            longitude: ideaToEdit.longitude,
            locationId: ideaToEdit.locationId,
            deleteModalOpen: false,
            errorMessage: ''
          }
    );
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleDescriptionChange(event) {
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

  handleAddEditErrors() {
    const error = this.state.title === ''
      ? 'TITLE'
      : this.state.address === ''
        ? 'LOCATION'
        : '';
    return error;
  }

  handleAdd(event) {
    event.preventDefault();
    const error = this.handleAddEditErrors();
    if (error !== '') {
      this.setState({ errorMessage: error });
      return;
    }

    const newIdea = {
      title: this.state.title,
      description: this.state.description,
      address: this.state.address,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };
    this.props.newIdea(newIdea);
  }

  handleUpdate(event) {
    event.preventDefault();
    const error = this.handleAddEditErrors();
    if (error.title !== '' || error.location !== '') {
      this.setState({ errorMessage: error });
      return;
    }

    const updatedIdea = {
      ideaId: this.state.ideaId,
      title: this.state.title,
      description: this.state.description,
      address: this.state.address,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      locationId: this.state.locationId
    };
    this.props.updatedIdea(updatedIdea);
  }

  handleDeleteClick() {
    this.setState({
      deleteModalOpen: true
    });
  }

  handleDelete(event) {
    event.preventDefault();
    const ideaToDelete = this.state;
    this.props.ideaToDelete(ideaToDelete);
  }

  exitModal(event) {
    if (event.target.className.includes('background--modal') || event.target.className.includes('cancel-button--modal')) {
      this.setState({
        deleteModalOpen: false
      });
    }
  }

  renderErrorMessage() {
    let errorMessage;
    if (this.state.errorMessage === '') {
      errorMessage = {
        titleError: '',
        locationError: '',
        titleClass: 'hidden',
        locationClass: 'hidden'
      };
    } else if (this.state.errorMessage === 'TITLE') {
      errorMessage = {
        titleError: `* PLEASE INPUT A ${this.state.errorMessage} *`,
        locationError: '',
        titleClass: 'error-message add-edit-error',
        locationClass: ''
      };
    } else if (this.state.errorMessage === 'LOCATION') {
      errorMessage = {
        titleError: '',
        locationError: `* PLEASE INPUT A ${this.state.errorMessage} *`,
        titleClass: 'hidden',
        locationClass: 'error-message add-edit-error'
      };
    }

    return errorMessage;
  }

  renderTitleInput() {
    const error = this.renderErrorMessage();
    return (
      <label className="form-label">Title
        <span className={error.titleClass}>{error.titleError}</span>
        <br />
        <input
          required
          autoFocus
          type="text"
          value={this.state.title}
          placeholder="What should we do?"
          className="form-input border-radius"
          onChange={this.handleTitleChange} />
      </label>
    );
  }

  renderPlacesAutocomplete() {
    const error = this.renderErrorMessage();
    return (
      <label className="form-label">Location
        <span className={error.locationClass}>{error.locationError}</span>
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
          className="location-input border-radius"
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
          className="form-textarea border-radius"
          rows="5"
          onChange={this.handleDescriptionChange} />
      </label>
    );
  }

  checkWindowLocation() {
    return (
      window.location.hash === '#add-idea'
        ? {
            addButton: 'button border-radius add-button',
            updateButton: 'hidden',
            cancelButton: 'button cancel-button color-pink no-underline',
            deleteButton: 'hidden'
          }
        : window.location.hash === '#edit-idea'
          ? {
              addButton: 'hidden',
              updateButton: 'button border-radius update-button',
              cancelButton: 'hidden',
              deleteButton: 'button delete-button color-pink no-underline'
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
        <a onClick={this.handleDeleteClick} className={buttonClasses.deleteButton}>DELETE</a>
        <button onClick={this.handleAdd} type="submit" className={buttonClasses.addButton}>ADD</button>
        <button onClick={this.handleUpdate} type="submit" className={buttonClasses.updateButton}>UPDATE</button>
      </div>
    );
  }

  renderDeleteModal() {
    return (
      this.state.deleteModalOpen
        ? <div onClick={this.exitModal} className="background--modal">
          <div className="modal border-radius delete-box--modal background-white">
            <div className="confirm-delete-text--modal text-center">
              Are you sure you would like to delete?
            </div>
            <div className="row delete-buttons-container--modal">
              <button onClick={this.exitModal} className="button cancel-button--modal color-pink">CANCEL</button>
              <button onClick={this.handleDelete} type="submit" className="button border-radius delete-button--modal">DELETE</button>
            </div>
          </div>
        </div>
        : null
    );
  }

  render() {
    const titleInput = this.renderTitleInput();
    const placesAutocomplete = this.renderPlacesAutocomplete();
    const descriptionInput = this.renderDescriptionInput();
    const formButtons = this.renderFormButtons();
    const deleteModal = this.renderDeleteModal();
    return (
      <>
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
        <>{deleteModal}</>
      </>
    );
  }
}
