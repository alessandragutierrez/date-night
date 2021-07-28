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
        month: null,
        day: null,
        hour: null,
        AMPM: null
      }
    };
    this.handleIdeaModalBackgroundClick = this.handleIdeaModalBackgroundClick.bind(this);
    this.handleSetDateModalBackgroundClick = this.handleSetDateModalBackgroundClick.bind(this);
    this.exitSetDateModal = this.exitSetDateModal.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleSetDate = this.handleSetDate.bind(this);
    this.handleAMPMChange = this.handleAMPMChange.bind(this);
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

  handleEditButtonClick(idea) {
    const targetIdea = idea;
    this.props.targetIdea(targetIdea);
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

  handleSetDate() {
    event.preventDefault();
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
    window.location.href = '#upcoming';
  }

  handleSetDateModalBackgroundClick(event) {
    if (!event.target.className.includes('background--modal')) {
      return;
    }
    this.exitSetDateModal();
  }

  exitSetDateModal() {
    this.setState({
      setDateModalOpen: false,
      ideaModalOpen: true,
      setDateTargetIdea: {}
    });
  }

  renderIdeas(props) {
    const ideas = this.props.ideas;
    return (
      this.props.ideas.length < 1
        ? <p className="ideas-empty">You have no date ideas.</p>
        : ideas.map(idea =>
            <div key={idea.ideaId} onClick={() => this.handleIdeaClick(idea)} className="idea-item">
              <div className="idea-title color-dark-gray">
                {idea.title}
              </div>
              <div className="idea-address color-medium-gray">
                <span className="fa fa-map-marker map-marker-icon color-medium-gray"></span>
                {idea.address}
              </div>
              <div className="idea-description color-medium-gray">
                {idea.description}
              </div>
              <div className="row desktop-idea-buttons">
                <a href="#edit-idea" onClick={() => this.handleEditButtonClick(idea)} className="desktop-edit-button-container no-underline">
                  <span className="fas fa-edit desktop-idea-edit-icon color-dark-gray"></span>
                  <span className="desktop-idea-edit-label color-dark-gray">Edit</span>
                </a>
                <span onClick={() => this.openSetDateModal(idea)} className="desktop-calendar-button-container">
                  <span className="far fa-calendar-plus desktop-idea-calendar-icon color-dark-gray"></span>
                  <span className="desktop-idea-calendar-label color-dark-gray">Make It a Date</span>
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
              <div className="idea-title--modal">
                {idea.title}
              </div>
              <div className="idea-address--modal color-medium-gray">
                <span className="fa fa-map-marker map-marker-icon color-medium-gray"></span>
                {idea.address}
              </div>
              <div className="idea-description--modal color-medium-gray">
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
    const monthsArray = [
      { monthText: 'January', monthInteger: '01' },
      { monthText: 'February', monthInteger: '02' },
      { monthText: 'March', monthInteger: '03' },
      { monthText: 'April', monthInteger: '04' },
      { monthText: 'May', monthInteger: '05' },
      { monthText: 'June', monthInteger: '06' },
      { monthText: 'July', monthInteger: '07' },
      { monthText: 'August', monthInteger: '08' },
      { monthText: 'September', monthInteger: '09' },
      { monthText: 'October', monthInteger: '10' },
      { monthText: 'November', monthInteger: '11' },
      { monthText: 'December', monthInteger: '12' }
    ];
    return (
      monthsArray.map((month, i) =>
          <option key={i} value={month.monthInteger}>
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
      daysArray.map((day, i) =>
          <option key={i} value={day}>
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
      hoursArray.map((hour, i) =>
        <option key={i} value={hour}>
          {hour}
        </option>
      )
    );
  }

  renderSetDateModal() {
    const monthOptions = this.renderMonths();
    const dayOptions = this.renderDays();
    const hourOptions = this.renderHours();
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
                        {monthOptions}
                      </select>
                    </label>
                  </div>
                  <div className="set-date-form-section">
                    <label className="form-label">Day
                      <br />
                      <select onChange={this.handleDayChange} className="border-radius form-select day-select">
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
