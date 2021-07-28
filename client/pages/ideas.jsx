import React from 'react';

export default class Ideas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideaOpen: {},
      ideaModalOpen: null,
      setDateModalOpen: false,
      setDateTargetIdea: {},
      scheduleDetails: {
        month: '',
        day: '',
        hour: '',
        AMPM: ''
      },
      errorMessage: ''
    };
    this.handleIdeaModalBackgroundClick = this.handleIdeaModalBackgroundClick.bind(this);
    this.handleSetDateModalBackgroundClick = this.handleSetDateModalBackgroundClick.bind(this);
    this.exitSetDateModal = this.exitSetDateModal.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleAMPMChange = this.handleAMPMChange.bind(this);
    this.handleSetDate = this.handleSetDate.bind(this);
  }

  handleIdeaClick(idea) {
    if (window.innerWidth < 768) {
      this.setState({
        ideaOpen: {
          ideaId: idea.ideaId,
          title: idea.title,
          description: idea.description,
          address: idea.address,
          latitude: idea.latitude,
          longitude: idea.longitude,
          locationId: idea.locationId
        },
        ideaModalOpen: true
      });
    }
  }

  handleIdeaModalBackgroundClick(event) {
    if (!event.target.className.includes('background--modal')) {
      return;
    }
    this.setState({
      ideaOpen: {},
      ideaModalOpen: false
    });
  }

  handleEditButtonClick(idea) {
    const targetIdea = idea;
    this.props.targetIdea(targetIdea);
  }

  openSetDateModal(idea) {
    this.setState({
      ideaModalOpen: false,
      setDateModalOpen: true,
      setDateTargetIdea: {
        ideaId: idea.ideaId,
        title: idea.title,
        description: idea.description,
        address: idea.address,
        latitude: idea.latitude,
        longitude: idea.longitude,
        locationId: idea.locationId
      }
    });
  }

  exitSetDateModal() {
    this.setState({
      setDateModalOpen: false,
      ideaModalOpen: true,
      setDateTargetIdea: {},
      scheduleDetails: {
        month: '',
        day: '',
        hour: '',
        AMPM: ''
      },
      errorMessage: ''
    });
  }

  handleSetDateModalBackgroundClick(event) {
    if (!event.target.className.includes('background--modal')) {
      return;
    }
    this.exitSetDateModal();
  }

  handleMonthChange(event) {
    const scheduleDetails = { ...this.state.scheduleDetails };
    scheduleDetails.month = event.target.value;
    this.setState({ scheduleDetails });
  }

  handleDayChange(event) {
    const scheduleDetails = { ...this.state.scheduleDetails };
    scheduleDetails.day = event.target.value;
    this.setState({ scheduleDetails });
  }

  handleHourChange(event) {
    const scheduleDetails = { ...this.state.scheduleDetails };
    scheduleDetails.hour = event.target.value;
    this.setState({ scheduleDetails });
  }

  handleAMPMChange(event) {
    const scheduleDetails = { ...this.state.scheduleDetails };
    scheduleDetails.AMPM = event.target.value;
    this.setState({ scheduleDetails });
  }

  handleSetDateErrors() {
    const scheduleDetails = this.state.scheduleDetails;
    const error = scheduleDetails.month === ''
      ? 'A MONTH'
      : scheduleDetails.day === ''
        ? 'A DAY'
        : scheduleDetails.hour === ''
          ? 'A TIME'
          : scheduleDetails.AMPM === ''
            ? 'AM OR PM'
            : '';
    return error;
  }

  handleSetDate() {
    event.preventDefault();
    const error = this.handleSetDateErrors();
    if (error !== '') {
      this.setState({ errorMessage: error });
      return;
    }
    const idea = this.state.setDateTargetIdea;
    const scheduleDetails = this.state.scheduleDetails;
    // later change year input to be dynamic depending on current date
    // const currentDate = new Date();
    // if month and day input is already in the past, year should be changed to the next year (2022 as of now)
    const date = `2021-${scheduleDetails.month}-${scheduleDetails.day}`;
    const time = `${scheduleDetails.hour} ${scheduleDetails.AMPM}`;
    const scheduledIdea = {
      ideaId: idea.ideaId,
      title: idea.title,
      description: idea.description,
      address: idea.address,
      latitude: idea.latitude,
      longitude: idea.longitude,
      locationId: idea.locationId,
      date: date,
      time: time
    };
    this.props.scheduledIdea(scheduledIdea);
  }

  renderIdeas(props) {
    const ideas = this.props.ideas;
    return (
      this.props.ideas.length < 1
        ? <p className="empty-text">You have no date ideas.</p>
        : ideas.map(idea =>
            <div key={'ideas' + idea.ideaId} onClick={() => this.handleIdeaClick(idea)} className="idea-item">
              <div className="date-title color-dark-gray">
                {idea.title}
              </div>
              <div className="idea-address color-medium-gray">
                <span className="fa fa-map-marker map-marker-icon"></span>
                {idea.address}
              </div>
              <div className="date-description color-medium-gray">
                {idea.description}
              </div>
              <div className="row desktop-idea-buttons">
                <a href="#edit-idea" onClick={() => this.handleEditButtonClick(idea)} className="desktop-edit-button-container no-underline">
                  <span className="fas fa-edit desktop-edit-icon color-dark-gray"></span>
                  <span className="desktop-edit-icon-label color-dark-gray">Edit</span>
                </a>
                <span onClick={() => this.openSetDateModal(idea)} className="desktop-calendar-button-container">
                  <span className="far fa-calendar-plus desktop-calendar-icon color-dark-gray"></span>
                  <span className="desktop-calendar-icon-label color-dark-gray">Make It a Date</span>
                </span>
              </div>
            </div>
        )
    );
  }

  renderIdeaModal() {
    const updatedIdea = this.props.updatedIdea;
    const targetedIdea = this.props.targetedIdea;
    let idea;
    if (this.state.ideaOpen.ideaId !== undefined) {
      idea = this.state.ideaOpen;
    } else if (updatedIdea.ideaId !== undefined) {
      idea = updatedIdea;
    } else if (targetedIdea.ideaId !== undefined) {
      idea = targetedIdea;
    } else {
      idea = {};
    }
    return (
      idea.ideaId === undefined || window.innerWidth > 767 || this.state.ideaModalOpen === false
        ? null
        : <div onClick={this.handleIdeaModalBackgroundClick} className="background--modal">
            <div className="modal border-radius background-white idea-box--modal">
              <div className="date-title--modal">
                {idea.title}
              </div>
              <div className="date-address--modal color-medium-gray">
                <span className="fa fa-map-marker map-marker-icon color-medium-gray"></span>
                {idea.address}
              </div>
              <div className="date-description--modal color-medium-gray">
                {idea.description}
              </div>
              <div className="edit-button-container--modal">
              <a href="#edit-idea" onClick={() => this.handleEditButtonClick(idea)} className="edit-button--modal border-radius no-underline text-center">
                  <span className="fas fa-edit idea-edit-icon--modal color-dark-gray"></span>
                  <span className="idea-edit-label--modal color-dark-gray">Edit</span>
                </a>
              </div>
              <div className="calendar-button-container--modal">
              <a onClick={() => this.openSetDateModal(idea)} className="calendar-button--modal border-radius no-underline text-center">
                  <span className="far fa-calendar-plus idea-calendar-icon--modal color-dark-gray"></span>
                  <span className="idea-calendar-label--modal color-dark-gray">Make It a Date</span>
                </a>
              </div>
            </div>
          </div>
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

  renderErrorMessage() {
    let errorMessage = '';
    if (this.state.errorMessage !== '') {
      errorMessage = {
        value: `* PLEASE SELECT ${this.state.errorMessage} *`,
        class: 'error-message'
      };
    } else {
      errorMessage = {
        value: '',
        class: 'hidden'
      };
    }
    return (
      <div className="error-message-container">
        <div className={errorMessage.class}>
          {errorMessage.value}
        </div>
      </div>
    );
  }

  renderSetDateModal() {
    const monthOptions = this.renderMonths();
    const dayOptions = this.renderDays();
    const hourOptions = this.renderHours();
    const errorMessage = this.renderErrorMessage();
    return (
      this.state.setDateModalOpen === false
        ? null
        : <div onClick={this.handleSetDateModalBackgroundClick} className="background--modal">
            <div className="modal border-radius background-white set-date-box--modal">
              <div className="text-center set-date-text--modal">Make it a Date</div>
              <form>
                <div className="set-date-form-row">
                  <div className="set-date-form-section">
                    <label className="form-label">Month
                      <br />
                      <select onChange={this.handleMonthChange}className="border-radius form-select month-select">
                        <option value=""></option>
                        {monthOptions}
                      </select>
                    </label>
                  </div>
                  <div className="set-date-form-section">
                    <label className="form-label">Day
                      <br />
                      <select onChange={this.handleDayChange} className="border-radius form-select day-select">
                        <option value=""></option>
                        {dayOptions}
                      </select>
                    </label>
                  </div>
                </div>
                <div className="set-date-form-row">
                  <div className="set-date-form-section">
                    <label className="form-label">Time
                      <br />
                      <select onChange={this.handleHourChange} className="border-radius form-select time-select">
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
                {errorMessage}
                <div className="row set-date-buttons-container--modal">
                  <a onClick={this.exitSetDateModal} className="border-radius button color-pink cancel-button--modal">CANCEL</a>
                  <button onClick={this.handleSetDate} className="border-radius button set-date-button--modal">IT&apos;S A DATE</button>
                </div>
              </form>
            </div>
          </div>
    );
  }

  render() {
    const ideaElements = this.renderIdeas();
    const ideaModal = this.renderIdeaModal();
    const setDateModal = this.renderSetDateModal();
    return (
      <div className="ideas-container">
        {ideaElements}
        {ideaModal}
        {setDateModal}
      </div>
    );
  }
}
