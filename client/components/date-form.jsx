import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

export default class DateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleAMPMChange = this.handleAMPMChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  initialState() {
    const dateToEdit = this.props.dateToEdit;
    const dateTimeValues = this.findDateAndTime(dateToEdit);

    return (
      {
        ideaId: dateToEdit.ideaId,
        title: dateToEdit.title,
        description: dateToEdit.description,
        locationId: dateToEdit.locationId,
        address: dateToEdit.address,
        latitude: dateToEdit.latitude,
        longitude: dateToEdit.longitude,
        scheduleId: dateToEdit.scheduleId,
        data: dateToEdit.date,
        time: dateToEdit.time,
        month: dateTimeValues.month,
        day: dateTimeValues.day,
        year: dateTimeValues.year,
        hour: dateTimeValues.hour,
        AMPM: dateTimeValues.AMPM,
        note: '',
        imgs: [],
        formData: {}
      }
    );
  }

  findDateAndTime(dateToEdit) {
    const date = dateToEdit.date;
    const time = dateToEdit.time;

    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    const year = date.substring(0, 4);

    const hourData = time.substring(0, 2);
    let hourDateToNumber = parseInt(hourData);
    let AMPM = 'AM';
    if (hourDateToNumber > 12) {
      hourDateToNumber = hourDateToNumber - 12;
      AMPM = 'PM';
    }
    const hourOnly = hourDateToNumber.toString();
    const minuteOnly = time.substring(3, 5);
    const hour = `${hourOnly}:${minuteOnly}`;

    return (
      {
        month: month,
        day: day,
        year: year,
        hour: hour,
        AMPM: AMPM
      }
    );
  }

  handleUpdate(event) {
    event.preventDefault();
    const date = this.state;
    const dateInput = `${date.year}-${date.month}-${date.day}`;
    const timeInput = `${date.hour} ${date.AMPM}`;

    const updatedDate = {
      ideaId: date.ideaId,
      title: date.title,
      description: date.description,
      address: date.address,
      latitude: date.latitude,
      longitude: date.longitude,
      date: dateInput,
      time: timeInput,
      note: date.note
    };

    this.props.updatedDate(updatedDate);
    this.props.formData({
      formData: this.state.formData,
      scheduleId: this.state.scheduleId
    });
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

  handleMonthChange(event) {
    const month = event.target.value;
    this.setState({ month });
  }

  handleDayChange(event) {
    const day = event.target.value;
    this.setState({ day });
  }

  handleYearChange(event) {
    const year = event.target.value;
    this.setState({ year });
  }

  handleHourChange(event) {
    const hour = event.target.value;
    this.setState({ hour });
  }

  handleAMPMChange(event) {
    const AMPM = event.target.value;
    this.setState({ AMPM });
  }

  handleNoteChange(event) {
    this.setState({
      note: event.target.value
    });
  }

  handleImageChange(event) {
    const form = event.target.closest('form');
    const formData = new FormData(form);
    this.setState({
      imgs: event.target.files,
      formData: formData
    });
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
          className="form-input border-radius"
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

  renderNoteInput() {
    return (
      <label className="form-label">Experience Notes
        <br />
        <textarea
          type="text"
          value={this.state.note}
          className="form-textarea border-radius"
          rows="7"
          onChange={this.handleNoteChange} />
      </label>
    );
  }

  renderImageInput() {
    const imgPlaceholder = this.state.imgs.length < 1
      ? 'border-radius file-box-style file-input-placeholder'
      : 'hidden';

    return (
      this.props.dateToEdit.image && this.state.imgs.length < 1
        ? <>
            <div className="form-label">Images</div>
            <div className="file-uploads-container">
              <label className="border-radius file-box-style file-input-box">
                <span className="fas fa-plus file-add-icon"></span>
                <input
                  className="hidden"
                  type="file"
                  name="image"
                  // multiple
                  onChange={this.handleImageChange} />
              </label>
              <span className="border-radius file-box-style">
                <img src={`http://localhost:3000${this.props.dateToEdit.image.url}`} className="border-radius image-preview"/>
              </span>
            </div>
          </>
        : <>
            <div className="form-label">Images</div>
            <div className="file-uploads-container">
              <label className="border-radius file-box-style file-input-box">
                <span className="fas fa-plus file-add-icon"></span>
                <input
                  className="hidden"
                  type="file"
                  name="image"
                  // multiple
                  onChange={this.handleImageChange} />
              </label>
              <span className={imgPlaceholder}>
                <span className="far fa-images file-image-icon"></span>
              </span>
              {this.state.imgs && [...this.state.imgs].map((file, i) => (
                <span key={i} className="border-radius file-box-style">
                  <img className="border-radius image-preview" src={URL.createObjectURL(file)} />
                </span>
              ))}
            </div>
          </>
    );
  }

  renderMonths() {
    const monthsArray = this.props.monthsArray;
    return (
      monthsArray.map(month =>
        <option key={month.monthNum} value={month.monthNum}>
          {month.monthText}
        </option>
      )
    );
  }

  renderDays() {
    const daysArray = [];
    // make this max number dynamically change depending on the selected month
    const maxDays = 31;
    for (let i = 1; i <= maxDays; i++) {
      if (i < 10) {
        const day = i.toString();
        const dayFormatted = `0${day}`;
        daysArray.push(dayFormatted);
      } else {
        const dayFormatted = i.toString();
        daysArray.push(dayFormatted);
      }
    }
    return (
      daysArray.map(day =>
        <option key={day} value={day}>
          {day}
        </option>
      )
    );
  }

  renderYears() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const minYear = currentYear - 70;
    const yearsArray = [];
    for (let i = currentYear; i >= minYear; i--) {
      const yearToString = i.toString();
      yearsArray.push(yearToString);
    }
    return (
      yearsArray.map(year =>
        <option key={year} value={year}>
          {year}
        </option>
      )
    );
  }

  renderHours() {
    const hoursArray = [];
    for (let i = 1; i <= 12; i++) {
      const hour = i.toString();
      const hourFormatted = `${hour}:00`;
      const hourHalfFormatted = `${hour}:30`;
      hoursArray.push(hourFormatted, hourHalfFormatted);
    }
    return (
      hoursArray.map(hour =>
        <option key={hour} value={hour}>
          {hour}
        </option>
      )
    );
  }

  renderDateInputs() {
    const monthOptions = this.renderMonths();
    const dayOptions = this.renderDays();
    const yearOptions = this.renderYears();
    const hourOptions = this.renderHours();

    const AMPMValue = this.state.AMPM === 'AM'
      ? {
          AM: <input type="radio" name="AM/PM" value="AM" className="form-radio-input" defaultChecked />,
          PM: <input type="radio" name="AM/PM" value="PM" className="form-radio-input" />
        }
      : {
          AM: <input type="radio" name="AM/PM" value="AM" className="form-radio-input" />,
          PM: <input type="radio" name="AM/PM" value="PM" className="form-radio-input" defaultChecked />
        };

    return (
      <>
        <div className="mdy-row">
          <div className="set-date-form-section">
            <label className="form-label">Month
              <br />
              <select
                defaultValue={this.state.month}
                onChange={this.handleMonthChange}
                className="border-radius form-select edit-date-month-select">
                <option value=''></option>
                {monthOptions}
              </select>
            </label>
          </div>
          <div className="set-date-form-section">
            <label className="form-label">Day
              <br />
              <select
                defaultValue={this.state.day}
                onChange={this.handleDayChange}
                className="border-radius form-select edit-date-day-select">
                <option value=""></option>
                {dayOptions}
              </select>
            </label>
          </div>
          <div className="set-date-form-section">
            <label className="form-label">Year
              <br />
              <select
                defaultValue={this.state.year}
                onChange={this.handleYearChange}
                className="border-radius form-select edit-date-year-select">
                <option value=""></option>
                {yearOptions}
              </select>
            </label>
          </div>
        </div>
        <div className="set-date-form-row">
          <div className="set-date-form-section">
            <label className="form-label">Time
              <br />
              <select
                defaultValue={this.state.hour}
                onChange={this.handleHourChange}
                className="border-radius form-select edit-date-time-select">
                <option value=""></option>
                {hourOptions}
              </select>
            </label>
          </div>
          <div onChange={this.handleAMPMChange} checked className="edit-date-form-radio-section set-date-form-radio-section">
            <div className="set-date-form-radio-container">
              <label className="form-radio-label">
                {AMPMValue.AM}
                AM
              </label>
            </div>
            <div className="set-date-form-radio-container">
              <label className="form-radio-label">
                {AMPMValue.PM}
                PM
              </label>
            </div>
          </div>
        </div>
      </>
    );
  }

  renderFormButtons() {
    return (
      <div className="row form-buttons-container date-form-buttons">
        <a className="button delete-button color-pink no-underline">DELETE</a>
        <button onClick={this.handleUpdate} type="submit" className="button border-radius update-button">UPDATE</button>
      </div>
    );
  }

  render() {
    const titleInput = this.renderTitleInput();
    const placesAutocomplete = this.renderPlacesAutocomplete();
    const descriptionInput = this.renderDescriptionInput();
    const dateInputs = this.renderDateInputs();
    const noteInput = this.renderNoteInput();
    const imageInput = this.renderImageInput();
    const formButtons = this.renderFormButtons();
    return (
      <>
        <div className="date-form-container">
          <form>
            {titleInput}
            <br />
            {placesAutocomplete}
            <br />
            <br />
            {descriptionInput}
            {dateInputs}
            {noteInput}
            <br />
            {imageInput}
            {formButtons}
          </form>
        </div>
      </>
    );
  }
}
