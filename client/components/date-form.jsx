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
    // this.handleDeleteClick = this.handleDeleteClick.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  initialState() {
    return (
      {
        title: '',
        description: '',
        address: '',
        latitude: '',
        longitude: '',
        month: '',
        day: '',
        year: '',
        hour: '',
        AMPM: '',
        note: '',
        id: 'abcdefg',
        file: []
        // deleteModalOpen: false
      }
    );

    // const dateToEdit = this.props.dateToEdit;
    // return (
    //   {
    //     ideaId: dateToEdit.ideaId,
    //     title: dateToEdit.title,
    //     description: dateToEdit.description,
    //     address: dateToEdit.address,
    //     latitude: dateToEdit.latitude,
    //     longitude: dateToEdit.longitude,
    //     locationId: dateToEdit.locationId,
    //     month: dateToEdit.month,
    //     day: dateToEdit.day,
    //     year: dateToEdit.year,
    //     hour: dateToEdit.hour,
    //     AMPM: dateToEdit.AMPM,
    //     deleteModalOpen: false,
    //     errorMessage: ''
    //   }
    // );
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
    this.setState({
      imgs: event.target.files
    });
  }

  handleUpdate(event) {
    event.preventDefault();

    // const updatedIdea = {
    //   ideaId: this.state.ideaId,
    //   title: this.state.title,
    //   description: this.state.description,
    //   address: this.state.address,
    //   latitude: this.state.latitude,
    //   longitude: this.state.longitude,
    //   locationId: this.state.locationId
    // };
    // this.props.updatedIdea(updatedIdea);
  }

  // handleSetDate() {
  //   event.preventDefault();
  //   const error = this.handleSetDateErrors();
  //   if (error !== '') {
  //     this.setState({ errorMessage: error });
  //     return;
  //   }

  //   const currentDate = new Date();
  //   const currentYear = currentDate.getFullYear();
  //   const currentMonth = currentDate.getMonth() + 1;
  //   const currentDay = currentDate.getDate();
  //   const currentHour = currentDate.getHours();

  //   const scheduleDetails = this.state.scheduleDetails;
  //   const monthInput = parseInt(scheduleDetails.month);
  //   const dayInput = parseInt(scheduleDetails.day);
  //   const timeInput = scheduleDetails.hour;

  //   const hourString = timeInput.charAt(1) === ':'
  //     ? timeInput.slice(0, 1)
  //     : timeInput.slice(0, 2);
  //   const hourNumber = parseInt(hourString);
  //   const hourMilitary = scheduleDetails.AMPM === 'AM'
  //     ? hourNumber
  //     : hourNumber + 12;

  //   const year = monthInput > currentMonth
  //     ? currentYear
  //     : monthInput === currentMonth && dayInput > currentDay
  //       ? currentYear
  //       : dayInput === currentDay && hourMilitary > currentHour
  //         ? currentYear
  //         : currentYear + 1;

  //   const idea = this.state.setDateTargetIdea;
  //   const date = `${year}-${scheduleDetails.month}-${scheduleDetails.day}`;
  //   const time = `${scheduleDetails.hour} ${scheduleDetails.AMPM}`;
  //   const scheduledIdea = {
  //     ideaId: idea.ideaId,
  //     title: idea.title,
  //     description: idea.description,
  //     address: idea.address,
  //     latitude: idea.latitude,
  //     longitude: idea.longitude,
  //     locationId: idea.locationId,
  //     date: date,
  //     time: time
  //   };
  //   this.props.scheduledIdea(scheduledIdea);
  // }

  // handleDeleteClick() {
  //   this.setState({
  //     deleteModalOpen: true
  //   });
  // }

  // handleDelete(event) {
  //   event.preventDefault();
  //   const ideaToDelete = this.state;
  //   this.props.ideaToDelete(ideaToDelete);
  // }

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
    const imgPlaceholder = this.state.imgs
      ? 'hidden'
      : 'border-radius file-box-style file-input-placeholder';

    return (
      <>
        <div className="form-label">Images</div>
        <div className="file-uploads-container">
          <label className="border-radius file-box-style file-input-box">
            <span className="fas fa-plus file-add-icon"></span>
            <input
              className="hidden"
              // ref="file"
              type="file"
              name="image"
              multiple
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

    // const yearClass = window.innerWidth > 767
    //   ? {
    //       desktop: 'set-date-form-section',
    //       mobile: 'hidden'
    //     }
    //   : {
    //       desktop: 'hidden',
    //       mobile: 'set-date-form-row'
    //     };

    return (
      <>
        <div className="mdy-row">
          <div className="set-date-form-section">
            <label className="form-label">Month
              <br />
              <select onChange={this.handleMonthChange} className="border-radius form-select edit-date-month-select">
                <option value=""></option>
                {monthOptions}
              </select>
            </label>
          </div>
          <div className="set-date-form-section">
            <label className="form-label">Day
              <br />
              <select onChange={this.handleDayChange} className="border-radius form-select edit-date-day-select">
                <option value=""></option>
                {dayOptions}
              </select>
            </label>
          </div>
          <div className="set-date-form-section">
            <label className="form-label">Year
              <br />
              <select onChange={this.handleYearChange} className="border-radius form-select edit-date-year-select">
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
              <select onChange={this.handleHourChange} className="border-radius form-select edit-date-time-select">
                <option value=""></option>
                {hourOptions}
              </select>
            </label>
          </div>
          <div onChange={this.handleAMPMChange} className="set-date-form-section set-date-form-radio-section">
            <div className="set-date-form-radio-container">
              <label className="form-radio-label">
                <input type="radio" name="AM/PM" value="AM" className="form-radio-input" />
                AM
              </label>
            </div>
            <div className="set-date-form-radio-container">
              <label className="form-radio-label">
                <input type="radio" name="AM/PM" value="PM" className="form-radio-input" />
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
        <a onClick={this.handleDeleteClick} className="button delete-button color-pink no-underline">DELETE</a>
        <button onClick={this.handleUpdate} type="submit" className="button border-radius update-button">UPDATE</button>
      </div>
    );
  }

  // renderDeleteModal() {
  //   return (
  //     this.state.deleteModalOpen
  //       ? <div onClick={this.exitModal} className="background--modal">
  //         <div className="modal border-radius delete-box--modal background-white">
  //           <div className="confirm-delete-text--modal text-center">
  //             Are you sure you would like to delete?
  //           </div>
  //           <div className="row delete-buttons-container--modal">
  //             <button onClick={this.exitModal} className="button cancel-button--modal color-pink">CANCEL</button>
  //             <button onClick={this.handleDelete} type="submit" className="button border-radius delete-button--modal">DELETE</button>
  //           </div>
  //         </div>
  //       </div>
  //       : null
  //   );
  // }

  render() {
    // console.log(this.state.imgs);
    // if (this.state.imgs) {
    //   console.log('yes');
    // } else {
    //   console.log('no');
    // }
    const titleInput = this.renderTitleInput();
    const placesAutocomplete = this.renderPlacesAutocomplete();
    const descriptionInput = this.renderDescriptionInput();
    const dateInputs = this.renderDateInputs();
    const noteInput = this.renderNoteInput();
    const imageInput = this.renderImageInput();
    const formButtons = this.renderFormButtons();

    // const deleteModal = this.renderDeleteModal();
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
        {/* <>{deleteModal}</> */}
      </>
    );
  }
}
