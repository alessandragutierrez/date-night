import React from 'react';

export default class MyDates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateOpen: {},
      dateModalOpenDesktop: null
    };
    this.handleDateModalBackgroundClick = this.handleDateModalBackgroundClick.bind(this);
  }

  handleDateClick(date) {
    const dateOpen = {
      ideaId: date.ideaId,
      title: date.title,
      description: date.description,
      locationId: date.locationId,
      address: date.address,
      latitude: date.latitude,
      longitude: date.longitude,
      scheduleId: date.scheduleId,
      date: date.date,
      time: date.time,
      dateTimeFormat: date.dateTimeFormat,
      dateTimeYearFormat: date.dateTimeYearFormat,
      dateYearFormat: date.dateYearFormat
    };
    if (window.innerWidth > 767) {
      this.setState({
        dateOpen: dateOpen,
        dateModalOpenDesktop: true
      });
    } else if (window.innerWidth < 768) {
      this.props.dateOpen(dateOpen);
      window.location.href = '#view-date-mobile';
    }
  }

  handleDateModalBackgroundClick(event) {
    if (!event.target.className.includes('background--modal')) {
      return;
    }
    this.setState({
      dateOpen: {},
      dateModalOpenDesktop: false
    });
  }

  renderPastDates() {
    const pastDates = this.props.pastDates;
    return (
      pastDates < 1
        ? <p className="empty-text">You have no dates to display.</p>
        : pastDates.map(date =>
          <div key={'past-date' + date.ideaId} onClick={() => this.handleDateClick(date)} className="date-item">
            <div className="date-title color-dark-gray">
              {date.title}
            </div>
            <div className="date-address color-medium-gray">
              <span className="fa fa-map-marker map-marker-icon"></span>
              {date.address}
            </div>
            <div className="date-schedule color-medium-gray">
              <span className="far fa-calendar-alt scheduled-calendar-icon"></span>
              {date.dateYearFormat}
            </div>
            <div className="date-description color-medium-gray">
              {date.description}
            </div>
          </div>
        )
    );
  }

  renderDateModalDesktop() {
    const date = this.state.dateOpen;
    return (
      date.ideaId === undefined || window.innerWidth < 767 || this.state.upcomingdateModalOpenDesktop === false
        ? null
        : <div onClick={this.handleDateModalBackgroundClick} className="background--modal">
            <div className="modal border-radius background-white date-box--modal">
              <div className="date-title--modal">
                {date.title}
              </div>
              <div className="date-address--modal color-medium-gray">
                <span className="fa fa-map-marker map-marker-icon color-medium-gray"></span>
                {date.address}
              </div>
              <div className="date-schedule--modal color-medium-gray">
                <span className="far fa-calendar-alt scheduled-calendar-icon"></span>
                {date.dateTimeYearFormat}
              </div>
              <div className="date-description--modal color-medium-gray">
                {date.description}
              </div>
              {/* feature in progress */}
              {/* <div className="edit-button-container--modal">
                <a className="edit-button--modal border-radius no-underline text-center">
                  <span className="fas fa-edit idea-edit-icon--modal color-dark-gray"></span>
                  <span className="idea-edit-label--modal color-dark-gray">Edit</span>
                </a>
              </div> */}
            </div>
          </div>
    );
  }

  render() {
    const dateElements = this.renderPastDates();
    const dateModalDesktop = this.renderDateModalDesktop();
    return (
      <div className="past-dates-container">
        {dateElements}
        {dateModalDesktop}
      </div>
    );
  }

}
