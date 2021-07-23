import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

export default class IdeaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      location: '',
      description: ''
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleTitleChange() {
    this.setState({
      title: event.target.value
    });
  }

  handleLocationChange() {
    this.setState({
      location: event.target.value
    });
  }

  handleDescriptionChange() {
    this.setState({
      description: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newIdea = {
      title: this.state.title,
      location: this.state.location,
      description: this.state.description
    };
    this.props.onSubmit(newIdea);
    this.setState({
      title: '',
      location: '',
      description: ''
    });
  }

  handleChange(location) {
    this.setState({ location });
  }

  async handleSelect(value) {

  }

  // renderLocationInput({ getInputProps, getSuggestionItemProps, suggestions, loading }) {
  //   return (

  //   );
  // }

  render() {
    const value = this.state;
    return (
      <div className="idea-form-container">
        <form onSubmit={this.handleSubmit}>
          <label className="form-label">Title
            <br />
            <input
              required
              autoFocus
              type="text"
              value={value.title}
              placeholder="What should we do?"
              className="form-input"
              onChange={this.handleTitleChange}/>
          </label>
          <br />
          <label className="form-label">Location
            <br />
            {/* <input
              autoFocus
              type="text"
              value={value.location}
              className="form-input"
              onChange={this.handleLocationChange}/> */}
            <PlacesAutocomplete
              value={value.location}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <>
                <input
                  {...getInputProps({ placeholder: 'Where are we going?' })}
                  autoFocus
                  className="location-input"
                />
                <div className="autocomplete-dropdown-container">
                  {loading ? <div>...loading</div> : null }
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    return (
                      <div {...getSuggestionItemProps(suggestion, { className })} key={suggestion.index}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
                </>
              )}
              {/* {this.renderLocationInput()} */}
            </PlacesAutocomplete>
          </label>
          <br />
          <label className="form-label">Description
            <br />
            <textarea
              autoFocus
              type="text"
              value={value.description}
              className="form-textarea"
              rows="5"
              onChange={this.handleDescriptionChange}/>
          </label>
          <div className="row form-buttons-container">
            <button className="form-button cancel-button color-pink">CANCEL</button>
            <button type="submit" className="form-button submit-button">ADD</button>
          </div>
        </form>
      </div>
    );
  }
}
